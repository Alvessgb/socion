/**
 * SocioN Design System — Shopify-inspired
 * Single source of truth for all design tokens.
 * Used by Storybook, components, and CSS.
 */

export const colors = {
  ink:                  "#000000",
  onDark:               "#ffffff",
  canvasNight:          "#000000",
  canvasNightElevated:  "#0a0a0a",
  canvasLight:          "#ffffff",
  canvasCream:          "#fbfbf5",
  surfaceElevatedDark:  "#1e2c31",
  shade30:              "#d4d4d8",
  shade40:              "#a1a1aa",
  shade50:              "#71717a",
  shade60:              "#52525b",
  shade70:              "#3f3f46",
  hairlineLight:        "#e4e4e7",
  hairlineDark:         "#1e2c31",
  aloe10:               "#c1fbd4",
  pistachio10:          "#d4f9e0",
  linkCool1:            "#9dabad",
  linkCool2:            "#9797a2",
  linkCool3:            "#bdbdca",
  linkMint:             "#99b3ad",
} as const;

export const radius = {
  xs:   "4px",
  sm:   "5px",
  md:   "8px",
  lg:   "12px",
  xl:   "20px",
  pill: "9999px",
} as const;

export const spacing = {
  xxs:  "2px",
  xs:   "4px",
  sm:   "8px",
  md:   "12px",
  lg:   "16px",
  xl:   "24px",
  xxl:  "32px",
  huge: "64px",
} as const;

export const fontFamily = {
  display: '"NeueHaasGrotesk Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
  sans:    '"Inter Variable", Inter, Helvetica, Arial, sans-serif',
  mono:    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

export const typography = {
  displayXxl: {
    fontFamily: fontFamily.display,
    fontSize:      "96px",
    fontWeight:    330,
    lineHeight:    1.0,
    letterSpacing: "2.4px",
  },
  displayXl: {
    fontFamily: fontFamily.display,
    fontSize:      "70px",
    fontWeight:    330,
    lineHeight:    1.0,
    letterSpacing: "0",
  },
  displayLg: {
    fontFamily: fontFamily.display,
    fontSize:      "55px",
    fontWeight:    330,
    lineHeight:    1.16,
    letterSpacing: "0",
  },
  displayMd: {
    fontFamily: fontFamily.display,
    fontSize:      "48px",
    fontWeight:    330,
    lineHeight:    1.14,
    letterSpacing: "0",
  },
  headingXl: {
    fontFamily: fontFamily.display,
    fontSize:      "28px",
    fontWeight:    500,
    lineHeight:    1.28,
    letterSpacing: "0.42px",
  },
  headingLg: {
    fontFamily: fontFamily.display,
    fontSize:      "24px",
    fontWeight:    400,
    lineHeight:    1.14,
    letterSpacing: "0.36px",
  },
  headingMd: {
    fontFamily: fontFamily.display,
    fontSize:      "20px",
    fontWeight:    500,
    lineHeight:    1.4,
    letterSpacing: "0.3px",
  },
  headingSm: {
    fontFamily: fontFamily.display,
    fontSize:      "18px",
    fontWeight:    500,
    lineHeight:    1.25,
    letterSpacing: "0.72px",
  },
  bodyLg: {
    fontFamily: fontFamily.sans,
    fontSize:      "18px",
    fontWeight:    550,
    lineHeight:    1.56,
    letterSpacing: "0",
  },
  bodyMd: {
    fontFamily: fontFamily.sans,
    fontSize:      "16px",
    fontWeight:    420,
    lineHeight:    1.5,
    letterSpacing: "0",
  },
  bodyStrong: {
    fontFamily: fontFamily.sans,
    fontSize:      "16px",
    fontWeight:    550,
    lineHeight:    1.5,
    letterSpacing: "0",
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize:      "14px",
    fontWeight:    500,
    lineHeight:    1.49,
    letterSpacing: "0.28px",
  },
  micro: {
    fontFamily: fontFamily.sans,
    fontSize:      "13px",
    fontWeight:    500,
    lineHeight:    1.5,
    letterSpacing: "-0.13px",
  },
  eyebrowCap: {
    fontFamily: fontFamily.sans,
    fontSize:      "12px",
    fontWeight:    400,
    lineHeight:    1.2,
    letterSpacing: "0.72px",
    textTransform: "uppercase" as const,
  },
  code: {
    fontFamily: fontFamily.mono,
    fontSize:      "16px",
    fontWeight:    400,
    lineHeight:    1.5,
    letterSpacing: "0",
  },
} as const;

export const elevation = {
  0: "none",
  1: "0 1px 2px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
  2: "0 0 0 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.2)",
  3: "0 8px 8px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)",
  4: "0 25px 50px -12px rgba(0,0,0,0.25)",
} as const;

/** Component-level tokens derived from primitives */
export const componentTokens = {
  buttonPrimaryPill: {
    backgroundColor: colors.ink,
    textColor:       colors.onDark,
    borderRadius:    radius.pill,
    padding:         `${spacing.md} ${spacing.xl}`,
  },
  buttonOutlineOnDark: {
    backgroundColor: "transparent",
    textColor:       colors.onDark,
    border:          `2px solid ${colors.onDark}`,
    borderRadius:    radius.pill,
    padding:         `${spacing.md} 26px`,
  },
  buttonOutlineOnLight: {
    backgroundColor: colors.canvasLight,
    textColor:       colors.ink,
    border:          `1px solid ${colors.ink}`,
    borderRadius:    radius.pill,
    padding:         `${spacing.md} ${spacing.xl}`,
  },
  buttonAloePill: {
    backgroundColor: colors.aloe10,
    textColor:       colors.ink,
    borderRadius:    radius.pill,
    padding:         `${spacing.md} ${spacing.xl}`,
  },
  cardPricing: {
    backgroundColor: colors.canvasLight,
    borderRadius:    radius.lg,
    padding:         spacing.xxl,
    border:          `1px solid ${colors.hairlineLight}`,
    boxShadow:       elevation[3],
  },
  cardPricingFeatured: {
    backgroundColor: colors.aloe10,
    borderRadius:    radius.lg,
    padding:         spacing.xxl,
  },
  cardFeatureCinematic: {
    backgroundColor: colors.canvasNightElevated,
    borderRadius:    radius.lg,
    padding:         spacing.xxl,
    boxShadow:       elevation[1],
  },
  cardPistachioband: {
    backgroundColor: colors.pistachio10,
    borderRadius:    radius.lg,
    padding:         spacing.xxl,
  },
  pillTagMint: {
    backgroundColor: colors.aloe10,
    textColor:       colors.ink,
    borderRadius:    radius.pill,
    padding:         `${spacing.xs} ${spacing.md}`,
  },
  pillTagShade: {
    backgroundColor: colors.shade30,
    textColor:       colors.ink,
    borderRadius:    radius.pill,
    padding:         `${spacing.xs} ${spacing.md}`,
  },
  textInput: {
    backgroundColor: colors.canvasLight,
    textColor:       colors.ink,
    borderRadius:    radius.md,
    padding:         "10px 12px",
    border:          `1px solid ${colors.hairlineLight}`,
  },
} as const;

export type ColorToken   = keyof typeof colors;
export type RadiusToken  = keyof typeof radius;
export type SpacingToken = keyof typeof spacing;
export type TypoToken    = keyof typeof typography;
