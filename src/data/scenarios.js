const scenarios = [
  {
    id: 1,
    slug: "baby-born-100",
    title: "Baby Born 100 Years Old",
    origin: "Denmark hospital, Jan 1 2000",
    story:
      "Denmark's first baby born in the year 2000 was registered by the hospital's computer system as 100 years old. The system stored birth years as two digits — so the year 2000 became '00', and the age calculation subtracted 00 from 00… then got confused.",
    pattern: "2-digit year subtraction",
    difficulty: "Easy",
    available: true,
  },
  {
    id: 2,
    slug: "twenty-oclock",
    title: '"Twenty O\'Clock"',
    origin: "Real-world date announcement system, circa 2000",
    story:
      'A program that read the current date and time aloud would say "Three O\'Clock PM, January Third, Twenty O\'Clock." It interpreted the "00" in the year 2000 using the same logic it used for minutes — where ":00" means "o\'clock." So the year 2000 became "twenty o\'clock" instead of "two thousand."',
    pattern: "Shared format-parsing logic between time and date fields",
    difficulty: "Easy–Medium",
    available: true,
  },
  {
    id: 3,
    slug: "video-rental",
    title: "The $91,000 Video Rental",
    origin: "Upstate New York video store, Jan 2000",
    story:
      'A customer who rented "The General\'s Daughter" received a bill for $91,250 because the system calculated the tape as 100 years overdue. The due date was in 1999, but when 2000 arrived, the system thought the year had rolled back to 1900.',
    pattern: "Date rollback in duration math",
    difficulty: "Easy–Medium",
    available: true,
  },
  {
    id: 4,
    slug: "nineteen-hundred",
    title: '"January 1, 19100"',
    origin: "US Naval Observatory website, Jan 1 2000",
    story:
      'The official US timekeeper\'s website displayed the date as "January 1, 19100" for about 45 minutes. A programmer had added 1900 to a two-digit year value — but when the year rolled to 100, the math produced 1900 + 100 = 2000... except the code concatenated the string "19" with "100" instead.',
    pattern: "Offset overflow / string concatenation vs. addition",
    difficulty: "Easy",
    available: true,
  },
  {
    id: 5,
    slug: "leap-day",
    title: "The Leap Day That Didn't Exist",
    origin: "Japanese weather bureau & seismographs, Feb 29 2000",
    story:
      "Over 20 seismographs and 43 weather computers rejected February 29, 2000 as an invalid date, or misread it as March 1. The year 2000 IS a leap year (divisible by 400), but the systems only checked the simpler rule (divisible by 100 = not a leap year).",
    pattern: "Incomplete leap year logic",
    difficulty: "Medium",
    available: true,
  },
  {
    id: 6,
    slug: "slot-machines",
    title: "Slot Machines Go Dark",
    origin: "Delaware race tracks, Dec 31 1999",
    story:
      "About 800 slot machines at three Delaware race tracks shut down on New Year's Eve. The machines' software checked whether their gaming license was valid for the next 3 days. When it looked ahead to January 1, 2000, it read the year as 1900 — decades before the license was issued — and killed the machines.",
    pattern: "Look-ahead / scheduling failure",
    difficulty: "Medium",
    available: true,
  },
  {
    id: 7,
    slug: "transactions-1899",
    title: "Transactions from 1899",
    origin: "German bank, Jan 1 2000",
    story:
      "A German bank accidentally transferred 12 million Deutsche Marks (~$6.2 million) to a customer with the transaction dated December 30, 1899. The system rolled the year 2000 back to 1900, then subtracted one more day for processing, landing in 1899. The database was full of century-old phantom transactions.",
    pattern: "Date rollback in stored records / database cleanup",
    difficulty: "Medium–Hard",
    available: true,
  },
  {
    id: 8,
    slug: "broken-fix",
    title: "The Fix That Broke the Satellites",
    origin: "US spy satellites / Fort Belvoir, VA, Jan 1 2000",
    story:
      "A Y2K remediation patch — designed to fix the bug — itself crashed the ground imagery processing station at Fort Belvoir. Communications with five reconnaissance satellites were garbled for about three days. The original code wasn't the problem; the fix was.",
    pattern: "Patch-induced regression",
    difficulty: "Hard",
    available: true,
  },
];

export default scenarios;
