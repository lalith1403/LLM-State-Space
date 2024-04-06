import React, { useRef } from "react";
import { useDrag } from "react-dnd";

const DraggableComponent = ({
  id,
  name,
  type,
  onSelectComponent,
  onDeleteComponent,
  style,
}) => {
  const ref = useRef(null); // Add this line
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { id, name, type, ref }, // Include the ref here
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    if (typeof onSelectComponent === "function") {
      onSelectComponent({ id, name, type });
    } else {
      console.error("onSelectComponent is not a function");
    }
  };

  return (
    <div
      ref={(instance) => {
        drag(instance);
        ref.current = instance; // Set the ref here
      }}
      className={`draggable-component p-2 m-2 cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={style} // Apply the style prop
      onClick={handleClick}
    >
      <button onClick={handleClick}>{name}</button>
      {/* Update the delete button with the new class */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from propagating to parent elements
          onDeleteComponent();
        }}
        className="delete-btn"
      >
        x
      </button>
    </div>
  );
};

export default DraggableComponent;
