require("dotenv").config();
const port = process.env.AUTH_SERVER_PORT;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Users = require("./model/user.model");
const Product = require("./model/book.model");
const AccessToken = require("./model/accessToken.model");
const RefreshToken = require("./model/refreshToken.model");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB_URL);

app.post("/auth/login", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  // console.log(user);
  try {
    const validUser = await Users.findOne({ email: user.email });
    if (validUser) {
      const validCredential = await bcrypt.compare(
        user.password,
        validUser.password
      );
      console.log(validCredential);
      if (validCredential) {
        const accessToken = jwt.sign(
          { email: validUser.email },
          process.env.ACCESS_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
          { email: validUser.email },
          process.env.REFRESH_SECRET
        );
        try {
          await AccessToken.create({
            token: accessToken,
          });
          await RefreshToken.create({
            token: refreshToken,
          });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({
              success: false,
              error: "unexpexted error occured while creating token",
            });
        }
        res
          .status(200)
          .json({
            success: true,
            accessToken,
            refreshToken,
            cart_data: validUser.cart_data,
            subscription_data: validUser.subscription_data,
          });
      } else
        res.status(400).json({ success: false, error: "password is wrong" });
    } else
      res
        .status(400)
        .json({ success: false, error: "email is wrong or please register!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "unexpexted error occured" });
  }
});

app.post("/auth/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  if (refreshToken == null) res.status(400).json({ satus: "invalid token" });
  try {
    const rtoken = await RefreshToken.findOne({ token: refreshToken });
    console.log(rtoken);
    if (rtoken) {
      deleteRtoken(rtoken._id);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (user) {
            const accessToken = jwt.sign(
              { email: user.email },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: process.env.TOKEN_EXPIRY }
            );
            const refreshToken = jwt.sign(
              { email: user.email },
              process.env.REFRESH_TOKEN_SECRET
            );
            createToken(accessToken, refreshToken);
            res.status(200).json({ accessToken, refreshToken });
          } else res.status(500).json({ satus: "Request forbidden" });
        }
      );
    } else {
      res.status(500).json({ satus: "Request forbidden please login" });
    }
  } catch (err) {
    res.status(500).json({ satus: "unexpexted error occured" });
  }
});

async function createToken(accessToken, refreshToken) {
  try {
    await AccessToken.create({
      token: accessToken,
    });
    await RefreshToken.create({
      token: refreshToken,
    });
  } catch {
    res.status(500).json({ satus: "unexpexted error occured" });
  }
}

async function deleteRtoken(refreshTokenId) {
  try {
    const response = await RefreshToken.deleteOne({
      _id: refreshTokenId,
    });
    console.log(response);
  } catch {
    res.status(500).json({ satus: "unexpexted error occured" });
  }
}

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port: " + port);
  } else {
    console.log("error occured" + error);
  }
});
