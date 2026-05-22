import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

function highlightName(text, fullName) {
  if (!fullName) return text;
  const idx = text.indexOf(fullName);
  if (idx === -1) return text;
  return (
    <>
      {text.substring(0, idx)}
      <strong className="character-name">{fullName}</strong>
      {text.substring(idx + fullName.length)}
    </>
  );
}

export default function LessonShell({ lesson }) {
  const [htmlCode, setHtmlCode] = useState(lesson.starterHtml);
  const [jsCode, setJsCode] = useState(lesson.starterJs);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    setHtmlCode(lesson.starterHtml);
    setJsCode(lesson.starterJs);
    setShowHint(false);
    setHintIndex(0);
    setConfirmReset(false);
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
          <span className="briefing-label">CASE BRIEFING</span>
        </div>
        <div className="briefing-body">
          <p className="briefing-origin">{lesson.origin}</p>
          <p className="briefing-story">{highlightName(lesson.story, lesson.character)}</p>
          <div className="briefing-mission">
            <strong>YOUR MISSION:</strong> {highlightName(lesson.mission, lesson.character)}
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
          {confirmReset ? "↺ Are you sure?" : "↺ Reset Code"}
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
