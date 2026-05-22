import { useEffect, useRef, useState } from "react";

export default function Preview({ htmlCode, jsCode }) {
  const iframeRef = useRef(null);
  const [key, setKey] = useState(0);

  const srcdoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Courier New', monospace;
    background: #0a0a0a;
    color: #00ff41;
    padding: 20px;
    font-size: 14px;
    line-height: 1.6;
  }
  .output { white-space: pre-wrap; }
  .error { color: #ff4444; }
  .success { color: #00ff41; }
  .warn { color: #ffaa00; }
  h3 { color: #00ccff; margin-bottom: 8px; }
  .record {
    border: 1px solid #333;
    padding: 8px 12px;
    margin: 6px 0;
    border-radius: 4px;
    background: #111;
  }
  .record.error-record { border-color: #ff4444; }
  .record.success-record { border-color: #00ff41; }
</style>
</head>
<body>
${htmlCode}
<script>
// Capture console output into the page
(function() {
  const output = document.getElementById('output');
  if (!output) return;

  const origLog = console.log;
  const origError = console.error;

  console.log = function(...args) {
    origLog.apply(console, args);
    const div = document.createElement('div');
    div.textContent = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    output.appendChild(div);
  };

  console.error = function(...args) {
    origError.apply(console, args);
    const div = document.createElement('div');
    div.className = 'error';
    div.textContent = '❌ ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
    output.appendChild(div);
  };
})();

try {
${jsCode}
} catch(e) {
  const output = document.getElementById('output');
  if (output) {
    const div = document.createElement('div');
    div.className = 'error';
    div.textContent = '❌ Error: ' + e.message;
    output.appendChild(div);
  }
}
</script>
</body>
</html>`;

  useEffect(() => {
    setKey((k) => k + 1);
  }, [htmlCode, jsCode]);

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <span className="preview-icon">🖥️</span>
        <span className="preview-title">Output</span>
        <button className="rerun-btn" onClick={() => setKey((k) => k + 1)}>
          ▶ Re-run
        </button>
      </div>
      <iframe
        key={key}
        ref={iframeRef}
        className="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcdoc}
        title="Preview"
      />
    </div>
  );
}
