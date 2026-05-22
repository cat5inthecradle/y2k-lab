const lesson4 = {
  title: '"January 1, 19100"',
  slug: "nineteen-hundred",
  origin: "US Naval Observatory website — January 1, 2000",
  difficulty: "Easy",
  story:
    "For about 45 minutes on January 1, 2000, the US Naval Observatory — the nation's official timekeeper — displayed the date on their website as \"January 1, 19100.\" The code used JavaScript's old getYear() function, which returns years since 1900 (so 2000 returns 100). A developer had written the display as \"19\" + getYear() — string concatenation that worked fine when getYear() returned 98 or 99, but produced \"19100\" when it returned 100.",
  mission:
    "The Naval Observatory's website builds the display year by concatenating the string \"19\" with a year offset. When the offset was 99, \"19\" + 99 looked like \"1999\" — but it was string concatenation, not math. Now the offset is 100, and \"19\" + 100 gives \"19100\". Fix the formatYear() function so it displays the correct year. This is one of the most common JavaScript gotchas: string + number = string!",

  starterHtml: `<div style="text-align:center;padding:10px 0;">
  <div style="font-size:11px;letter-spacing:3px;color:#ffaa00;margin-bottom:2px;">★ UNITED STATES NAVAL OBSERVATORY ★</div>
  <div style="font-size:9px;color:#666;margin-bottom:12px;">Master Clock — Official Source of Time for the Department of Defense</div>
  <div style="border:1px solid #333;border-radius:6px;padding:16px;background:#0d0d0d;display:inline-block;min-width:300px;">
    <div id="clock" style="font-size:28px;color:#00ff41;font-weight:bold;letter-spacing:1px;margin-bottom:4px;"></div>
    <div id="date-display" style="font-size:16px;color:#00ccff;"></div>
  </div>
  <div style="font-size:9px;color:#444;margin-top:10px;">http://tycho.usno.navy.mil</div>
</div>
<hr style="border-color:#222;margin:14px 0;">
<div id="output"></div>`,

  starterJs: `// US NAVAL OBSERVATORY — MASTER CLOCK WEB DISPLAY
// tycho.usno.navy.mil
// Last updated: August 1997
//
// JavaScript's getYear() returns the number of years since 1900:
//   1998 → 98,  1999 → 99,  2000 → 100,  2001 → 101
//
// We simulate this below.

function getYear(fullYear) {
  // Simulates the old JavaScript getYear() method
  return fullYear - 1900;
}

function formatYear(fullYear) {
  var offset = getYear(fullYear);
  // BUG: This concatenates the STRING "19" with a NUMBER.
  // "19" + 99  → "1999"  (looked correct by accident!)
  // "19" + 100 → "19100" (oops!)
  var displayYear = "19" + offset;
  return displayYear;
}

// --- Render the clock display ---

var monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function displayDate(month, day, fullYear) {
  return monthNames[month - 1] + " " + day + ", " + formatYear(fullYear);
}

// Show the "live" clock for January 1, 2000 at midnight
var clockEl = document.getElementById("clock");
var dateEl = document.getElementById("date-display");

clockEl.textContent = "00:00:00 UTC";
dateEl.textContent = displayDate(1, 1, 2000);

// ──────────────────────────────────────────────
// TEST HARNESS
// You shouldn't need to edit below this line.
// ──────────────────────────────────────────────

var tests = [
  { m: 1,  d: 1,  y: 2000, expect: "January 1, 2000" },
  { m: 12, d: 31, y: 1999, expect: "December 31, 1999" },
  { m: 7,  d: 4,  y: 2000, expect: "July 4, 2000" },
  { m: 3,  d: 15, y: 2001, expect: "March 15, 2001" },
];

var output = document.getElementById("output");
var allCorrect = true;

for (var i = 0; i < tests.length; i++) {
  (function(t) {
    var result = displayDate(t.m, t.d, t.y);
    var pass = (result === t.expect);
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:8px 12px;margin:6px 0;border-radius:4px;background:#111;display:flex;align-items:center;gap:10px;font-family:monospace;font-size:13px;";

    var status = document.createElement("span");
    status.textContent = pass ? "✅" : "❌";

    var text = document.createElement("span");
    text.style.cssText = "color:" + (pass ? "#00ff41" : "#ff8800") + ";flex:1;";
    text.textContent = result;

    row.appendChild(status);
    row.appendChild(text);

    if (!pass) {
      var exp = document.createElement("span");
      exp.style.cssText = "color:#666;font-size:11px;";
      exp.textContent = "expected: " + t.expect;
      row.appendChild(exp);
    }

    output.appendChild(row);
  })(tests[i]);
}

var summary = document.createElement("div");
summary.style.cssText = "margin-top:12px;font-size:13px;font-family:monospace;color:" + (allCorrect ? "#00ff41" : "#ff4444") + ";";
summary.textContent = allCorrect ? "🎉 ALL DATES CORRECT! Bug fixed!" : "❌ Some dates are wrong. Fix the formatYear() function!";
output.appendChild(summary);`,

  hints: [
    "Look at formatYear(): it does \"19\" + offset. In JavaScript, when you add a string and a number, the number gets converted to a string and they get glued together. \"19\" + 100 is the string \"19100\", not the number 2000.",
    "You have two options: make it do real math instead of concatenation (1900 + offset gives the number 2000), or skip getYear() entirely and just use the fullYear parameter that's already being passed in.",
    "Simplest fix: change formatYear to just return fullYear directly — it's already the correct 4-digit year! Or if you want to keep using getYear(), change \"19\" + offset to (1900 + offset) so JavaScript does numeric addition instead of string concatenation.",
  ],
};

export default lesson4;
