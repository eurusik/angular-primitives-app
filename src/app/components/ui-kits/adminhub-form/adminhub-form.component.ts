import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBriefcase } from '@ng-icons/heroicons/outline';
import { UiButtonComponent } from '../../primitives/ui-button/ui-button.component';
import { UiInputComponent } from '../../primitives/ui-input/ui-input.component';
import { UiInputFloatingComponent } from '../../primitives/ui-input-floating/ui-input-floating.component';
import { UiCheckboxComponent } from '../../primitives/ui-checkbox/ui-checkbox.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-adminhub-form',
  imports: [NgIcon, UiButtonComponent, UiInputComponent, UiInputFloatingComponent, UiCheckboxComponent],
  providers: [provideIcons({ heroBriefcase })],
  template: `
    <div class="adminhub-form" [style]="formStyles()">
      <div class="form-header">
        <h3><ng-icon name="heroBriefcase" size="20" /> ADMINHUB</h3>
        <p class="form-subtitle">Безпечний доступ для адміністраторів</p>
      </div>

      <div class="form-body">
        @if (tokens().inputStyle === 'floating') {
          <app-ui-input-floating 
            label="Ім'я користувача" 
            placeholder=" "
            [tokens]="tokens()" />
          
          <app-ui-input-floating 
            label="Пароль" 
            type="password"
            placeholder=" "
            [tokens]="tokens()" />
        } @else {
          <app-ui-input 
            label="Ім'я користувача" 
            placeholder="Введіть ім'я користувача"
            [tokens]="tokens()" />
          
          <app-ui-input 
            label="Пароль" 
            type="password"
            placeholder="••••••••"
            [tokens]="tokens()" />
        }
        
        <app-ui-checkbox 
          label="Увімкнути двофакторну автентифікацію"
          [tokens]="tokens()" />
      </div>

      <div class="form-footer">
        <app-ui-button 
          variant="primary"
          [tokens]="tokens()">
          Увійти в систему
        </app-ui-button>
        <app-ui-button 
          variant="secondary"
          [tokens]="tokens()">
          Допомога
        </app-ui-button>
      </div>

      <div class="form-notice">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 4v5h2V4H7zm0 6v2h2v-2H7z"/>
        </svg>
        <span>Всі дії логуються та моніторяться</span>
      </div>
    </div>
  `,
  styleUrl: './adminhub-form.component.css',
})
export class AdminhubFormComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('adminhub')());

  formStyles = computed(() => {
    const tokens = this.tokens();
    return {
      '--form-bg': tokens.formBackground,
      '--form-padding': tokens.padding,
      '--form-border-radius': tokens.borderRadius,
      '--form-shadow': tokens.shadowSize,
      '--form-text': tokens.colorText,
      '--form-primary': tokens.colorPrimary,
      '--form-secondary': tokens.colorSecondary,
      '--form-font-weight': tokens.fontWeight,
      '--form-spacing': tokens.spacing,
    };
  });
}
