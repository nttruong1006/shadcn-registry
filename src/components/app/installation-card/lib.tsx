import { CheckIcon, ClipboardIcon, XIcon } from 'lucide-react'

// Lib
export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const

export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export const PACKAGE_MANAGER_COMMAND_LINE_MAP: Record<PackageManager, string> = {
  pnpm: 'pnpm dlx',
  npm: 'npx',
  yarn: 'yarn',
  bun: 'bunx --bun'
}

export interface CommandLine {
  packageManager: PackageManager
  command: string
}

export interface ModuleProps {
  commandLines: CommandLine[]
}

export const copyStatusIconPerStatus = {
  idle: <ClipboardIcon />,
  done: <CheckIcon />,
  error: <XIcon />
}

export const copyStatusTextPerStatus = {
  idle: 'Copy',
  done: 'Copied',
  error: 'Error'
}
