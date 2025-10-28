import { Component, effect, signal, computed } from '@angular/core';
import { NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel } from 'ng-primitives/tabs';
import { SilpoFormComponent } from '../ui-kits/silpo-form/silpo-form.component';
import { LokoFormComponent } from '../ui-kits/loko-form/loko-form.component';
import { BackOfficeFormComponent } from '../ui-kits/back-office-form/back-office-form.component';
import { DesignTokensPanelComponent } from '../design-tokens-panel/design-tokens-panel.component';
import { DesignTokensService } from '../../services/design-tokens.service';
import { UIKitType } from '../../models/design-tokens.interface';

@Component({
  selector: 'app-tabs-demo',
  imports: [
    NgpTabset,
    NgpTabList,
    NgpTabButton,
    NgpTabPanel,
    SilpoFormComponent,
    LokoFormComponent,
    BackOfficeFormComponent,
    DesignTokensPanelComponent,
  ],
  template: `
    <div class="demo-container" [style.background]="backgroundGradient()">
      <div class="demo-header">
        <h1>🎨 Angular Primitives Demo</h1>
        <p class="header-subtitle">
          Headless UI components with real-time design token customization
        </p>
      </div>

      <div class="demo-content">
        <div class="tabs-section">
          <div ngpTabset [(ngpTabsetValue)]="activeTab" (ngpTabsetValueChange)="onTabChange($event)" class="tabset">
            <div ngpTabList class="tab-list">
              <button 
                ngpTabButton 
                ngpTabButtonValue="silpo"
                class="tab-button">
                <span class="tab-icon">🛒</span>
                <span class="tab-text">Сільпо</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="loko"
                class="tab-button">
                <span class="tab-icon">🚂</span>
                <span class="tab-text">Локо</span>
              </button>
              <button 
                ngpTabButton 
                ngpTabButtonValue="backoffice"
                class="tab-button">
                <span class="tab-icon">💼</span>
                <span class="tab-text">Бек Офіс</span>
              </button>
            </div>

            <div class="tab-panels">
              <div ngpTabPanel ngpTabPanelValue="silpo" class="tab-panel">
                <app-silpo-form />
              </div>
              <div ngpTabPanel ngpTabPanelValue="loko" class="tab-panel">
                <app-loko-form />
              </div>
              <div ngpTabPanel ngpTabPanelValue="backoffice" class="tab-panel">
                <app-back-office-form />
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
  activeTab: UIKitType = 'silpo';

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
    if (tab && (tab === 'silpo' || tab === 'loko' || tab === 'backoffice')) {
      this.activeTab = tab as UIKitType;
      this.tokensService.setSelectedKit(tab as UIKitType);
    }
  }
}
