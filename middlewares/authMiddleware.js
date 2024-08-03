const jwt = require("jsonwebtoken");
const envProcess = require("../utils/config");

const getTokenFromRequest = async (request) => {
  const authorization = request.headers.authorization;

  let isBearer = authorization.toLowerCase().startsWith("bearer ");

  if (authorization && isBearer) {
    return authorization.substring(7);
  }

  return null;
};

const authMiddleware = {
  verifyAccesToken: async (request, response, next) => {
    try {
      const token = request.headers.authorization;
      if (!token) {
        return response.status(401).json({ message: "Token not found" });
      }

      let getToken = await getTokenFromRequest(request);

      let decodedToken = jwt.verify(getToken, envProcess.JWT_SECRET);

      if (decodedToken) {
        request.userId = decodedToken.id;
        next();
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = { authMiddleware, getTokenFromRequest };
