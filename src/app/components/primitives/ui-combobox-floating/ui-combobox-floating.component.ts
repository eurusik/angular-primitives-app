import { Component, input, model, computed, signal } from '@angular/core';
import { NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxInput, NgpComboboxOption, NgpComboboxPortal } from 'ng-primitives/combobox';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-combobox-floating',
  imports: [NgpCombobox, NgpComboboxButton, NgpComboboxDropdown, NgpComboboxInput, NgpComboboxOption, NgpComboboxPortal],
  template: `
    <div class="ui-combobox-floating-field" [style]="fieldStyles()">
      <div 
        ngpCombobox
        [(ngpComboboxValue)]="value"
        (ngpComboboxValueChange)="onValueChange($event)"
        (ngpComboboxOpenChange)="onOpenChange($event)"
        class="ui-combobox-floating-container">
        <input 
          ngpComboboxInput 
          class="ui-combobox-floating-input"
          [value]="displayValue()"
          (input)="onInputChange($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          placeholder=" " />
        <label class="ui-combobox-floating-label" [class.floating]="isFloating()">
          {{ label() }}
        </label>
        <button ngpComboboxButton class="ui-combobox-floating-button" type="button">
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
  styleUrl: './ui-combobox-floating.component.css',
})
export class UiComboboxFloatingComponent {
  label = input.required<string>();
  options = input.required<string[]>();
  tokens = input.required<DesignTokens>();
  value = model<string>('');
  
  displayValue = signal<string>('');
  filterValue = signal<string>('');
  isFocused = signal<boolean>(false);

  isFloating = computed(() => {
    return this.isFocused() || this.displayValue().length > 0;
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

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  onOpenChange(isOpen: boolean): void {
    if (!isOpen) {
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
