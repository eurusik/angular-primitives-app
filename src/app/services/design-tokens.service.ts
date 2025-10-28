import { Injectable, signal, computed, Signal, effect } from '@angular/core';
import { DesignTokens, UIKitType, DEFAULT_TOKENS } from '../models/design-tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class DesignTokensService {
  // Signals for each UI Kit's tokens
  private readonly freshmartTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.freshmart });
  private readonly quickdeliveryTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.quickdelivery });
  private readonly adminhubTokens = signal<DesignTokens>({ ...DEFAULT_TOKENS.adminhub });

  // Currently selected UI Kit
  private readonly selectedKit = signal<UIKitType>('freshmart');

  constructor() {
    // Update global CSS variables when selected kit or tokens change
    effect(() => {
      const kit = this.selectedKit();
      const tokens = this.getTokens(kit)();
      this.updateGlobalCSSVariables(tokens);
    });

    // Watch for token updates
    effect(() => {
      this.freshmartTokens();
      this.quickdeliveryTokens();
      this.adminhubTokens();
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
      case 'freshmart':
        return this.freshmartTokens.asReadonly();
      case 'quickdelivery':
        return this.quickdeliveryTokens.asReadonly();
      case 'adminhub':
        return this.adminhubTokens.asReadonly();
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
        case 'freshmart':
          return this.freshmartTokens();
        case 'quickdelivery':
          return this.quickdeliveryTokens();
        case 'adminhub':
          return this.adminhubTokens();
      }
    });
  }

  /**
   * Update a specific token for a UI Kit
   */
  updateToken(kit: UIKitType, key: keyof DesignTokens, value: string): void {
    switch (kit) {
      case 'freshmart':
        this.freshmartTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
      case 'quickdelivery':
        this.quickdeliveryTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
      case 'adminhub':
        this.adminhubTokens.update(tokens => ({ ...tokens, [key]: value }));
        break;
    }
  }

  /**
   * Update multiple tokens at once
   */
  updateTokens(kit: UIKitType, tokens: Partial<DesignTokens>): void {
    switch (kit) {
      case 'freshmart':
        this.freshmartTokens.update(current => ({ ...current, ...tokens }));
        break;
      case 'quickdelivery':
        this.quickdeliveryTokens.update(current => ({ ...current, ...tokens }));
        break;
      case 'adminhub':
        this.adminhubTokens.update(current => ({ ...current, ...tokens }));
        break;
    }
  }

  /**
   * Reset tokens to default for a specific UI Kit
   */
  resetTokens(kit: UIKitType): void {
    switch (kit) {
      case 'freshmart':
        this.freshmartTokens.set({ ...DEFAULT_TOKENS.freshmart });
        break;
      case 'quickdelivery':
        this.quickdeliveryTokens.set({ ...DEFAULT_TOKENS.quickdelivery });
        break;
      case 'adminhub':
        this.adminhubTokens.set({ ...DEFAULT_TOKENS.adminhub });
        break;
    }
  }

  /**
   * Reset all tokens to defaults
   */
  resetAllTokens(): void {
    this.freshmartTokens.set({ ...DEFAULT_TOKENS.freshmart });
    this.quickdeliveryTokens.set({ ...DEFAULT_TOKENS.quickdelivery });
    this.adminhubTokens.set({ ...DEFAULT_TOKENS.adminhub });
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
