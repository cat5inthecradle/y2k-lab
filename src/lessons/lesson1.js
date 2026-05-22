const lesson1 = {
  title: "Baby Born 100 Years Old",
  slug: "baby-born-100",
  character: "Nils Overflow",
  origin: "Denmark hospital — January 1, 2000",
  difficulty: "Easy",
  story:
    "It's 2 AM on January 1, 2000. Nils Overflow is the night shift IT administrator at Copenhagen General Hospital. He was supposed to be home by midnight, but the maternity ward called — every baby born since midnight is registering as 100 years old. The day shift developer is at a party and not answering his phone. Nils has the source code, a mass-produced \"Happy Y2K!!\" mug full of terrible coffee, and until the morning shift arrives to sort this out.",
  mission:
    "Nils has traced the problem to the toFullYear() function. It converts two-digit birth years to full years by adding 1900. Birth year \"00\" becomes 1900 instead of 2000 — newborns register as centenarians. Fix toFullYear() to handle years in the 2000s.",

  starterHtml: `<h3>🏥 Denmark General Hospital — Patient Registration</h3>
<p>Date: January 1, 2000</p>
<hr style="border-color:#333; margin: 12px 0;">
<div id="output"></div>`,

  starterJs: `// HOSPITAL PATIENT REGISTRATION SYSTEM v3.2
// Last updated: March 1995
//
// Birth years are stored as two-digit values:
//   1952 → 52, 1985 → 85, 2000 → 00
//
// The function below converts them back to full years.

function toFullYear(twoDigitYear) {
  // nb: always assumes 1900s
  return 1900 + twoDigitYear;
}

var CURRENT_YEAR = 2000;

function calculateAge(birthYear2Digit) {
  var fullBirthYear = toFullYear(birthYear2Digit);
  return CURRENT_YEAR - fullBirthYear;
}

// --- test: today's patients ---

var patients = [
  { name: "Baby Nielsen",   birthYear: 0  },  // born 2000
  { name: "Erik Larsen",    birthYear: 85 },  // born 1985
  { name: "Inge Madsen",    birthYear: 52 },  // born 1952
  { name: "Marta Holm",     birthYear: 0  },  // born 2000
  { name: "Søren Bakke",    birthYear: 72 },  // born 1972
];

console.log("=== Patient Age Report ===\\n");

var allCorrect = true;
var expectedAges = [0, 15, 48, 0, 28];

for (var i = 0; i < patients.length; i++) {
  var p = patients[i];
  var age = calculateAge(p.birthYear);
  var fullYear = toFullYear(p.birthYear);
  var expected = expectedAges[i];
  var status = (age === expected) ? "✅" : "❌";
  if (age !== expected) allCorrect = false;

  console.log(status + " " + p.name + " (born " + fullYear + ") — Age: " + age + (age !== expected ? "  ⚠ expected " + expected : ""));
}

console.log("");
if (allCorrect) {
  console.log("All patient ages verified. Nils finishes his coffee.");
} else {
  console.error("FAIL: incorrect ages. See toFullYear().");
}`,

  hints: [
    "Nils starts by tracing toFullYear(0). It returns 1900 + 0 = 1900. But the baby was born in 2000, not 1900. The function needs to distinguish when \"00\" means 2000 vs. 1900.",
    "Think about a cutoff: two-digit years below some number (like 30) probably mean the 2000s, and those above it mean the 1900s. This is called \"windowing\" — it's how many real Y2K fixes worked.",
    "Try: if twoDigitYear is less than 30, return 2000 + twoDigitYear. Otherwise return 1900 + twoDigitYear.",
  ],
};

export default lesson1;
