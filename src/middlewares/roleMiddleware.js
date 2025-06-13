function authorizeRole(allowedRoles) {
  return function (req, res, next) {


    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ code: 403, message: 'Bu sayfaya erişim izniniz yok.' });
    }
    next();
  };
}

module.exports = authorizeRole;
