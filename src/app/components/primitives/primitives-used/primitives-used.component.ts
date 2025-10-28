import { Component, input } from '@angular/core';

export interface PrimitiveInfo {
  name: string;
  description: string;
  path: string;
}

@Component({
  selector: 'app-primitives-used',
  template: `
    <div class="primitives-card">
      <div class="card-section">
        <h4 class="section-title">Використані примітиви:</h4>
        <div class="primitives-grid">
          @for (primitive of primitives(); track primitive.name) {
            <a [href]="primitive.path" target="_blank" class="primitive-badge">
              <span class="badge-name">{{ primitive.name }}</span>
            </a>
          }
        </div>
      </div>
      
      <div class="card-section">
        <a [href]="githubUrl()" target="_blank" class="github-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          Код форми
        </a>
      </div>
    </div>
  `,
  styles: [`
    .primitives-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      overflow: hidden;
    }

    .card-section {
      padding: 16px 20px;
    }

    .card-section:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }

    .section-title {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: #666;
    }

    .primitives-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .primitive-badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      background: #f0f4ff;
      border: 1px solid #667eea;
      border-radius: 6px;
      transition: all 0.2s ease;
      text-decoration: none;
      cursor: pointer;
    }

    .primitive-badge:hover {
      background: #667eea;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    .badge-name {
      font-size: 12px;
      font-weight: 600;
      color: #667eea;
      font-family: 'Courier New', monospace;
    }

    .primitive-badge:hover .badge-name {
      color: white;
    }

    .github-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      text-decoration: none;
      background: #f8f9fa;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .github-link:hover {
      background: #e9ecef;
      border-color: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .github-link svg {
      flex-shrink: 0;
    }
  `]
})
export class PrimitivesUsedComponent {
  primitives = input.required<PrimitiveInfo[]>();
  githubUrl = input.required<string>();
}
