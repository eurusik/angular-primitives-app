import { Component, computed } from '@angular/core';
import { UiComboboxComponent } from '../../primitives/ui-combobox/ui-combobox.component';
import { DesignTokensService } from '../../../services/design-tokens.service';

@Component({
  selector: 'app-headless-comparison',
  imports: [UiComboboxComponent],
  template: `
    <div class="comparison-container">
      <h2 class="comparison-title">Headless підхід</h2>
      <p class="comparison-subtitle">Як headless UI бібліотеки економлять час</p>
      
      <div class="comparison-grid">
        <!-- Custom Implementation -->
        <div class="comparison-side traditional">
          <div class="side-header">
            <h3>😰 Власна реалізація</h3>
          </div>
          
          <div class="demo-form">
            <div class="form-field">
              <label for="traditional-select">Оберіть місто</label>
              <select id="traditional-select" class="traditional-select">
                <option value="">Оберіть місто</option>
                <option value="kyiv">Київ</option>
                <option value="lviv">Львів</option>
                <option value="odesa">Одеса</option>
                <option value="kharkiv">Харків</option>
                <option value="dnipro">Дніпро</option>
              </select>
            </div>
          </div>
          
          <div class="limitations">
            <h4>Що треба реалізувати самому:</h4>
            <ul>
              <li>⏱️ Keyboard navigation (Arrow keys, Enter, Esc)</li>
              <li>⏱️ Focus management</li>
              <li>⏱️ ARIA attributes (accessibility)</li>
              <li>⏱️ Click outside detection</li>
              <li>⏱️ Scroll handling</li>
              <li>⏱️ Portal для dropdown</li>
              <li>⏱️ Touch events для мобільних</li>
              <li>⏱️ Screen reader підтримка</li>
            </ul>
          </div>
        </div>
        
        <!-- Headless UI -->
        <div class="comparison-side headless">
          <div class="side-header">
            <h3>✅ Headless UI </h3>
          </div>
          
          <div class="demo-form">
            <app-ui-combobox
              label="Оберіть місто"
              placeholder="Почніть вводити..."
              [options]="cities"
              [tokens]="tokens()" />
          </div>
          
          <div class="benefits">
            <h4>Що вже реалізовано:</h4>
            <ul>
              <li>✅ Keyboard navigation - готово</li>
              <li>✅ Focus management - готово</li>
              <li>✅ ARIA attributes - готово</li>
              <li>✅ Click outside - готово</li>
              <li>✅ Scroll handling - готово</li>
              <li>✅ Portal - готово</li>
              <li>✅ Touch events - готово</li>
              <li>✅ Screen reader - готово</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="try-it">
        <div class="try-it-content">
          <div class="savings-grid">
            <div class="saving-item">
              <div class="saving-number">1-2 спринти</div>
              <div class="saving-label">Розробка з нуля</div>
            </div>
            <div class="saving-arrow">→</div>
            <div class="saving-item highlight-saving">
              <div class="saving-number">5 сторіків</div>
              <div class="saving-label">З headless</div>
            </div>
          </div>
          <p class="highlight">Вся складна логіка вже реалізована. Фокусуємось в більшості на стилях!</p>
        </div>
      </div>
      
      <div class="code-comparison">
        <h3>Порівняння коду:</h3>
        <div class="code-grid">
          <div class="code-block">
            <h4>😰 Власна реалізація (~500+ рядків)</h4>
            <pre><code>// Keyboard navigation
handleKeyDown(event) {{'{'}}{{'}'}}
// Focus management  
manageFocus() {{'{'}}{{'}'}}
// ARIA attributes
setAriaAttributes() {{'{'}}{{'}'}}
// Click outside
@HostListener('document:click')
// Portal positioning
calculatePosition() {{'{'}}{{'}'}}
// Touch events
handleTouch() {{'{'}}{{'}'}}
// + багато іншого...</code></pre>
          </div>
          <div class="code-block">
            <h4>✅ headless (~100 рядків)</h4>
            <pre><code>&lt;div ngpCombobox&gt;
  &lt;input ngpComboboxInput /&gt;
  &lt;button ngpComboboxButton /&gt;
  &lt;div *ngpComboboxPortal 
       ngpComboboxDropdown&gt;
    &lt;div ngpComboboxOption&gt;
      {{'{'}}{{'{'}} option {{'}'}}{{'}'}}
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

/* Тільки стилі! */
[ngpComboboxDropdown] {{'{'}}{{'}'}}
  /* Ваш дизайн */
{{'}'}}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './headless-comparison.component.css',
})
export class HeadlessComparisonComponent {
  constructor(private tokensService: DesignTokensService) {}

  tokens = computed(() => this.tokensService.getTokens('silpo')());
  
  cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Запоріжжя'];
}
