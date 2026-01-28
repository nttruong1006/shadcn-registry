import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import {
  type ComponentProps,
  createContext,
  type RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { cn } from '@/utils/ui'

interface TabsContextValue {
  value: string
  previousValue: string | null
  direction: number
  listRef: RefObject<HTMLDivElement | null>
  triggersRef: RefObject<Map<string, HTMLButtonElement>>
  registerTrigger: (value: string, element: HTMLButtonElement | null) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabsContext must be used within the Tabs')
  }
  return context
}

// Tabs
export const Tabs = ({
  className,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: ComponentProps<typeof Root>) => {
  // Refs
  const valuesRef = useRef<string[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map())

  // States
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [direction, setDirection] = useState(0)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  // Methods
  const changeValue = useCallback(
    (newValue: string) => {
      const currentIndex = valuesRef.current.indexOf(value)
      const newIndex = valuesRef.current.indexOf(newValue)
      setDirection(newIndex > currentIndex ? 1 : -1)
      setPreviousValue(value)
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [value, onValueChange]
  )

  const registerTrigger = useCallback((triggerValue: string, element: HTMLButtonElement | null) => {
    if (element) {
      triggersRef.current.set(triggerValue, element)
      if (!valuesRef.current.includes(triggerValue)) {
        valuesRef.current.push(triggerValue)
      }
    } else {
      triggersRef.current.delete(triggerValue)
      valuesRef.current = valuesRef.current.filter((v) => v !== triggerValue)
    }
  }, [])

  // Template
  return (
    <TabsContext value={{ value, previousValue, direction, triggersRef, listRef, registerTrigger }}>
      <Root
        className={cn('flex flex-col gap-2', className)}
        data-slot='tabs'
        onValueChange={changeValue}
        value={value}
        {...props}
      />
    </TabsContext>
  )
}

// Tabs list
export const TabsList = ({ className, children, ...props }: ComponentProps<typeof List>) => {
  // Hooks
  const { value, triggersRef, listRef } = useTabsContext()

  // States
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, left: 0 })

  // Effects
  useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButtonElement = triggersRef.current.get(value)
      const containerElement = listRef.current

      if (selectedButtonElement && containerElement) {
        const selectedButtonRect = selectedButtonElement.getBoundingClientRect()
        const containerRect = containerElement.getBoundingClientRect()

        setDimensions({
          width: selectedButtonRect.width,
          height: selectedButtonRect.height,
          left: selectedButtonRect.left - containerRect.left
        })
      }
    }

    requestAnimationFrame(updateDimensions)
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [value, triggersRef, listRef])

  // Template
  return (
    <List
      className={cn(
        'first relative inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        { '[&_button:first-child]:bg-primary': true },
        className
      )}
      data-slot='tabs-list'
      ref={listRef}
      {...props}
    >
      {dimensions.width > 0 && (
        <motion.div
          animate={{
            width: dimensions.width,
            left: dimensions.left,
            opacity: 1
          }}
          className='absolute rounded-md border bg-primary shadow-sm'
          initial={false}
          style={{
            height: dimensions.height
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30
          }}
        />
      )}
      {children}
    </List>
  )
}

// Tabs trigger
export const TabsTrigger = ({ className, value, ...props }: ComponentProps<typeof Trigger>) => {
  // Hooks
  const { registerTrigger } = useTabsContext()

  // Methods
  const register = useCallback(
    (element: HTMLButtonElement | null) => {
      registerTrigger(value, element)
    },
    [value, registerTrigger]
  )

  // Template
  return (
    <Trigger
      className={cn(
        "z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-muted-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='tabs-trigger'
      ref={register}
      value={value}
      {...props}
    />
  )
}

// Tabs content
export const TabsContent = ({ className, value, children, ...props }: ComponentProps<typeof Content>) => {
  // Hooks
  const { direction } = useTabsContext()

  // Template
  return (
    <Content
      className={cn('relative flex-1 outline-none', className)}
      data-slot='tabs-content'
      value={value}
      {...props}
    >
      <motion.div
        animate={{
          x: 0,
          opacity: 1,
          filter: 'blur(0px)'
        }}
        className='w-full'
        custom={direction}
        initial={{
          x: direction > 0 ? 80 : -80,
          opacity: 0,
          filter: 'blur(8px)'
        }}
        key={`tabs-content-${value}`}
        transition={{
          duration: 0.3,
          ease: [0.32, 0.72, 0, 1]
        }}
      >
        {children}
      </motion.div>
    </Content>
  )
}
