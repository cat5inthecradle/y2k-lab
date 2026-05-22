import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

export default function LessonShell({ lesson }) {
  const [htmlCode, setHtmlCode] = useState(lesson.starterHtml);
  const [jsCode, setJsCode] = useState(lesson.starterJs);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleReset = () => {
    setHtmlCode(lesson.starterHtml);
    setJsCode(lesson.starterJs);
    setShowHint(false);
    setHintIndex(0);
  };

  const nextHint = () => {
    if (!showHint) {
      setShowHint(true);
    } else if (hintIndex < lesson.hints.length - 1) {
      setHintIndex((i) => i + 1);
    }
  };

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <Link to="/" className="back-link">
          ← Back to Lab
        </Link>
        <div className="lesson-title-row">
          <h1>{lesson.title}</h1>
          <span className="difficulty-badge">{lesson.difficulty}</span>
        </div>
      </header>

      <div className="briefing">
        <div className="briefing-header">
          <span className="preview-icon">📋</span>
          <span className="briefing-label">INCIDENT REPORT</span>
        </div>
        <div className="briefing-body">
          <p className="briefing-origin">{lesson.origin}</p>
          <p className="briefing-story">{lesson.story}</p>
          <div className="briefing-mission">
            <strong>YOUR MISSION:</strong> {lesson.mission}
          </div>
        </div>
      </div>

      <div className="workspace">
        <CodeEditor
          htmlCode={htmlCode}
          jsCode={jsCode}
          onHtmlChange={setHtmlCode}
          onJsChange={setJsCode}
        />
        <Preview htmlCode={htmlCode} jsCode={jsCode} />
      </div>

      <div className="lesson-toolbar">
        <button className="toolbar-btn reset-btn" onClick={handleReset}>
          ↺ Reset Code
        </button>
        <button className="toolbar-btn hint-btn" onClick={nextHint}>
          💡 {showHint && hintIndex < lesson.hints.length - 1 ? "Next Hint" : showHint ? "No More Hints" : "Get a Hint"}
        </button>
      </div>

      {showHint && (
        <div className="hint-box">
          <div className="hint-label">HINT {hintIndex + 1} of {lesson.hints.length}</div>
          <p>{lesson.hints[hintIndex]}</p>
        </div>
      )}
    </div>
  );
}
