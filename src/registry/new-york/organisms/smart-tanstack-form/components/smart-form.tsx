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
import { cn } from '@/utils/ui'
import AutocompleteWithInfiniteQueryField from './autocomplete-with-infinite-query-field'
import AutocompleteWithOptionsField from './autocomplete-with-options-field'
import AutocompleteWithQueryField from './autocomplete-with-query-field'
import CheckboxField from './checkbox-field'
import DateField from './date-field'
import EditorField from './editor-field'
import type { FieldProps } from './field-container'
import FileField from './file-field'
import InputField from './input-field'
import type { DependentGraph, SmartFormFieldType, SmartFormProps } from './lib'
import MultiFileField from './multi-file-field'
import MultiSelectWithInfiniteQueryField from './multi-select-with-infinite-query-field'
import MultiSelectWithOptionsField from './multi-select-with-options-field'
import MultiSelectWithQueryField from './multi-select-with-query-field'
import NumberField from './number-field'
import PasswordField from './password-field'
import PhoneNumberField from './phone-number-field'
import SelectWithInfiniteQueryField from './select-with-infinite-query-field'
import SelectWithOptionsField from './select-with-options-field'
import SelectWithQueryField from './select-with-query-field'
import TextareaField from './textarea-field'

// const fieldComponents: Record<SmartFormFieldType, React.LazyExoticComponent<({ fieldData, disabledFields }: FieldProps) => React.JSX.Element>>

const fieldComponents: Record<SmartFormFieldType, React.FC<FieldProps>> = {
  // input: React.lazy(() => import('./input-field') ),
  input: InputField,
  textarea: TextareaField,
  number: NumberField,
  'phone-number': PhoneNumberField,
  password: PasswordField,
  'select-with-options': SelectWithOptionsField,
  'select-with-query': SelectWithQueryField,
  'select-with-infinite-query': SelectWithInfiniteQueryField,
  'multi-select-with-options': MultiSelectWithOptionsField,
  'multi-select-with-query': MultiSelectWithQueryField,
  'multi-select-with-infinite-query': MultiSelectWithInfiniteQueryField,
  'autocomplete-with-options': AutocompleteWithOptionsField,
  'autocomplete-with-query': AutocompleteWithQueryField,
  'autocomplete-with-infinite-query': AutocompleteWithInfiniteQueryField,
  date: DateField,
  checkbox: CheckboxField,
  radio: () => null,
  file: FileField,
  'multi-file': MultiFileField,
  editor: EditorField,
  label: () => null,
  slot: () => null
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
    <React.Fragment>
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
            <FieldLegend>{template.label}</FieldLegend>
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
                return (
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
                )
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
    </React.Fragment>
  )
}
