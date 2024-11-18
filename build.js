// build.js

const fs = require('fs');
const path = require('path');

// Dossier de sortie du build
const outputDir = path.resolve(__dirname, 'dist');

// Fonction de création du dossier de sortie
const createDistFolder = () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    console.log('Dossier "dist" créé.');
  } else {
    console.log('Le dossier "dist" existe déjà.');
  }
};

// Simuler un processus de build : copier un fichier d'entrée
const copyFilesToDist = () => {
  const sourceFile = path.resolve(__dirname, 'src/index.js');
  const destFile = path.resolve(outputDir, 'index.js');

  fs.copyFileSync(sourceFile, destFile);
  console.log('Fichier "index.js" copié dans le dossier "dist".');
};

// Exécution du processus de build
const runBuild = () => {
  createDistFolder();
  copyFilesToDist();
  console.log('Build terminé avec succès.');
};

// Exécuter la fonction de build
runBuild();
