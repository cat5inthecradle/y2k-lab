const lesson6 = {
  title: "Slot Machines Go Dark",
  slug: "slot-machines",
  character: "Bo Lean",
  origin: "Delaware race tracks — December 31, 1999",
  difficulty: "Medium",
  story:
    "Bo Lean is a compliance officer for the Delaware Gaming Commission. He is not a programmer. He is, however, the only person from the commission on-site at Dover Downs on New Year's Eve when 800 slot machines simultaneously shut themselves off. The track manager is panicking. The vendor's emergency line has a two-hour hold time. Bo has the firmware source code on a CD-ROM that came with the machines and a growing sense that his New Year's plans are cancelled.",
  mission:
    "Bo has found the boot check code. The slot machine's daily startup sequence verifies the gaming license will still be valid 3 days from now. It converts 2-digit years to full years by adding 1900. Fix dateFromTwoDigitYear() so that look-ahead dates crossing into the year 2000 resolve correctly.",

  starterHtml: `<h3>🎰 Delaware Gaming Commission — License Validator</h3>
<p style="color:#666; margin-bottom: 4px;">Slot Machine Boot Sequence · Daily Diagnostic</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="output"></div>`,

  starterJs: `// DELAWARE GAMING COMMISSION — SLOT MACHINE LICENSE VALIDATOR
// Model: WMS Gaming Series 9000
// Firmware updated: April 1997
//
// Each machine checks on boot: "Will my license still be
// valid 3 days from now?" If not, the machine shuts down
// to comply with gaming regulations.

// License info
var LICENSE_START = { m: 6, d: 1, y: 1995 };   // June 1, 1995
var LICENSE_END   = { m: 12, d: 31, y: 2002 };  // Dec 31, 2002

function dateFromTwoDigitYear(month, day, twoDigitYear) {
  // Convert stored 2-digit year to full year
  var fullYear = 1900 + twoDigitYear;
  return { m: month, d: day, y: fullYear };
}

function addDays(month, day, twoDigitYear, numDays) {
  // Rough day-addition using 2-digit year dates
  var daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var d = day;
  var m = month;
  var y = twoDigitYear;

  for (var i = 0; i < numDays; i++) {
    d++;
    if (d > daysInMonths[m]) {
      d = 1;
      m++;
      if (m > 12) {
        m = 1;
        y = (y + 1) % 100;  // wraps: 99 → 0
      }
    }
  }
  return dateFromTwoDigitYear(m, d, y);
}

function isDateInRange(date, start, end) {
  // Compare as total days (rough approximation)
  var toNum = function(dt) { return dt.y * 10000 + dt.m * 100 + dt.d; };
  var n = toNum(date);
  return n >= toNum(start) && n <= toNum(end);
}

function bootCheck(currentMonth, currentDay, currentYear2) {
  var today = dateFromTwoDigitYear(currentMonth, currentDay, currentYear2);
  var lookAhead = addDays(currentMonth, currentDay, currentYear2, 3);

  var todayValid = isDateInRange(today, LICENSE_START, LICENSE_END);
  var futureValid = isDateInRange(lookAhead, LICENSE_START, LICENSE_END);

  return {
    today: today,
    lookAhead: lookAhead,
    todayValid: todayValid,
    futureValid: futureValid,
    machineOn: todayValid && futureValid
  };
}

// ──────────────────────────────────────────────
// TEST HARNESS — do not edit below this line
// ──────────────────────────────────────────────

var tests = [
  { m: 12, d: 31, y: 99, label: "Dec 31, 1999 (New Year's Eve)",
    expectOn: true, expectLookAhead: "1/3/2000" },
  { m: 12, d: 29, y: 99, label: "Dec 29, 1999",
    expectOn: true, expectLookAhead: "1/1/2000" },
  { m: 11, d: 15, y: 99, label: "Nov 15, 1999",
    expectOn: true, expectLookAhead: "11/18/1999" },
  { m: 6,  d: 10, y: 0,  label: "Jun 10, 2000",
    expectOn: true, expectLookAhead: "6/13/2000" },
  { m: 1,  d: 5,  y: 3,  label: "Jan 5, 2003 (license expired)",
    expectOn: false, expectLookAhead: "1/8/2003" },
];

var output = document.getElementById("output");
var allCorrect = true;

for (var i = 0; i < tests.length; i++) {
  (function(t) {
    var result = bootCheck(t.m, t.d, t.y);
    var laStr = result.lookAhead.m + "/" + result.lookAhead.d + "/" + result.lookAhead.y;
    var pass = (result.machineOn === t.expectOn) && (laStr === t.expectLookAhead);
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:12px 14px;margin:8px 0;border-radius:6px;background:#111;";

    // Machine status header
    var header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;gap:10px;margin-bottom:8px;";

    var indicator = document.createElement("span");
    indicator.style.cssText = "display:inline-block;width:12px;height:12px;border-radius:50%;background:" + (result.machineOn ? "#00ff41" : "#ff4444") + ";box-shadow:0 0 6px " + (result.machineOn ? "#00ff41" : "#ff4444") + ";";

    var label = document.createElement("span");
    label.style.cssText = "font-size:14px;font-weight:bold;color:#00ccff;flex:1;";
    label.textContent = t.label;

    var statusBadge = document.createElement("span");
    statusBadge.style.cssText = "font-family:monospace;font-size:11px;padding:2px 8px;border-radius:3px;font-weight:bold;";
    if (result.machineOn) {
      statusBadge.style.cssText += "background:rgba(0,255,65,0.15);color:#00ff41;border:1px solid rgba(0,255,65,0.3);";
      statusBadge.textContent = "MACHINE ON";
    } else {
      statusBadge.style.cssText += "background:rgba(255,68,68,0.15);color:#ff4444;border:1px solid rgba(255,68,68,0.3);";
      statusBadge.textContent = "SHUT DOWN";
    }

    header.appendChild(indicator);
    header.appendChild(label);
    header.appendChild(statusBadge);
    row.appendChild(header);

    // Details
    var details = document.createElement("div");
    details.style.cssText = "font-family:monospace;font-size:11px;color:#888;margin-left:22px;line-height:1.8;";
    details.innerHTML =
      "Look-ahead date: <span style='color:" + (pass ? "#aaa" : "#ff8800") + "'>" + laStr + "</span>" +
      (laStr !== t.expectLookAhead ? " <span style='color:#666'>(expected " + t.expectLookAhead + ")</span>" : "") +
      "<br>License valid today: " + result.todayValid +
      " · Valid in 3 days: " + result.futureValid;
    row.appendChild(details);

    // Pass/fail
    var passEl = document.createElement("div");
    passEl.style.cssText = "margin-top:6px;margin-left:22px;font-size:12px;";
    passEl.textContent = pass ? "✅ Correct" : "❌ Expected machine to be " + (t.expectOn ? "ON" : "OFF");
    row.appendChild(passEl);

    output.appendChild(row);
  })(tests[i]);
}

var summary = document.createElement("div");
summary.style.cssText = "margin-top:14px;font-size:13px;font-family:monospace;color:" + (allCorrect ? "#00ff41" : "#ff4444") + ";";
summary.textContent = allCorrect ? "All machines operational. Bo calls his wife to say he'll be home soon." : "FAIL: machines shutting down. See dateFromTwoDigitYear().";
output.appendChild(summary);`,

  hints: [
    "Bo looks at the Dec 31, 1999 test: the look-ahead date shows as 1/3/1900 instead of 1/3/2000. When the year wraps from 99 to 0 (via the % 100 in addDays), dateFromTwoDigitYear converts 0 to 1900 + 0 = 1900. The machine sees 1900 is before the license started (1995) and shuts down.",
    "The fix is in dateFromTwoDigitYear(). Right now it always adds 1900. You need a windowing approach: small 2-digit years (like 0, 1, 2) should map to the 2000s, while larger ones (like 95, 99) should map to the 1900s.",
    "In dateFromTwoDigitYear: if twoDigitYear is less than 30, add 2000 instead of 1900. This makes 0 → 2000, 3 → 2003, 99 → 1999. The last test (Jan 5, 2003) should still correctly show the machine as OFF because 2003 is past the license end date.",
  ],
};

export default lesson6;
