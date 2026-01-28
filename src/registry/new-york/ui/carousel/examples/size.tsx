import { Card, CardContent } from '@/registry/new-york/ui/card/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/registry/new-york/ui/carousel/components/carousel'

// Component
export const CarouselSize = () => {
  // Template
  return (
    <Carousel
      className='w-full max-w-sm'
      opts={{
        align: 'start'
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Ignore
          <CarouselItem className='md:basis-1/2 xl:basis-1/3' key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='font-semibold text-3xl'>{index + 1}</span>
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
