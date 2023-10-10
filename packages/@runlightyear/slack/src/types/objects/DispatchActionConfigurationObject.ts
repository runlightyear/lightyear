/**
 * trigger_actions_on
 * String[]
 * An array of interaction types that you would like to receive a block_actions payload for. Should be one or both of:
 *
 * on_enter_pressed — payload is dispatched when user presses the enter key while the input is in focus. Hint text will appear underneath the input explaining to the user to press enter to submit.
 *
 * on_character_entered — payload is dispatched when a character is entered (or removed) in the input.
 */

export interface DispatchActionConfigurationObject {
  /**
   * An array of interaction types that you would like to receive a block_actions payload for. Should be one or both of:
   *
   * on_enter_pressed — payload is dispatched when user presses the enter key while the input is in focus. Hint text will appear underneath the input explaining to the user to press enter to submit.
   *
   * on_character_entered — payload is dispatched when a character is entered (or removed) in the input.
   */
  triggerActionsOn?: Array<"on_enter_pressed" | "on_character_entered">;
}
