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
        <p>
          Built with 
          <a href="https://angularprimitives.com" target="_blank">ng-primitives</a>
          • Angular 20 • Signals
        </p>
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
