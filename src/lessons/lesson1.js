const lesson1 = {
  title: "Baby Born 100 Years Old",
  slug: "baby-born-100",
  origin: "Denmark hospital — January 1, 2000",
  difficulty: "Easy",
  story:
    "It's January 1, 2000. The first baby of the new millennium has just been born at a hospital in Denmark. The nurse enters the birth into the patient registration system and the screen reads: Age: 100 years old. The baby's parents are not amused. Oddly, the older patients' ages look fine — the bug only seems to affect people born in the year 2000.",
  mission:
    "The hospital's patient registration system converts two-digit birth years to full years by adding 1900. That worked great for decades — but now a birth year of \"00\" becomes 1900 instead of 2000, making newborns appear to be 100 years old. Fix the toFullYear() function so it handles years in the 2000s correctly.",

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
  // This worked great for 50 years... but what about "00"?
  return 1900 + twoDigitYear;
}

var CURRENT_YEAR = 2000;

function calculateAge(birthYear2Digit) {
  var fullBirthYear = toFullYear(birthYear2Digit);
  return CURRENT_YEAR - fullBirthYear;
}

// --- Test the system with today's patients ---

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
  console.log("🎉 ALL PATIENTS CORRECT! Bug fixed!");
} else {
  console.error("Some ages are wrong. Fix the toFullYear() function!");
}`,

  hints: [
    "Trace through toFullYear(0). It returns 1900 + 0 = 1900. But the baby was born in 2000, not 1900. The function needs to know when \"00\" means 2000.",
    "Think about a cutoff: two-digit years below some number (like 30) probably mean the 2000s, and those above it mean the 1900s. This is called \"windowing\" — it's how many real Y2K fixes worked.",
    "Try: if twoDigitYear is less than 30, return 2000 + twoDigitYear. Otherwise return 1900 + twoDigitYear.",
  ],
};

export default lesson1;
