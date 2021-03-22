import LatestData from "./LatestData";
import { useEffect, useState } from 'react';

const App = () => {
  
  

  return (
    <div className="container">
      <h1 className="title has-text-centered">Condiciones Ambientales</h1>
      <hr/>
      <LatestData />
    </div>
  );
}

export default App;
