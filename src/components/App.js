import LatestData from "./LatestData";
import { useEffect, useState } from 'react';

const App = () => {
  let currentTime = new Date();
  const [currentLocalTime, setCurrentLocalTime] = useState(currentTime.toLocaleString());
  
  const getCurrentTime = () => {
    currentTime = new Date();
    document.querySelector(".clock").textContent=currentTime.toLocaleString()
  }

  useEffect(() => {
    setInterval(getCurrentTime, 1000)
  }, [])

  return (
    <div className="container">
      <h1 className="title has-text-centered">Condiciones Ambientales</h1>
      <hr/>
      <p className="clock has-text-right"></p>
      <LatestData />
    </div>
  );
}

export default App;
