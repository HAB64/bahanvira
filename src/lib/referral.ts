// ═══════════════════════════════════════════════════════════
//  تولید کد معرف
//  Vira Decimal Abacus - Referral Code Generation
// ═══════════════════════════════════════════════════════════

/**
 * Generates a unique referral code in format VIRA-XXXX
 * where X is an uppercase alphanumeric character
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous chars (I, O, 0, 1)
  let code = 'VIRA-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generates a referral link for the given code
 */
export function generateReferralLink(code: string): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/?ref=${code}`;
  }
  return `/?ref=${code}`;
}

/**
 * Validates a referral code format
 */
export function isValidReferralCode(code: string): boolean {
  return /^VIRA-[A-HJ-NP-Z2-9]{4}$/.test(code);
}

/**
 * Extracts referral code from URL search params
 */
export function getReferralCodeFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref && isValidReferralCode(ref)) {
    return ref;
  }
  return null;
}
