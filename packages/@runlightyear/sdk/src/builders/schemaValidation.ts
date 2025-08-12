import { z } from "zod";
import type { JSONSchema7 } from "json-schema";

/**
 * Convert JSON Schema to Zod schema
 * This is a simplified converter that handles common JSON Schema patterns
 */
export function jsonSchemaToZod(schema: JSONSchema7): z.ZodTypeAny {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }

  // Handle type arrays (e.g., ["string", "null"])
  if (Array.isArray(schema.type)) {
    const types = schema.type.map(t => jsonSchemaToZod({ ...schema, type: t }));
    return types.reduce((acc, curr) => acc.or(curr));
  }

  // Handle enum
  if (schema.enum) {
    if (schema.enum.length === 0) {
      return z.never();
    }
    const [first, ...rest] = schema.enum;
    return z.enum([first as any, ...rest as any[]]);
  }

  // Handle const
  if (schema.const !== undefined) {
    return z.literal(schema.const as any);
  }

  // Handle basic types
  switch (schema.type) {
    case "string":
      let stringSchema = z.string();
      if (schema.minLength !== undefined) {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (schema.maxLength !== undefined) {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern !== undefined) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      if (schema.format === "email") {
        stringSchema = z.string().email();
      }
      if (schema.format === "date-time") {
        stringSchema = z.string().datetime();
      }
      if (schema.format === "date") {
        stringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
      }
      return stringSchema;

    case "number":
      let numberSchema = z.number();
      if (schema.minimum !== undefined) {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (schema.maximum !== undefined) {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (schema.multipleOf !== undefined) {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      return numberSchema;

    case "integer":
      let intSchema = z.number().int();
      if (schema.minimum !== undefined) {
        intSchema = intSchema.min(schema.minimum);
      }
      if (schema.maximum !== undefined) {
        intSchema = intSchema.max(schema.maximum);
      }
      return intSchema;

    case "boolean":
      return z.boolean();

    case "null":
      return z.null();

    case "array":
      if (!schema.items) {
        return z.array(z.any());
      }
      const itemSchema = Array.isArray(schema.items)
        ? z.union(schema.items.map(jsonSchemaToZod) as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]])
        : jsonSchemaToZod(schema.items);
      
      let arraySchema = z.array(itemSchema);
      if (schema.minItems !== undefined) {
        arraySchema = arraySchema.min(schema.minItems);
      }
      if (schema.maxItems !== undefined) {
        arraySchema = arraySchema.max(schema.maxItems);
      }
      return arraySchema;

    case "object":
      if (!schema.properties) {
        return z.record(z.any());
      }

      const shape: Record<string, z.ZodTypeAny> = {};
      
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (typeof propSchema === "boolean") {
          shape[key] = propSchema ? z.any() : z.never();
        } else {
          shape[key] = jsonSchemaToZod(propSchema);
        }
      }

      let objectSchema = z.object(shape);

      // Handle required fields
      if (schema.required && Array.isArray(schema.required)) {
        const requiredSet = new Set(schema.required);
        const partialShape: Record<string, z.ZodTypeAny> = {};
        
        for (const [key, zodType] of Object.entries(shape)) {
          if (!requiredSet.has(key)) {
            partialShape[key] = zodType.optional();
          } else {
            partialShape[key] = zodType;
          }
        }
        
        objectSchema = z.object(partialShape);
      } else {
        // If no required array, make all fields optional
        objectSchema = objectSchema.partial();
      }

      // Handle additionalProperties
      if (schema.additionalProperties === false) {
        objectSchema = objectSchema.strict();
      }

      return objectSchema;

    default:
      return z.any();
  }
}

/**
 * Create a Zod array validator from a JSON Schema
 */
export function createArrayValidator<T>(schema: JSONSchema7): z.ZodSchema<T[]> {
  const validator = jsonSchemaToZod(schema);
  return z.array(validator) as z.ZodSchema<T[]>;
}

/**
 * Validation result type
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}

/**
 * Validate data against a JSON Schema using Zod
 */
export function validateWithSchema<T>(
  data: unknown,
  schema: JSONSchema7
): ValidationResult<T> {
  try {
    const zodSchema = jsonSchemaToZod(schema);
    const result = zodSchema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data as T,
      };
    } else {
      return {
        success: false,
        errors: result.error.errors.map(err => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: [{
        path: "",
        message: error instanceof Error ? error.message : "Unknown validation error",
      }],
    };
  }
}