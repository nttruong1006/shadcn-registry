import { Kbd, KbdGroup } from '@/registry/new-york/ui/kbd/components/kbd'

// Component
export const KbdDemo = () => {
  // Template
  return (
    <div className='flex flex-col items-center gap-4'>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
