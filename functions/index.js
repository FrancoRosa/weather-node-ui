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
      if (prevData.temperature.length > 100) prevData.temperature.shift();
      if (prevData.humidity.length > 100) prevData.humidity.shift();
      if (prevData.PM1.length > 100) prevData.PM1.shift();
      if (prevData.PM2.length > 100) prevData.PM2.shift();
      if (prevData.latitude.length > 100) prevData.latitude.shift();
      if (prevData.longitude.length > 100) prevData.longitude.shift();
      if (prevData.timestamp.length > 100) prevData.timestamp.shift();
        
      prevData.temperature.push(data.temperature);
      prevData.humidity.push(data.humidity);
      prevData.PM1.push(data.PM1);
      prevData.PM2.push(data.PM2);
      prevData.latitude.push(data.latitude);
      prevData.longitude.push(data.longitude);
      prevData.timestamp.push(timestamp);
      
      measurementsRef.update(prevData);
    })
    await admin.database().ref('measurements').update({ ...data, timestamp})
    res.json({ message: "ok" });
  } else {
    res.json({ message: "error" });
  }
});