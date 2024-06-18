import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Check if a user is authenticated by verifying the JWT token
export default async function auth(req, res, next) {
  const rawBearerValue = req.header('Authorization');
  if (!rawBearerValue) {
    return res.status(401).send({ error: 'No auth info was sent in this request.' });
  }
  try {
    const token = rawBearerValue.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.secret);
    const user = await User.findById({ _id: decodedToken._id });

    if (!user) {
      console.log('User not found');
      return res.status(401).send({ error: 'Not authorized to access this resource' });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.log(err);
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
}