const User = require("../models/user.model");
const { getToken } = require("../middlewares/auth.middleware");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, phoneNumber, password, isAdmin } = req.body;
    const user = new User({
      fullName: name,
      email,
      phoneNumber,
      password,
      isAdmin: false,
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
      email: "admin@example.com",
      password: "1234",
      phoneNumber: "0000",
      isAdmin: true,
    });
    const newAdmin = await admin.save();
    res.send(newAdmin);
  },
  changeInforUser: async (req, res, next) => {
    const userId = req.params.id;
    console.log(req.body);
    const user = await User.findById(userId);
    if (user) {
      user.fullName = req.body.name || user.fullName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  },
};
