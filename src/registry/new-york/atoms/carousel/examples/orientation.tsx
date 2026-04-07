import { Card, CardContent } from '@/components/atoms/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/carousel'

export function CarouselOrientation() {
  return (
    <Carousel
      className='w-full max-w-xs'
      opts={{
        align: 'start'
      }}
      orientation='vertical'
    >
      <CarouselContent className='-mt-1 h-[270px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
          <CarouselItem className='basis-1/2 pt-1' key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex items-center justify-center p-6'>
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
