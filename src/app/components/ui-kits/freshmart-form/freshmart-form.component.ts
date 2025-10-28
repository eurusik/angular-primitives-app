import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCart } from '@ng-icons/heroicons/outline';
import { UiButtonComponent } from '../../primitives/ui-button/ui-button.component';
import { UiInputComponent } from '../../primitives/ui-input/ui-input.component';
import { UiInputFloatingComponent } from '../../primitives/ui-input-floating/ui-input-floating.component';
import { UiCheckboxComponent } from '../../primitives/ui-checkbox/ui-checkbox.component';
import { UiComboboxComponent } from '../../primitives/ui-combobox/ui-combobox.component';
import { UiComboboxFloatingComponent } from '../../primitives/ui-combobox-floating/ui-combobox-floating.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-freshmart-form',
  imports: [NgIcon, UiButtonComponent, UiInputComponent, UiInputFloatingComponent, UiCheckboxComponent, UiComboboxComponent, UiComboboxFloatingComponent],
  providers: [provideIcons({ heroShoppingCart })],
  template: `
    <div class="freshmart-form" [style]="formStyles()">
      <div class="form-header">
        <h3><ng-icon name="heroShoppingCart" size="20" /> Реєстрація в FreshMart</h3>
        <p class="form-subtitle">Створіть акаунт та отримуйте бонуси</p>
      </div>

      <div class="form-body">
        @if (tokens().inputStyle === 'floating') {
          <app-ui-input-floating 
            label="Ім'я" 
            placeholder=" "
            [tokens]="tokens()" />
          
          <app-ui-input-floating 
            label="Email" 
            type="email"
            placeholder=" "
            [tokens]="tokens()" />
          
          <app-ui-combobox-floating
            label="Місто доставки"
            [options]="cities"
            [tokens]="tokens()" />
        } @else {
          <app-ui-input 
            label="Ім'я" 
            placeholder="Введіть ваше ім'я"
            [tokens]="tokens()" />
          
          <app-ui-input 
            label="Email" 
            type="email"
            placeholder="example@email.com"
            [tokens]="tokens()" />
          
          <app-ui-combobox
            label="Місто доставки"
            placeholder="Оберіть місто"
            [options]="cities"
            [tokens]="tokens()" />
        }
        
        <app-ui-checkbox 
          label="Отримувати акції та спеціальні пропозиції"
          [tokens]="tokens()" />
      </div>

      <div class="form-footer">
        <app-ui-button 
          variant="primary"
          [tokens]="tokens()">
          Зареєструватись
        </app-ui-button>
        <app-ui-button 
          variant="secondary"
          [tokens]="tokens()">
          Вже є акаунт
        </app-ui-button>
      </div>
    </div>
  `,
  styleUrl: './freshmart-form.component.css',
})
export class FreshmartFormComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('freshmart')());
  
  cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя'];

  formStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--form-bg': tokens.formBackground,
      '--form-padding': tokens.padding,
      '--form-border-radius': tokens.borderRadius,
      '--form-shadow': tokens.shadowSize,
      '--form-primary': tokens.colorPrimary,
      '--form-secondary': tokens.colorSecondary,
      '--form-font-weight': tokens.fontWeight,
      '--form-spacing': tokens.spacing,
    };
  });
}
