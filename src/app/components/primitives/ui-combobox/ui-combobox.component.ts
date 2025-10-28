import { Component, input, model, computed, signal } from '@angular/core';
import { NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxInput, NgpComboboxOption, NgpComboboxPortal } from 'ng-primitives/combobox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-combobox',
  imports: [NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxInput, NgpComboboxOption, NgpComboboxPortal],
  template: `
    <div class="ui-combobox-field" [style]="fieldStyles()">
      <label class="ui-combobox-label">{{ label() }}</label>
      <div 
        ngpCombobox
        [(ngpComboboxValue)]="value"
        (ngpComboboxValueChange)="onValueChange($event)"
        (ngpComboboxOpenChange)="onOpenChange($event)"
        class="ui-combobox-container">
        <input 
          ngpComboboxInput 
          class="ui-combobox-input"
          [value]="displayValue()"
          (input)="onInputChange($event)"
          [placeholder]="placeholder()" />
        <button ngpComboboxButton class="ui-combobox-button" type="button">
          ▼
        </button>
        <div *ngpComboboxPortal ngpComboboxDropdown class="ui-combobox-dropdown">
          @for (option of filteredOptions(); track option) {
            <div 
              ngpComboboxOption 
              [ngpComboboxOptionValue]="option"
              class="ui-combobox-option">
              {{ option }}
            </div>
          } @empty {
            <div class="ui-combobox-empty">Нічого не знайдено</div>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './ui-combobox.component.css',
})
export class UiComboboxComponent {
  label = input.required<string>();
  placeholder = input<string>('');
  options = input.required<string[]>();
  tokens = input.required<DesignTokens>();
  value = model<string>('');
  
  displayValue = signal<string>('');
  filterValue = signal<string>('');

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

  filteredOptions = computed(() => {
    const filter = this.filterValue().toLowerCase();
    if (!filter) {
      return this.options();
    }
    return this.options().filter(option => 
      option.toLowerCase().includes(filter)
    );
  });

  onValueChange(newValue: string | undefined): void {
    if (newValue) {
      this.value.set(newValue);
      this.displayValue.set(newValue);
      this.filterValue.set(newValue);
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    this.displayValue.set(inputValue);
    this.filterValue.set(inputValue);
  }

  onOpenChange(isOpen: boolean): void {
    if (!isOpen) {
      // When dropdown closes, reset to selected value or clear
      if (this.value()) {
        this.displayValue.set(this.value());
        this.filterValue.set(this.value());
      } else if (this.filterValue() === '') {
        this.value.set('');
      } else {
        this.filterValue.set(this.value());
      }
    }
  }
}
