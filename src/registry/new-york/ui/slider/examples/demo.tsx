import { Slider } from '@/registry/new-york/ui/slider/components/slider'

// Component
export const SliderDemo = () => {
  // Template
  return <Slider className='max-w-xs' defaultValue={[50]} max={100} step={1} />
}
