// const Users = require("../models/user");
const { sendOTP } = require("./sendOTP");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const Users = require("../models/user"); // Import the Users model
const Config = require("../config").get(process.env.NODE_ENV);


let predefinedLabels = ["L1", "L2", "L3"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 465,
  // secure: true, // use SSL
  auth: {
    user: "donotreply@introspects.in",
    pass: "cmzoiodhrihbafmu",
  },
});

module.exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ s:false, m: "Please provide a username", d: {} });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ s:false, m: "User not found", d: {} });
    }

    if (user && user.otp.val == otp) {
      const token = jwt.sign({ email: user.email }, Config.secret, {
        expiresIn: "1h",
      });

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        path: "/"
      });

      return res
        .status(200)
        .json({ s:true, m: "Login successful", d: {} });
    }else {
      return res
        .status(200)
        .json({ s:false, m: "Invalid OTP", d: {} });
    }
  } catch (error) {
    console.error("Error processing login:", error);
    return res.status(500).json({ s:false, m: "Server error" });
  }
};


const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

module.exports.requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ s: false, m: "Please enter email id" });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      console.log("Email not registered:", email);
      return res.json({
        s: false,
        m: "Email not registered. Please sign up first.",
      });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 15 * 60 * 1000; // OTP is valid for 15 minutes

    // Store OTP in memory (or your choice of storage)
    user.otp = {
      val: otp,
      expiresIn: otpExpiry
    }
    let u = await user.save()
    var mailOptions = {
      from: '"Introspects No-reply" <donotreply@introspects.in>', // sender address
      to: email, // list of receivers
      subject: "Introspects OTP " + otp, // Subject line
      html: `OTP for login is <b>${otp}</b> valid for 15 minutes`,
    };
    if (process.env.NODE_ENV === "production") {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error sending email:", error);
          return res.json({ s: false, m: "Error sending OTP" });
        }
        console.log("Message sent: " + info.response);
        return res.json({ s: true, m: "OTP sent" });
      });
    } else {
      console.log(otp);
      return res.json({ s: true, m: "OTP sent" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.json({ s: false, m: "Error processing request" });
  }
};

module.exports.signup = async (req, res) => {
  const { name, email, phoneNumber, address, query } = req.body;

  if (!name || !email || !phoneNumber || !address || !query) {
    return res.json({ s: false, d: "Please fill in all the details" });
  }

  try {
    let user1 = await Users.create({
      name,
      email,
      phoneNumber,
      address,
      query,
    });
    res.json({ s: true, d: "User registered successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.json({ s: false, d: "Error registering user" });
  }
};

module.exports.labels = (req, res) => {
  const { label } = req.body;
  if (!label || predefinedLabels.includes(label)) {
    return res
      .status(400)
      .json({ m: "Label already exists or is not provided" });
  }
  predefinedLabels.push(label);
  res.status(200).json({ m: "Label created successfully", label });
};
