import { rtdb, db } from './firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"


const LatestData = () => {
  const [measurement, setMeasurement] = useState({})
  const savedData = rtdb.ref('measurements');

  useEffect(() => {
    savedData.on('value', snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
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