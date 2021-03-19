const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.measurements = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  console.log(req.body)
  if (Object.keys(data).length == 7){
    let timestamp = new Date().toISOString()
    await admin.firestore().collection('measurements').doc(timestamp).set(data)
    await admin.database().ref('measurements').update({ ...data, timestamp})
    res.json({ message: "ok" });
  } else {
    res.json({ message: "error" });
  }
});