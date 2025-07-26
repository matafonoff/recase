import { convertCase } from './case-converter';
import { CaseStyle, ConvertOptions } from './types';

/**
 * Recursively converts all object keys to a target case.
 * Handles cyclic references to avoid infinite loops.
 * Supports filtering with `ignoreKeys` and `onlyKeys`.
 *
 * @param input The object or array to transform.
 * @param target The desired case style for all keys.
 * @param options Optional conversion settings.
 * @returns Transformed object/array/value
 */
export function convertObjectKeys(
    input: unknown,
    target: CaseStyle,
    options: ConvertOptions = {}
): unknown {
    const seen = new WeakMap<object, unknown>();
    return internalConvert(input, target, options, seen);
}

function internalConvert(
    input: unknown,
    target: CaseStyle,
    options: ConvertOptions,
    seen: WeakMap<object, unknown>
): unknown {
    if (Array.isArray(input)) {
        return input.map(item => internalConvert(item, target, options, seen));
    }

    if (input !== null && typeof input === 'object') {
        if (seen.has(input as object)) {
            return seen.get(input as object);
        }

        const result: Record<string, unknown> = {};
        seen.set(input as object, result);

        for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
            const shouldIgnore = options.ignoreKeys?.includes(key);
            const shouldConvert = options.onlyKeys ? options.onlyKeys.includes(key) : true;

            const newKey = shouldIgnore || !shouldConvert ? key : convertCase(key, target, options);
            result[newKey] = internalConvert(value, target, options, seen);
        }

        return result;
    }

    return input;
}
