/**
 * Check if a user has the required role to access a resource
 */
export default function role(requiredRole = 'admin') {
  return function (req, res, next) {
    if (req.user?.role === requiredRole) {
      next();
    } else {
      res.status(403).send('Unauthorized role. User does not have the required role.');
    }
    next();
  }
}