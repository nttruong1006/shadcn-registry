import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/atoms/alert'
import { Button } from '@/components/atoms/button'

// Component
export function AlertActionExample() {
  // Template
  return (
    <Alert className='max-w-md'>
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button size='sm' variant='default'>
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}
