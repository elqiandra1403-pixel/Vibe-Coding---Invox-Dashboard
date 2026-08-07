/**
 * Design Token JS exports — mirrors styles/tokens.css
 * Use these for dynamic styling (chart colors, JS-computed styles)
 * NEVER use raw hex values in components — always import from here
 */
export const tokens = {
  colors: {
    primary:        "#5B5CEB",
    accent:         "#007AFF",
    background:     "#F5F5F7",
    surface:        "#FFFFFF",
    border:         "rgba(0,0,0,0.05)",
    textPrimary:    "#1D1D1F",
    textSecondary:  "#6E6E73",
    success:        "#30D158",
    warning:        "#FF9F0A",
    danger:         "#FF453A",
    // Apple base
    ink:            "#1D1D1F",
    inkMuted80:     "#333333",
    inkMuted48:     "#7A7A7A",
    canvas:         "#FFFFFF",
    parchment:      "#F5F5F7",
    pearl:          "#FAFAFC",
    hairline:       "#E0E0E0",
    onDark:         "#FFFFFF",
  },
  spacing: {
    xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48, section: 80,
  },
  radius: {
    xs: 5, sm: 8, md: 11, lg: 18, card: 20, pill: 9999,
  },
} as const;

export type Tokens = typeof tokens;
