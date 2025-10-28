import { Component, input, computed, model } from '@angular/core';
import { NgpCheckbox } from 'ng-primitives/checkbox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-checkbox',
  imports: [NgpCheckbox],
  template: `
    <label class="ui-checkbox-container" [style]="checkboxStyles()">
      <span 
        ngpCheckbox
        [(ngpCheckboxChecked)]="checked"
        [ngpCheckboxDisabled]="disabled()"
        class="ui-checkbox-input">
        <span class="ui-checkbox-box"></span>
      </span>
      <span class="ui-checkbox-label">{{ label() }}</span>
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
      '--checkbox-border-color': tokens.colorBorder,
      '--checkbox-bg': tokens.colorBackground,
      '--checkbox-checked-bg': tokens.colorPrimary,
      '--checkbox-text-color': tokens.colorText,
      '--checkbox-font-size': tokens.fontSize,
    };
  });
}
