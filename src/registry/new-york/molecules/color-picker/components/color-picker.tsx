// import { Range, Root, Thumb, Track } from '@radix-ui/react-slider'
// import Color, { type ColorInstance } from 'color'
// import { PipetteIcon } from 'lucide-react'
// import {
//   type ComponentProps,
//   createContext,
//   type HTMLAttributes,
//   memo,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState
// } from 'react'
// import { Button } from '@/registry/new-york/atoms/button/components/button'
// import { Input } from '@/registry/new-york/atoms/input/components/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/registry/new-york/atoms/select/components/select'
// import { cn } from '@/utils/ui'

// const formats = ['hex', 'rgb', 'hsl'] as const
// type Format = (typeof formats)[number]

// // Color picker
// interface ColorPickerContextValue {
//   hue: number
//   saturation: number
//   lightness: number
//   alpha: number
//   format: Format
//   setHue: (hue: number) => void
//   setSaturation: (saturation: number) => void
//   setLightness: (lightness: number) => void
//   setAlpha: (alpha: number) => void
//   setFormat: (mode: Format) => void
// }

// const ColorPickerContext = createContext<ColorPickerContextValue | null>(null)

// export const useColorPicker = () => {
//   const context = useContext(ColorPickerContext)
//   if (!context) {
//     throw new Error('useColorPicker must be used within a ColorPickerProvider')
//   }
//   return context
// }

// export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
//   value?: Parameters<typeof Color>[0]
//   defaultValue?: Parameters<typeof Color>[0]
//   onValueChange?: (value: ColorInstance) => void
// }

// export const ColorPicker = ({
//   value,
//   defaultValue = '#FFFFFF',
//   onValueChange,
//   className,
//   ...props
// }: ColorPickerProps) => {
//   const selectedColor = Color(value)
//   const defaultColor = Color(defaultValue)

//   // States
//   const [hue, setHue] = useState(selectedColor.hue() || defaultColor.hue() || 0)
//   const [saturation, setSaturation] = useState(selectedColor.saturationl() || defaultColor.saturationl() || 100)
//   const [lightness, setLightness] = useState(selectedColor.lightness() || defaultColor.lightness() || 50)
//   const [alpha, setAlpha] = useState(selectedColor.alpha() * 100 || defaultColor.alpha() * 100)
//   const [format, setFormat] = useState<Format>('hex')

//   // Effects
//   // Update color when controlled value changes
//   useEffect(() => {
//     if (value) {
//       const color = Color.rgb(value).rgb().object()
//       setHue(color.r)
//       setSaturation(color.g)
//       setLightness(color.b)
//       setAlpha(color.a)
//     }
//   }, [value])

//   // Notify parent of changes
//   useEffect(() => {
//     if (onValueChange) {
//       const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100)
//       onValueChange(color)
//     }
//   }, [hue, saturation, lightness, alpha, onValueChange])

//   // Template
//   return (
//     <ColorPickerContext.Provider
//       value={{
//         hue,
//         saturation,
//         lightness,
//         alpha,
//         format,
//         setHue,
//         setSaturation,
//         setLightness,
//         setAlpha,
//         setFormat
//       }}
//     >
//       <div className={cn('flex w-full flex-col gap-4', className)} {...props} />
//     </ColorPickerContext.Provider>
//   )
// }

// // Color picker selection
// export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>
// export const ColorPickerSelection = memo(({ className, ...props }: ColorPickerSelectionProps) => {
//   // Hooks
//   const { hue, setSaturation, setLightness } = useColorPicker()

//   // Refs
//   const containerRef = useRef<HTMLDivElement>(null)

//   // States
//   const [isDragging, setIsDragging] = useState(false)
//   const [positionX, setPositionX] = useState(0)
//   const [positionY, setPositionY] = useState(0)

//   // Methods
//   const movePointer = useCallback(
//     (event: PointerEvent) => {
//       if (!containerRef.current) {
//         return
//       }
//       const rect = containerRef.current.getBoundingClientRect()
//       const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
//       const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
//       setPositionX(x)
//       setPositionY(y)
//       setSaturation(x * 100)
//       const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x)
//       const lightness = topLightness * (1 - y)
//       setLightness(lightness)
//     },
//     [setSaturation, setLightness]
//   )

//   // Memos
//   const backgroundGradient = useMemo(() => {
//     return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
//             linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
//             hsl(${hue}, 100%, 50%)`
//   }, [hue])

//   // Effects
//   // Register events
//   useEffect(() => {
//     const upPointer = () => setIsDragging(false)
//     if (isDragging) {
//       window.addEventListener('pointermove', movePointer)
//       window.addEventListener('pointerup', upPointer)
//     }
//     return () => {
//       window.removeEventListener('pointermove', movePointer)
//       window.removeEventListener('pointerup', upPointer)
//     }
//   }, [isDragging, movePointer])

//   // Template
//   return (
//     <div
//       className={cn('relative aspect-video cursor-crosshair rounded', className)}
//       onPointerDown={(e) => {
//         e.preventDefault()
//         setIsDragging(true)
//         movePointer(e.nativeEvent)
//       }}
//       ref={containerRef}
//       style={{
//         background: backgroundGradient
//       }}
//       {...props}
//     >
//       <div
//         className='pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white'
//         style={{
//           left: `${positionX * 100}%`,
//           top: `${positionY * 100}%`,
//           boxShadow: '0 0 0 1px rgba(0,0,0,0.5)'
//         }}
//       />
//     </div>
//   )
// })
// ColorPickerSelection.displayName = 'ColorPickerSelection'

// // Color picker hue
// export type ColorPickerHueProps = ComponentProps<typeof Root>
// export const ColorPickerHue = ({ className, ...props }: ColorPickerHueProps) => {
//   // Hooks
//   const { hue, setHue } = useColorPicker()

//   // Template
//   return (
//     <Root
//       className={cn('relative flex h-4 w-full touch-none', className)}
//       max={360}
//       onValueChange={([hue]) => setHue(hue)}
//       step={1}
//       value={[hue]}
//       {...props}
//     >
//       <Track className='relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]'>
//         <Range className='absolute h-full' />
//       </Track>
//       <Thumb className='block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
//     </Root>
//   )
// }

// // Color picker alpha
// export type ColorPickerAlphaProps = ComponentProps<typeof Root>
// export const ColorPickerAlpha = ({ className, ...props }: ColorPickerAlphaProps) => {
//   // Hooks
//   const { alpha, setAlpha } = useColorPicker()

//   // Template
//   return (
//     <Root
//       className={cn('relative flex h-4 w-full touch-none', className)}
//       max={100}
//       onValueChange={([alpha]) => setAlpha(alpha)}
//       step={1}
//       value={[alpha]}
//       {...props}
//     >
//       <Track
//         className='relative my-0.5 h-3 w-full grow rounded-full'
//         style={{
//           background:
//             'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center'
//         }}
//       >
//         <div className='absolute inset-0 rounded-full bg-linear-to-r from-transparent to-primary/50' />
//         <Range className='absolute h-full rounded-full bg-transparent' />
//       </Track>
//       <Thumb className='block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
//     </Root>
//   )
// }

// // Color picker eye dropped
// export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>
// export const ColorPickerEyeDropper = ({ className, ...props }: ColorPickerEyeDropperProps) => {
//   // Hooks
//   const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker()

//   //Methods
//   const dropColor = async () => {
//     try {
//       // @ts-expect-error - EyeDropper API is experimental
//       const eyeDropper = new EyeDropper()
//       const result = await eyeDropper.open()
//       const color = Color(result.sRGBHex)
//       const [h, s, l] = color.hsl().array()
//       setHue(h)
//       setSaturation(s)
//       setLightness(l)
//       setAlpha(100)
//     } catch (error) {
//       console.error('EyeDropper failed:', error)
//     }
//   }

//   // Template
//   return (
//     <Button onClick={dropColor} size='icon' variant='outline' {...props}>
//       <PipetteIcon size={16} />
//     </Button>
//   )
// }

// // Color picker format
// export type ColorPickerFormatProps = ComponentProps<typeof SelectTrigger>
// export const ColorPickerFormat = ({ className, ...props }: ColorPickerFormatProps) => {
//   // Hooks
//   const { format, setFormat } = useColorPicker()

//   // Template
//   return (
//     <Select onValueChange={(value) => value && setFormat(value)} value={format}>
//       <SelectTrigger {...props}>
//         <SelectValue placeholder='Select format' />
//       </SelectTrigger>
//       <SelectContent>
//         {formats.map((format) => (
//           <SelectItem key={format} value={format}>
//             {format.toUpperCase()}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   )
// }

// // Color picker output
// const getColorOutput = ({ color, format }: { color: ColorInstance; format: Format }) => {
//   switch (format) {
//     case 'hex': {
//       return color.hex()
//     }
//     case 'rgb': {
//       return `rgb(${color
//         .rgb()
//         .array()
//         .map((value, index) => {
//           if (index === 3) {
//             return value
//           }
//           return `${Math.round(value)}`
//         })
//         .join(', ')})`
//     }
//     case 'hsl': {
//       return `hsl(${color
//         .hsl()
//         .array()
//         .map((value, index) => {
//           if (index === 0 || index === 3) {
//             return value
//           }
//           return `${Math.round(value)}%`
//         })
//         .join(', ')})`
//     }
//     default: {
//       return color.hex()
//     }
//   }
// }

// export const ColorPickerOutput = () => {
//   // Hooks
//   const { hue, saturation, lightness, alpha, format } = useColorPicker()
//   const color = Color.hsl(hue, saturation, lightness, alpha / 100)

//   // Template
//   return <Input readOnly type='text' value={getColorOutput({ color, format })} />
// }

export {}
