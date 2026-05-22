const lesson5 = {
  title: "The Leap Day That Didn't Exist",
  slug: "leap-day",
  origin: "Japanese weather bureau & seismographs — February 29, 2000",
  difficulty: "Medium",
  story:
    "On February 29, 2000, over 20 seismographs and 43 weather computers across Japan rejected the date as invalid or misread it as March 1. The year 2000 IS a leap year — but the systems used an incomplete rule. They checked: \"Is the year divisible by 4? If yes, it's a leap year — unless it's divisible by 100, then it's not.\" That rule correctly rejects 1900 as a non-leap year. But 2000 is divisible by 400, which makes it a leap year again. The systems missed that final exception.",
  mission:
    "The weather monitoring system's isLeapYear() function is missing the final rule of the leap year algorithm. The full rule is: a year is a leap year if it's divisible by 4, EXCEPT years divisible by 100 are NOT leap years, EXCEPT years divisible by 400 ARE leap years. Fix isLeapYear() so it handles all cases — including the year 2000.",

  starterHtml: `<h3>🌤️ Japan Meteorological Agency — Date Validation</h3>
<p style="color:#666; margin-bottom: 4px;">Seismograph Network · Sensor Calibration Log</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="output"></div>`,

  starterJs: `// JAPAN METEOROLOGICAL AGENCY — DATE VALIDATION MODULE
// Used by seismographs and weather stations nationwide
// Last updated: November 1993
//
// The leap year rule (as implemented):
//   1. Divisible by 4? → Leap year
//   2. Divisible by 100? → NOT a leap year
//
// But there's a third rule that's missing...

function isLeapYear(year) {
  if (year % 4 !== 0) {
    return false;   // Not divisible by 4 → not a leap year
  }
  if (year % 100 === 0) {
    return false;   // Divisible by 100 → not a leap year
    // BUG: This incorrectly rejects year 2000!
  }
  return true;      // Divisible by 4 (but not 100) → leap year
}

function daysInMonth(month, year) {
  var days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return days[month];
}

function isValidDate(month, day, year) {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(month, year)) return false;
  return true;
}

function formatDate(m, d, y) {
  var monthNames = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[m] + " " + d + ", " + y;
}

// ──────────────────────────────────────────────
// TEST HARNESS
// You shouldn't need to edit below this line.
// ──────────────────────────────────────────────

var tests = [
  { m: 2,  d: 29, y: 2000, expectValid: true,
    note: "2000 is divisible by 400 → LEAP YEAR" },
  { m: 2,  d: 29, y: 1996, expectValid: true,
    note: "1996 is divisible by 4 → leap year" },
  { m: 2,  d: 29, y: 1900, expectValid: false,
    note: "1900 is divisible by 100 but NOT 400 → not a leap year" },
  { m: 2,  d: 29, y: 1999, expectValid: false,
    note: "1999 is not divisible by 4 → not a leap year" },
  { m: 2,  d: 29, y: 2400, expectValid: true,
    note: "2400 is divisible by 400 → leap year" },
  { m: 2,  d: 29, y: 2100, expectValid: false,
    note: "2100 is divisible by 100 but NOT 400 → not a leap year" },
  { m: 3,  d: 1,  y: 2000, expectValid: true,
    note: "March 1 is always valid (sanity check)" },
];

var output = document.getElementById("output");
var allCorrect = true;

for (var i = 0; i < tests.length; i++) {
  (function(t) {
    var result = isValidDate(t.m, t.d, t.y);
    var leapResult = (t.m === 2 && t.d === 29) ? isLeapYear(t.y) : null;
    var pass = (result === t.expectValid);
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:10px 14px;margin:6px 0;border-radius:6px;background:#111;";

    // Date and status
    var top = document.createElement("div");
    top.style.cssText = "display:flex;align-items:center;gap:10px;font-family:monospace;";

    var status = document.createElement("span");
    status.style.cssText = "font-size:16px;";
    status.textContent = pass ? "✅" : "❌";

    var dateStr = document.createElement("span");
    dateStr.style.cssText = "font-size:14px;font-weight:bold;color:" + (pass ? "#00ff41" : "#ff8800") + ";flex:1;";
    dateStr.textContent = formatDate(t.m, t.d, t.y);

    var verdict = document.createElement("span");
    verdict.style.cssText = "font-size:12px;padding:2px 8px;border-radius:3px;";
    if (result) {
      verdict.style.cssText += "background:rgba(0,255,65,0.1);color:#00ff41;border:1px solid rgba(0,255,65,0.3);";
      verdict.textContent = "VALID";
    } else {
      verdict.style.cssText += "background:rgba(255,68,68,0.1);color:#ff4444;border:1px solid rgba(255,68,68,0.3);";
      verdict.textContent = "REJECTED";
    }

    top.appendChild(status);
    top.appendChild(dateStr);
    top.appendChild(verdict);
    row.appendChild(top);

    // Note
    var noteEl = document.createElement("div");
    noteEl.style.cssText = "font-size:11px;color:#666;margin-top:6px;margin-left:30px;";
    noteEl.textContent = t.note;
    if (!pass) {
      noteEl.textContent += " → should be " + (t.expectValid ? "VALID" : "REJECTED");
    }
    row.appendChild(noteEl);

    // Show leap year info for Feb 29 tests
    if (leapResult !== null) {
      var leapEl = document.createElement("div");
      leapEl.style.cssText = "font-size:11px;margin-top:3px;margin-left:30px;font-family:monospace;color:#00ccff;";
      leapEl.textContent = "isLeapYear(" + t.y + ") → " + leapResult;
      row.appendChild(leapEl);
    }

    output.appendChild(row);
  })(tests[i]);
}

var summary = document.createElement("div");
summary.style.cssText = "margin-top:14px;font-size:13px;font-family:monospace;color:" + (allCorrect ? "#00ff41" : "#ff4444") + ";";
summary.textContent = allCorrect ? "🎉 ALL DATES VALIDATED CORRECTLY! Bug fixed!" : "❌ Some dates are wrong. Fix the isLeapYear() function!";
output.appendChild(summary);`,

  hints: [
    "Look at the test results: 1996 (divisible by 4) is correctly accepted, and 1900 (divisible by 100) is correctly rejected. But 2000 is ALSO being rejected — it's divisible by 100, so it hits the second check and returns false. What's special about 2000 that's different from 1900?",
    "2000 is divisible by 400. The full leap year rule has THREE parts: (1) divisible by 4 → leap year, (2) BUT divisible by 100 → NOT a leap year, (3) BUT divisible by 400 → leap year again. The code is missing rule #3.",
    "Inside the (year % 100 === 0) check, add another check: if the year is ALSO divisible by 400, return true instead of false. The check for 400 needs to come before (or inside) the check for 100.",
  ],
};

export default lesson5;
