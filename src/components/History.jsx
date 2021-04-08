import Plot from 'react-plotly.js';

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

export default History