import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import Color, { type ColorInstance } from 'color'
import { PipetteIcon } from 'lucide-react'
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import { cn } from '@/utils/ui'

const formats = ['hex', 'rgb', 'hsl'] as const
type Format = (typeof formats)[number]

interface ColorPickerContextValue {
  alpha: number
  format: Format
  hue: number
  lightness: number
  saturation: number
  setAlpha: (alpha: number) => void
  setFormat: (mode: Format) => void
  setHue: (hue: number) => void
  setLightness: (lightness: number) => void
  setSaturation: (saturation: number) => void
}

const ColorPickerContext = createContext<ColorPickerContextValue | null>(null)

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext)
  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider')
  }
  return context
}

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0]
  defaultValue?: Parameters<typeof Color>[0]
  onValueChange?: (value: ColorInstance) => void
}

export function ColorPicker({ value, defaultValue = '#FFFFFF', onValueChange, className, ...props }: ColorPickerProps) {
  const selectedColor = Color(value)
  const defaultColor = Color(defaultValue)

  const [hue, setHue] = useState(selectedColor.hue() || defaultColor.hue() || 0)
  const [saturation, setSaturation] = useState(selectedColor.saturationl() || defaultColor.saturationl() || 100)
  const [lightness, setLightness] = useState(selectedColor.lightness() || defaultColor.lightness() || 50)
  const [alpha, setAlpha] = useState(selectedColor.alpha() * 100 || defaultColor.alpha() * 100)
  const [format, setFormat] = useState<Format>('hex')

  // Update color when controlled value changes
  useEffect(() => {
    if (value) {
      const color = Color.rgb(value).rgb().object()
      setHue(color.r)
      setSaturation(color.g)
      setLightness(color.b)
      setAlpha(color.a)
    }
  }, [value])

  // Notify parent of changes
  useEffect(() => {
    if (onValueChange) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100)
      onValueChange(color)
    }
  }, [hue, saturation, lightness, alpha, onValueChange])

  return (
    <ColorPickerContext.Provider
      value={{
        alpha,
        format,
        hue,
        lightness,
        saturation,
        setAlpha,
        setFormat,
        setHue,
        setLightness,
        setSaturation
      }}
    >
      <div className={cn('flex w-full flex-col gap-4', className)} {...props} />
    </ColorPickerContext.Provider>
  )
}

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>
export function ColorPickerSelection({ className, ...props }: ColorPickerSelectionProps) {
  const { hue, setSaturation, setLightness } = useColorPicker()

  const containerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const movePointer = useCallback(
    (event: PointerEvent) => {
      if (!containerRef.current) {
        return
      }
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
      setPositionX(x)
      setPositionY(y)
      setSaturation(x * 100)
      const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x)
      const lightness = topLightness * (1 - y)
      setLightness(lightness)
    },
    [setSaturation, setLightness]
  )

  // Register events
  useEffect(() => {
    const upPointer = () => setIsDragging(false)
    if (isDragging) {
      window.addEventListener('pointermove', movePointer)
      window.addEventListener('pointerup', upPointer)
    }
    return () => {
      window.removeEventListener('pointermove', movePointer)
      window.removeEventListener('pointerup', upPointer)
    }
  }, [isDragging, movePointer])

  return (
    <div
      className={cn('relative aspect-video cursor-crosshair rounded', className)}
      onPointerDown={(e) => {
        e.preventDefault()
        setIsDragging(true)
        movePointer(e.nativeEvent)
      }}
      ref={containerRef}
      style={{
        background: `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${hue}, 100%, 50%)`
      }}
      {...props}
    >
      <div
        className='pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white'
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.5)',
          left: `${positionX * 100}%`,
          top: `${positionY * 100}%`
        }}
      />
    </div>
  )
}

export type ColorPickerHueProps = SliderPrimitive.Root.Props
export function ColorPickerHue({ className, ...props }: ColorPickerHueProps) {
  const { hue, setHue } = useColorPicker()

  return (
    <SliderPrimitive.Root
      className={cn('w-full', className)}
      max={360}
      onValueChange={(value) => setHue(value as number)}
      step={1}
      value={hue}
      {...props}
    >
      <SliderPrimitive.Control className='relative flex w-full touch-none select-none items-center data-disabled:opacity-50'>
        <SliderPrimitive.Track className='relative h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]'>
          <SliderPrimitive.Indicator className='h-full select-none' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='relative block size-4 shrink-0 rounded-full border border-primary/50 bg-background shadow ring-ring/50 transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:outline-hidden focus-visible:ring-3 active:ring-3 disabled:pointer-events-none disabled:opacity-50' />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export type ColorPickerAlphaProps = SliderPrimitive.Root.Props
export function ColorPickerAlpha({ className, ...props }: ColorPickerAlphaProps) {
  const { alpha, setAlpha } = useColorPicker()

  return (
    <SliderPrimitive.Root
      className={cn('w-full', className)}
      max={100}
      onValueChange={(alpha) => setAlpha(alpha as number)}
      step={1}
      value={alpha}
      {...props}
    >
      <SliderPrimitive.Control className='relative flex w-full touch-none select-none items-center data-disabled:opacity-50'>
        <SliderPrimitive.Track className='relative h-3 w-full grow rounded-full bg-linear-to-r from-transparent to-primary/50'>
          <SliderPrimitive.Indicator className='h-full select-none' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='block size-4 shrink-0 rounded-full border border-primary/50 bg-background shadow ring-ring/50 transition-[color,box-shadow] after:absolute after:-inset-2 hover:ring-3 focus-visible:outline-hidden focus-visible:ring-3 active:ring-3 disabled:pointer-events-none disabled:opacity-50' />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>
export function ColorPickerEyeDropper({ className, ...props }: ColorPickerEyeDropperProps) {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker()

  const dropColor = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper()
      const result = await eyeDropper.open()
      const color = Color(result.sRGBHex)
      const [h, s, l] = color.hsl().array()
      setHue(h)
      setSaturation(s)
      setLightness(l)
      setAlpha(100)
    } catch (error) {
      console.error('EyeDropper failed:', error)
    }
  }

  return (
    <Button onClick={dropColor} size='icon' variant='outline' {...props}>
      <PipetteIcon />
    </Button>
  )
}

export type ColorPickerFormatProps = ComponentProps<typeof SelectTrigger>
export function ColorPickerFormat({ className, ...props }: ColorPickerFormatProps) {
  const { format, setFormat } = useColorPicker()

  return (
    <Select onValueChange={(value) => value && setFormat(value)} value={format}>
      <SelectTrigger {...props}>
        <SelectValue placeholder='Select format' />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function getColorOutput({ color, format }: { color: ColorInstance; format: Format }) {
  switch (format) {
    case 'hex': {
      return color.hex()
    }
    case 'rgb': {
      return `rgb(${color
        .rgb()
        .array()
        .map((value, index) => {
          if (index === 3) {
            return value
          }
          return `${Math.round(value)}`
        })
        .join(', ')})`
    }
    case 'hsl': {
      return `hsl(${color
        .hsl()
        .array()
        .map((value, index) => {
          if (index === 0 || index === 3) {
            return value
          }
          return `${Math.round(value)}%`
        })
        .join(', ')})`
    }
    default: {
      return color.hex()
    }
  }
}

export function ColorPickerOutput() {
  const { hue, saturation, lightness, alpha, format } = useColorPicker()
  const color = Color.hsl(hue, saturation, lightness, alpha / 100)

  return <Input readOnly type='text' value={getColorOutput({ color, format })} />
}
