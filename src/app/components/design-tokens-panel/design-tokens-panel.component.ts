import { Component, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DesignTokensService } from '../../services/design-tokens.service';
import { UIKitType } from '../../models/design-tokens.interface';

@Component({
  selector: 'app-design-tokens-panel',
  imports: [FormsModule],
  template: `
    <aside class="tokens-panel">
      <div class="panel-header">
        <h2>Design Tokens</h2>
      </div>

      <div class="kit-selector">
        <label class="selector-label">Вибрати UI Kit:</label>
        <select 
          class="selector-dropdown"
          [(ngModel)]="selectedKit"
          (ngModelChange)="onKitChange()">
          <option value="silpo">🛒 Сільпо</option>
          <option value="loko">🚂 Локо</option>
          <option value="backoffice">💼 Бек Офіс</option>
        </select>
      </div>

      <div class="token-controls">
        <!-- Primary Color -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Primary Color</span>
            <span class="label-value">{{ currentTokens().colorPrimary }}</span>
          </label>
          <input 
            type="color" 
            class="color-input"
            [value]="currentTokens().colorPrimary"
            (input)="updateToken('colorPrimary', $any($event.target).value)">
        </div>

        <!-- Secondary Color -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Secondary Color</span>
            <span class="label-value">{{ currentTokens().colorSecondary }}</span>
          </label>
          <input 
            type="color" 
            class="color-input"
            [value]="currentTokens().colorSecondary"
            (input)="updateToken('colorSecondary', $any($event.target).value)">
        </div>

        <!-- Border Radius -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Border Radius</span>
            <span class="label-value">{{ currentTokens().borderRadius }}</span>
          </label>
          <input 
            type="range" 
            class="range-input"
            min="0" 
            max="24" 
            [value]="parseNumber(currentTokens().borderRadius)"
            (input)="updateToken('borderRadius', $any($event.target).value + 'px')">
        </div>

        <!-- Padding -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Padding</span>
            <span class="label-value">{{ currentTokens().padding }}</span>
          </label>
          <input 
            type="range" 
            class="range-input"
            min="8" 
            max="32" 
            [value]="parseNumber(currentTokens().padding)"
            (input)="updateToken('padding', $any($event.target).value + 'px')">
        </div>

        <!-- Font Size -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Font Size</span>
            <span class="label-value">{{ currentTokens().fontSize }}</span>
          </label>
          <input 
            type="range" 
            class="range-input"
            min="12" 
            max="20" 
            [value]="parseNumber(currentTokens().fontSize)"
            (input)="updateToken('fontSize', $any($event.target).value + 'px')">
        </div>

        <!-- Border Width -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Border Width</span>
            <span class="label-value">{{ currentTokens().borderWidth }}</span>
          </label>
          <input 
            type="range" 
            class="range-input"
            min="1" 
            max="4" 
            [value]="parseNumber(currentTokens().borderWidth)"
            (input)="updateToken('borderWidth', $any($event.target).value + 'px')">
        </div>

        <!-- Spacing -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Spacing</span>
            <span class="label-value">{{ currentTokens().spacing }}</span>
          </label>
          <input 
            type="range" 
            class="range-input"
            min="8" 
            max="32" 
            [value]="parseNumber(currentTokens().spacing)"
            (input)="updateToken('spacing', $any($event.target).value + 'px')">
        </div>

        <!-- Font Weight -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Font Weight</span>
            <span class="label-value">{{ currentTokens().fontWeight }}</span>
          </label>
          <select 
            class="select-input"
            [value]="currentTokens().fontWeight"
            (change)="updateToken('fontWeight', $any($event.target).value)">
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semibold (600)</option>
            <option value="700">Bold (700)</option>
          </select>
        </div>

        <!-- Input Style -->
        <div class="control-group">
          <label class="control-label">
            <span class="label-text">Input Style</span>
            <span class="label-value">{{ currentTokens().inputStyle }}</span>
          </label>
          <select 
            class="select-input"
            [value]="currentTokens().inputStyle"
            (change)="updateToken('inputStyle', $any($event.target).value)">
            <option value="standard">Standard</option>
            <option value="floating">Floating Label</option>
          </select>
        </div>

        <!-- Reset Button -->
        <button 
          class="reset-btn"
          (click)="resetTokens()">
          🔄 Reset to Default
        </button>
      </div>
    </aside>
  `,
  styleUrl: './design-tokens-panel.component.css',
})
export class DesignTokensPanelComponent {
  selectedKit: UIKitType = 'silpo';

  constructor(private tokensService: DesignTokensService) {
    // Sync with service changes
    effect(() => {
      const serviceKit = this.tokensService.getSelectedKit()();
      if (this.selectedKit !== serviceKit) {
        this.selectedKit = serviceKit;
      }
    });
  }

  currentTokens = computed(() => {
    return this.tokensService.getTokens(this.tokensService.getSelectedKit()())();
  });

  onKitChange(): void {
    this.tokensService.setSelectedKit(this.selectedKit);
  }

  updateToken(key: string, value: string): void {
    this.tokensService.updateToken(
      this.tokensService.getSelectedKit()(),
      key as any,
      value
    );
  }

  resetTokens(): void {
    this.tokensService.resetTokens(this.tokensService.getSelectedKit()());
  }

  parseNumber(value: string): number {
    return parseInt(value, 10) || 0;
  }
}
