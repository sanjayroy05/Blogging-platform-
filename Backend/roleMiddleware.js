// backend/middleware/roleMiddleware.js

exports.roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized: No user info' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ msg: `Forbidden: Requires ${requiredRole} role` });
        }

        next();
    };
};
