import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode, useMemo } from 'react'
import { Label } from '@/components/atoms/label'
import { Separator } from '@/components/atoms/separator'
import { cn } from '@/utils/ui'

export function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return (
    <fieldset
      className={cn(
        'flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className
      )}
      data-slot='field-set'
      {...props}
    />
  )
}

export function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      className={cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
      data-slot='field-legend'
      data-variant={variant}
      {...props}
    />
  )
}

export function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      data-slot='field-group'
      {...props}
    />
  )
}

const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
  defaultVariants: {
    orientation: 'vertical'
  },
  variants: {
    orientation: {
      horizontal:
        'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      responsive:
        '@md/field-group:flex-row flex-col @md/field-group:items-center *:w-full @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      vertical: 'flex-col *:w-full [&>.sr-only]:w-auto'
    }
  }
})

export type FieldProps = ComponentProps<'div'> & VariantProps<typeof fieldVariants>

export function Field({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: ignore
    <div
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot='field'
      role='group'
      {...props}
    />
  )
}

export function FieldContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('group/field-content flex flex-1 flex-col gap-1 leading-snug', className)}
      data-slot='field-content'
      {...props}
    />
  )
}

export function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-data-checked:border-primary/30 has-data-checked:bg-primary/5 *:data-[slot=field]:p-3 group-data-[disabled=true]/field:opacity-50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className
      )}
      data-slot='field-label'
      {...props}
    />
  )
}

export function FieldTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 font-medium text-sm group-data-[disabled=true]/field:opacity-50',
        className
      )}
      data-slot='field-label'
      {...props}
    />
  )
}

export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-left font-normal text-muted-foreground text-sm leading-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
        'nth-last-2:-mt-1 last:mt-0',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      data-slot='field-description'
      {...props}
    />
  )
}

export function FieldSeparator({
  children,
  className,
  ...props
}: ComponentProps<'div'> & {
  children?: ReactNode
}) {
  return (
    <div
      className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
      data-content={!!children}
      data-slot='field-separator'
      {...props}
    >
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <span
          className='relative mx-auto block w-fit bg-background px-2 text-muted-foreground'
          data-slot='field-separator-content'
        >
          {children}
        </span>
      )}
    </div>
  )
}

export type FieldErrorProps = ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}

export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className='ml-4 flex list-disc flex-col gap-1'>
        {uniqueErrors.map((error) => error?.message && <li key={error.message}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      className={cn('font-normal text-destructive text-sm', className)}
      data-slot='field-error'
      role='alert'
      {...props}
    >
      {content}
    </div>
  )
}
