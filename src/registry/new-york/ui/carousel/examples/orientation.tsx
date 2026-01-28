import { Card, CardContent } from '@/registry/new-york/ui/card/components/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/registry/new-york/ui/carousel/components/carousel'

// Component
export const CarouselOrientation = () => {
  // Template
  return (
    <Carousel
      className='w-full max-w-xs'
      opts={{
        align: 'start'
      }}
      orientation='vertical'
    >
      <CarouselContent className='-mt-1 h-[200px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Ignore
          <CarouselItem className='pt-1 md:basis-1/2' key={index}>
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
