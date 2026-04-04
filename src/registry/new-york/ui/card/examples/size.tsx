import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'

// Component
export function CardSmall() {
  // Template
  return (
    <Card className='mx-auto w-full max-w-sm' size='sm'>
      <CardHeader>
        <CardTitle>Small Card</CardTitle>
        <CardDescription>This card uses the small size variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>The card component supports a size prop that can be set to &quot;sm&quot; for a more compact appearance.</p>
      </CardContent>
      <CardFooter>
        <Button className='w-full' size='sm' variant='outline'>
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}
