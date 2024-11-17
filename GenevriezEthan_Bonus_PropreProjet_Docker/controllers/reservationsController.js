const { pool } = require("../config/dbConn");

// @desc Create a Reservation
// @route POST /reservations
// @access Private
const createReservation = async (req, res) => {
  const { roomId, dateDebut, dateFin, userId } = req.body;

  console.log(dateDebut);
  console.log(dateFin);

  if (dateDebut >= dateFin) {
    return res.status(400).json({
      message: "La date de début doit être inférieure à la date de fin.",
    });
  }

  const now = new Date();
  if (new Date(dateDebut) < now) {
    return res
      .status(400)
      .json({ message: "La date de début ne peut pas être dans le passé." });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const query = `
            SELECT * FROM reservations 
            WHERE id_rooms = ? AND isValid = 1 
            AND (
                (date_debut < ? AND date_fin > ?) OR 
                (date_debut < ? AND date_fin > ?)
            )
        `;

    connection.query(
      query,
      [roomId, dateFin, dateFin, dateDebut, dateDebut],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Erreur Server" });
        }

        if (rows.length > 0) {
          return res
            .status(400)
            .json({ message: "Cette salle est déjà réservée à ce moment." });
        }

        const insertQuery = `
                INSERT INTO reservations (isValid, date_debut, date_fin, id_rooms, id_users)
                VALUES (1, ?, ?, ?, ?)
            `;

        connection.query(
          insertQuery,
          [dateDebut, dateFin, roomId, userId],
          (err) => {
            connection.release();
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Erreur lors de la création de la réservation.",
              });
            }
            res.status(201).json({ message: "Réservation créée avec succès." });
          },
        );
      },
    );
  });
};

const getValidReservationsByRoom = async (req, res) => {
  const roomId = req.params.id;

  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // format YYYY-MM-DD HH:MM:SS
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(currentDate);
    connection.query(
      "SELECT * FROM reservations WHERE id_rooms = ? AND isValid = 1 AND date_fin >= ?",
      [roomId, currentDate],
      (err, rows) => {
        console.log(rows);
        connection.release();

        if (!err) {
          console.log(rows);
          res.json(rows);
        } else {
          console.log(err);
          res.status(500).json({ message: "Erreur Server" });
        }
      },
    );
  });
};

const getReservationUser = async (req, res) => {
  const userId = req.params.userId;

  // const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // format YYYY-MM-DD HH:MM:SS
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM reservations WHERE id_users = ?",
      [userId],
      (err, rows) => {
        connection.release();

        if (!err) {
          console.log(rows);
          res.json(rows);
        } else {
          console.log(err);
          res.status(500).json({ message: "Erreur serveur" });
        }
      },
    );
  });
};

module.exports = {
  getValidReservationsByRoom,
  createReservation,
  getReservationUser,
};
