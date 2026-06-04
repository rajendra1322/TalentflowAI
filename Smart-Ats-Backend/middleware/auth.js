import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export const requireRole = (allowed = []) => {
  return (req, res, next) => {
    const role = (req.user && req.user.role) || "";
    if (!allowed.map(r => r.toLowerCase()).includes(String(role).toLowerCase())) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    return next();
  };
};

export default protect;
