import Plot from 'react-plotly.js';
import { rtdb, db } from '../firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"

const LatestData = () => {
  const [measurement, setMeasurement] = useState({
    latitude: -13.56,
    longitude: -71.92,
    PM1: 0,
    PM2: 0,
    humidity: 0,
    temperature: 0,
  })
  const savedData = rtdb.ref('measurements');
  const [timeStamp, setTimeStamp] = useState('');
  const [modal, setModal] = useState('');
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

  const Label = ({heading, variable, symbol}) => {
    return (
      <div class="level-item has-text-centered">
        <div onClick={() => setModal(variable) }>
          <p class="heading">{heading}</p>
          <p class="title">{measurement[variable] +' '+ symbol}</p>
        </div>
      </div>
    )
  }

  const Modal = ({ variable, title }) => {
    return (
      <div className={`modal ${variable ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <History data={measurement[variable]} title={variable} />
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setModal('')}></button>
      </div>
    )
  }

  const History = ({data, title}) => {
    return (
      <div>
      <Plot
          data={[
            {
              y: data,
              mode: 'lines+markers',
            },
          ]}
          layout={ {width: 580, height: 400, title: title} }
      />
    </div>
    )
  }

  useEffect(()=>{
    setTimeStamp(stampToLocal(measurement.timestamp));
  },[measurement])

  return (
    <div>
      <nav class="level">
        <Label heading='Temperatura' variable='temperature' symbol='°C' />
        <Label heading='Humedad' variable='humidity' symbol='%' />
        <Label heading='PM1' variable='PM1' symbol='ppm' />
        <Label heading='PM2' variable='PM2' symbol='ppm' />
      </nav>
      <CurrentMap 
        latitude={measurement.latitude}
        longitude={measurement.longitude}
        timeStamp={timeStamp}
      />
      <Modal variable={modal}/>
    </div>
  )
}

export default LatestData;
