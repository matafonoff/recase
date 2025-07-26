import { convertCase, detectCase, splitToParts } from '../src/case-converter'; // или '../dist' после сборки
import { CaseStyle } from '../src/types';

describe('convertCase', () => {
    it('converts camelCase to other formats', () => {
        const input = 'userProfileID';
        expect(convertCase(input, 'snake')).toBe('user_profile_id');
        expect(convertCase(input, 'kebab')).toBe('user-profile-id');
        expect(convertCase(input, 'dot')).toBe('user.profile.id');
        expect(convertCase(input, 'pascal')).toBe('UserProfileId');
        expect(convertCase(input, 'upper_snake')).toBe('USER_PROFILE_ID');
        expect(convertCase(input, 'cobol')).toBe('USER-PROFILE-ID');
        expect(convertCase(input, 'train')).toBe('User-Profile-Id');
    });

    it('preserves abbreviations when requested', () => {
        const input = 'userHTMLData';
        expect(convertCase(input, 'snake', { preserveAbbreviations: true })).toBe('user_HTML_data');
        expect(convertCase(input, 'camel', { preserveAbbreviations: true })).toBe('userHTMLData');
        expect(convertCase(input, 'camel')).toBe('userHtmlData'); // without preservation
    });
});

describe('detectCase', () => {
    const cases: Record<string, CaseStyle> = {
        'userProfileId': 'camel',
        'UserProfileId': 'pascal',
        'user_profile_id': 'snake',
        'USER_PROFILE_ID': 'upper_snake',
        'user-profile-id': 'kebab',
        'user.profile.id': 'dot',
        'User-Profile-Id': 'train',
        'USER-PROFILE-ID': 'cobol',
        'unidentifiedStringStyle': 'camel',
        'id': 'unknown'
    };

    for (const [input, expected] of Object.entries(cases)) {
        it(`detects ${expected} from '${input}'`, () => {
            expect(detectCase(input)).toBe(expected);
        });
    }
});
