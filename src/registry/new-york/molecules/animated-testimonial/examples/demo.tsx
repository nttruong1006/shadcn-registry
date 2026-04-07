import {
  AnimatedTestimonial,
  AnimatedTestimonialCanopy,
  AnimatedTestimonialCard
} from '@/components/molecules/animated-testimonial'

// Component
export function AnimatedTextDemo() {
  // Template
  return (
    <AnimatedTestimonial>
      <AnimatedTestimonialCanopy className='py-4' isApplyMask isPauseOnHover maskClassName='rounded-md'>
        {Array.from({ length: 20 }).map((_, index) => (
          <AnimatedTestimonialCard
            className='flex size-20 items-center justify-center rounded-md bg-primary text-primary-foreground'
            // biome-ignore lint/suspicious/noArrayIndexKey: ignore
            key={index}
          >
            {index + 1}
          </AnimatedTestimonialCard>
        ))}
      </AnimatedTestimonialCanopy>
    </AnimatedTestimonial>
  )
}
