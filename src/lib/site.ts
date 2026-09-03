export const SITE_NAME = "MCAREVIVE";

export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY?.trim() || "";
export const PHONE_TEL = process.env.NEXT_PUBLIC_PHONE_TEL?.trim() || "";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
export const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME?.trim() || SITE_NAME;
export const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim() || "";

export const hasPhone = Boolean(PHONE_DISPLAY && PHONE_TEL);
