import { parsePhoneNumberFromString } from 'libphonenumber-js';

export interface NormalizedPhone {
  e164: string;
  isValid: boolean;
  /** ISO 3166 country of the number, when it could be parsed. */
  country?: string;
}

/**
 * Normalize a user-supplied phone string to E.164.
 *
 * Defaults to US ('US') when the input has no country code, since this demo is
 * primarily US-facing. We still return a best-effort `e164` even when the
 * number does not strictly validate, so the caller can decide how strict to be.
 */
export function normalizePhone(
  input: string,
  defaultCountry: 'US' = 'US',
): NormalizedPhone {
  const trimmed = (input ?? '').trim();
  const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);

  if (parsed) {
    return { e164: parsed.number, isValid: parsed.isValid(), country: parsed.country };
  }

  // Fallback: strip everything but digits and a leading '+'.
  const cleaned = trimmed.replace(/[^\d+]/g, '');
  return { e164: cleaned, isValid: false };
}
