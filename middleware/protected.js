const roleCheck = (roles) => (req, res, next) => {
  try {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({
      message: `Access denied. ${roles.join(" or ")} privileges are required.`,
    });
  } catch (error) {
    console.error("Error in roleCheck middleware:", error.message);
    return res.status(500).json({
      message: "An error occurred while verifying privileges.",
      error: error.message,
    });
  }
};

const isVendorOrAdmin = roleCheck(["vendor", "admin"]);
const isAdmin = roleCheck(["admin"]);

module.exports = { isVendorOrAdmin, isAdmin };
