import { Component, computed, effect, signal } from '@angular/core';
import { NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel } from 'ng-primitives/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShoppingCart, heroTruck, heroBriefcase, heroBolt } from '@ng-icons/heroicons/outline';
import { FreshmartFormComponent } from '../ui-kits/freshmart-form/freshmart-form.component';
import { QuickdeliveryFormComponent } from '../ui-kits/quickdelivery-form/quickdelivery-form.component';
import { AdminhubFormComponent } from '../ui-kits/adminhub-form/adminhub-form.component';
import { HeadlessComparisonComponent } from '../comparison/headless-comparison/headless-comparison.component';
import { DesignTokensPanelComponent } from '../design-tokens-panel/design-tokens-panel.component';
import { PrimitivesUsedComponent, PrimitiveInfo } from '../primitives/primitives-used/primitives-used.component';
import { DesignTokensService } from '../../services/design-tokens.service';
import { UIKitType } from '../../models/design-tokens.interface';

@Component({
  selector: 'app-tabs-demo',
  imports: [
    NgpTabset,
    NgpTabList,
    NgpTabButton,
    NgpTabPanel,
    NgIcon,
    FreshmartFormComponent,
    QuickdeliveryFormComponent,
    AdminhubFormComponent,
    HeadlessComparisonComponent,
    DesignTokensPanelComponent,
    PrimitivesUsedComponent,
  ],
  template: `
    <div class="demo-container" [style.background]="backgroundGradient()">
      <div class="demo-header">
        <h1>Angular Primitives Demo</h1>
      </div>

      <div class="demo-content">
        <div class="tabs-section">
          <div ngpTabset [(ngpTabsetValue)]="activeTab" (ngpTabsetValueChange)="onTabChange($event)" class="tabset">
            <div ngpTabList class="tab-list">
              <button 
                ngpTabButton 
                ngpTabButtonValue="freshmart"
                class="tab-button">
                <ng-icon name="heroShoppingCart" class="tab-icon" />
                <span class="tab-text">FreshMart</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="quickdelivery"
                class="tab-button">
                <ng-icon name="heroTruck" class="tab-icon" />
                <span class="tab-text">QuickDelivery</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="adminhub"
                class="tab-button">
                <ng-icon name="heroBriefcase" class="tab-icon" />
                <span class="tab-text">AdminHub</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="comparison"
                class="tab-button">
                <ng-icon name="heroBolt" class="tab-icon" />
                <span class="tab-text">Headless</span>
              </button>
            </div>

            <div class="tab-panels">
              <div ngpTabPanel ngpTabPanelValue="freshmart" class="tab-panel">
                <div class="panel-layout">
                  <div class="form-column">
                    <app-freshmart-form />
                  </div>
                  <div class="info-column">
                    <app-primitives-used 
                      [primitives]="freshmartPrimitives()"
                      githubUrl="https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/ui-kits/freshmart-form" />
                  </div>
                </div>
              </div>
              <div ngpTabPanel ngpTabPanelValue="quickdelivery" class="tab-panel">
                <div class="panel-layout">
                  <div class="form-column">
                    <app-quickdelivery-form />
                  </div>
                  <div class="info-column">
                    <app-primitives-used 
                      [primitives]="quickdeliveryPrimitives()"
                      githubUrl="https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/ui-kits/quickdelivery-form" />
                  </div>
                </div>
              </div>
              <div ngpTabPanel ngpTabPanelValue="adminhub" class="tab-panel">
                <div class="panel-layout">
                  <div class="form-column">
                    <app-adminhub-form />
                  </div>
                  <div class="info-column">
                    <app-primitives-used 
                      [primitives]="adminhubPrimitives()"
                      githubUrl="https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/ui-kits/adminhub-form" />
                  </div>
                </div>
              </div>
              <div ngpTabPanel ngpTabPanelValue="comparison" class="tab-panel">
                <app-headless-comparison />
              </div>
            </div>
          </div>
        </div>

        <div class="tokens-section">
          <app-design-tokens-panel />
        </div>
      </div>

      <div class="demo-footer">
        <a href="https://github.com/eurusik/angular-primitives-app" target="_blank" class="github-link">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  `,
  styleUrl: './tabs-demo.component.css',
  providers: [provideIcons({ heroShoppingCart, heroTruck, heroBriefcase, heroBolt })],
})
export class TabsDemoComponent {
  activeTab: UIKitType = 'freshmart';

  freshmartPrimitives = computed(() => {
    const tokens = this.tokensService.getTokens('freshmart')();
    const isFloating = tokens.inputStyle === 'floating';
    
    return [
      isFloating 
        ? { name: 'UiInputFloatingComponent', description: 'Input з floating label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input-floating' }
        : { name: 'UiInputComponent', description: 'Базовий input з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input' },
      isFloating
        ? { name: 'UiComboboxFloatingComponent', description: 'Combobox з floating label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-combobox-floating' }
        : { name: 'UiComboboxComponent', description: 'Combobox з пошуком', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-combobox' },
      { name: 'UiCheckboxComponent', description: 'Checkbox з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-checkbox' },
      { name: 'UiButtonComponent', description: 'Кнопка з варіантами стилів', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-button' },
    ];
  });

  quickdeliveryPrimitives = computed(() => {
    const tokens = this.tokensService.getTokens('quickdelivery')();
    const isFloating = tokens.inputStyle === 'floating';
    
    return [
      isFloating 
        ? { name: 'UiInputFloatingComponent', description: 'Input з floating label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input-floating' }
        : { name: 'UiInputComponent', description: 'Базовий input з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input' },
      isFloating
        ? { name: 'UiComboboxButtonFloatingComponent', description: 'Button combobox з floating label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-combobox-button-floating' }
        : { name: 'UiComboboxButtonComponent', description: 'Button-only combobox', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-combobox-button' },
      { name: 'UiCheckboxComponent', description: 'Checkbox з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-checkbox' },
      { name: 'UiButtonComponent', description: 'Кнопка з варіантами стилів', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-button' },
    ];
  });

  adminhubPrimitives = computed(() => {
    const tokens = this.tokensService.getTokens('adminhub')();
    const isFloating = tokens.inputStyle === 'floating';
    
    return [
      isFloating 
        ? { name: 'UiInputFloatingComponent', description: 'Input з floating label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input-floating' }
        : { name: 'UiInputComponent', description: 'Базовий input з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-input' },
      { name: 'UiCheckboxComponent', description: 'Checkbox з label', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-checkbox' },
      { name: 'UiButtonComponent', description: 'Кнопка з варіантами стилів', path: 'https://github.com/eurusik/angular-primitives-app/tree/main/src/app/components/primitives/ui-button' },
    ];
  });

  constructor(private tokensService: DesignTokensService) {
    // Sync tokens panel changes to tab
    effect(() => {
      const selectedKit = this.tokensService.getSelectedKit()();
      if (this.activeTab !== selectedKit) {
        this.activeTab = selectedKit;
      }
    });
  }

  backgroundGradient = computed(() => {
    const currentKit = this.tokensService.getSelectedKit()();
    return this.tokensService.getTokens(currentKit)().backgroundGradient;
  });

  onTabChange(tab: string | undefined): void {
    if (tab && (tab === 'freshmart' || tab === 'quickdelivery' || tab === 'adminhub')) {
      this.activeTab = tab as UIKitType;
      this.tokensService.setSelectedKit(tab as UIKitType);
    }
  }
}
