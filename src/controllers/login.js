import { compare } from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export default async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if user exists using email
    const user = await User.findOne({ email }).exec();
    // res.status(200).send('Login successful');
    if (!user) {
      return res.status(401).json({ error: 'Invalid login info' });
    }

    // Check if password is correct
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid login info' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.secret, { expiresIn: '1h' });

    res.status(200).json({ token, user: { email: user.email } });
  } catch (err) {
    next(err);
  }
}