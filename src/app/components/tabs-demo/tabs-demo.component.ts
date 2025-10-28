import { Component, effect, signal, computed } from '@angular/core';
import { NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel } from 'ng-primitives/tabs';
import { FreshmartFormComponent } from '../ui-kits/freshmart-form/freshmart-form.component';
import { QuickdeliveryFormComponent } from '../ui-kits/quickdelivery-form/quickdelivery-form.component';
import { HeadlessComparisonComponent } from '../comparison/headless-comparison/headless-comparison.component';
import { DesignTokensPanelComponent } from '../design-tokens-panel/design-tokens-panel.component';
import { DesignTokensService } from '../../services/design-tokens.service';
import { UIKitType } from '../../models/design-tokens.interface';
import { AdminhubFormComponent } from '../ui-kits/adminhub-form/adminhub-form.component';

@Component({
  selector: 'app-tabs-demo',
  imports: [
    NgpTabset,
    NgpTabList,
    NgpTabButton,
    NgpTabPanel,
    FreshmartFormComponent,
    QuickdeliveryFormComponent,
    AdminhubFormComponent,
    HeadlessComparisonComponent,
    DesignTokensPanelComponent,
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
                <span class="tab-icon">🛒</span>
                <span class="tab-text">FreshMart</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="quickdelivery"
                class="tab-button">
                <span class="tab-icon">🚂</span>
                <span class="tab-text">QuickDelivery</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="adminhub"
                class="tab-button">
                <span class="tab-icon">💼</span>
                <span class="tab-text">AdminHub</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="comparison"
                class="tab-button">
                <span class="tab-icon">⚡</span>
                <span class="tab-text">Headless</span>
              </button>
            </div>

            <div class="tab-panels">
              <div ngpTabPanel ngpTabPanelValue="freshmart" class="tab-panel">
                <app-freshmart-form />
              </div>
              <div ngpTabPanel ngpTabPanelValue="quickdelivery" class="tab-panel">
                <app-quickdelivery-form />
              </div>
              <div ngpTabPanel ngpTabPanelValue="adminhub" class="tab-panel">
                <app-adminhub-form />
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
})
export class TabsDemoComponent {
  activeTab: UIKitType = 'freshmart';

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
