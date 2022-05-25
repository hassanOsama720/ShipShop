const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const sendEmail = require("../service/emailTransptor");
const sendEmail2 = require("./email");
const Token = require("../models/token");
const crypto = import("crypto");
const randomBytes = require("randombytes");
const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const { redirect } = require("express/lib/response");
var ls = require("local-storage");
const res = require("express/lib/response");
const axios = require("axios"); // manages http requests
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
});

exports.userLogin = (request, response, next) => {
  User.findOne({ email: request.body.email })
    .then((data) => {
      if (data == null) {
        // throw new Error("email not found");
        response.status(401).json({ message: "invalid credentials" });
        return;
      }
      encrypted = data.password;

      bcrypt.compare(request.body.password, encrypted).then(function (result) {
        if (result || (request.body.way && request.body.way === "google")) {
          if (data.ban) {
            // throw new Error("user banned");
            response.status(403).json({ message: "USER BANNED" });
            return;
          }
          let accessToken = jwt.sign(
            {
              role: data.role,
              id: data._id,
              email: data.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "365d" }
          );
          response.json({ data, accessToken });
          // response.redirect("http://127.0.0.1:5500/index.html")
        } else {
          // next(new Error("wrong pass"));
          response.status(401).json({ message: "invalid credentials" });
          return;
        }
      });
    })
    .catch((error) => {
      //next(error.message);
    });
};

exports.changePass = (request, response, next) => {
  console.log("RB>>>>>>>>>", request.body);
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  // console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  // console.log(ls("token"))

  // console.log("TOKEN TESTS");
  // console.log("Req.role: ", request.role);
  // console.log("Req.id: ", request.id); //working
  User.findOne({ email: request.body.email })

    .then((data) => {
      if (data.role != request.body.role || data.email != request.body.email)
        next(Error("login first plz"));
      if (data == null) {
        throw new Error("email not found");
      }

 
      let matched = bcrypt.compareSync(request.body.password, data.password);
      // console.log("matched",matched);
      // console.log("request.body.password",request.body.password);
      // console.log("data.password",data.password);
      // console.log(' request.body.newPassword == request.body.newPasswordConfirm', request.body.newPassword == request.body.newPasswordConfirm)
      if (
        matched &&
        request.body.newPassword == request.body.newPasswordConfirm
      ) {
        User.findByIdAndUpdate(data._id, {
          $set: {
            password: bcrypt.hashSync(request.body.newPassword, 10),
          },
        }).then((data) => {
          if (data == null) next(new Error("User not found"));
          response.json({ message: "password changed" });
          // else response.redirect("http://127.0.0.1:5500/index.html")
        });
      } else {
        throw new Error("password in incorrect or not matched");
      }
    })
    .catch((error) => {
      console.log(error.message);
      // error.message = "error happened while login3";
      next(error.message);
    });
};

exports.register = asyncHandler(async (request, response, next) => {
  //Validation
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  let hashed = bcrypt.hashSync(request.body.password, 10);
  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: hashed,
  });

  try {
    const newUser = await user.save();
    console.log(newUser._id);

    let token = await new Token({
      userId: newUser._id,
      token: randomBytes(32).toString("hex"),
    }).save();
    //console.log(token)
    const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
    console.log(message);
    await sendEmail2(newUser.email, "Verify Email", message);

    response.status(201).json(newUser);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

exports.updateUser = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  // console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  // console.log(ls("token"))

  // console.log("TOKEN TESTS");
  // console.log("Req.role: ", request.role);
  // console.log("Req.id: ", request.id); //working
  User.findOne({ email: request.body.email })

    .then((data) => {
      if (data.role != request.role || data.email != request.email)
        next(Error("login first plz"));
      if (data == null) {
        throw new Error("email not found");
      }

      User.findByIdAndUpdate(data._id, {
        $set: {
          address: request.body.address,
          phone: request.body.phone,
          name: request.body.name,
        },
      }).then((data) => {
        if (data == null) next(new Error("User not fount"));
        response.json({ message: "data updated" });
        // else response.redirect("http://127.0.0.1:5500/index.html")
      });
    })
    .catch((error) => {
      // error.message = "error happened while login3";
      next(error.message);
    });
};

//send verification email
exports.sendVerificationEmail = async (req, res, next) => {
  try {
    const infoHash = {};
    const user = req.user;
    infoHash.user = user;
    infoHash.id = user._id;
    const key = eval(process.env.mail_key);
    const token = jwt.sign(infoHash, key, { expiresIn: "24h" });
    const link = `${process.env.BASE_URL}/user/verify/${user._id}/${token}`;
    //generate html code
    const html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
    <p>E-mail verification was requested for this email address ${user.email}. If you requested this verification, click the link below :</p>
    <p>
    <p style="color:red;">This link is expired with in 24 hrs</p>
      <a style="background-color:blue; color:white;padding:10px 20px;text-decoration:none; font-weight:bold;border-radius:7px" href="${link}">Verify Your Email</a>
    </p>`;
    await sendEmail(user.email, "Verify Email", html);
    res.status(201).json({
      data: "Registration successful ,An Email sent to your account please verify",
      token,
    });
  } catch (error) {
    next(error);
  }
};
//verify email on link sent
exports.emailVerify = async (req, res, next) => {
  try {
    const key = process.env.mail_key;
    const user = await userVerify(req, key);
    await user.update({ verified: true });
    res.status(200).json("mail verified success");
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await user.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const access_token = createAccessToken({ id: user._id });
    const url = `${CLIENT_URL}/user/reset/${access_token}`;

    sendMail(email, url, "Reset your password");
    return res.json({ msg: "Re-send the password, please check your email." });
  } catch (error) {
    // next(error),
    return res.status(500).json({ msg: err.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getAccessToken = (req, res) => {
  // try {
  //   const rf_token = req.cookies.refreshtoken;
  //   if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
  //   jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.status(400).json({ msg: "Please login now!" });
  //     const access_token = createAccessToken({ id: user.id });
  //     res.json({ access_token });
  //   });
  // } catch (err) {
  //   return res.status(500).json({ msg: err.message });
  // }
};
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const verify = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, email, name } = verify.payload;

    const password = email + process.env.GOOGLE_SECRET_KEY;

    const passwordHash = await bcrypt.hash(password, 10);
    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    let user = await User.findOne({ email });
    if (!user) {
      console.log("NOT");
      const newUser = new User({
        name: name,
        email: email,
        role: "customer",
        password: passwordHash,
      });

      await newUser.save();
      console.log("SAVED");
      user = await User.findOne({ email });
    }
    if (!user) {
    }
    if (user) {
      //  const isMatch = await bcrypt.compare(password, user.password);
      //if (!isMatch)
      //  return res.status(400).json({ msg: "Password is incorrect." });

      /*
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      */
      axios({
        method: "post",
        url: "http://localhost:8080/login",
        data: { email: email, password: password, way: "google" },
      })
        .then((res2) => {
          var data = res2.data.data;
          res.json({
            data: {
              email: data.email,
              id: data._id,
              accessToken: res2.data.accessToken,
              name: data.name,
            },
          });
        })
        .catch((er) => {
          // console.log("ER", er);
        });
    } else {
      // const refresh_token = createRefreshToken({ id: newUser._id });
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // });

      res.json({ msg: "Login success!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.facebookLogin = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;

    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    const { email, name, picture } = data;

    const password = email + process.env.FACEBOOK_SECRET;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await Users.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      // const refresh_token = createRefreshToken({ id: user._id });
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // });

      res.json({ msg: "Login success!" });
    } else {
      const newUser = new Users({
        name,
        email,
        password: password,
        avatar: picture.data.url,
      });

      await newUser.save();

      // const refresh_token = createRefreshToken({ id: newUser._id });
      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // });

      res.json({ data: { email } });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { name, email, password } = user;

    const check = await Users.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email already exists." });

    const newUser = new Users({
      name,
      email,
      password,
    });

    await newUser.save();

    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
