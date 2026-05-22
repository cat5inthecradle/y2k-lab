# Y2K Bug: Documented Manifestations

A catalog of specific, documented ways the Year 2000 bug presented across systems and industries.

---

## Pre-2000 Early Failures

### Retail & Supply Chain
- **Marks & Spencer (UK, early 1990s)** -- Stock control rejected tinned meat with expiry "01/00" (Jan 2000), interpreting it as 1900 and flagging the product as ~90 years old.
- **US grocer (1997)** -- 10 cash registers crashed repeatedly when swiping credit cards with year-2000 expiration dates; triggered the first Y2K-related lawsuit.
- **Gas company credit card (early 1999)** -- Cards printed with expiration year "1000."

### Transportation
- **Singapore taxi meters (Jan 1, 1999)** -- Meters stopped working entirely.
- **Sweden taxi meters (Jan 1, 1999)** -- Meters returned incorrect fares.

### Government & Emergency Services
- **Philadelphia (Nov 1999)** -- ~500 residents received jury summonses ordering them to appear in the year 1900.
- **Charlotte, NC (Dec 29, 1999)** -- 911 dispatch system crashed during Y2K readiness testing.

### Banking
- **HSBC / Racal Electronics (UK, Dec 1999)** -- Credit card swipe machines rejected valid cards across thousands of retailers.
- **Golden 1 Credit Union (California)** -- 500 members' ATM cards stopped working at grocery stores; cards were hard-coded to expire Dec 31, 1999.

---

## Actual Failures at Rollover (Jan 1, 2000+)

### Military & Intelligence
- **US spy satellites / Fort Belvoir, VA** -- A Y2K patch itself crashed ground imagery processing. Communications with five reconnaissance satellites were garbled for ~3 days.
- **Pentagon terrorist-monitoring system** -- Briefly disrupted (confirmed by Pentagon, reported Jan 5, 2000).
- **British Rapier missile system** -- Targeting system rendered inoperable by date glitch; caught and fixed before operational impact.

### Nuclear Power
- **Onagawa Nuclear Plant (Japan)** -- Process computer alarm triggered at 00:02 on Jan 1; self-cleared by 00:12.
- **Shika Nuclear Station (Japan)** -- Radiation monitoring system went offline; backups covered.
- **Takahama Nuclear Plant (Japan)** -- Failed to transmit radiation level data.
- **Seven US nuclear reactors** -- Minor glitches in plant support systems; none safety-critical.

### Banking & Finance
- **Federal Reserve Bank of Chicago** -- Could not transfer $700,000 in tax revenue on Jan 1; resolved next day.
- **German bank** -- Accidentally transferred 12 million Deutsche Marks (~$6.2M) to a customer, dated December 30, 1899.
- **US Medicare system** -- $50M in payments delayed; claims rejected with dates listed as 1900 or 2099.
- **Citibank Belgium** -- Digipass customer ID chips failed.
- **Chicago-area bank** -- Interrupted electronic Medicare payments to hospitals; insurers resorted to mailing claims on physical diskettes via FedEx.

### Financial Markets & Gaming
- **Hong Kong Futures Exchange** -- System miscalculated days between trading dates and option expirations.
- **Delaware slot machines (Dec 31, 1999)** -- ~800 machines at three race tracks shut down. Software looked 3 days ahead, read Jan 1, 2000 as 1900, and killed the machines.

### Healthcare
- **Northern General Hospital, Sheffield (England)** -- PathLAN system miscalculated ages of pregnant mothers from Jan 24 to May 4, 2000. 154 patients received incorrect Down syndrome risk assessments. Widely considered the most consequential documented Y2K failure.

### Government & Web
- **US Naval Observatory website** -- Displayed the date as "January 1, 19100" for ~45 minutes (programmer added 1900 to a two-digit year value of 100).
- **DMV, St. Croix, USVI** -- Shut down; could not register automobiles.
- **Florida & Kentucky** -- Unemployment systems blocked benefit claims for the week ending Jan 1, 2000.
- **Microsoft IE & Hotmail** -- Displayed the year as "3900."

### Leap Year Failures (Feb 29, 2000)
- **Japanese seismographs** -- 20+ units misread Feb 29 as March 1.
- **Japanese weather bureau** -- 43 computers released corrupt temperature and precipitation data.
- **Japanese observatories** -- 6 facilities rejected Feb 29 as an invalid date.

---

## Amusing / Minor Incidents

- **Denmark millennium baby** -- First baby born in 2000 registered by hospital system as 100 years old.
- **Deutsche Oper Berlin (Germany)** -- Payroll reverted to 1900. Employees' children appeared elderly; system revoked childcare subsidies from paychecks.
- **Video rental store, upstate New York** -- Customer billed $91,250 for a tape calculated as 100 years overdue. Given a free rental for his trouble.
- **Video rental store, Gwangju (South Korea)** -- Generated a late fee of ~8 million won (~$7,000) on a similar 100-year miscalculation.

---

## Delayed Y2K-Type Bug

- **German bank cards (Jan 2010)** -- A date-encoding flaw in chip cards (traced to manufacturer Gemalto) rendered ~20 million debit cards and 3.5 million credit cards unusable at ATMs and terminals across Germany.

---

## By the Numbers

| Metric | Value |
|---|---|
| Significant computer failures in first week of Jan 2000 | 67 (per KPMG / British Bankers Association) |
| Global remediation spending | $300-600 billion (est.) |
| Most serious documented harm | 154 incorrect prenatal screenings (Sheffield) |
| Planes crashed / grids failed / financial collapse | None |

---

## Technical Patterns

The bug manifested in a few recurring ways:

1. **Date rollback to 1900** -- Two-digit year "00" interpreted as 1900, causing age miscalculations, expired-product rejections, and absurd billing.
2. **Sentinel value collision** -- Systems using "99" or "9999" as end-of-file/program markers confused with the year 1999.
3. **Arithmetic overflow** -- Adding 1900 to a year offset of 100 produced "19100" instead of "2000."
4. **Leap year blindness** -- Year 2000 is a leap year (divisible by 400), but some systems applying the simpler "not divisible by 100" rule rejected Feb 29, 2000.
5. **Look-ahead failures** -- Systems that projected dates days or months forward hit 2000 before the actual rollover.
6. **Patch-induced failures** -- Remediation code itself introduced new bugs (e.g., the spy satellite incident).
