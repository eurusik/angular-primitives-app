import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { UiButtonComponent } from '../../primitives/ui-button/ui-button.component';
import { UiInputComponent } from '../../primitives/ui-input/ui-input.component';
import { UiInputFloatingComponent } from '../../primitives/ui-input-floating/ui-input-floating.component';
import { UiCheckboxComponent } from '../../primitives/ui-checkbox/ui-checkbox.component';
import { UiComboboxButtonComponent } from '../../primitives/ui-combobox-button/ui-combobox-button.component';
import { UiComboboxButtonFloatingComponent } from '../../primitives/ui-combobox-button-floating/ui-combobox-button-floating.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-quickdelivery-form',
  imports: [NgIcon, UiButtonComponent, UiInputComponent, UiInputFloatingComponent, UiCheckboxComponent, UiComboboxButtonComponent, UiComboboxButtonFloatingComponent],
  providers: [provideIcons({ heroTruck })],
  template: `
    <div class="quickdelivery-form" [style]="formStyles()">
      <div class="form-header">
        <h3><ng-icon name="heroTruck" size="20" /> Швидке замовлення</h3>
        <p class="form-subtitle">Отримайте замовлення за 30 хвилин</p>
      </div>

      <div class="form-body">
        @if (tokens().inputStyle === 'floating') {
          <app-ui-input-floating 
            label="Номер телефону" 
            placeholder=" "
            [tokens]="tokens()" />
          
          <app-ui-combobox-button-floating
            label="Час доставки"
            [options]="deliveryTimes"
            [tokens]="tokens()" />
        } @else {
          <app-ui-input 
            label="Номер телефону" 
            type="tel"
            placeholder="+380 XX XXX XX XX"
            [tokens]="tokens()" />
          
          <app-ui-combobox-button
            label="Час доставки"
            placeholder="Оберіть час"
            [options]="deliveryTimes"
            [tokens]="tokens()" />
        }
        
        <app-ui-checkbox 
          label="Запам'ятати мене на цьому пристрої"
          [tokens]="tokens()" />
      </div>

      <div class="form-footer">
        <app-ui-button 
          variant="primary"
          [tokens]="tokens()">
          Увійти
        </app-ui-button>
        <app-ui-button 
          variant="secondary"
          [tokens]="tokens()">
          Реєстрація
        </app-ui-button>
      </div>

      <div class="form-extra">
        <a href="#" class="link">Забули пароль?</a>
      </div>
    </div>
  `,
  styleUrl: './quickdelivery-form.component.css',
})
export class QuickdeliveryFormComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('quickdelivery')());
  
  deliveryTimes = ['Якнайшвидше', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

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
