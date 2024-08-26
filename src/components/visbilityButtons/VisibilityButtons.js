import React from "react";
import "./VisibilityButtons.css";
import { ReactComponent as EyeIcon } from "../../assets/eyeIcon.svg";
import { ReactComponent as EyeClosedIcon } from "../../assets/eyeClosedIcon.svg";
import { truncateText } from "../../utils/Utils";

const VisibilityButtons = ({
  dataHorizontal,
  visibleBars,
  toggleBarVisibility,
  colors,
}) => {
  // Filtrar los datos para eliminar elementos con nombre vacío
  const filteredData = dataHorizontal.filter((item) => item.name !== "");

  return (
    <div className="visibility-buttons-container">
      {filteredData.map((item, index) => (
        <button
          key={item.name + index}
          onClick={() => toggleBarVisibility(index)}
          className={`visibility-button ${visibleBars[index] ? "active" : ""}`}
        >
          <span className="visibility-button_circle">
            <span
              className="visibility-button_circle__element"
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            ></span>
          </span>
          <span className="visibility-button_text">
            <span className="visibility-button_text-title">
              {truncateText(item.name)}
            </span>
            <span className="visibility-button_text-temp">
              {truncateText(item.name)}
            </span>
            <span className="visibility-button_text-extra">
              {truncateText(item.name)}
            </span>
          </span>
          <span
            className="visibility-button_icon"
            style={{
              backgroundColor: visibleBars[index]
                ? colors[index % colors.length]
                : "#ddd",
            }}
          >
            {visibleBars[index] ? (
              <EyeIcon style={{ margin: "auto" }} />
            ) : (
              <EyeClosedIcon style={{ margin: "auto" }} />
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default VisibilityButtons;
