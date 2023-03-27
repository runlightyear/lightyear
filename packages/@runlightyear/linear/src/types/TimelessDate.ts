/**
 * Represents a date in ISO 8601 format. Accepts shortcuts like 2021 to represent midnight Fri Jan 01 2021. Also accepts ISO 8601 durations strings which are added to the current date to create the represented date (e.g '-P2W1D' represents the date that was two weeks and 1 day ago)
 */
export type TimelessDate = string;
