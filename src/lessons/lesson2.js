const lesson2 = {
  title: '"Twenty O\'Clock"',
  slug: "twenty-oclock",
  character: "Polly Parsons",
  origin: "Federal courthouse, Grand Rapids, MI — January 1, 2000",
  difficulty: "Easy–Medium",
  story:
    "Polly Parsons is the building systems technician at the Gerald R. Ford Federal Courthouse. She maintains the HVAC, the elevators, and — because she once fixed a printer — the public announcement system. When she walked into work on Monday, January 3rd, she heard something strange over the building PA: \"Three O'Clock PM, January Third, Twenty O'Clock.\" Apparently it's been doing this all weekend. The chief judge is not happy. Polly has the source code on a 3.5\" floppy labeled \"ANNOUNCE SYS — DO NOT LOSE\" in someone else's handwriting.",
  mission:
    "Polly has narrowed it down: the numberToWords() function maps 0 to \"O'Clock\" — correct for reading \"3:00\" as \"Three O'Clock,\" wrong for the year 2000. Fix the code so times still say \"O'Clock\" but years are spoken correctly. Years in the 2000s should sound natural: \"Two Thousand,\" \"Two Thousand One,\" etc. Press ▶ to hear what the system currently produces.",

  starterHtml: `<h3>📢 Public Announcement System v2.1</h3>
<p style="color:#666; margin-bottom: 4px;">Audio Transcript Log</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="records"></div>
<div id="result" style="margin-top: 16px;"></div>`,

  starterJs: `// PUBLIC ANNOUNCEMENT SYSTEM v2.1
// Installed in government buildings, airports, train stations
// Last updated: June 1994
//
// Reads the current date and time aloud over speakers.

// --- Number-to-words helper ---

var ones = [
  "", "One", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine"
];
var teens = [
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
  "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
];
var tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty",
  "Sixty", "Seventy", "Eighty", "Ninety"
];

function numberToWords(n) {
  // 0 → "O'Clock" (for minutes: "3:00" becomes "Three O'Clock")
  if (n === 0) return "O'Clock";
  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  var t = tens[Math.floor(n / 10)];
  var o = ones[n % 10];
  return o ? t + " " + o : t;
}

// --- Time formatting ---

function speakTime(hours, minutes, ampm) {
  var h = numberToWords(hours);
  var m = numberToWords(minutes);
  return h + " " + m + " " + ampm;
}

// --- Date formatting ---

var monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var ordinals = [
  "", "First", "Second", "Third", "Fourth", "Fifth",
  "Sixth", "Seventh", "Eighth", "Ninth", "Tenth",
  "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth",
  "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth", "Twentieth",
  "Twenty First", "Twenty Second", "Twenty Third", "Twenty Fourth",
  "Twenty Fifth", "Twenty Sixth", "Twenty Seventh", "Twenty Eighth",
  "Twenty Ninth", "Thirtieth", "Thirty First"
];

function speakYear(year) {
  var high = Math.floor(year / 100);
  var low = year % 100;
  return numberToWords(high) + " " + numberToWords(low);
}

function speakDate(month, day, year) {
  return monthNames[month] + " " + ordinals[day] + ", " + speakYear(year);
}

function announce(hours, minutes, ampm, month, day, year) {
  return speakTime(hours, minutes, ampm) + " ... " + speakDate(month, day, year);
}

// ──────────────────────────────────────────────
// TEST HARNESS — do not edit below this line
// ──────────────────────────────────────────────

var tests = [
  { h: 3,  m: 0,  ap: "PM", mo: 1,  d: 1,  y: 2000,
    label: "3:00 PM  ·  1/1/2000",
    expect: "Three O'Clock PM ... January First, Two Thousand" },
  { h: 8,  m: 0,  ap: "AM", mo: 3,  d: 1,  y: 1999,
    label: "8:00 AM  ·  3/1/1999",
    expect: "Eight O'Clock AM ... March First, Nineteen Ninety Nine" },
  { h: 11, m: 15, ap: "AM", mo: 12, d: 25, y: 2001,
    label: "11:15 AM  ·  12/25/2001",
    expect: "Eleven Fifteen AM ... December Twenty Fifth, Two Thousand One" },
  { h: 12, m: 30, ap: "PM", mo: 6,  d: 15, y: 2010,
    label: "12:30 PM  ·  6/15/2010",
    expect: "Twelve Thirty PM ... June Fifteenth, Twenty Ten" },
];

var container = document.getElementById("records");
var allCorrect = true;

for (var i = 0; i < tests.length; i++) {
  (function(t, index) {
    var result = announce(t.h, t.m, t.ap, t.mo, t.d, t.y);
    var pass = (result === t.expect);
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.className = "record";
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#333") + ";padding:10px 14px;margin:8px 0;border-radius:6px;background:#111;";

    // Top row: date label + buttons
    var top = document.createElement("div");
    top.style.cssText = "display:flex;align-items:center;gap:10px;";

    var label = document.createElement("span");
    label.style.cssText = "flex:1;font-size:15px;color:#00ccff;font-weight:bold;letter-spacing:0.5px;";
    label.textContent = t.label;

    var playBtn = document.createElement("button");
    playBtn.textContent = "▶ Play";
    playBtn.style.cssText = "font-family:monospace;font-size:12px;padding:4px 12px;background:rgba(0,204,255,0.15);color:#00ccff;border:1px solid rgba(0,204,255,0.4);border-radius:4px;cursor:pointer;";
    playBtn.onclick = function() {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(result);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    };

    var textBtn = document.createElement("button");
    textBtn.textContent = "📝 Transcript";
    textBtn.style.cssText = "font-family:monospace;font-size:12px;padding:4px 12px;background:rgba(255,170,0,0.12);color:#ffaa00;border:1px solid rgba(255,170,0,0.35);border-radius:4px;cursor:pointer;";

    top.appendChild(label);
    top.appendChild(playBtn);
    top.appendChild(textBtn);
    row.appendChild(top);

    // Transcript area (hidden by default)
    var transcript = document.createElement("div");
    transcript.style.cssText = "display:none;margin-top:10px;padding-top:10px;border-top:1px solid #222;";

    var spoken = document.createElement("div");
    spoken.style.cssText = "font-size:13px;color:" + (pass ? "#00ff41" : "#ff8800") + ";margin-bottom:4px;";
    spoken.textContent = (pass ? "✅ " : "❌ ") + '"' + result + '"';
    transcript.appendChild(spoken);

    if (!pass) {
      var expected = document.createElement("div");
      expected.style.cssText = "font-size:12px;color:#666;";
      expected.textContent = 'Expected: "' + t.expect + '"';
      transcript.appendChild(expected);
    }

    row.appendChild(transcript);

    var showing = false;
    textBtn.onclick = function() {
      showing = !showing;
      transcript.style.display = showing ? "block" : "none";
      textBtn.textContent = showing ? "📝 Hide" : "📝 Transcript";
    };

    container.appendChild(row);
  })(tests[i], i);
}

// Summary
var resultDiv = document.getElementById("result");
if (allCorrect) {
  resultDiv.style.cssText = "color:#00ff41;font-size:14px;";
  resultDiv.textContent = "All announcements verified. Polly labels the floppy disk.";
} else {
  resultDiv.style.cssText = "color:#ff4444;font-size:14px;";
  resultDiv.textContent = "FAIL: announcements incorrect. See speakYear().";
}`,

  hints: [
    "Polly clicks ▶ Play on each test. 1999 and 2010 sound fine, but 2000 says \"Twenty O'Clock\" and 2001 says \"Twenty One.\" The bug only affects 2000–2009. She traces speakYear(2000): it splits into 20 and 00, then calls numberToWords(0), which returns \"O'Clock.\"",
    "You might be tempted to fix numberToWords so 0 returns \"Hundred\" instead of \"O'Clock.\" That gives \"Twenty Hundred\" — but nobody says that! And 2001 would still be \"Twenty One\" instead of \"Two Thousand One.\" The real fix belongs in speakYear(), not numberToWords. Think about how we actually say years: 2000–2009 use \"Two Thousand\" but 2010+ use \"Twenty.\"",
    "In speakYear(), check if the century part (high) is 20 AND the remainder (low) is less than 10. If so: when low is 0, return \"Two Thousand\". Otherwise return \"Two Thousand \" + numberToWords(low). For everything else (1999, 2010, 2025…), keep the existing split logic.",
  ],
};

export default lesson2;
