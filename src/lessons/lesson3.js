const lesson3 = {
  title: "The $91,000 Video Rental",
  slug: "video-rental",
  character: "Al Gorithm",
  origin: "Upstate New York video store — January 2000",
  difficulty: "Easy–Medium",
  story:
    "Al Gorithm is the assistant manager at MovieTime Video in Utica, New York. He got the title because he was the only applicant who knew how to reboot the register. A customer is now waving a receipt for $91,250 and Al is fairly certain that's more than the store grosses in a year. The franchise's tech support line goes to a recording that says they're \"aware of an issue.\" Al has the source code printout in the back office and about thirty minutes before this guy calls the local news.",
  mission:
    "Al has found the problem in daysBetween(). It uses two-digit years for date math. When a rental crosses from '99 to '00, the year drops from 99 to 0 and the day calculation goes negative. A previous developer added Math.abs() to \"fix\" this — turning huge negative numbers into huge positive ones. Fix daysBetween() so it handles rentals crossing the year 2000 boundary.",

  starterHtml: `<h3>📼 MovieTime Video — Late Fee Calculator</h3>
<p style="color:#666; margin-bottom: 4px;">Register Terminal #4</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="records"></div>
<div id="result" style="margin-top: 16px;"></div>`,

  starterJs: `// MOVIETIME VIDEO — LATE FEE SYSTEM v4.1
// "Be Kind, Rewind!"
// Last updated: February 1996
//
// Dates are stored with 2-digit years:
//   12/15/99 means December 15, 1999
//   1/3/00   means January 3, 2000

var DAILY_FEE = 2.50;

function daysBetween(m1, d1, y1, m2, d2, y2) {
  // Approximate day count using 2-digit years.
  // Uses 30-day months (close enough for late fees).
  var days1 = y1 * 365 + m1 * 30 + d1;
  var days2 = y2 * 365 + m2 * 30 + d2;
  var diff = days2 - days1;

  // NOTE: A previous developer added this in 1997 because
  // "sometimes the diff comes back negative, which is impossible."
  // It seemed to fix the problem at the time...
  return Math.abs(diff);
}

function calculateLateFee(dueM, dueD, dueY, retM, retD, retY) {
  var daysLate = daysBetween(dueM, dueD, dueY, retM, retD, retY);
  if (daysLate <= 0) return { days: 0, fee: 0.00 };
  var fee = daysLate * DAILY_FEE;
  return { days: daysLate, fee: fee };
}

// ──────────────────────────────────────────────
// TEST HARNESS — do not edit below this line
// ──────────────────────────────────────────────

var rentals = [
  { title: "The General's Daughter",
    dueM: 12, dueD: 15, dueY: 99,
    retM: 1,  retD: 3,  retY: 0,
    expectDays: 23, expectFee: 57.50 },
  { title: "Die Hard",
    dueM: 11, dueD: 1,  dueY: 99,
    retM: 11, retD: 3,  retY: 99,
    expectDays: 2, expectFee: 5.00 },
  { title: "The Matrix",
    dueM: 12, dueD: 28, dueY: 99,
    retM: 1,  retD: 5,  retY: 0,
    expectDays: 12, expectFee: 30.00 },
  { title: "Titanic",
    dueM: 8,  dueD: 15, dueY: 99,
    retM: 9,  retD: 1,  retY: 99,
    expectDays: 16, expectFee: 40.00 },
];

var container = document.getElementById("records");
var allCorrect = true;

for (var i = 0; i < rentals.length; i++) {
  (function(r) {
    var result = calculateLateFee(r.dueM, r.dueD, r.dueY, r.retM, r.retD, r.retY);
    var pass = (result.fee === r.expectFee);
    if (!pass) allCorrect = false;

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:12px 14px;margin:8px 0;border-radius:6px;background:#111;";

    // Movie title
    var title = document.createElement("div");
    title.style.cssText = "font-size:14px;color:#00ccff;font-weight:bold;margin-bottom:6px;";
    title.textContent = "📼 " + r.title;
    row.appendChild(title);

    // Date info
    var dates = document.createElement("div");
    dates.style.cssText = "font-size:12px;color:#888;margin-bottom:8px;font-family:monospace;";
    dates.textContent = "Due: " + r.dueM + "/" + r.dueD + "/" + String(r.dueY).padStart(2, "0") + "   Returned: " + r.retM + "/" + r.retD + "/" + String(r.retY).padStart(2, "0");
    row.appendChild(dates);

    // Fee display
    var feeRow = document.createElement("div");
    feeRow.style.cssText = "display:flex;align-items:baseline;gap:12px;";

    var daysEl = document.createElement("span");
    daysEl.style.cssText = "font-family:monospace;font-size:13px;color:#aaa;";
    daysEl.textContent = "Days late: " + result.days;

    var feeEl = document.createElement("span");
    var feeColor = pass ? "#00ff41" : "#ff4444";
    var feeSize = (result.fee > 500) ? "22px" : "16px";
    feeEl.style.cssText = "font-family:monospace;font-weight:bold;font-size:" + feeSize + ";color:" + feeColor + ";";
    feeEl.textContent = "$" + result.fee.toFixed(2);

    var statusEl = document.createElement("span");
    statusEl.style.cssText = "font-size:13px;margin-left:auto;";
    statusEl.textContent = pass ? "✅" : "❌";

    feeRow.appendChild(daysEl);
    feeRow.appendChild(feeEl);
    feeRow.appendChild(statusEl);
    row.appendChild(feeRow);

    // Show expected if wrong
    if (!pass) {
      var exp = document.createElement("div");
      exp.style.cssText = "font-family:monospace;font-size:11px;color:#666;margin-top:6px;";
      exp.textContent = "Expected: " + r.expectDays + " days / $" + r.expectFee.toFixed(2);
      row.appendChild(exp);
    }

    container.appendChild(row);
  })(rentals[i]);
}

// Summary
var resultDiv = document.getElementById("result");
if (allCorrect) {
  resultDiv.style.cssText = "color:#00ff41;font-size:14px;font-family:monospace;";
  resultDiv.textContent = "All fees verified. Al gives the customer a free rental for his trouble.";
} else {
  resultDiv.style.cssText = "color:#ff4444;font-size:14px;font-family:monospace;";
  resultDiv.textContent = "FAIL: incorrect fees. See daysBetween().";
}`,

  hints: [
    "Al grabs a calculator. Due 12/15/99, returned 1/3/00. In daysBetween, days1 = 99×365 + 12×30 + 15 = 36,510. days2 = 0×365 + 1×30 + 3 = 33. Diff is 33 − 36,510 = −36,477. Then Math.abs turns that into +36,477 days. About 100 years.",
    "The two-digit year '00' is treated as the number 0, so the year 2000 contributes zero to the day count — making it look like a date in year zero. You need to convert 2-digit years to full 4-digit years before doing the math. Think back to the \"windowing\" approach from Lesson 1.",
    "At the top of daysBetween, convert the 2-digit years to full years: if a year is less than 30, add 2000; otherwise add 1900. Then use those full years in the day calculation. Once the years are correct, the Math.abs won't matter (but you could remove it too — it was always just a band-aid).",
  ],
};

export default lesson3;
