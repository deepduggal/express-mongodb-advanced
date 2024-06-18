import { Router } from "express";
import { home, createUser, getUsers, getActiveUsers, updateUser, deactivateUser, deleteUser } from "../controllers/index.js";
import login from "../controllers/login.js";
import adminsOnly from "../controllers/admin.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = Router();

// Register a user
router.route("/register").post(createUser);
// Login a user
router.route("/login").post(login);


// Logger middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.use(auth); // Authenticate everything below this line

// Home Page
router.get("/", home);

// Add a user
router.route("/users").post(createUser);

// Get all users
router.route("/users").get(getUsers);

// Get all active users
router.route('/users/active').get(getActiveUsers);

// Update a User
router.route('/users/:id').put(updateUser);

// Deactivate a User
router.route('/users/:id/deactivate').put(deactivateUser);

// Delete a User
router.route('/users/:id').delete(deleteUser);

router.route('/admin').get(role('admin'), adminsOnly)

export default router;