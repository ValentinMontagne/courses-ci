const { pool } = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, rows) => {
        connection.release();

        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Something went wrong" });
        }

        let foundUser = rows[0];

        if (!foundUser) {
          return res
            .status(401)
            .json({ message: "Email or Password Incorrect" });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
          return res
            .status(401)
            .json({ message: "Email or Password Incorrect" });
        }

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              roles: foundUser.roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
      },
    );
  });
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      pool.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Server Error" });
        }
        connection.query(
          "SELECT username, roles FROM users WHERE username = ?",
          [decoded.username],
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Server Error" });
            }

            const foundUser = rows[0];
            if (!foundUser)
              return res.status(401).json({ message: "Unauthorized" });

            const accessToken = jwt.sign(
              {
                UserInfo: {
                  username: foundUser.username,
                  roles: foundUser.roles,
                },
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "15m" },
            );

            res.json({ accessToken });
          },
        );
      });
    },
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
