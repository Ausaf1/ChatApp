const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { username, email, password, confirmPassword } = fields;
    const { image } = files;
    // console.log(image);
    const error = [];
    if (!username) {
      error.push("userName is required");
    }
    if (!email) {
      error.push("email is required");
    }
    if (validator.isEmail(email) === false) {
      error.push("email is not valid");
    }
    if (!password) {
      error.push("password is required");
    }
    if (!confirmPassword) {
      error.push("confirmPassword is required");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("password and confirmPassword must be same");
    }
    if (password && password.length < 6) {
      error.push("password must be at least 6 characters");
    }
    if (Object.keys(files).length === 0) {
      error.push("image is required");
    }
    // console.log(error);
    if (error.length > 0) {
      return res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      //   console.log(files);
      const getImageName = files.image.originalFilename;
      //   console.log(getImageName);
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      // console.log(newImageName);
      files.image.originalFilename = newImageName;
      const newPath =
        __dirname +
        `../../../client/public/image/${files.image.originalFilename}`;

      try {
        const checkUser = await registerModel.findOne({ email: email });
        if (checkUser) {
          res.status(400).json({
            error: {
              errorMessage: "Email already exists",
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (err) => {
            if (!err) {
              const userCreate = await registerModel.create({
                userName: username,
                email: email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });
              //   console.log("register success");
              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRE }
              );

              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Register success",
                token: token,
              });

              // console.log(token);
            } else {
              res.status(500).json({
                error: {
                  errorMessage: "Internal server error",
                },
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
};

module.exports.userLogin = async (req, res) => {
  const error = [];

  console.log({
    userLogin: req.body,
  });
  const { email, password } = req.body;
  if (!email) {
    error.push("email is required");
  }
  if (!password) {
    error.push("password is required");
  }
  if (email && !validator.isEmail(email)) {
    error.push("email is not valid");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({ email: email })
        .select("+password");
      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRE }
          );

          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
          };
          res.status(200).cookie("authToken", token, options).json({
            successMessage: "Login successfull",
            token: token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessage: "password is incorrect",
            },
          });
        }
        // console.log(checkUser);
      } else {
        res.status(400).json({
          error: {
            errorMessage: "email is not registered",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
