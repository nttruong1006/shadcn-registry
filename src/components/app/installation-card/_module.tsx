import { Terminal } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Card, CardContent } from '@/registry/new-york/ui/card/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs/components/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'
import { copyStatusIconPerStatus, copyStatusTextPerStatus, type ModuleProps } from './lib'

// Component
export const InstallationTabsModule = ({ commandLines }: ModuleProps) => {
  // Refs
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  // States
  const [selectedTab, setSelectedTab] = useState<string>(commandLines[0].packageManager)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'error' | 'done'>('idle')

  // Methods
  // Copy
  const copy = async () => {
    try {
      if (copyStatus !== 'idle') {
        return
      }

      const selectedCommandLine = commandLines.find((commandLine) => commandLine.packageManager === selectedTab)
      if (!selectedCommandLine) {
        return
      }

      await navigator.clipboard.writeText(selectedCommandLine.command)
      setCopyStatus('done')
    } catch {
      setCopyStatus('error')
    } finally {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setCopyStatus('idle')
      }, 2000)
    }
  }

  // Template
  return (
    <Card className='bg-code p-0'>
      <CardContent className='not-content p-0'>
        <Tabs className='gap-0' onValueChange={setSelectedTab} value={selectedTab}>
          <div className='flex justify-between border-input border-b px-3 py-1'>
            <div className='flex items-center gap-2'>
              <div className='rounded-xs bg-foreground/70 p-1'>
                <Terminal className='size-3 text-code' />
              </div>

              <TabsList className='bg-code'>
                {commandLines.map((commandLine) => (
                  <TabsTrigger key={commandLine.packageManager} value={commandLine.packageManager}>
                    {commandLine.packageManager}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='text-muted-foreground' onClick={copy} size='icon-sm' variant='ghost'>
                  {copyStatusIconPerStatus[copyStatus]}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p> {copyStatusTextPerStatus[copyStatus]}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {commandLines.map((commandLine) => (
            <TabsContent
              className='overflow-x-auto py-3'
              key={commandLine.packageManager}
              value={commandLine.packageManager}
            >
              <pre>
                <code className='px-3 text-muted-foreground'>{commandLine.command}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
