import React, { useState } from "react";
import DraggableComponent from "./DraggableComponent"; // Assume this is correctly implemented
import { v4 as uuid } from "uuid"; // Added import for uuid

const ComponentPanel = ({ onSelectComponent }) => {
  // Ensuring onSelectComponent is passed as a prop
  const components = [
    { id: uuid(), name: "LLM", type: "component" }, // Changed type to "component" to match the accept property in useDrop
    { id: uuid(), name: "Input", type: "component" }, // Ensured consistency by changing type to "component"
    { id: uuid(), name: "Output", type: "component" }, // Ensured consistency by changing type to "component"
    // Add more components as needed
  ];
  const [filteredComponents, setFilteredComponents] = useState(components); // Added state for filtered components

  return (
    <div className="component-panel p-4">
      <input
        type="text"
        placeholder="Search Components..."
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          setFilteredComponents(
            components.filter((component) =>
              component.name.toLowerCase().includes(searchTerm)
            )
          );
        }}
        className="search-bar mb-4 p-2"
      />
      {filteredComponents.map((component) => (
        <DraggableComponent
          key={component.id}
          {...component}
          // onSelectComponent={onSelectComponent} // Ensure this is passed
        />
      ))}
    </div>
  );
};

export default ComponentPanel;
