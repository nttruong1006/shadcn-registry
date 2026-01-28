import { type JSX, type LazyExoticComponent, lazy, Suspense, useId, useMemo, useRef, useState } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/registry/new-york/ui/dialog/components/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '@/registry/new-york/ui/field/components/field'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import { cn } from '@/utils/ui'
import type { FieldProps } from './field-container'
import type { SmartFormFieldType, SmartFormProps } from './lib/base'
import type { DependentGraph } from './lib/dependency'

const fieldComponents: Record<SmartFormFieldType, LazyExoticComponent<(props: FieldProps) => JSX.Element> | null> = {
  input: lazy(() => import('./input-field')),
  textarea: lazy(() => import('./textarea-field')),
  number: lazy(() => import('./number-field')),
  'phone-number': lazy(() => import('./phone-number-field')),
  password: lazy(() => import('./password-field')),
  'select-with-options': lazy(() => import('./select-with-options-field')),
  'select-with-query': lazy(() => import('./select-with-query-field')),
  'select-with-infinite-query': lazy(() => import('./select-with-infinite-query-field')),
  'multi-select-with-options': lazy(() => import('./multi-select-with-options-field')),
  'multi-select-with-query': lazy(() => import('./multi-select-with-query-field')),
  'multi-select-with-infinite-query': lazy(() => import('./multi-select-with-infinite-query-field')),
  'autocomplete-with-options': lazy(() => import('./autocomplete-with-options-field')),
  'autocomplete-with-query': lazy(() => import('./autocomplete-with-query-field')),
  'autocomplete-with-infinite-query': lazy(() => import('./autocomplete-with-infinite-query-field')),
  date: lazy(() => import('./date-field')),
  checkbox: lazy(() => import('./checkbox-field')),
  radio: null,
  file: lazy(() => import('./file-field')),
  'multi-file': lazy(() => import('./multi-file-field')),
  editor: lazy(() => import('./editor-field')),
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
  const formId = useId()

  // Refs
  const dependentGraphRef = useRef<DependentGraph>(null)

  // States
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] = useState(false)

  // Memos
  const isFormPending = useMemo(() => {
    return isPending || form.state.isSubmitting || form.state.isFormValidating
  }, [isPending, form.state.isSubmitting, form.state.isFormValidating])

  // Template
  return (
    <Suspense fallback={<Spinner className='mx-auto' />}>
      {/* Form */}
      <form
        className='space-y-6'
        id={formId}
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
                    <div className={cn('col-span-full', fieldData.className)} key={fieldData.code}>
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
                        dependentGraphRef={dependentGraphRef}
                        disabledFields={disabledFields}
                        fieldData={fieldData}
                        formData={formData}
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
            <Button onClick={cancel} variant='outline'>
              Cancel
            </Button>

            <Button form={formId} isLoading={isFormPending} type='submit'>
              {submitButtonText ?? 'Submit'}
            </Button>
          </div>
        ) : (
          slots.Actions
        )}
      </form>

      {/* Update confirmation dialog */}
      {isUpdateMode && (
        <Dialog onOpenChange={setIsOpenConfirmationDialog} open={isOpenConfirmationDialog}>
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

              <Button isLoading={isFormPending}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Suspense>
  )
}
