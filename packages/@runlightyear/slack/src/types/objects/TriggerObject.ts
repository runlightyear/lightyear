export interface TriggerObject {
  /**
   * A link trigger URL. Must be associated with a valid trigger.
   */
  url: string;
  /**
   * An array of input parameter objects. Each specified name must match an input parameter defined on the workflow of the provided trigger (url), and the input parameter mapping on the trigger must be set as customizable: true. Each specified value must match the type defined by the workflow input parameter of the matching name.
   */
  customizableInputParameters?: Array<unknown>;
}
