import { Component, computed } from '@angular/core';
import { UiButtonComponent } from '../../primitives/ui-button/ui-button.component';
import { UiInputComponent } from '../../primitives/ui-input/ui-input.component';
import { UiCheckboxComponent } from '../../primitives/ui-checkbox/ui-checkbox.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-loko-form',
  imports: [UiButtonComponent, UiInputComponent, UiCheckboxComponent],
  template: `
    <div class="loko-form" [style]="formStyles()">
      <div class="form-header">
        <h3>🚂 Вхід в Локо</h3>
        <p class="form-subtitle">Швидка доставка за 30 хвилин</p>
      </div>

      <div class="form-body">
        <app-ui-input 
          label="Номер телефону" 
          type="tel"
          placeholder="+380 XX XXX XX XX"
          [tokens]="tokens()" />
        
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
      </div>

      <div class="form-extra">
        <a href="#" class="link">Забули пароль?</a>
      </div>
    </div>
  `,
  styleUrl: './loko-form.component.css',
})
export class LokoFormComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('loko')());

  formStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--form-bg': tokens.colorBackground,
      '--form-padding': tokens.padding,
      '--form-border-radius': tokens.borderRadius,
      '--form-shadow': tokens.shadowSize,
      '--form-primary': tokens.colorPrimary,
    };
  });
}
