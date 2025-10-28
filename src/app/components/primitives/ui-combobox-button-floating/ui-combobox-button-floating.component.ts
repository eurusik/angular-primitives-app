import { Component, input, model, computed, signal } from '@angular/core';
import { NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxOption, NgpComboboxPortal } from 'ng-primitives/combobox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-combobox-button-floating',
  imports: [NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxOption, NgpComboboxPortal],
  template: `
    <div class="ui-combobox-button-floating-field" [style]="fieldStyles()">
      <div 
        ngpCombobox
        [(ngpComboboxValue)]="value"
        (ngpComboboxOpenChange)="onOpenChange($event)"
        class="ui-combobox-button-floating-wrapper">
        <button 
          ngpComboboxButton 
          class="ui-combobox-button-floating" 
          type="button"
          (focus)="onFocus()"
          (blur)="onBlur()">
          <span>{{ value() || ' ' }}</span>
          <span class="ui-combobox-button-floating-icon">▼</span>
        </button>
        <label 
          class="ui-combobox-button-floating-label"
          [class.floating]="isFloating()">
          {{ label() }}
        </label>
        <div *ngpComboboxPortal ngpComboboxDropdown class="ui-combobox-dropdown">
          @for (option of options(); track option) {
            <div 
              ngpComboboxOption 
              [ngpComboboxOptionValue]="option"
              class="ui-combobox-option">
              {{ option }}
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './ui-combobox-button-floating.component.css',
})
export class UiComboboxButtonFloatingComponent {
  label = input.required<string>();
  options = input.required<string[]>();
  tokens = input.required<DesignTokens>();
  value = model<string>('');
  
  isFocused = signal<boolean>(false);
  isOpen = signal<boolean>(false);

  isFloating = computed(() => {
    return this.isFocused() || this.isOpen() || this.value().length > 0;
  });

  fieldStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--combobox-spacing': tokens.spacing,
      '--combobox-font-size': tokens.fontSize,
      '--combobox-font-weight': tokens.fontWeight,
      '--combobox-border-radius': tokens.borderRadius,
      '--combobox-border-width': tokens.borderWidth,
      '--combobox-border-color': tokens.colorPrimary,
      '--combobox-bg': tokens.colorBackground,
      '--combobox-text-color': tokens.colorText,
      '--combobox-focus-color': tokens.colorPrimary,
      '--combobox-hover-color': tokens.colorSecondary,
      '--combobox-padding': tokens.padding,
    };
  });

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  onOpenChange(isOpen: boolean): void {
    this.isOpen.set(isOpen);
  }
}
