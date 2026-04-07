import { AnimatedText } from '@/components/molecules/animated-text'

export function AnimatedTextLink() {
  return (
    <div className='w-full'>
      <AnimatedText
        linkUrls={['/', '/']}
        linkWords={['Lorem', 'Ipsum']}
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
    </div>
  )
}
