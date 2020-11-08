const User = require("../models/user.model");
const { getToken, isAdmin } = require("../middlewares/auth.middleware");

module.exports = {
  register: async (req, res, next) => {
    const { fullName, email, phoneNumber, password, isAdmin } = req.body;
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password,
      isAdmin,
    });
    const newUser = await user.save();
    if (newUser) {
      return res.status(201).send({
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      return res.status(401).send({ message: "Invalid user data" });
    }
  },
  signin: async (req, res, next) => {
    const { email, password } = req.body;
    const signInUser = await User.findOne({
      email,
      password,
    });
    if (signInUser) {
      return res.status(201).send({
        _id: signInUser.id,
        fullName: signInUser.fullName,
        email: signInUser.email,
        phoneNumber: signInUser.phoneNumber,
        isAdmin: signInUser.isAdmin,
        token: getToken(signInUser),
      });
    } else {
      return res.status(401).send({ message: "Invalid email or password" });
    }
  },
  createAdmin: async (req, res, next) => {
    const admin = new User({
      fullName: "admin",
      email: "admin@gmail.com",
      password: "1234@1234",
      phoneNumber: "0000",
      isAdmin: true,
    });
    const newAdmin = await admin.save();
    res.send(newAdmin);
  },
};
