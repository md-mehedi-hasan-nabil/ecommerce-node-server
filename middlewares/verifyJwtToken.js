const admin = require("../firebase/firebase");

async function verifyToken(req, res, next) {
  const appCheckToken = req.headers["x-firebase-appcheck"];

  console.log(appCheckToken);

  if (!appCheckToken) {
    res.status(401);
    return next("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(appCheckToken);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = verifyToken;
