import { Component, input, computed, model } from '@angular/core';
import { NgpCheckbox } from 'ng-primitives/checkbox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-checkbox',
  imports: [NgpCheckbox],
  template: `
    <label class="checkbox-wrapper" [style]="checkboxStyles()">
      <span 
        ngpCheckbox
        [(ngpCheckboxChecked)]="checked"
        [ngpCheckboxDisabled]="disabled()">
        @if (checked()) {
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/>
          </svg>
        }
      </span>
      <span class="checkbox-label">{{ label() }}</span>
    </label>
  `,
  styleUrl: './ui-checkbox.component.css',
})
export class UiCheckboxComponent {
  label = input.required<string>();
  disabled = input<boolean>(false);
  tokens = input.required<DesignTokens>();
  checked = model<boolean>(false);

  checkboxStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--checkbox-size': '20px',
      '--checkbox-border-radius': `calc(${tokens.borderRadius} / 2)`,
      '--checkbox-border-width': tokens.borderWidth,
      '--checkbox-border-color': tokens.colorPrimary,
      '--checkbox-bg': tokens.colorBackground,
      '--checkbox-checked-bg': tokens.colorPrimary,
      '--checkbox-hover-color': tokens.colorSecondary,
      '--checkbox-checkmark-color': '#FFFFFF',
      '--checkbox-text-color': tokens.colorText,
      '--checkbox-font-size': tokens.fontSize,
      '--checkbox-font-weight': tokens.fontWeight,
      '--checkbox-spacing': tokens.spacing,
    };
  });
}
