const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const { loginValidation, registerValidation } = require("../validation");

//register new user
router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //checks db for email
  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(400).send("An account already exist with this email");
  }

  //hash passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creates user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();

    //create and assign token

    const token = jwt.sign({ _id: user._id }, process.env.TS);
    res.header("Authorization-token", token).send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login user
router.post("/login", async (req, res) => {
  const validation = loginValidation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  //check email from db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password incorrect");

  //check and dcrypt password

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send("Email or password incorrect");
  }

  //create and assign token

  const token = jwt.sign({ _id: user._id }, process.env.TS);
  res.header("Authorization-token", token).send(user._id);
});

module.exports = router;
