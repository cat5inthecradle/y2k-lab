import { Link } from "react-router-dom";
import scenarios from "../data/scenarios";

const difficultyColor = {
  Easy: "#5aaa5a",
  "Easy–Medium": "#7aaa50",
  Medium: "#d4a843",
  "Medium–Hard": "#c87840",
  Hard: "#c85050",
};

export default function Index() {
  return (
    <div className="index-page">
      <header className="index-header">
        <h1>
          <span className="title-y2k">Y2K</span> Bug Lab
        </h1>
        <p className="index-subtitle">
          December 31, 1999. The same bug is about to surface in thousands of
          systems worldwide. There is no elite task force — only the people
          already in the building. They stayed late, they read the code, and
          they fixed it. Step into their shoes.
        </p>
      </header>

      <div className="scenario-grid">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className={`scenario-card ${!s.available ? "locked" : ""}`}
          >
            <div className="card-number">
              {String(s.id).padStart(2, "0")}
            </div>
            <h2 className="card-title">{s.title}</h2>
            <p className="card-origin">{s.origin}</p>
            <p className="card-pattern">{s.pattern}</p>
            <div className="card-footer">
              <span
                className="card-difficulty"
                style={{ color: difficultyColor[s.difficulty] || "#aaa" }}
              >
                {s.difficulty}
              </span>
              {s.available ? (
                <Link to={`/lesson/${s.slug}`} className="card-link">
                  Start →
                </Link>
              ) : (
                <span className="card-locked">Coming Soon</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="index-footer">
        Designed and developed by Darin Webb, a programmer and IT guy born
        in the late 1900's.
      </footer>
    </div>
  );
}
