import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateThemeCssVariables,
  applyThemeToDom,
  clearThemeFromDom,
} from './theme.generator';
import type { NovaThemeConfig } from './theme.types';

describe('theme.generator', () => {
  it('should generate CSS variables from a color config', () => {
    const config: NovaThemeConfig = {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        danger: '#ef4444',
      },
    };

    const vars = generateThemeCssVariables(config);

    expect(vars['--nova-color-primary']).toBe('#6366f1');
    expect(vars['--nova-color-secondary']).toBe('#ec4899');
    expect(vars['--nova-color-danger']).toBe('#ef4444');
    expect(vars['--nova-color-primary-hover']).toBeDefined();
    expect(vars['--nova-color-primary-foreground']).toBeDefined();
    expect(vars['--nova-color-ring']).toBe('#6366f1');
  });

  it('should generate scaled radius variables from string shorthand', () => {
    const config: NovaThemeConfig = {
      radius: '10px',
    };

    const vars = generateThemeCssVariables(config);

    expect(vars['--nova-radius-md']).toBe('10px');
    expect(vars['--nova-radius-sm']).toBe('calc(10px * 0.75)');
    expect(vars['--nova-radius-lg']).toBe('calc(10px * 1.5)');
    expect(vars['--nova-radius-xl']).toBe('calc(10px * 2)');
  });

  it('should apply CSS variables and data attribute to an element', () => {
    const properties: Record<string, string> = {};
    const attributes: Record<string, string> = {};

    const mockEl = {
      setAttribute: (name: string, value: string) => {
        attributes[name] = value;
      },
      getAttribute: (name: string) => attributes[name],
      style: {
        setProperty: (prop: string, val: string) => {
          properties[prop] = val;
        },
        getPropertyValue: (prop: string) => properties[prop] || '',
        removeProperty: (prop: string) => {
          delete properties[prop];
        },
      },
    } as unknown as HTMLElement;

    const config: NovaThemeConfig = {
      mode: 'dark',
      colors: {
        primary: '#10b981',
      },
    };

    applyThemeToDom(config, mockEl);

    expect(mockEl.getAttribute('data-nova-theme')).toBe('dark');
    expect(mockEl.style.getPropertyValue('--nova-color-primary')).toBe('#10b981');

    clearThemeFromDom(mockEl);
    expect(mockEl.style.getPropertyValue('--nova-color-primary')).toBe('');
  });
});

