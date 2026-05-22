import { useState, useRef, useEffect, useCallback } from "react";

export default function CodeEditor({ htmlCode, jsCode, onHtmlChange, onJsChange }) {
  const [activeTab, setActiveTab] = useState("html");

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + "  " + value.substring(end);

      if (activeTab === "html") {
        onHtmlChange(newValue);
      } else {
        onJsChange(newValue);
      }

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-tabs">
        <button
          className={`editor-tab ${activeTab === "html" ? "active" : ""}`}
          onClick={() => setActiveTab("html")}
        >
          HTML
        </button>
        <button
          className={`editor-tab ${activeTab === "js" ? "active" : ""}`}
          onClick={() => setActiveTab("js")}
        >
          JavaScript
        </button>
      </div>
      <div className="editor-body">
        {activeTab === "html" ? (
          <textarea
            className="code-textarea"
            value={htmlCode}
            onChange={(e) => onHtmlChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        ) : (
          <textarea
            className="code-textarea"
            value={jsCode}
            onChange={(e) => onJsChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}
