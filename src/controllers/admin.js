export default function adminsOnly(req, res, next) {
  res.status(401).json({ error: 'Only admins are authorized to access this.' });
}