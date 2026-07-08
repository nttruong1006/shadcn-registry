export const themeOption = {
  accent: {
    primary: 'var(--primary)',
    primaryActive: 'var(--primary)',
    primaryForeground: 'var(--primary-foreground)',
    primaryHover: 'var(--accent)',
    primaryLight: 'var(--primary)'
  },
  background: {
    app: 'var(--background)',
    elevated: 'var(--popover)',
    input: 'var(--input)',
    surface: 'var(--background)',
    surfaceAlt: 'var(--background)'
  },
  border: {
    default: 'var(--border)',
    strong: 'var(--border)',
    subtle: 'var(--border)'
  },
  foreground: {
    muted: 'var(--muted-foreground)',
    onAccent: 'var(--primary-foreground)',
    primary: 'var(--foreground)',
    secondary: 'var(--secondary-foreground)'
  },
  interactive: {
    active: 'var(--primary)',
    focus: 'var(--primary)',
    hover: 'var(--accent)',
    selected: 'var(--accent)'
  },
  state: {
    error: 'var(--destructive)',
    errorLight: 'var(--destructive)',
    info: 'var(--info)',
    infoLight: 'var(--info)',
    success: 'var(--success)',
    successLight: 'var(--success)',
    warning: 'var(--warning)',
    warningLight: 'var(--warning)'
  }
} as const
