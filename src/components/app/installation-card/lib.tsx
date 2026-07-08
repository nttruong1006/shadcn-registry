import { CheckIcon, ClipboardIcon, XIcon } from 'lucide-react'

// Lib
export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const

export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export const PACKAGE_MANAGER_COMMAND_LINE_MAP: Record<PackageManager, string> = {
  bun: 'bunx --bun',
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn'
}

export interface CommandLine {
  command: string
  packageManager: PackageManager
}

export interface ModuleProps {
  commandLines: CommandLine[]
}

export const copyStatusIconPerStatus = {
  done: <CheckIcon />,
  error: <XIcon />,
  idle: <ClipboardIcon />
}

export const copyStatusTextPerStatus = {
  done: 'Copied',
  error: 'Error',
  idle: 'Copy'
}
