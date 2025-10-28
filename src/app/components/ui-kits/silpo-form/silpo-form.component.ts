import { Component, computed } from '@angular/core';
import { UiButtonComponent } from '../../primitives/ui-button/ui-button.component';
import { UiInputComponent } from '../../primitives/ui-input/ui-input.component';
import { UiInputFloatingComponent } from '../../primitives/ui-input-floating/ui-input-floating.component';
import { UiCheckboxComponent } from '../../primitives/ui-checkbox/ui-checkbox.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-silpo-form',
  imports: [UiButtonComponent, UiInputComponent, UiInputFloatingComponent, UiCheckboxComponent],
  template: `
    <div class="silpo-form" [style]="formStyles()">
      <div class="form-header">
        <h3>🛒 Реєстрація в Сільпо</h3>
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
  styleUrl: './silpo-form.component.css',
})
export class SilpoFormComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('silpo')());

  formStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--form-bg': tokens.colorBackground,
      '--form-padding': tokens.padding,
      '--form-border-radius': tokens.borderRadius,
      '--form-shadow': tokens.shadowSize,
      '--form-primary': tokens.colorPrimary,
      '--form-secondary': tokens.colorSecondary,
    };
  });
}
