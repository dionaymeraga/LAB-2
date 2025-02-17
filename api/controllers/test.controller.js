import jwt from "jsonwebtoken";
export const shouldBeLoggedIn = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.statis(401).json("Not Authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });
  });
  res.staus(200).json({ message: "You are authenticated!" });
};
export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.statis(401).json("Not Authenticated!");

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  });
  res.staus(200).json({ message: "You are authenticated!" });
};
