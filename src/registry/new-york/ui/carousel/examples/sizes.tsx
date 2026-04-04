import { Card, CardContent } from '@/components/atoms/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/carousel'

// Component
export function CarouselSizes() {
  // Template
  return (
    <Carousel
      className='w-full max-w-48 sm:max-w-xs md:max-w-sm'
      opts={{
        align: 'start'
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
          <CarouselItem className='basis-1/2 lg:basis-1/3' key={index}>
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
