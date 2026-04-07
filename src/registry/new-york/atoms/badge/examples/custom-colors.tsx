import { Badge } from '@/components/atoms/badge'

export function BadgeCustomColors() {
  return (
    <div className='flex flex-wrap gap-2'>
      <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-800'>
        Blue
      </Badge>
      <Badge className='bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-800'>
        Green
      </Badge>
      <Badge className='bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-800'>
        Sky
      </Badge>
      <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300 dark:hover:bg-purple-800'>
        Purple
      </Badge>
      <Badge className='bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-800'>
        Red
      </Badge>
    </div>
  )
}
