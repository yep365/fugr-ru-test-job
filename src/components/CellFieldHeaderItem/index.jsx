import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { cellActions } from "../../redux/actions";
import { Cell } from "../../components";
import triangle from "../../assets/images/triangle.png";

import "./CellFieldHeaderItem.scss";

const CellFieldHeaderItem = ({ type, name }) => {
  const [filterPosition, setFilterPosition] = useState(false);
  const [selected, setSelected] = useState(false);
  let dispatch = useDispatch();

  const handleSortClick = () => {
    dispatch(cellActions.sortByField(type, filterPosition));
    setFilterPosition(!filterPosition);
    setSelected(!selected);
  };
  const animation = {
    transform: `rotate(${filterPosition ? `0` : `180`}deg)`,
    transition: "all 0.5s ease-in-out",
  };
  return (
    <div className="cell-header__item">
      <Cell
        clickHandler={handleSortClick}
        selected={selected}
        cellText={name}
        width={type}
      />
      <img src={triangle} alt={triangle} style={animation} />
    </div>
  );
};

export default CellFieldHeaderItem;
