import { TiltCard, TiltCardContent } from '@/registry/new-york/molecules/tilt-card/components/tilt-card'
import { CardDescription, CardTitle } from '@/registry/new-york/ui/card/components/card'

// Component
const GradientPathBackgroundDemo = () => {
  // Template
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

export default GradientPathBackgroundDemo
