import { rtdb, db } from './firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"


const LatestData = () => {
  const [measurement, setMeasurement] = useState({
    latitude: -13.56,
    longitude: -71.92,
  })
  const savedData = rtdb.ref('measurements');

  

  useEffect(() => {
    savedData.once('value', snapshot => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        setMeasurement(snapshot.val());
      }
    })

    savedData.on('value', snapshot => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        setMeasurement(snapshot.val());
      }
    })
  },[])

  return (
    <div>
      <ul>
        <li>temperature: {measurement.temperature}</li>
        <li>humidity: {measurement.humidity}</li>
        <li>latitude: {measurement.latitude}</li>
        <li>longitude: {measurement.longitude}</li>
        <li>PM1: {measurement.PM1}</li>
        <li>PM2: {measurement.PM2}</li>
      </ul>
      <CurrentMap latitude={measurement.latitude} longitude={measurement.longitude} />    
    </div>
  )
}

export default LatestData;