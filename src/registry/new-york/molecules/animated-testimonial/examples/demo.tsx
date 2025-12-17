import {
  AnimatedTestimonial,
  AnimatedTestimonialCanopy,
  AnimatedTestimonialCard
} from '@/components/molecules/animated-testimonial'

// Component
const AnimatedTextDemo = () => {
  // Template
  return (
    <AnimatedTestimonial>
      <AnimatedTestimonialCanopy isPauseOnHover isApplyMask maskClassName='rounded-md' className='py-4'>
        {Array.from({ length: 20 }).map((_, index) => (
          <AnimatedTestimonialCard
            // biome-ignore lint/suspicious/noArrayIndexKey: ignore
            key={index}
            className='flex size-20 items-center justify-center rounded-md bg-primary text-primary-foreground'
          >
            {index + 1}
          </AnimatedTestimonialCard>
        ))}
      </AnimatedTestimonialCanopy>
    </AnimatedTestimonial>
  )
}

export default AnimatedTextDemo
