const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user_schema");
const { transporter } = require("../service/serviceMail");

const JWT_SECRET_KEY = "sdfsdfsdfsdfsdfs123123123df";

//User Siginup API
const userSignup = async function (req, res) {
  const { email, password } = req.body;
  const userData = new User(req.body);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        error: "Email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
    const filePath = `/uploads/${req.file.filename}`;
    userData.profilepic = filePath;
    await userData.save();
    return res.status(201).json({
      success: true,
      message: "Registation successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//User Login API
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const userData = await User.findOne({ email: email });
      if (userData != null) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (userData.email === email && isMatch) {
          const token = jwt.sign(
            { userID: userData._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          return res.status(200).json({
            success: true,
            message: "Login success",
            userData: userData,
            token: token,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Password or Email is not match",
          });
        }
      } else {
        res
          .status(403)
          .json({ success: false, message: "Email user is not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//User Send Email for Reset Password API
const sendUserResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    console.log("Email User :", userData);
    if (userData != null) {
      const secret = userData._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "testtoolon07@gmail.com",
        to: email,
        subject: "Email for user reset paswword..",
        text: `<a href=${link}>Click on this for reset password`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send succussfully",
        token: token,
        userid: userData._id,
      });
    } else {
      res
        .status(403)
        .json({ success: false, error: "Email user is not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: err.message,
    });
  }
};

//User Reset Password API
const userPasswordReset = async (req, res) => {
  const { newPassword, confirmPassword, id, token } = req.body;
  try {
    const checkUser = await User.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.JWT_SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(confirmPassword, salt);
        await User.findByIdAndUpdate(checkUser._id, {
          $set: { password: password },
        });
        res.status(200).json({
          success: true,
          message: "Password update successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          error: "Password and confirmPassword is not match",
        });
      }
    } else {
      res
        .status(403)
        .json({ success: false, error: "Email user is not found" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  sendUserResetPasswordEmail,
  userPasswordReset,
};
