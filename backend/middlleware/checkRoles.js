const isAdmin = (req, res, next) => {
    try {
        const accessToken = req.user;
        const roles = accessToken.userId.roles;

        if (roles.includes("admin")) {
            next();
        } else {
            res.status(403).send({
                message: "Require Admin Role!",
            });
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const isVerified = (req, res, next) => {
    try {
        const accessToken = req.user;
        const roles = accessToken.userId.roles;

        if (roles.includes("verified")) {
            next();
        } else {
            res.status(403).send({
                message: "User is not verified!",
            });
        }
    } catch (error) {

        res.status(401).json({ error: "Invalid token" });
    }
};

const isTenant = (req, res, next) => {
    try {
        const accessToken = req.user;
        const roles = accessToken.userId.roles;

        if (roles.includes("tenant")) {
            next();
        } else {
            res.status(403).send({
                message: "Require Tenants Role ",
            });
        }
    } catch (error) {

        res.status(401).json({ error: "Invalid token" });
    }
};


module.exports = { isAdmin, isVerified,isTenant };