import React from "react";

const PropertySidebar = ({ selectedComponent, updateComponent, onClose }) => {
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    updateComponent(selectedComponent.id, {
      ...selectedComponent,
      [name]: value,
    });
  };

  if (!selectedComponent) {
    return <div className="property-sidebar">No component selected</div>;
  }

  return (
    <div className="property-sidebar">
      {/* Add this line */}
      <label htmlFor="component-name">Name:</label>
      <input
        id="component-name"
        name="name"
        value={selectedComponent.name}
        onChange={handlePropertyChange}
        className="border p-1"
      />
      {/* Include other properties as needed */}
      <button
        onClick={onClose}
        className="close-btn"
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        X
      </button>{" "}
    </div>
  );
};

export default PropertySidebar;
