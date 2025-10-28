# Angular Primitives Demo

> Демонстрація переваг headless UI підходу з ng-primitives та design tokens

## Про проект

Інтерактивна демонстрація, яка показує як **headless UI бібліотеки** економлять час розробки та надають повний контроль над дизайном. Проект демонструє різницю між написанням UI компонентів з нуля (~1-2 спринти) vs використанням готових headless примітивів (~5 сторіків).

## Швидкий старт

```bash
# Встановити залежності
npm install

# Запустити dev server
ng serve

# Відкрити в браузері
http://localhost:4200
```

## Структура компонентів

```
src/app/components/
├── primitives/          # Базові UI компоненти
│   ├── ui-button/
│   ├── ui-input/
│   ├── ui-input-floating/
│   ├── ui-checkbox/
│   ├── ui-combobox/
│   ├── ui-combobox-floating/
│   ├── ui-combobox-button/
│   └── ui-combobox-button-floating/
├── ui-kits/            # Форми для різних брендів
│   ├── freshmart-form/
│   ├── quickdelivery-form/
│   └── adminhub-form/
├── comparison/         # Порівняння підходів
│   └── headless-comparison/
└── design-tokens-panel/ # Панель керування токенами
```

## Design Tokens

Всі компоненти використовують централізовані design tokens:

- **Colors** - Primary, Secondary, Background, Text, Border
- **Spacing** - Padding, Spacing, Border Width
- **Typography** - Font Size, Font Weight
- **Effects** - Border Radius, Shadow Size
- **Modes** - Standard / Floating Label

## Ліцензія

MIT

## Корисні посилання

- [ng-primitives Documentation](https://angularprimitives.com)
- [Angular Documentation](https://angular.dev)
