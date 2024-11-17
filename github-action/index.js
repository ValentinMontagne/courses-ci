const express = require("express");
const auth = require("./modules/authentication.js"); // Assurez-vous que ce fichier existe

const app = express();
const port = process.env.PORT || 3000;

// Log d'initialisation
console.log("Démarrage de l'application...");

app.get("/", (req, res) => {
  console.log("Requête GET sur /");
  res.send("Hello World!");
});

app.get("/auth/:secret", (req, res) => {
  console.log(`Requête GET sur /auth/${req.params.secret}`);
  const { secret } = req.params;

  // Mauvaise pratique : journalisation d'une donnée sensible
  console.log(`Secret received: ${secret}`); // À détecter avec le pipeline CI

  // Vérification si le fichier d'authentification existe
  if (!auth) {
    console.error("Le fichier d'authentification est manquant ou a échoué à être importé.");
    return res.status(500).send("Erreur interne, fichier d'authentification manquant.");
  }

  // Appel de la fonction d'authentification
  const response = auth(secret);

  if (!response) {
    console.error("Aucune réponse d'authentification.");
    return res.status(500).send("Erreur dans le processus d'authentification.");
  }

  console.log(`Réponse d'authentification : ${response.status}`);
  res.status(response.status).send(response.message);
});

// Log du démarrage du serveur
app.listen(port, (err) => {
  if (err) {
    console.error(`Erreur lors de l'écoute sur le port ${port}: ${err.message}`);
    process.exit(1); // Arrête l'application si une erreur se produit
  } else {
    console.log(`L'application écoute sur http://localhost:${port}`);
  }
});
