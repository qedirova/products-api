export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "banu2007") {
    return res
      .status(401)
      .json({ error: "Unauthorized. You have not logged in." });
  }

  next();
};
