import { Component, input, model, computed } from '@angular/core';
import { NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxOption, NgpComboboxPortal } from 'ng-primitives/combobox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-combobox-button',
  imports: [NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxOption, NgpComboboxPortal],
  template: `
    <div class="ui-combobox-button-field" [style]="fieldStyles()">
      <label class="ui-combobox-button-label">{{ label() }}</label>
      <div 
        ngpCombobox
        [(ngpComboboxValue)]="value"
        class="ui-combobox-button-wrapper">
        <button ngpComboboxButton class="ui-combobox-button" type="button">
          <span>{{ value() || placeholder() }}</span>
          <span class="ui-combobox-button-icon">▼</span>
        </button>
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
  styleUrl: './ui-combobox-button.component.css',
})
export class UiComboboxButtonComponent {
  label = input.required<string>();
  placeholder = input<string>('Оберіть опцію');
  options = input.required<string[]>();
  tokens = input.required<DesignTokens>();
  value = model<string>('');

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
}
