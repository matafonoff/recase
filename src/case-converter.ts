import { CaseStyle, ConvertOptions } from './types';

/**
 * Converts a string to the given case style.
 * @param input The input string in any format.
 * @param target The desired target case style.
 * @param options Optional conversion settings.
 * @returns The converted string.
 */
export function convertCase(
    input: string,
    target: CaseStyle,
    options: ConvertOptions = {}
): string {
    const preserveAbbr = options?.preserveAbbreviations ?? false;
    const parts = splitToParts(input, preserveAbbr);
    switch (target) {
        case 'camel': return toCamel(parts, preserveAbbr);
        case 'pascal': return toPascal(parts, preserveAbbr);
        case 'snake': return parts.map(p => transformWordPreservingAbbr(p, String.prototype.toLowerCase, preserveAbbr)).join('_');
        case 'upper_snake': return parts.map(p => transformWordPreservingAbbr(p, String.prototype.toUpperCase, preserveAbbr)).join('_');
        case 'kebab': return parts.map(p => transformWordPreservingAbbr(p, String.prototype.toLowerCase, preserveAbbr)).join('-');
        case 'dot': return parts.map(p => transformWordPreservingAbbr(p, String.prototype.toLowerCase, preserveAbbr)).join('.');
        case 'train': return parts.map(p => smartCapitalize(p, preserveAbbr)).join('-');
        case 'cobol': return parts.map(p => transformWordPreservingAbbr(p, String.prototype.toUpperCase, preserveAbbr)).join('-');
        default: return input;
    }
}

/**
 * Detects the case style of the input string.
 * @param input The string to analyze.
 * @returns The detected case style, or 'unknown' if unrecognized.
 */
export function detectCase(input: string): CaseStyle {
    if (/^[a-z][a-z\d]*([A-Z][a-z\d]*)+$/.test(input)) return 'camel';
    if (/^[A-Z][a-z\d]*([A-Z][a-z\d]*)*$/.test(input)) return 'pascal';
    if (/^[a-z\d]+(_[a-z\d]+)+$/.test(input)) return 'snake';
    if (/^[A-Z\d]+(_[A-Z\d]+)+$/.test(input)) return 'upper_snake';
    if (/^[a-z\d]+(-[a-z\d]+)+$/.test(input)) return 'kebab';
    if (/^[A-Z][a-z\d]+(-[A-Z][a-z\d]+)+$/.test(input)) return 'train';
    if (/^[A-Z\d]+(-[A-Z\d]+)+$/.test(input)) return 'cobol';
    if (/^[a-z\d]+(\.[a-z\d]+)+$/.test(input)) return 'dot';
    return 'unknown';
}

function toCamel(parts: string[], preserveAbbr: boolean): string {
    if (parts.length === 0) {
        return '';
    }

    const first = isAbbr(parts[0]) ? parts[0] : parts[0].toLowerCase();

    return first + parts.slice(1).map(x => smartCapitalize(x, preserveAbbr)).join('');
}

function toPascal(parts: string[], preserveAbbr: boolean): string {
    return parts.map(x => smartCapitalize(x, preserveAbbr)).join('');
}

function smartCapitalize(word: string, preserveAbbr: boolean): string {
    if (preserveAbbr && isAbbr(word)) {
        return word;
    }

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Splits a string into its semantic parts.
 * @param str The input string.
 * @param preserveAbbr Whether to preserve abbreviations like HTML/API.
 * @returns Array of lowercase words or abbreviations.
 */
export function splitToParts(str: string, preserveAbbr = false): string[] {
    const ABBR_REGEX = preserveAbbr ? /[A-Z]{2,}(?=[A-Z][a-z]|\b)/g : null;

    if (preserveAbbr && ABBR_REGEX) {
        str = str.replace(ABBR_REGEX, (match) => ` ${match} `);
    }

    str = str
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/[_.\-]/g, ' ')
        .replace(/\s+/g, ' ');

    return str.trim().split(' ').filter(Boolean);
}

function transformWordPreservingAbbr(
    word: string,
    transform: (this: string) => string,
    preserveAbbr: boolean = false
): string {
    if (!word) {
        return word;
    }
    if (preserveAbbr && isAbbr(word)) {
        return word;
    }
    return transform.apply(word);
}

function isAbbr(word: string): boolean {
    return /^[A-Z]{2,}$/.test(word);
}