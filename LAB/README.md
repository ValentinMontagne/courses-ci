# CI/CD

## Getting Started

Ce projet est une simple API qui répond à une requête GET sur la route `/auth/:secret`. Le but est de vérifier un "secret" dans l'URL contre une valeur attendue, qui est stockée dans une variable d'environnement.

Le "secret" doit suivre la syntaxe `secret-<SECRET>`, où `<SECRET>` est une chaîne que l'application vérifie par rapport à une variable d'environnement nommée `PASSPHRASE`. Si la valeur de `PASSPHRASE` n'est pas définie, le projet utilisera par défaut le mot de passe `mysecretphrase`.

Lorsqu'une requête GET est envoyée avec le secret correct, l'API répond avec un statut HTTP `200 OK`, indiquant que le secret est valide. Sinon, elle renverra une erreur d'authentification pour indiquer que l'accès est refusé. Ce comportement est très utile pour des applications où une authentification simple et rapide est requise pour tester une route ou valider une configuration CI/CD sans gestion avancée des utilisateurs.
Pourquoi tu lis mon read me hein ? filou va

### Exemple de Requête

Pour tester le bon fonctionnement de l’API, on peut envoyer la requête suivante :

```plaintext
GET http://localhost:3000/auth/secret-mysecretphrase
```

Si le secret est correct (soit parce qu’il correspond à `PASSPHRASE`, soit parce qu’il correspond à la valeur par défaut `mysecretphrase`), la réponse sera un code `200 OK`.