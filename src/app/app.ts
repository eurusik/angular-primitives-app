import { Component } from '@angular/core';
import { TabsDemoComponent } from './components/tabs-demo/tabs-demo.component';

@Component({
  selector: 'app-root',
  imports: [TabsDemoComponent],
  template: '<app-tabs-demo />',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class App {}
