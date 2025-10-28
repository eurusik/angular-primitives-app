/**
 * Design tokens interface for UI customization
 */
export interface DesignTokens {
  colorPrimary: string;
  colorSecondary: string;
  colorBackground: string;
  colorText: string;
  colorBorder: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  borderWidth: string;
  shadowSize: string;
}

/**
 * UI Kit types
 */
export type UIKitType = 'silpo' | 'loko' | 'backoffice';

/**
 * Default design tokens for each UI Kit
 */
export const DEFAULT_TOKENS: Record<UIKitType, DesignTokens> = {
  silpo: {
    colorPrimary: '#FE8522',
    colorSecondary: '#F08227',
    colorBackground: '#FFFFFF',
    colorText: '#1A1A1A',
    colorBorder: '#FDB071',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '16px',
    borderWidth: '2px',
    shadowSize: '0 4px 12px rgba(254, 133, 34, 0.15)',
  },
  loko: {
    colorPrimary: '#FF3C64',
    colorSecondary: '#E72645',
    colorBackground: '#FFEFF2',
    colorText: '#212529',
    colorBorder: '#FE8094',
    borderRadius: '4px',
    padding: '12px',
    fontSize: '14px',
    borderWidth: '1px',
    shadowSize: '0 2px 8px rgba(255, 60, 100, 0.1)',
  },
  backoffice: {
    colorPrimary: '#2358D1',
    colorSecondary: '#2D4EB6',
    colorBackground: '#D6DDF5',
    colorText: '#1A1A1A',
    colorBorder: '#859ADD',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '15px',
    borderWidth: '1px',
    shadowSize: '0 3px 10px rgba(35, 88, 209, 0.12)',
  },
};
