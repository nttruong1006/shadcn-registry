import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import { Card, CardContent } from '@/registry/new-york/ui/card/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/registry/new-york/ui/carousel/components/carousel'

// Component
export const CarouselAutoplay = () => {
  // Refs
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  // Template
  return (
    <Carousel
      className='w-full max-w-xs'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Ignore
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='font-semibold text-4xl'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
