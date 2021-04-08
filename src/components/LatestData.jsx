import { rtdb, db } from '../firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"
import Modal from './Modal';
import Label from './Label';


const LatestData = () => {
  const [measurement, setMeasurement] = useState({
    latitude: -13.56,
    longitude: -71.92,
    PM1: 0,
    PM2: 0,
    humidity: 0,
    temperature: 0,
    timestamp: new Date().toISOString()
  })

  const [allMeasurements, setAllMeasurements] = useState({
    latitude: [],
    longitude: [],
    PM1: [],
    PM2: [],
    humidity: [],
    temperature: [],
    timestamp: [],
  })
  const latestMeasurement = rtdb.ref('measurements');
  const historicMeasurements = db.collection('measurements').doc('records')
  const [timeStamp, setTimeStamp] = useState('');
  const [modal, setModal] = useState('');
  const stampToLocal = timestamp => {
    let time = new Date(timestamp);
    let result = time.toLocaleString('sv-SE')
    return result
  }
  let currentTime = new Date();
  
  const getCurrentTime = () => {
    currentTime = new Date();
    try {
      document.querySelector(".clock").textContent=currentTime.toLocaleString('sv-SE');
    } catch {
      console.error('...current time error')
    }
  }

  useEffect(() => {
    setInterval(getCurrentTime, 1000);
    getHistoricData();
  },[])

  const getHistoricData = async () => {
    historicMeasurements.get()
      .then(doc => {
        let records = doc.data()
        records = { ...records, timestamp: records.timestamp.map(t => {
          let tDate = new Date(t)
          return tDate.toLocaleString('sv-SE');
        })}
        

        latestMeasurement.on('value', snapshot => {
          let newData = snapshot.val() 
          newData.timestamp= new Date(snapshot.val().timestamp).toLocaleString('sv-SE')
          console.log(newData)
          if (snapshot.exists()) {
            setMeasurement(newData);
            let AllData = {...records};
            AllData.temperature.push(newData.temperature);
            AllData.humidity.push(newData.humidity);
            AllData.PM1.push(newData.PM1);
            AllData.PM2.push(newData.PM2);
            AllData.latitude.push(newData.latitude);
            AllData.longitude.push(newData.longitude);
            AllData.timestamp.push(newData.timestamp);
            setAllMeasurements(AllData);
          }
        })

      });
  }

  useEffect(()=>{
    setTimeStamp(stampToLocal(measurement.timestamp));
  },[measurement])

  return (
    <div>
      <div className="is-flex clocks">
        <p className="heading">Última medición: {timeStamp}</p>
        <p className="clock heading"></p>
      </div>
      <nav class="level">
        <Label setModal={setModal} measurement={measurement} heading='Temperatura' variable='temperature' symbol='°C' />
        <Label setModal={setModal} measurement={measurement} heading='Humedad' variable='humidity' symbol='%' />
        <Label setModal={setModal} measurement={measurement} heading='PM1' variable='PM1' symbol='ppm' />
        <Label setModal={setModal} measurement={measurement} heading='PM2' variable='PM2' symbol='ppm' />
      </nav>
      <CurrentMap 
        latitude={measurement.latitude}
        longitude={measurement.longitude}
        timeStamp={timeStamp}
      />
      <Modal variable={modal} allMeasurements={allMeasurements} setModal={setModal}/>
    </div>
  )
}

export default LatestData;
