
# Configuration du Pipeline CI/CD avec GitHub Actions

Ce document décrit la configuration d’un pipeline CI/CD pour un projet Node.js sur GitHub Actions.

## Préparation

### Étape 1 : Création du fichier de pipeline

À la racine de votre projet, créez un fichier nommé `.github/workflows/node.js.yml`. Ce fichier contiendra la configuration de votre pipeline CI/CD.

**Conseil :** Si vous utilisez VS Code, installez l’extension *YAML* pour bénéficier de la validation et de l’autocomplétion.

#### Structure du Projet

Votre projet doit respecter l'arborescence suivante :

```yml
nom-du-repository/
├── .github/
│   └── workflows/
│       └── .yml                  # Configuration des workflows GitHub Actions
├── node_modules/                   # Répertoire généré après `npm install`
├── .npm/                           # Cache npm (optionnel, selon configuration)
├── package.json                    # Configuration des dépendances et scripts npm
├── package-lock.json               # Verrouillage des versions des dépendances
├── README.md                       # Documentation du projet
├── src/                            # Répertoire contenant le code source
    ├── ...                         # Fichiers et sous-répertoires du code
```

#### Lancement des tests local
Assurez-vous que les pipeline fonctionnent correctement avant de pousser votre code :
```shell
npm run [script_package.json] 
```

En cas d'échec, vérifiez les messages d'erreur dans la console pour corriger les problèmes.

---

### Étape 2 : Spécifier l'environnement d'exécution

Nous allons utiliser une image Node.js et activer la mise en cache pour éviter la réinstallation des dépendances à chaque job.

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20.18.0"  # version de Node.js

permissions:
  contents: write
  packages: write

jobs:

  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Install dependencies
        run: npm install && npm ci --cache .npm --prefer-offline
      - name: Verify ESLint installation
        run: npm list eslint
```

## Configuration des Stages et Jobs

### Étape 3 : Ajout du stage de validation (lint)

Configurez un job pour vérifier la qualité du code avec ESLint.

```yaml
  lint:
    runs-on: ubuntu-latest
    needs: install
    if: "!startsWith(github.ref, 'refs/tags/') && !contains(github.event.head_commit.message, 'chore: release')"
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Install dependencies (again for lint job)
        run: npm install
      - name: Run lint
        run: npm run lint
```

**Conseil :** Si vous rencontrez des erreurs avec ESLint, assurez-vous que les dépendances sont correctement installées.

### Étape 4 : Ajout des tests unitaires

Ajoutez un job pour exécuter les tests unitaires avec Vitest.

```yaml
  unit-test:
    runs-on: ubuntu-latest
    needs: install
    if: "!startsWith(github.ref, 'refs/tags/') && !contains(github.event.head_commit.message, 'chore: release')"
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm run test
```

### Étape 5 : Ajout des tests d'intégration et E2E

Ajoutez les jobs suivants pour gérer les tests d'intégration et les tests de bout en bout (E2E).

```yaml
  integration-test:
    runs-on: ubuntu-latest
    needs: unit-test
    steps:
      - name: Run integration tests
        run: echo "Hello Integration !"

  e2e-test:
    runs-on: ubuntu-latest
    needs: integration-test
    steps:
      - name: Run end-to-end tests
        run: echo "Hello E2E !"
```

### Étape 6 : Ajout du job "Only Canary"

Ce job ne doit se lancer que si la variable `ENV_TARGET` est définie à "canary".

```yaml
  only-canary:
    runs-on: ubuntu-latest
    needs: install
    env:
      ENV_TARGET: "canary"
    if: ${{ github.event.inputs.ENV_TARGET == 'canary' }}
    steps:
      - name: Say Hello
        run: echo "Hello Only Canary !"
```

### Étape 7 : Configuration de la release

Ajoutez un job pour gérer la release de votre application avec Release-it.

```yaml
  release:
    name: Release
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name != 'release'
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Git configuration
        run: git config user.email "${{ github.actor }}@users.noreply.github.com" && git config user.name "${{ github.actor }}"

      - name: Pull the latest changes from the main branch
        run: git pull origin main --rebase

      - name: Install release-it
        run: npm install -g release-it

      - name: Run release-it
        run: npx --yes release-it --ci
        env:
          GITHUB_TOKEN: ${{ secrets.CI_GITHUB_TOKEN }}
```

**Conseil :** Si la release échoue, vérifiez que le token `CI_GITHUB_TOKEN` est bien configuré dans vos secrets GitHub.

### Configuration du token GitHub

Pour permettre l'exécution de certains jobs nécessitant un accès à votre dépôt (comme les releases), vous devez créer un **Personal Access Token** sur GitHub et le configurer comme secret.

#### Étapes pour créer un token :
1. Rendez-vous sur [GitHub > Settings > Developer settings > Personal Access Tokens > Tokens (classic)](https://github.com/settings/tokens).
2. Cliquez sur **Generate new token**.
3. Sélectionnez une **durée de validité** pour le token.
4. Cochez les permissions suivantes :
   - **repo** : Accès complet aux dépôts (lecture, écriture).
   - **write:packages** : Pour publier des packages.
   - **admin:repo_hook** : Pour gérer les hooks des dépôts.
   - **workflow** : Pour déclencher des workflows.

#### Ajouter le token comme secret :
1. Copiez le token généré (vous ne pourrez plus le voir après cette étape).
2. Allez dans votre dépôt GitHub > **Settings > Secrets and variables > Actions**.
3. Cliquez sur **New repository secret**.
4. Nommez le secret `CI_GITHUB_TOKEN` (ou autre nom, selon votre configuration).
5. Collez la valeur du token et cliquez sur **Add secret**.


