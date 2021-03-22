import Plot from 'react-plotly.js';
import { rtdb, db } from '../firebase';
import { useEffect, useState } from 'react';
import CurrentMap from "./CurrentMap"

const keyToLabel = key => {
  switch (key) {
    case 'temperature':
      return 'Temperatura'
    case 'humidity':
      return 'Humedad'
    case 'PM1':
      return 'PM1'
    case 'PM2':
      return 'PM2'
    default:
      break;
  }
}

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

    latestMeasurement.on('value', snapshot => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        setMeasurement(snapshot.val());
      }
    })
    getHistoricData()
  },[])

  const getHistoricData = async () => {
    historicMeasurements.get()
      .then(doc => {
        console.log(doc.data())
        let records = doc.data()
        records = { ...records, timestamp: records.timestamp.map(t => {
          let tDate = new Date(t)
          return tDate.toLocaleString('sv-SE');
        })}
        console.log(records);
        setAllMeasurements(records);
      });
  }

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

  const Modal = ({ variable }) => {
    const title = keyToLabel(variable);
    return (
      <div className={`modal ${variable ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <History dataX={allMeasurements.timestamp} dataY={allMeasurements[variable]} title={title}/>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setModal('')}></button>
      </div>
    )
  }

  const History = ({dataX, dataY, title}) => {
    return (
      <div>
      <Plot
          data={[
            {
              x: dataX,
              y: dataY,
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
      <div className="is-flex clocks">
        <p className="heading">Última medición: {timeStamp}</p>
        <p className="clock heading"></p>
      </div>
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
