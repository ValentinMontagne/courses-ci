const { pool } = require("../config/dbConn");
const bcrypt = require("bcrypt");
// @desc Get all users
// @route Get /users
// @access Private

const getAllUsers = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM users", (err, rows) => {
      connection.release();

      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
};

const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !roles) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      connection.query(
        "SELECT username FROM users WHERe username = ?",
        [username],
        async (err, result) => {
          if (err) {
            connection.release();
            return res.status(500).json({ message: "Database Error" });
          }

          if (result.length > 0) {
            connection.release();
            return res.status(409).json({ message: "Duplicate username" });
          }

          const hashedPwd = await bcrypt.hash(password, 10);

          const userObject = {
            username,
            password: hashedPwd,
            roles: roles || "Student",
          };

          connection.query(
            "INSERT INTO users (username, password, roles) VALUES (?, ?, ?)",
            [userObject.username, userObject.password, userObject.roles],
            (err, result) => {
              connection.release();

              if (err) {
                return res
                  .status(500)
                  .json({ message: "Error creating user", error: err });
              }

              if (result.affectedRows === 1) {
                return res
                  .status(201)
                  .json({ message: `New user ${username} created` });
              } else {
                return res
                  .status(400)
                  .json({ message: "Invalid user data received" });
              }
            },
          );
        },
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

const updateUser = async (req, res) => {
  const { id, username, roles, password } = req.body;

  if (!id || !username || typeof roles !== "string") {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  try {
    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      connection.query(
        "SELECT * FROM users WHERE id_users = ?",
        [id],
        async (err, result) => {
          if (err) {
            connection.release();
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          if (result.length === 0) {
            connection.release();
            return res.status(400).json({ message: "User not found" });
          }

          connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            async (err, duplicate) => {
              if (err) {
                connection.release();
                return res
                  .status(500)
                  .json({ message: "Database error", error: err });
              }

              if (duplicate.length > 0 && duplicate[0].id_users != id) {
                connection.release();
                return res.status(409).json({ message: "Duplicate username" });
              }

              let hashedPwd = result[0].password;
              if (password) {
                hashedPwd = await bcrypt.hash(password, 10);
              }

              connection.query(
                "UPDATE users SET username = ?, roles = ?, password = ? WHERE id_users = ?",
                [username, roles, hashedPwd, id],
                (err) => {
                  connection.release();
                  if (err) {
                    return res
                      .status(500)
                      .json({ message: "Error updating user", error: err });
                  }

                  return res.json({ message: `${username} updated` });
                },
              );
            },
          );
        },
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  try {
    pool.getConnection(async (err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM Reservation WHERE id_users = ?",
        [id],
        (err, note) => {
          if (err) {
            connection.release();
            return res
              .status(500)
              .json({ message: "Database error", error: err });
          }

          if (note.length > 0) {
            connection.release();
            return res.status(400).json({ message: "User has assigned notes" });
          }

          connection.query(
            "SELECT * FROM users WHERE id_users = ?",
            [id],
            (err, user) => {
              if (err) {
                connection.release();
                return res
                  .status(500)
                  .json({ message: "Database error", error: err });
              }

              if (user.length === 0) {
                connection.release();
                return res.status(400).json({ message: "User not found" });
              }

              connection.query(
                "DELETE FROM users WHERE id_users = ?",
                [id],
                (err) => {
                  connection.release();
                  if (err) {
                    return res
                      .status(500)
                      .json({ message: "Error deleting user", error: err });
                  }

                  const reply = `Username ${user[0].username} with ID ${id} deleted`;
                  return res.json(reply);
                },
              );
            },
          );
        },
      );
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
