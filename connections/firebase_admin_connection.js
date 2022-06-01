const admin = require("firebase-admin");

const serviceAccount = require("./personal-todosa-dmin-firebase-adminsdk-lficb-41e762feec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://personal-todosa-dmin-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;
