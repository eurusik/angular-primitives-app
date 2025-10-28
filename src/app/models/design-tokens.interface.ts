/**
 * Design tokens interface for UI customization
 */
export interface DesignTokens {
  colorPrimary: string;
  colorSecondary: string;
  colorBackground: string;
  colorText: string;
  colorBorder: string;
  formBackground: string;
  borderRadius: string;
  padding: string;
  spacing: string;
  fontSize: string;
  fontWeight: string;
  borderWidth: string;
  shadowSize: string;
  inputStyle: 'standard' | 'floating';
  backgroundGradient: string;
}

/**
 * UI Kit types
 */
export type UIKitType = 'freshmart' | 'quickdelivery' | 'adminhub';

/**
 * Default design tokens for each UI Kit
 */
export const DEFAULT_TOKENS: Record<UIKitType, DesignTokens> = {
  freshmart: {
    colorPrimary: '#FE8522',
    colorSecondary: '#F08227',
    colorBackground: '#FFFFFF',
    colorText: '#1A1A1A',
    colorBorder: '#FDB071',
    formBackground: '#FFF9F0',
    borderRadius: '24px',
    padding: '16px',
    spacing: '24px',
    fontSize: '16px',
    fontWeight: '500',
    borderWidth: '2px',
    shadowSize: '0 4px 12px rgba(254, 133, 34, 0.15)',
    inputStyle: 'standard',
    backgroundGradient: 'linear-gradient(135deg, #FFB366 0%, #FF9933 50%, #FF8000 100%)',
  },
  quickdelivery: {
    colorPrimary: '#FF3C64',
    colorSecondary: '#E72645',
    colorBackground: '#FFEFF2',
    colorText: '#212529',
    colorBorder: '#FE8094',
    formBackground: '#FFF5F7',
    borderRadius: '4px',
    padding: '12px',
    spacing: '16px',
    fontSize: '14px',
    fontWeight: '600',
    borderWidth: '1px',
    shadowSize: '0 2px 8px rgba(255, 60, 100, 0.1)',
    inputStyle: 'standard',
    backgroundGradient: 'linear-gradient(135deg, #FF8FAB 0%, #FF6B90 50%, #FF4775 100%)',
  },
  adminhub: {
    colorPrimary: '#2358D1',
    colorSecondary: '#2D4EB6',
    colorBackground: '#D6DDF5',
    colorText: '#1A1A1A',
    colorBorder: '#859ADD',
    formBackground: '#E8ECFA',
    borderRadius: '12px',
    padding: '14px',
    spacing: '20px',
    fontSize: '15px',
    fontWeight: '700',
    borderWidth: '2px',
    shadowSize: '0 3px 10px rgba(35, 88, 209, 0.12)',
    inputStyle: 'standard',
    backgroundGradient: 'linear-gradient(135deg, #7A8FCC 0%, #6178BF 50%, #4861B2 100%)',
  },
};
