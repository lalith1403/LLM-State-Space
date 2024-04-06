import React from "react";
import { useDrop } from "react-dnd";
import DraggableComponent from "./DraggableComponent";
import Header from "./Header";

const EditorWorkspace = ({
  onSelectComponent,
  components = [],
  setComponents,
}) => {
  // Handles the layout of dropped components
  const moveComponent = (id, left, top) => {
    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === id ? { ...comp, left, top } : comp
      )
    );
  };

  // Add this method inside the EditorWorkspace component
  const deleteComponent = (id) => {
    setComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id)
    );
  };

  // Handles dropping new components into the workspace and moving existing ones
  const [, drop] = useDrop(
    () => ({
      accept: "component",
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const initialClientOffset = monitor.getInitialClientOffset();
        const clientOffset = monitor.getClientOffset();

        if (clientOffset && initialClientOffset) {
          const dropX = clientOffset.x;
          const dropY = clientOffset.y;

          // Calculate the drop position more accurately
          let left = dropX;
          let top = dropY;

          // If it's the first drop, there might not be a delta yet
          if (delta) {
            const componentRef = monitor.getItem().ref;
            if (componentRef.current) {
              const workspaceRect =
                componentRef.current.parentElement.getBoundingClientRect();

              // Adjust the drop position to be relative to the workspace
              left -= workspaceRect.left;
              top -= workspaceRect.top;
            }
          } else {
            // For the very first drop, use the client offset directly
            // Adjust by the offset of the workspace itself to get the position relative to the workspace
            const workspaceRect = document
              .querySelector(".editor-workspace")
              .getBoundingClientRect();
            left -= workspaceRect.left + window.scrollX;
            top -= workspaceRect.top + window.scrollY;
          }

          // Check if the component already exists
          if (components.some((comp) => comp.id === item.id)) {
            // Existing component, move it
            moveComponent(item.id, left, top);
          } else {
            // New component, add it to the workspace
            setComponents((prevComponents) => [
              ...prevComponents,
              {
                ...item,
                left,
                top,
                id: prevComponents.length, // Consider using a more unique ID generation strategy
              },
            ]);
          }
        }
      },
    }),
    [components, setComponents]
  );

  return (
    <div ref={drop} className="editor-workspace">
      <Header fileName="My File" />
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          id={component.id}
          {...component}
          onSelectComponent={onSelectComponent}
          onDeleteComponent={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent elements
            deleteComponent(component.id);
          }} // Pass the method as a prop and stop event propagation
          style={{
            position: "absolute",
            left: `${component.left}px`,
            top: `${component.top}px`,
          }}
        />
      ))}
    </div>
  );
};

export default EditorWorkspace;
