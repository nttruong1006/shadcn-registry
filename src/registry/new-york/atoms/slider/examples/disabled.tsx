import { Slider } from '@/components/atoms/slider'

export function SliderDisabled() {
  return <Slider className='mx-auto w-full max-w-xs' defaultValue={[50]} disabled max={100} step={1} />
}
