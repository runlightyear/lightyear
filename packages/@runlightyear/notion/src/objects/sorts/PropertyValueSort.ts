import { SortDirection } from "./SortDirection";

export interface PropertyValueSort {
  /**
   * The name of the property to sort against.
   */
  property: string;

  /**
   * The direction to sort.
   */
  direction: SortDirection;
}
