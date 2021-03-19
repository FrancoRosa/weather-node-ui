import { rtdb, db } from '../firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"

const LatestData = () => {
  const [measurement, setMeasurement] = useState({
    latitude: -13.56,
    longitude: -71.92,
  })
  const savedData = rtdb.ref('measurements');
  const [timeStamp, setTimeStamp] = useState('')

  const stampToLocal = timestamp => {
    let time = new Date(timestamp);
    let result = time.toLocaleString()
    return result
  }

  useEffect(() => {
    savedData.on('value', snapshot => {
      console.log('.. on');
      console.log(snapshot.val())
      if (snapshot.exists()) {
        setMeasurement(snapshot.val());
      }
    })
  },[])

  const Label = ({heading, value}) => {
    return (
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{heading}</p>
          <p class="title">{value}</p>
        </div>
      </div>
    )
  }

  useEffect(()=>{
    setTimeStamp(stampToLocal(measurement.timestamp));
  },[measurement])

  return (
    <div className="container">
      <h1 className="title has-text-centered">Medicion de Calidad de aire</h1>
      <nav class="level">
        <Label heading='Temperatura' value={measurement.temperature + ' °C'}/>
        <Label heading='Humedad' value={measurement.humidity + ' %'}/>
        <Label heading='PM1' value={measurement.PM1 + ' ppm'}/>
        <Label heading='PM2' value={measurement.PM2 + ' ppm'}/>
      </nav>
      <CurrentMap latitude={measurement.latitude} longitude={measurement.longitude} />    
    </div>
  )
}

export default LatestData;