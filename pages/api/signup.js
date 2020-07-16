import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import Cart from "../../models/Cart";

connectDB();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //   0. validate name ,email,password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("password must be atleat 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("email must be valid");
    }
    // 1.Check if user already exist in db
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exist with email ${email}`);
    }
    // 2.if not hash their password
    const hash = await bcrypt.hash(password, 10); // provide 10 salt round (processing power)
    // 3.create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    // 3.5 create cart for new user
    await new Cart({ user: newUser._id }).save();
    // 4.create token for the user
    //   it used to recognise user  within out application
    //  token is store cookies of browser at some time
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5.send back the token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in sign up please come back later!");
  }
};
