import { ConferenceSolutionType } from "./ConferenceSolutionType";

export interface ConferenceProperties {
  /**
   * The types of conference solutions that are supported for this calendar.
   */
  allowedConferenceSolutionTypes: Array<ConferenceSolutionType>;
}
