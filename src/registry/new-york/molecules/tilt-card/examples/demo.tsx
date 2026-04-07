import { CardDescription, CardTitle } from '@/components/atoms/card'
import { TiltCard, TiltCardContent } from '@/components/molecules/tilt-card'

export function GradientPathBackgroundDemo() {
  return (
    <TiltCard className='w-80'>
      <TiltCardContent className='p-6'>
        <div className='mb-4 aspect-video rounded-xl bg-muted' />
        <CardTitle className='mb-2'>Interactive Tilt</CardTitle>
        <CardDescription>Move your cursor over this card to see the 3D tilt effect.</CardDescription>
      </TiltCardContent>
    </TiltCard>
  )
}
