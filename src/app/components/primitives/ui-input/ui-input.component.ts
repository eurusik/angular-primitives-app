import { Component, input, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgpInput } from 'ng-primitives/input';
import { NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-input',
  imports: [FormsModule, NgpInput, NgpFormField, NgpLabel],
  template: `
    <div ngpFormField class="ui-input-field" [style]="fieldStyles()">
      <label ngpLabel class="ui-input-label">{{ label() }}</label>
      <input 
        ngpInput
        class="ui-input"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [(ngModel)]="value"
        [style]="inputStyles()">
    </div>
  `,
  styleUrl: './ui-input.component.css',
})
export class UiInputComponent {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  tokens = input.required<DesignTokens>();
  value = model<string>('');

  fieldStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--input-padding': tokens.padding,
      '--input-font-size': tokens.fontSize,
      '--input-font-weight': tokens.fontWeight,
      '--input-spacing': tokens.spacing,
    };
  });

  inputStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--input-border-radius': tokens.borderRadius,
      '--input-border-width': tokens.borderWidth,
      '--input-border-color': tokens.colorPrimary,
      '--input-bg': tokens.colorBackground,
      '--input-text-color': tokens.colorText,
      '--input-focus-color': tokens.colorPrimary,
    };
  });
}
