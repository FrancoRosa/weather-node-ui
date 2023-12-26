const Label = ({ heading, variable, symbol, setModal, measurement }) => {
  return (
    <div className="level-item has-text-centered">
      <div onClick={() => setModal(variable)}>
        <p className="heading">{heading}</p>
        <p className="title">{measurement[variable] + " " + symbol}</p>
      </div>
    </div>
  );
};

export default Label;
