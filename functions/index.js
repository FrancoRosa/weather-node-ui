const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.measurements = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length == 7){
    let timestamp = new Date().toISOString()
    const measurementsRef = admin.firestore().collection('measurements').doc('records');
    measurementsRef.get().then(doc => {
      let prevData = doc.data();
      if (prevData.timestamp.length > 20) {
        prevData.temperature.shift()
        prevData.humidity.shift()
        prevData.PM1.shift()
        prevData.PM2.shift()
        prevData.latitude.shift()
        prevData.longitude.shift()
        prevData.timestamp.shift()
      }
      prevData.temperature.push(data.temperature);
      prevData.humidity.push(data.humidity);
      prevData.PM1.push(data.PM1);
      prevData.PM2.push(data.PM2);
      prevData.latitude.push(data.latitude);
      prevData.longitude.push(data.longitude);
      prevData.timestamp.push(data.timestamp);
      measurementsRef.update(prevData);
    })
    await admin.database().ref('measurements').update({ ...data, timestamp})
    res.json({ message: "ok" });
  } else {
    res.json({ message: "error" });
  }
});