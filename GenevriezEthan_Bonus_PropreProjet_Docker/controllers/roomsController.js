const { pool } = require("../config/dbConn");

// @desc get All Class
// @route Get /classes
// @access Private

const getAllRooms = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM rooms", (err, rows) => {
      connection.release();

      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
};

module.exports = {
  getAllRooms,
};
