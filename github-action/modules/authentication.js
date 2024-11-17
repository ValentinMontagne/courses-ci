// modules/authentication.js

// Simule une logique d'authentification
module.exports = (secret) => {
    if (!secret || secret !== 'my-secret') {
      return {
        status: 401,
        message: 'Unauthorized: Invalid or missing secret.',
      };
    }
  
    return {
      status: 200,
      message: 'Authentication successful!',
    };
  };
  