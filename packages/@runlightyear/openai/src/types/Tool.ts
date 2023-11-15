/**
 * tools
 * array
 * A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types code_interpreter, retrieval, or function.
 *
 *
 * Hide possible types
 * Code interpreter tool
 * object
 *
 * Hide properties
 * type
 * string
 * The type of tool being defined: code_interpreter
 *
 * Retrieval tool
 * object
 *
 * Hide properties
 * type
 * string
 * The type of tool being defined: retrieval
 *
 * Function tool
 * object
 *
 * Hide properties
 * type
 * string
 * The type of tool being defined: function
 *
 * function
 * object
 *
 * Hide properties
 * description
 * string
 * A description of what the function does, used by the model to choose when and how to call the function.
 *
 * name
 * string
 * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
 *
 * parameters
 * object
 * The parameters the functions accepts, described as a JSON Schema object. See the guide for examples, and the JSON Schema reference for documentation about the format.
 *
 * To describe a function that accepts no parameters, provide the value {"type": "object", "properties": {}}.
 */

export interface CodeInterpreterTool {
  type: "code_interpreter";
}

export interface RetrievalTool {
  type: "retrieval";
}

export interface FunctionTool {
  type: "function";
  function: {
    description: string;
    name: string;
    parameters: object;
  };
}

export type Tool = CodeInterpreterTool | RetrievalTool | FunctionTool;
