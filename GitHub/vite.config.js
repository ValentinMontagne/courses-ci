import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',  // Le dossier 'src' contient tes fichiers sources
  build: {
    outDir: '../dist',  // Le dossier 'dist' est à la racine du projet (en dehors de 'src')
    rollupOptions: {
      input: 'src/index.js',  // Point d'entrée de ton application
    },
  },
  server: {
    open: true,  // Ouvre automatiquement le navigateur lorsque tu démarres le serveur
  },
});
