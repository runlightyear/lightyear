export interface View {
  id: string;
  /**
   * View type, block is Gantt View
   */
  type:
    | "grid"
    | "form"
    | "calendar"
    | "gallery"
    | "kanban"
    | "timeline"
    | "block";
  name: string;
  /**
   * Available on grid views only: list of visible (non-hidden) field IDs, when requested with include query parameter
   */
  visibleFieldIds?: Array<string>;
}
