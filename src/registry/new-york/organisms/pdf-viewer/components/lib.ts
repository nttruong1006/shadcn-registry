export const themeOption = {
  accent: {
    primary: 'var(--primary)',
    primaryHover: 'var(--accent)',
    primaryActive: 'var(--primary)',
    primaryLight: 'var(--primary)',
    primaryForeground: 'var(--primary-foreground)'
  },
  background: {
    app: 'var(--background)',
    surface: 'var(--background)',
    surfaceAlt: 'var(--background)',
    elevated: 'var(--popover)',
    input: 'var(--input)'
  },
  foreground: {
    primary: 'var(--foreground)',
    secondary: 'var(--secondary-foreground)',
    muted: 'var(--muted-foreground)',
    onAccent: 'var(--primary-foreground)'
  },
  interactive: {
    hover: 'var(--accent)',
    active: 'var(--primary)',
    selected: 'var(--accent)',
    focus: 'var(--primary)'
  },
  border: {
    default: 'var(--border)',
    subtle: 'var(--border)',
    strong: 'var(--border)'
  },
  state: {
    error: 'var(--destructive)',
    errorLight: 'var(--destructive)',
    warning: 'var(--warning)',
    warningLight: 'var(--warning)',
    success: 'var(--success)',
    successLight: 'var(--success)',
    info: 'var(--info)',
    infoLight: 'var(--info)'
  }
} as const
