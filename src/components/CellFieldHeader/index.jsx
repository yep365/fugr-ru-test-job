import React from "react";

import { CellFieldHeaderItem } from "../../components";

import "./CellFieldHeader.scss";

const CellFieldHeader = () => {
  const headerItems = [
    { type: "id", name: "Id" },
    { type: "firstName", name: "FirstName" },
    { type: "lastName", name: "LastName" },
    { type: "email", name: "Emal" },
    { type: "phone", name: "Phone" },
    { type: "streetAddress", name: "StreetAddress" },
    { type: "city", name: "City" },
    { type: "state", name: "State" },
    { type: "zip", name: "Zip" },
    { type: "description", name: "Description" },
  ];
  return (
    <div className="cell-row">
      {headerItems.map((headerField) => (
        <CellFieldHeaderItem type={headerField.type} name={headerField.name} />
      ))}
    </div>
  );
};

export default CellFieldHeader;
