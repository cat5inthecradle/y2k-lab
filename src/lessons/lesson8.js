const lesson8 = {
  title: "The Fix That Broke the Satellites",
  slug: "broken-fix",
  origin: "US spy satellites / Fort Belvoir, VA — January 1, 2000",
  difficulty: "Hard",
  story:
    "A Y2K remediation patch — designed to fix the millennium bug — itself crashed the ground imagery processing station at Fort Belvoir, Virginia. Communications with five reconnaissance satellites were garbled for about three days. The original code had a known Y2K issue, but the patch that was meant to fix it introduced a new bug that was even worse. The original code still mostly worked; the \"fix\" broke everything.",
  mission:
    "You've been given the satellite ground station code. A previous engineer already applied a Y2K patch (marked with '// Y2K FIX' comments) — but their fix introduced new bugs. Your job is NOT to start over. Read the original code, understand what the patch was trying to do, find where the patch went wrong, and fix the fix. The original Y2K bug AND the patch's new bugs both need to be resolved.",

  starterHtml: `<h3>🛰️ Fort Belvoir Ground Station — Imagery Processing</h3>
<p style="color:#666; margin-bottom: 4px;">KH-11 Satellite Downlink · Signal Decoder</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="output"></div>`,

  starterJs: `// FORT BELVOIR GROUND IMAGERY PROCESSING STATION
// Satellite Downlink Signal Processor
// Original code: 1994
// Y2K Patch applied: December 28, 1999 (3 days before rollover)
//
// ⚠ THE PATCH INTRODUCED NEW BUGS. FIX THE FIX. ⚠

// --- Timestamp Decoder ---
// Satellite transmissions include a timestamp as:
//   YYDDDHHMMSS (2-digit year, 3-digit day-of-year, hours, min, sec)
// Example: "99365235959" = Dec 31, 1999 at 23:59:59
//          "00001000000" = Jan 1, 2000 at 00:00:00

function parseTimestamp(raw) {
  var yy    = parseInt(raw.substring(0, 2));
  var ddd   = parseInt(raw.substring(2, 5));
  var hh    = parseInt(raw.substring(5, 7));
  var mm    = parseInt(raw.substring(7, 9));
  var ss    = parseInt(raw.substring(9, 11));

  // Y2K FIX (applied Dec 28, 1999):
  // Original code was: var fullYear = 1900 + yy;
  // Patch converts 2-digit year to 4-digit year
  var fullYear;
  if (yy < 50) {
    fullYear = 200 + yy;  // BUG: should be 2000, not 200!
  } else {
    fullYear = 1900 + yy;
  }

  return {
    year: fullYear,
    dayOfYear: ddd,
    hours: hh,
    minutes: mm,
    seconds: ss
  };
}

// --- Signal Validator ---
// Checks if a decoded satellite signal is valid.
// Timestamps should be within ±1 day of ground station time.

function validateSignal(parsed, groundYear, groundDay) {
  // Y2K FIX (applied Dec 28, 1999):
  // Added year validation for 4-digit years.
  // Original code didn't check year at all.
  if (parsed.year > groundYear + 1 || parsed.year < groundYear - 1) {
    return { valid: false, reason: "Year out of range" };
  }

  // Check day-of-year is reasonable (within 1 day of ground time)
  // Y2K FIX: Changed > to >= for stricter validation
  // Original was: if (diff > 1)
  var diff = Math.abs(parsed.dayOfYear - groundDay);

  // BUG: The fix changed > to >= which now REJECTS same-day signals!
  if (diff >= 1) {
    // But also forgot to handle year boundary (day 365 → day 1)
    return { valid: false, reason: "Timestamp out of range (day " + parsed.dayOfYear + " vs ground day " + groundDay + ")" };
  }

  return { valid: true, reason: "Signal OK" };
}

// --- Signal Decoder ---
// Converts raw satellite data into an image fragment.

function decodePayload(signalData) {
  // Y2K FIX: Added date prefix to decoded data for logging
  // Original was: return "IMG:" + signalData
  var parsed = parseTimestamp(signalData.substring(0, 11));
  var payload = signalData.substring(11);

  // BUG: used / instead of - as separator, which conflicts
  // with the payload format that uses / as a delimiter
  var prefix = parsed.year + "/" + parsed.dayOfYear + "/";
  return prefix + "IMG:" + payload;
}

// ──────────────────────────────────────────────
// TEST HARNESS
// You shouldn't need to edit below this line.
// ──────────────────────────────────────────────

var GROUND_YEAR = 2000;
var GROUND_DAY = 1;  // January 1

var tests = [
  { name: "Signal A — Jan 1, 2000 00:00:00",
    raw: "00001000000RECON/SECTOR7/CLEAR",
    expectYear: 2000, expectValid: true,
    expectDecoded: "2000-1-IMG:RECON/SECTOR7/CLEAR" },
  { name: "Signal B — Jan 1, 2000 12:30:00",
    raw: "00001123000RECON/SECTOR3/CLOUD",
    expectYear: 2000, expectValid: true,
    expectDecoded: "2000-1-IMG:RECON/SECTOR3/CLOUD" },
  { name: "Signal C — Dec 31, 1999 23:59:59",
    raw: "99365235959RECON/SECTOR1/CLEAR",
    expectYear: 1999, expectValid: true,
    expectDecoded: "1999-365-IMG:RECON/SECTOR1/CLEAR" },
  { name: "Signal D — Jan 2, 2000 06:15:00",
    raw: "00002061500RECON/SECTOR9/PARTIAL",
    expectYear: 2000, expectValid: true,
    expectDecoded: "2000-2-IMG:RECON/SECTOR9/PARTIAL" },
  { name: "Signal E — Bogus (year 2055)",
    raw: "55100120000TEST/INVALID",
    expectYear: 2055, expectValid: false,
    expectDecoded: "2055-100-IMG:TEST/INVALID" },
];

var output = document.getElementById("output");
var allCorrect = true;

for (var i = 0; i < tests.length; i++) {
  (function(t) {
    var parsed = parseTimestamp(t.raw.substring(0, 11));
    var validated = validateSignal(parsed, GROUND_YEAR, GROUND_DAY);
    var decoded = decodePayload(t.raw);

    var yearOk = (parsed.year === t.expectYear);
    var validOk = (validated.valid === t.expectValid);
    var decodeOk = (decoded === t.expectDecoded);
    var pass = yearOk && validOk && decodeOk;
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:10px 14px;margin:8px 0;border-radius:6px;background:#111;";

    // Signal name
    var nameEl = document.createElement("div");
    nameEl.style.cssText = "font-size:13px;font-weight:bold;color:#00ccff;margin-bottom:6px;";
    nameEl.textContent = (pass ? "✅ " : "❌ ") + t.name;
    row.appendChild(nameEl);

    // Detail rows
    var details = [
      { label: "Parse year", got: parsed.year, expect: t.expectYear, ok: yearOk },
      { label: "Validation", got: validated.valid + " (" + validated.reason + ")", expect: t.expectValid, ok: validOk },
      { label: "Decoded", got: decoded, expect: t.expectDecoded, ok: decodeOk },
    ];

    for (var j = 0; j < details.length; j++) {
      var d = details[j];
      var line = document.createElement("div");
      line.style.cssText = "font-family:monospace;font-size:11px;margin-left:20px;line-height:1.7;color:" + (d.ok ? "#666" : "#ff8800") + ";";
      line.textContent = (d.ok ? "✓" : "✗") + " " + d.label + ": " + d.got;
      if (!d.ok) {
        line.textContent += "  (expected: " + d.expect + ")";
      }
      row.appendChild(line);
    }

    output.appendChild(row);
  })(tests[i]);
}

var summary = document.createElement("div");
summary.style.cssText = "margin-top:14px;font-size:13px;font-family:monospace;color:" + (allCorrect ? "#00ff41" : "#ff4444") + ";";
summary.textContent = allCorrect ? "🎉 ALL SIGNALS PROCESSING! Ground station restored!" : "❌ Signals still failing. Find and fix the bugs in the Y2K patch!";
output.appendChild(summary);`,

  hints: [
    "There are THREE bugs, all introduced by the Y2K patch (look for '// Y2K FIX' comments). Run the code and look at which checks fail for each signal. Start with Signal A: the year parses as 200 instead of 2000 — find that typo first.",
    "Bug #1: In parseTimestamp, the patch wrote 200 + yy instead of 2000 + yy (missing a zero). Bug #2: In validateSignal, the patch changed 'diff > 1' to 'diff >= 1', which rejects signals from the same day. It should allow diff of 0 (same day) and 1 (adjacent day). Also, the year-boundary case (day 365 to day 1) needs handling. Bug #3: In decodePayload, the patch used '/' as a separator, which conflicts with the payload format. Use '-' instead.",
    "Fix #1: Change 200 + yy to 2000 + yy. Fix #2: Change 'diff >= 1' back to 'diff > 1'. Add a year-boundary check: if groundDay <= 2 and parsed.dayOfYear >= 364, treat it as a 1-day difference (or vice versa). Fix #3: Change the '/' separators in the prefix to '-' so they don't collide with payload delimiters.",
  ],
};

export default lesson8;
