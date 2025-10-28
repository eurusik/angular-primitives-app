import { Component, input, computed } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { DesignTokens } from '../../../models/design-tokens.interface';

@Component({
  selector: 'app-ui-button',
  imports: [NgpButton],
  template: `
    <button 
      ngpButton
      [class]="'ui-button ui-button--' + variant()"
      [disabled]="disabled()"
      [style]="buttonStyles()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './ui-button.component.css',
})
export class UiButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  disabled = input<boolean>(false);
  tokens = input.required<DesignTokens>();

  buttonStyles = computed(() => {
    const tokens = this.tokens();
    const variant = this.variant();
    
    const baseStyles = {
      '--btn-padding': tokens.padding,
      '--btn-border-radius': tokens.borderRadius,
      '--btn-font-size': tokens.fontSize,
      '--btn-border-width': tokens.borderWidth,
      '--btn-shadow': tokens.shadowSize,
    };

    if (variant === 'primary') {
      return {
        ...baseStyles,
        '--btn-bg': tokens.colorPrimary,
        '--btn-color': '#FFFFFF',
        '--btn-border-color': tokens.colorPrimary,
      };
    } else if (variant === 'secondary') {
      return {
        ...baseStyles,
        '--btn-bg': tokens.colorSecondary,
        '--btn-color': '#FFFFFF',
        '--btn-border-color': tokens.colorSecondary,
      };
    } else {
      return {
        ...baseStyles,
        '--btn-bg': 'transparent',
        '--btn-color': tokens.colorPrimary,
        '--btn-border-color': tokens.colorPrimary,
      };
    }
  });
}
