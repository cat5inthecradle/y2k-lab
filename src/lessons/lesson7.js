const lesson7 = {
  title: "Transactions from 1899",
  slug: "transactions-1899",
  origin: "German bank — January 1, 2000",
  difficulty: "Medium–Hard",
  story:
    "A German bank accidentally transferred 12 million Deutsche Marks (~$6.2 million) to a customer with the transaction dated December 30, 1899. When the system processed transactions on January 1, 2000, it converted the 2-digit year '00' to 1900, then subtracted one day for processing time — landing on December 30, 1899. The bank's database was full of phantom transactions from over a century ago.",
  mission:
    "The bank's transaction database is corrupted. Dates that should be in 2000 were stored as 1900 (or earlier). You've been given a cleanup script and a set of transaction records. Write the logic for the fixDate() function to detect and correct dates that were mangled by the Y2K bug. Be careful: not ALL old dates are bugs — the bank was founded in 1952, so anything before that is definitely wrong, but you also need to think about which 1900-era dates are real vs. corrupted.",

  starterHtml: `<h3>🏦 Deutsche Volksbank — Transaction Database Repair</h3>
<p style="color:#666; margin-bottom: 4px;">Emergency Cleanup Script · Run #1</p>
<hr style="border-color:#333; margin: 8px 0 12px;">
<div id="output"></div>`,

  starterJs: `// DEUTSCHE VOLKSBANK — EMERGENCY DATABASE CLEANUP
// January 2, 2000
//
// The transaction processing system converts 2-digit years
// by adding 1900. Transactions from 2000 got stored as 1900.
// Some were further mangled by date arithmetic (subtracting
// days for processing time pushed them into 1899).
//
// Your job: fix the dates. The bank was founded in 1952,
// so any transaction before 1952 is DEFINITELY a bug.

function fixDate(month, day, year) {
  // TODO: Detect and correct Y2K-mangled dates.
  //
  // RULES:
  //   - The bank was founded in 1952. No legitimate
  //     transaction can be before that year.
  //   - Dates in 1899 or 1900 are almost certainly
  //     supposed to be 1999 or 2000 (off by 100 years).
  //   - Dates from 1952 onward should be left alone.
  //   - Return an object: { m: month, d: day, y: year }

  return { m: month, d: day, y: year };
}

// ──────────────────────────────────────────────
// TEST HARNESS — the corrupted transaction ledger
// You shouldn't need to edit below this line.
// ──────────────────────────────────────────────

var transactions = [
  { id: "TXN-4021", desc: "Wire transfer",
    amount: "12,400,000 DM",
    m: 12, d: 30, y: 1899,
    expectY: 1999, note: "Should be Dec 30, 1999 (was pushed to 1899 by date math)" },
  { id: "TXN-4022", desc: "Payroll deposit",
    amount: "3,200 DM",
    m: 1,  d: 1,  y: 1900,
    expectY: 2000, note: "Should be Jan 1, 2000 (Y2K: 00 → 1900)" },
  { id: "TXN-4023", desc: "ATM withdrawal",
    amount: "500 DM",
    m: 1,  d: 3,  y: 1900,
    expectY: 2000, note: "Should be Jan 3, 2000 (Y2K: 00 → 1900)" },
  { id: "TXN-3998", desc: "Monthly interest",
    amount: "142 DM",
    m: 12, d: 15, y: 1999,
    expectY: 1999, note: "Correct — this is a real 1999 date" },
  { id: "TXN-3845", desc: "Account opening",
    amount: "10,000 DM",
    m: 3,  d: 22, y: 1987,
    expectY: 1987, note: "Correct — legitimate old transaction" },
  { id: "TXN-4024", desc: "Loan payment",
    amount: "1,800 DM",
    m: 12, d: 31, y: 1899,
    expectY: 1999, note: "Should be Dec 31, 1999 (processing pushed to 1899)" },
  { id: "TXN-4025", desc: "Direct deposit",
    amount: "4,500 DM",
    m: 1,  d: 2,  y: 1900,
    expectY: 2000, note: "Should be Jan 2, 2000 (Y2K: 00 → 1900)" },
  { id: "TXN-3901", desc: "Branch deposit",
    amount: "25,000 DM",
    m: 7,  d: 14, y: 1995,
    expectY: 1995, note: "Correct — legitimate 1995 transaction" },
];

var output = document.getElementById("output");
var allCorrect = true;

for (var i = 0; i < transactions.length; i++) {
  (function(t) {
    var fixed = fixDate(t.m, t.d, t.y);
    var pass = (fixed.y === t.expectY && fixed.m === t.m && fixed.d === t.d);
    if (!pass) allCorrect = false;

    var wasChanged = (fixed.y !== t.y);

    var row = document.createElement("div");
    row.style.cssText = "border:1px solid " + (pass ? "#00ff41" : "#ff4444") + ";padding:10px 14px;margin:6px 0;border-radius:6px;background:#111;";

    // Transaction header
    var header = document.createElement("div");
    header.style.cssText = "display:flex;align-items:center;gap:10px;margin-bottom:4px;";

    var status = document.createElement("span");
    status.textContent = pass ? "✅" : "❌";

    var idEl = document.createElement("span");
    idEl.style.cssText = "font-family:monospace;font-size:11px;color:#666;";
    idEl.textContent = t.id;

    var descEl = document.createElement("span");
    descEl.style.cssText = "font-size:13px;color:#00ccff;flex:1;";
    descEl.textContent = t.desc;

    var amtEl = document.createElement("span");
    amtEl.style.cssText = "font-family:monospace;font-size:13px;color:" + (t.amount.length > 8 ? "#ff8800" : "#aaa") + ";font-weight:bold;";
    amtEl.textContent = t.amount;

    header.appendChild(status);
    header.appendChild(idEl);
    header.appendChild(descEl);
    header.appendChild(amtEl);
    row.appendChild(header);

    // Date line
    var dateLine = document.createElement("div");
    dateLine.style.cssText = "font-family:monospace;font-size:12px;margin-left:24px;color:#aaa;";

    var origDate = t.m + "/" + t.d + "/" + t.y;
    var fixedDate = fixed.m + "/" + fixed.d + "/" + fixed.y;

    if (wasChanged) {
      dateLine.innerHTML = "<span style='color:#ff4444;text-decoration:line-through;'>" + origDate + "</span> → <span style='color:#00ff41;'>" + fixedDate + "</span>";
    } else {
      dateLine.textContent = origDate + (t.y === t.expectY ? "" : " (unchanged — needs fix!)");
    }
    row.appendChild(dateLine);

    // Note
    if (!pass) {
      var noteEl = document.createElement("div");
      noteEl.style.cssText = "font-size:11px;color:#666;margin-left:24px;margin-top:4px;";
      noteEl.textContent = t.note;
      row.appendChild(noteEl);
    }

    output.appendChild(row);
  })(transactions[i]);
}

var summary = document.createElement("div");
summary.style.cssText = "margin-top:14px;font-size:13px;font-family:monospace;color:" + (allCorrect ? "#00ff41" : "#ff4444") + ";";
summary.textContent = allCorrect ? "🎉 ALL TRANSACTIONS REPAIRED! Database cleanup complete!" : "❌ Some dates are still wrong. Implement the fixDate() function!";
output.appendChild(summary);`,

  hints: [
    "Start simple: look at the pattern. Dates in 1899 and 1900 need to be fixed, but dates in 1987, 1995, and 1999 are fine. What do 1899 and 1900 have in common? They're both before the bank was founded in 1952.",
    "The Y2K bug added (or subtracted) exactly 100 years from the real date. So 1900 should be 2000, and 1899 should be 1999. If the year is before 1952 (the bank's founding), add 100 to it.",
    "In fixDate: check if year < 1952. If so, return the date with year + 100. Otherwise return it unchanged. This turns 1899 → 1999, 1900 → 2000, but leaves 1987, 1995, and 1999 alone.",
  ],
};

export default lesson7;
