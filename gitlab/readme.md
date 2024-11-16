
# Configuration CI/CD - Exercices Pratiques

Ce guide présente les exercices permettant de configurer efficacement des pipelines CI/CD. 
Chaque exercice aborde une technique spécifique, telle que la gestion des étapes conditionnelles, 
l'ajout de nouveaux jobs, l'utilisation de variables d'environnement, et l'optimisation du code grâce aux ancres YAML.

---

## Exercice 1 - Retirez des étapes

Nous avons un problème, ici après la release, deux pipelines se lancent, cela est inutile.
Vous devez retirer les étapes validate et test en ajoutant des rules aux Jobs pour qu'ils ne se lancent pas lorsqu'un tag est créé ou que le commit est le commit de release "`chore: release`".
 

## Exercice 2 - Ajouter une étape

Préparons un nouveau Job e2e-test dans le Stage test, pour l'instant il ne doit juste réaliser la commande suivante :
```echo "Hello E2E !"```
Il doit être visible uniquement dans les Merge Requests (Pull Requests).


## Exercice 3 - Ajouter une variable d'environnement

Préparons un nouveau Job __only-canary__ dans le Stage validate, qui ne doit se lancer que quand l'on lance la pipeline pour l'environnement Canary, pour cela, nous allons créer une variable d'environnement "`ENV_TARGET`" qui doit être égale à "`canary`" pour que le Job se lance.
Pour l'instant il ne doit juste réaliser la commande suivante :
echo "Hello Only Canary !"


## Exercice 4 - Ajouter des dépendances

Préparons un nouveau Job __integration-test__ dans le Stage test, qui ne doit se lancer que quand le Job unit-test réussi, de même pour e2e-test qui ne doit maintenant se lancer que quand integration-test réussi.
Pour l'instant il ne doit juste réaliser la commande suivante :
```echo "Hello Integration !"```


## Exercice 5 - Enlevons la duplication de code

Durant les derniers exercices, nous avons souvent appliqué le même comportement à plusieurs Jobs. Pour éviter la duplication de code et que le fichier soit plus maintenable, utilisons les Anchors en YAML pour pouvoir faire hériter à nos Jobs une configuration.

---

FATHALLAH Ayoub
