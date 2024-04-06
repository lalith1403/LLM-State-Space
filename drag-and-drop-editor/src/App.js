import React, { useState } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ComponentPanel from "./components/ComponentPanel";
import EditorWorkspace from "./components/EditorWorkspace";
import PropertySidebar from "./components/PropertySidebar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const updateComponent = (id, updates) => {
    const componentIndex = components.findIndex((c) => c.id === id);
    if (componentIndex === -1) {
      console.error("Component not found:", id);
      return;
    }

    const updatedComponents = update(components, {
      [componentIndex]: { $merge: updates },
    });

    setComponents(updatedComponents);
  };

  const handleCloseSidebar = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen">
          <ComponentPanel
            className="flex-grow-0"
            onSelectComponent={setSelectedComponent}
          />
          <EditorWorkspace
            components={components}
            setComponents={setComponents}
            onSelectComponent={(component) => {
              setSelectedComponent(component);
            }}
          />
          {selectedComponent && (
            <PropertySidebar
              selectedComponent={selectedComponent}
              updateComponent={updateComponent}
              onClose={handleCloseSidebar} // Pass the handleCloseSidebar function as a prop
              className="flex-grow-0"
            />
          )}
        </div>
        <Footer />
      </DndProvider>
    </div>
  );
}

export default App;
