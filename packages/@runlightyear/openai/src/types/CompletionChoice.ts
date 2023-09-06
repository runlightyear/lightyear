export interface CompletionChoice {
  text: string;
  index: number;
  logprobs: object | null;
  /**
   * The reason the model stopped generating tokens. This will be stop if the model hit a natural stop point or a provided stop sequence, or length if the maximum number of tokens specified in the request was reached.
   */
  finishReason: "stop" | "length";
}
