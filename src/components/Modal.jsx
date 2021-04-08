import History from "./History"

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

const Modal = ({ variable, allMeasurements, setModal }) => {
  const title = keyToLabel(variable);
  return (
    <div className={`modal ${variable ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setModal('')}></div>
      <div className="modal-content">
        <History dataX={allMeasurements.timestamp} dataY={allMeasurements[variable]} title={title}/>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => setModal('')}></button>
    </div>
  )
}

export default Modal