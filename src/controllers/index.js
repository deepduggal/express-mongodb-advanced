import User from '../models/User.js';

async function home(req, res) {
  res.status(200).json({ message: 'Server is online' });
}

async function createUser(req, res) {
  try {
    const { name, email, password, age, isActive } = req.body;
    const user = new User({ name, email, password, age, isActive });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    throw err;
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    throw err;
  }
};

async function getActiveUsers(req, res) {
  try {
    const activeUsers = await User.find({ isActive: true });
    res.status(200).json(activeUsers);
  } catch (err) {
    res.status(500).send(err);
  }
}

// async function getUserById(req, res) {
//   try {
//     const { id } = req.params;
//     const user = User.findById(id);
//     res.status(200).json(user);
//   }
//   catch (err) {
//     res.status(500).send(err);
//   }
// }

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password, age, isActive } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password, age, isActive }).exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message)
  }
}

async function deactivateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isActive: false }).exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { home, createUser, getUsers, getActiveUsers, updateUser, deactivateUser, deleteUser };