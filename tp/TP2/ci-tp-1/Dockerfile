# Étape 1 : Utiliser l'image officielle Node.js comme image de base
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier le fichier package.json et package-lock.json (si présent)
# Cela permet de gérer les dépendances avant de copier tout le code pour améliorer les performances du build
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tous les fichiers de votre projet dans le conteneur
COPY . .

# Étape 6 : Exposer le port que votre application utilise (par défaut Express écoute sur le port 3000)
EXPOSE 3000

# Étape 7 : Définir la commande pour démarrer l'application
CMD ["npm", "start"]

