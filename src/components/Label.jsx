const Label = ({ heading, variable, symbol, setModal, measurement }) => {
  const getLevel = (pm) => {
    if (pm < 3) {
      return "low";
    } else if (pm >= 4 && pm <= 6) {
      return "mid";
    } else {
      return "high";
    }
  };
  const level = getLevel(measurement[variable]);

  const levelMessage = {
    low: { text: "bajo", class: "has-text-success" },
    mid: { text: "medio", class: "has-text-warning" },
    high: { text: "alto", class: "has-text-danger" },
  };

  return (
    <div className="level-item has-text-centered">
      <div onClick={() => setModal(variable)}>
        <p className="heading">{heading}</p>
        <p className="title">{measurement[variable] + " " + symbol}</p>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.9em",
            color: "transparent",
          }}
          className={symbol === "ppm" ? levelMessage[level].class : ""}
        >
          {symbol === "ppm" ? levelMessage[level].text : "."}
        </p>
      </div>
    </div>
  );
};

export default Label;
