---
layout: default
---

### TimeText

[TimeText]: #timetext

A [Text] element that displays time formatted text on the screen.

#### Displaying time in a TimeText element

If you want to display the current time or date, use the `TimeText` element with a time formatting string in the `text` property. The time to redraw the time text element will be automatically calculated based on the format string. For example, a `TimeText` element with the format `'%M:%S'` will be redrawn every second because of the seconds format `%S`.

The available formatting options follows the C `strftime()` function:

| Specifier | Replaced by                                                                                                                                                | Example                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| %a        | An abbreviation for the day of the week.                                                                                                                   | "Thu"                      |
| %A        | The full name for the day of the week.                                                                                                                     | "Thursday"                 |
| %b        | An abbreviation for the month name.                                                                                                                        | "Aug"                      |
| %B        | The full name of the month.                                                                                                                                | "August"                   |
| %c        | A string representing the complete date and time                                                                                                           | "Mon Apr 01 13:13:13 1992" |
| %d        | The day of the month, formatted with two digits.                                                                                                           | "23"                       |
| %H        | The hour (on a 24-hour clock), formatted with two digits.                                                                                                  | "14"                       |
| %I        | The hour (on a 12-hour clock), formatted with two digits.                                                                                                  | "02"                       |
| %j        | The count of days in the year, formatted with three digits (from `001` to `366`).                                                                          | "235"                      |
| %m        | The month number, formatted with two digits.                                                                                                               | "08"                       |
| %M        | The minute, formatted with two digits.                                                                                                                     | "55"                       |
| %p        | Either `AM` or `PM` as appropriate.                                                                                                                        | "AM"                       |
| %S        | The second, formatted with two digits.                                                                                                                     | "02"                       |
| %U        | The week number, formatted with two digits (from `00` to `53`; week number 1 is taken as beginning with the first Sunday in a year). See also `%W`.        | "33"                       |
| %w        | A single digit representing the day of the week: Sunday is day 0.                                                                                          | "4"                        |
| %W        | Another version of the week number: like `%U`, but counting week 1 as beginning with the first Monday in a year.                                           | "34"                       |
| %x        | A string representing the complete date.                                                                                                                   | "Mon Apr 01 1992"          |
| %X        | A string representing the full time of day (hours, minutes, and seconds).                                                                                  | "13:13:13"                 |
| %y        | The last two digits of the year.                                                                                                                           | "01"                       |
| %Y        | The full year, formatted with four digits to include the century.                                                                                          | "2001"                     |
| %Z        | Defined by ANSI C as eliciting the time zone if available; it is not available in this implementation (which accepts `%Z` but generates no output for it). |                            |
| %%        | A single character, `%`.                                                                                                                                   | "%"                        |
