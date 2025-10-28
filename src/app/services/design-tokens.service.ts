import { Injectable, signal, computed, Signal, effect } from '@angular/core';
import { DesignTokens, UIKitType, DEFAULT_TOKENS } from '../models/design-tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class DesignTokensService {
  // Signals for each UI Kit's tokens
  private readonly silpoTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.silpo });
  private readonly lokoTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.loko });
  private readonly backofficeTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.backoffice });

  // Currently selected UI Kit
  private readonly selectedKit = signal<UIKitType>('silpo');

  constructor() {
    // Update global CSS variables when selected kit or tokens change
    effect(() => {
      const kit = this.selectedKit();
      const tokens = this.getTokens(kit)();
      this.updateGlobalCSSVariables(tokens);
    });

    // Watch for token updates
    effect(() => {
      this.silpoTokens();
      this.lokoTokens();
      this.backofficeTokens();
      const kit = this.selectedKit();
      const tokens = this.getTokens(kit)();
      this.updateGlobalCSSVariables(tokens);
    });
  }

  private updateGlobalCSSVariables(tokens: DesignTokens): void {
    const root = document.documentElement;
    root.style.setProperty('--combobox-bg', tokens.colorBackground);
    root.style.setProperty('--combobox-border-color', tokens.colorPrimary);
    root.style.setProperty('--combobox-border-width', tokens.borderWidth);
    root.style.setProperty('--combobox-border-radius', tokens.borderRadius);
    root.style.setProperty('--combobox-text-color', tokens.colorText);
    root.style.setProperty('--combobox-focus-color', tokens.colorPrimary);
    root.style.setProperty('--combobox-hover-color', tokens.colorSecondary);
    root.style.setProperty('--combobox-font-size', tokens.fontSize);
    root.style.setProperty('--combobox-font-weight', tokens.fontWeight);
    root.style.setProperty('--combobox-padding', tokens.padding);
    root.style.setProperty('--combobox-spacing', tokens.spacing);
  }

  /**
   * Get tokens for a specific UI Kit
   */
  getTokens(kit: UIKitType): Signal<DesignTokens> {
    switch (kit) {
      case 'silpo':
        return this.silpoTokens.asReadonly();
      case 'loko':
        return this.lokoTokens.asReadonly();
      case 'backoffice':
        return this.backofficeTokens.asReadonly();
    }
  }

  /**
   * Get currently selected UI Kit
   */
  getSelectedKit(): Signal<UIKitType> {
    return this.selectedKit.asReadonly();
  }

  /**
   * Set selected UI Kit
   */
  setSelectedKit(kit: UIKitType): void {
    this.selectedKit.set(kit);
  }

  /**
   * Get tokens for currently selected UI Kit
   */
  getCurrentTokens(): Signal<DesignTokens> {
    return computed(() => {
      const kit = this.selectedKit();
      switch (kit) {
        case 'silpo':
          return this.silpoTokens();
        case 'loko':
          return this.lokoTokens();
        case 'backoffice':
          return this.backofficeTokens();
      }
    });
  }

  /**
   * Update a specific token for a UI Kit
   */
  updateToken(kit: UIKitType, key: keyof DesignTokens, value: string): void {
    switch (kit) {
      case 'silpo':
        this.silpoTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
      case 'loko':
        this.lokoTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
      case 'backoffice':
        this.backofficeTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
    }
  }

  /**
   * Update multiple tokens at once
   */
  updateTokens(kit: UIKitType, tokens: Partial<DesignTokens>): void {
    switch (kit) {
      case 'silpo':
        this.silpoTokens.update(current => ({ ...current, ...tokens }));
        break;
      case 'loko':
        this.lokoTokens.update(current => ({ ...current, ...tokens }));
        break;
      case 'backoffice':
        this.backofficeTokens.update(current => ({ ...current, ...tokens }));
        break;
    }
  }

  /**
   * Reset tokens to default for a specific UI Kit
   */
  resetTokens(kit: UIKitType): void {
    switch (kit) {
      case 'silpo':
        this.silpoTokens.set({ ...DEFAULT_TOKENS.silpo });
        break;
      case 'loko':
        this.lokoTokens.set({ ...DEFAULT_TOKENS.loko });
        break;
      case 'backoffice':
        this.backofficeTokens.set({ ...DEFAULT_TOKENS.backoffice });
        break;
    }
  }

  /**
   * Reset all tokens to defaults
   */
  resetAllTokens(): void {
    this.silpoTokens.set({ ...DEFAULT_TOKENS.silpo });
    this.lokoTokens.set({ ...DEFAULT_TOKENS.loko });
    this.backofficeTokens.set({ ...DEFAULT_TOKENS.backoffice });
  }

  /**
   * Convert tokens to CSS custom properties object
   */
  getTokensAsCSSProperties(tokens: DesignTokens): Record<string, string> {
    return {
      '--color-primary': tokens.colorPrimary,
      '--color-secondary': tokens.colorSecondary,
      '--color-background': tokens.colorBackground,
      '--color-text': tokens.colorText,
      '--color-border': tokens.colorBorder,
      '--border-radius': tokens.borderRadius,
      '--padding': tokens.padding,
      '--font-size': tokens.fontSize,
      '--border-width': tokens.borderWidth,
      '--shadow-size': tokens.shadowSize,
    };
  }
}
