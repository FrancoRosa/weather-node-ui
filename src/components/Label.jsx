import { useState } from "react";

const pmLevels = {
  PM1: {
    low: 3,
    mid: 6,
    high: 10,
  },
  PM2: {
    low: 3,
    mid: 6,
    high: 10,
  },
};

const Label = ({ heading, variable, symbol, setModal, measurement }) => {
  const [hover, setHover] = useState(false);
  const getLevel = (pm, type) => {
    if (type === "PM1") {
      if (pm < pmLevels.PM1.low) {
        return "low";
      } else if (pm >= pmLevels.PM1.low && pm <= pmLevels.PM1.mid) {
        return "mid";
      } else {
        return "high";
      }
    } else {
      if (pm < pmLevels.PM2.low) {
        return "low";
      } else if (pm >= pmLevels.PM2.low && pm <= pmLevels.PM2.mid) {
        return "mid";
      } else {
        return "high";
      }
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
        <div
          style={{
            position: "relative",
          }}
          onMouseEnter={() => symbol === "ppm" && setHover(true)}
          onMouseLeave={() => symbol === "ppm" && setHover(false)}
        >
          <p
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "0.9em",
              color: "transparent",
              cursor: "pointer",
            }}
            className={symbol === "ppm" ? levelMessage[level].class : ""}
          >
            {symbol === "ppm" ? levelMessage[level].text : "."}
          </p>
          {hover && (
            <div
              style={{
                position: "absolute",
                top: "4em",
                left: "0",
                zIndex: "100",
                display: "flex",
              }}
            >
              <div
                style={{
                  background: "white",
                  rotate: "45deg",
                  width: "1em",
                  height: "1em",
                  position: "absolute",
                  top: "-0.5em",
                  left: "4.5em",
                  zIndex: "-10",
                }}
              />
              <div
                style={{
                  background: "white",
                  borderRadius: "10px",
                  width: "15em",
                  zIndex: "10",
                  fontWeight: "bolder",
                  fontSize: "0.75em",
                  padding: "1em",
                }}
              >
                <p style={{}}>Nivel de Contaminacion:</p>
                <div className="level">
                  <p style={{ fontWeight: "bolder", fontSize: "0.75em" }}>
                    PM1
                  </p>
                  <p>
                    0 - {pmLevels.PM1.low}{" "}
                    <span
                      className={levelMessage.low.class + " is-capitalized"}
                    >
                      {levelMessage.low.text}
                    </span>
                  </p>
                  <p>
                    {pmLevels.PM1.low + 1} - {pmLevels.PM1.mid}{" "}
                    <span
                      className={levelMessage.mid.class + " is-capitalized"}
                    >
                      {levelMessage.mid.text}
                    </span>
                  </p>
                  <p>
                    {pmLevels.PM1.mid + 1} - {pmLevels.PM1.high}{" "}
                    <span
                      className={levelMessage.high.class + " is-capitalized"}
                    >
                      {levelMessage.high.text}
                    </span>
                  </p>
                </div>
                <div className="level">
                  <p style={{ fontWeight: "bolder", fontSize: "0.75em" }}>
                    PM2
                  </p>
                  <p>
                    0 - {pmLevels.PM2.low}{" "}
                    <span
                      className={levelMessage.low.class + " is-capitalized"}
                    >
                      {levelMessage.low.text}
                    </span>
                  </p>
                  <p>
                    {pmLevels.PM2.low + 1} - {pmLevels.PM2.mid}{" "}
                    <span
                      className={levelMessage.mid.class + " is-capitalized"}
                    >
                      {levelMessage.mid.text}
                    </span>
                  </p>
                  <p>
                    {pmLevels.PM2.mid + 1} - {pmLevels.PM2.high}{" "}
                    <span
                      className={levelMessage.high.class + " is-capitalized"}
                    >
                      {levelMessage.high.text}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Label;
