/**
 * Supported case styles for key conversion.
 */
export type CaseStyle =
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'upper_snake'
  | 'kebab'
  | 'dot'
  | 'train'
  | 'cobol'
  | 'unknown';

/**
 * Options used for key conversion behavior.
 */
export interface ConvertOptions {
  /**
   * If true, preserves abbreviations like 'HTML' in 'userHTMLData'.
   */
  preserveAbbreviations?: boolean;

  /**
   * Keys to leave unconverted.
   */
  ignoreKeys?: string[];

  /**
   * If set, only convert these specific keys.
   */
  onlyKeys?: string[];
}
