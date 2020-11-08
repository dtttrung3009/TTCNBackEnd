const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// const isAuth=(req,res,next)=>{
//     const token =req.headers.authorization;
//     if(token){

//     }
// }

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Admin token is not valid" });
};

export { getToken, isAdmin };
