Structure du Fichier de Workflow
Le fichier principal de configuration pour GitHub Actions est .github/workflows/github-action.yaml. Il contient la configuration des jobs et leur ordre d'exécution.

Déclencheurs d'événements
Le workflow est déclenché par les événements suivants :

push : Lorsqu'un push est effectué sur la branche main.
pull_request : Lorsqu'une Pull Request est créée ou mise à jour sur la branche main.
workflow_dispatch : Permet un déclenchement manuel de la pipeline depuis l'interface GitHub.
Jobs dans le Workflow
install : Ce job s'exécute en premier et effectue les étapes suivantes :

Vérifie le code source.
Installe les dépendances du projet à l'aide de npm ci.
lint : Ce job vérifie la qualité du code en exécutant un linter. Il dépend du job install et ne s'exécute que lorsque certains critères sont remplis (comme l'absence du message de commit chore: release).

unit-test : Ce job exécute les tests unitaires du projet. Il dépend du job lint. Comme pour le job précédent, il n'est exécuté que si les conditions sont remplies.

release : Ce job effectue le processus de versioning et de publication du projet. Il est déclenché uniquement pour les push sur la branche main et après la réussite du job unit-test.

e2e-test : Ce job exécute les tests de bout en bout (E2E) pour les Pull Requests. Il dépend du succès du job unit-test.

integration-test : Ce job exécute les tests d'intégration après la réussite du job unit-test et avant les tests E2E.

only-canary : Ce job est conditionné par une variable d'environnement ENV_TARGET et ne s'exécute que lorsque cette variable est définie à canary.

Utilisation des Anchors pour Réduire la Duplication de Code