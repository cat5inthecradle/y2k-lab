const scenarios = [
  {
    id: 1,
    slug: "baby-born-100",
    title: "Baby Born 100 Years Old",
    origin: "Denmark hospital, Jan 1 2000",
    story:
      "Nils Overflow, night shift IT admin, gets a call from the maternity ward at 2 AM. Every baby born since midnight registers as 100 years old. The day shift dev is at a party.",
    pattern: "2-digit year subtraction",
    difficulty: "Easy",
    available: true,
  },
  {
    id: 2,
    slug: "twenty-oclock",
    title: '"Twenty O\'Clock"',
    origin: "Federal courthouse, Grand Rapids MI, Jan 1 2000",
    story:
      'Polly Parsons, building systems tech, gets paged when the courthouse PA announces the year as "Twenty O\'Clock." The chief judge is not happy. Polly has a 3.5" floppy labeled in someone else\'s handwriting.',
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
      'Al Gorithm, assistant manager and "the computer guy," has a customer waving a $91,250 receipt. Tech support is a recording. Al has the source code printout in the back office.',
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
      'Connie Cattenate, junior web dev, gets paged at 12:01 AM. The nation\'s official timekeeper is displaying "January 1, 19100." Her senior dev is in Cancún.',
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
      "Sora Validata, field instrument tech, pulls over when her radio lights up. 20 seismographs are rejecting today's date. February 29, 2000 is a valid leap day — the code disagrees.",
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
      "Bo Lean, gaming commission compliance officer, is on-site when 800 slot machines go dark on New Year's Eve. He is not a programmer. He is, however, the only one here.",
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
      "Klaus Nullwert, DBA for eleven years, gets his first-ever holiday call. The transaction database is full of phantom records from 1899. Including a 12 million DM transfer.",
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
      "Reggie Session, ground systems analyst, inherits a contractor's Y2K patch. Five satellites are sending garbled data. The patch notes say \"tested, looks good.\" It does not look good.",
    pattern: "Patch-induced regression",
    difficulty: "Hard",
    available: true,
  },
];

export default scenarios;
