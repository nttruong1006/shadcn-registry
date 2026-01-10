import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/ui'
import type { FieldProps } from './field-container'
import type { DependentGraph, SmartFormFieldType, SmartFormProps } from './lib'

const fieldComponents: Record<
  SmartFormFieldType,
  React.LazyExoticComponent<(props: FieldProps) => React.JSX.Element> | null
> = {
  input: React.lazy(() => import('./input-field')),
  textarea: React.lazy(() => import('./textarea-field')),
  number: React.lazy(() => import('./number-field')),
  'phone-number': React.lazy(() => import('./phone-number-field')),
  password: React.lazy(() => import('./password-field')),
  'select-with-options': React.lazy(() => import('./select-with-options-field')),
  'select-with-query': React.lazy(() => import('./select-with-query-field')),
  'select-with-infinite-query': React.lazy(() => import('./select-with-infinite-query-field')),
  'multi-select-with-options': React.lazy(() => import('./multi-select-with-options-field')),
  'multi-select-with-query': React.lazy(() => import('./multi-select-with-query-field')),
  'multi-select-with-infinite-query': React.lazy(() => import('./multi-select-with-infinite-query-field')),
  'autocomplete-with-options': React.lazy(() => import('./autocomplete-with-options-field')),
  'autocomplete-with-query': React.lazy(() => import('./autocomplete-with-query-field')),
  'autocomplete-with-infinite-query': React.lazy(() => import('./autocomplete-with-infinite-query-field')),
  date: React.lazy(() => import('./date-field')),
  checkbox: React.lazy(() => import('./checkbox-field')),
  radio: null,
  file: React.lazy(() => import('./file-field')),
  'multi-file': React.lazy(() => import('./multi-file-field')),
  editor: React.lazy(() => import('./editor-field')),
  label: null,
  slot: null
}

// Smart form
export const SmartForm = ({
  form,
  formData,
  isPending,
  isUpdateMode = false,
  slots,
  hiddenFields,
  disabledFields,
  submitButtonText,
  actionButtonsClassName,
  updateConfirmationDialogSlot,
  cancel
}: SmartFormProps) => {
  // Hooks
  const formId = React.useId()

  // Refs
  const dependentGraphRef = React.useRef<DependentGraph>(null)

  // States
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] = React.useState(false)

  // Memos
  const isFormPending = React.useMemo(() => {
    return isPending || form.state.isSubmitting || form.state.isFormValidating
  }, [isPending, form.state.isSubmitting, form.state.isFormValidating])

  // Template
  return (
    <React.Suspense fallback={<Spinner className='mx-auto' />}>
      {/* Form */}
      <form
        id={formId}
        className='space-y-6'
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        {formData.templates.map((template) => (
          <FieldSet key={template.code}>
            {/* Form template label */}
            {template.label && <FieldLegend>{template.label}</FieldLegend>}
            {template.description && <FieldDescription>{template.description}</FieldDescription>}

            {/* Form template fields */}
            <div className={cn('grid grid-cols-12 gap-x-4 gap-y-6', template.className)}>
              {template.fields.map((fieldData) => {
                // Hidden
                if (hiddenFields?.[fieldData.code]) {
                  return null
                }

                // Label
                if (fieldData.type === 'label') {
                  return (
                    <div key={fieldData.code} className={cn('col-span-full', fieldData.className)}>
                      <span className='font-bold text-base text-muted-foreground'>{fieldData.label}</span>
                    </div>
                  )
                }

                // Slot
                if (fieldData.type === 'slot') {
                  return (
                    <form.AppField key={fieldData.code} name={fieldData.code}>
                      {() => (
                        <div className={cn('group/field col-span-full', fieldData.className)}>
                          {slots?.[fieldData.code]}
                        </div>
                      )}
                    </form.AppField>
                  )
                }

                // Others
                const FieldComponent = fieldComponents[fieldData.type]
                return FieldComponent ? (
                  <form.AppField key={fieldData.code} name={fieldData.code}>
                    {() => (
                      <FieldComponent
                        formData={formData}
                        dependentGraphRef={dependentGraphRef}
                        fieldData={fieldData}
                        disabledFields={disabledFields}
                      />
                    )}
                  </form.AppField>
                ) : null
              })}
            </div>
          </FieldSet>
        ))}

        {/* Action buttons */}
        {slots?.Actions === undefined ? (
          <div className={cn('flex flex-col justify-stretch gap-4 xl:flex-row xl:justify-end', actionButtonsClassName)}>
            <Button variant='outline' onClick={cancel}>
              Cancel
            </Button>

            <Button type='submit' form={formId} isLoading={isFormPending}>
              {submitButtonText ?? 'Submit'}
            </Button>
          </div>
        ) : (
          slots.Actions
        )}
      </form>

      {/* Update confirmation dialog */}
      {isUpdateMode && (
        <Dialog open={isOpenConfirmationDialog} onOpenChange={setIsOpenConfirmationDialog}>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Update information</DialogTitle>
              <DialogDescription>Are you sure that you want to save the updated information?</DialogDescription>
            </DialogHeader>

            {updateConfirmationDialogSlot && <main>{updateConfirmationDialogSlot}</main>}

            <DialogFooter className='mt-6'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>

              <Button isLoading={isFormPending} onClick={() => {}}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </React.Suspense>
  )
}
