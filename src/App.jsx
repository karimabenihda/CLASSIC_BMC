import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import { FaTrash, FaEdit } from "react-icons/fa";
import html2canvas from 'html2canvas';

const App = () => {
  const [sections, setSections] = useState({
    keyPartners: [],
    keyActivities: [],
    keyResources: [],
    valuePropositions: [],
    customerRelationships: [],
    channels: [],
    customerSegments: [],
    costStructure: [],
    revenueStreams: [],
  });

  const [editingSection, setEditingSection] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");

  const handleAddItem = (section, item) => {
    setSections((prev) => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const handleRemoveItem = (section, index) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleEditItem = (section, index, item) => {
    setEditingSection(section);
    setEditingIndex(index);
    setNewText(item);
  };

  const handleSaveEdit = () => {
    if (newText.trim() !== "") {
      setSections((prev) => {
        const updatedSection = [...prev[editingSection]];
        updatedSection[editingIndex] = newText;
        return {
          ...prev,
          [editingSection]: updatedSection,
        };
      });
      setEditingSection(null);
      setEditingIndex(null);
      setNewText("");
    }
  };

  const handleSaveAsImage = () => {
    const captureArea = document.getElementById('capture-area');
    captureArea.classList.add('capture'); // Hide input and icons for capture

    html2canvas(captureArea, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'Business_Model_Canvas.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      captureArea.classList.remove('capture'); // Restore original state
    });
  };

  return (
    <div className="container">
      <div id="capture-area" className="capture-area">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="canvas-title">Business Model Canvas</h1>
<p style={{textAlign:'center'}}>Please Click on a Title to Add Your Response</p>
        <div className="canvas-sections">
          {Object.keys(sections).map((section) => (
            <div key={section} className="box">
              <h2 className="title" onClick={() => setEditingSection(section)}>
                {section}
              </h2>
              <ul className="list">
                {sections[section].map((item, index) => (
                  <li key={index} className="item">
                    <span className="text">{item}</span>
                    <FaTrash
                      className="remove"
                      onClick={() => handleRemoveItem(section, index)}
                    />
                    <FaEdit
                      className="edit"
                      onClick={() => handleEditItem(section, index, item)}
                    />
                  </li>
                ))}
              </ul>

              {editingSection === section && editingIndex !== null && (
                <div className="edit-container">
                  <input
                    type="text"
                    className="input"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveEdit();
                      }
                    }}
                  />
                  
                </div>
              )}

              {editingSection === section && editingIndex === null && (
                <input
                  type="text"
                  className="input"
                  placeholder={`Add ${section}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem(section, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSaveAsImage} className="save-button">
        Save as Image
      </button>
    </div>
  );
};

export default App;
