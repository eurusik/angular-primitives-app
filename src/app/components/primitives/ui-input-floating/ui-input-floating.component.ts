import { Component, input, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgpInput } from 'ng-primitives/input';
import { NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-input-floating',
  imports: [FormsModule, NgpInput, NgpFormField, NgpLabel],
  template: `
    <div ngpFormField class="ui-input-floating-field" [style]="fieldStyles()">
      <input 
        ngpInput
        class="ui-input-floating"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [(ngModel)]="value"
        [style]="inputStyles()"
        (focus)="onFocus()"
        (blur)="onBlur()">
      <label 
        ngpLabel 
        class="ui-input-floating-label"
        [class.floating]="isFloating()">
        {{ label() }}
      </label>
    </div>
  `,
  styleUrl: './ui-input-floating.component.css',
})
export class UiInputFloatingComponent {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  tokens = input.required<DesignTokens>();
  value = model<string>('');

  protected isFocused = model<boolean>(false);

  isFloating = computed(() => {
    return this.isFocused() || this.value().length > 0;
  });

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  fieldStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--input-padding': tokens.padding,
      '--input-font-size': tokens.fontSize,
      '--input-font-weight': tokens.fontWeight,
      '--input-border-color': tokens.colorPrimary,
      '--input-bg': tokens.colorBackground,
      '--input-focus-color': tokens.colorPrimary,
      '--input-border-radius': tokens.borderRadius,
      '--input-border-width': tokens.borderWidth,
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
