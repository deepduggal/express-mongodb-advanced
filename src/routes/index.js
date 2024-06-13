import { Router } from "express";
import { home, createUser, getUsers, getActiveUsers, updateUser, deactivateUser, deleteUser } from "../controllers/index.js";

const router = Router();

router.get("/", home);

// Add/Register a user
router.route("/users").post(createUser);
router.route("/register").post(createUser);

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

export default router;