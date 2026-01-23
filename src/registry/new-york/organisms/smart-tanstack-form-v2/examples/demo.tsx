import z from 'zod'
import {
  getAutocompleteFieldSchema,
  getCheckboxFieldSchema,
  getDateFieldSchema,
  getEditorFieldSchema,
  getInputFieldSchema,
  getMultiFileFieldSchema,
  getMultiSelectFieldSchema,
  getNumberFieldSchema,
  getPasswordFieldSchema,
  getPhoneNumberFieldSchema,
  getSelectFieldSchema,
  getTextareaFieldSchema,
  useAppForm
} from '@/components/organisms/smart-tanstack-form-v2'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field'

const formSchema = z
  .object({
    fullName: getInputFieldSchema({
      required: 'Please enter the full name'
    }),
    age: getNumberFieldSchema({
      required: 'Please enter the age'
    }),
    birthdate: getDateFieldSchema({
      required: 'Please enter the birthdate'
    }),
    gender: getSelectFieldSchema({
      required: 'Please select the gender'
    }),
    phoneNumber: getPhoneNumberFieldSchema({
      required: 'Please enter the phone number',
      phone: 'Please enter a valid phone number'
    }),
    email: getInputFieldSchema({
      required: 'Please enter the email',
      email: 'Please enter a valid email'
    }),
    description: getTextareaFieldSchema({
      required: 'Please enter the description'
    }),
    department: getSelectFieldSchema({
      required: 'Please select the department'
    }),
    technologies: getMultiSelectFieldSchema({
      required: 'Please select the technologies'
    }),
    graduatedUniversity: getAutocompleteFieldSchema({
      required: 'Please enter the graduated university'
    }),
    resumes: getMultiFileFieldSchema({
      required: 'Please upload the resumes'
    }),
    isDeepKnowledge: getCheckboxFieldSchema(),
    username: getInputFieldSchema({
      required: 'Please enter the username'
    }),
    password: getPasswordFieldSchema({
      required: 'Please enter the password'
    }),
    passwordConfirmation: getPasswordFieldSchema(),
    hobby: getEditorFieldSchema({
      required: 'Please enter the hobby'
    })
  })
  .superRefine((value, context) => {
    const { password, passwordConfirmation } = value
    if (password !== passwordConfirmation) {
      context.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'Passwords do not match'
      })
    }
  })

const defaultFormValue: z.input<typeof formSchema> = {
  fullName: '',
  age: '',
  birthdate: null,
  gender: null,
  phoneNumber: '',
  email: '',
  description: '',
  department: null,
  technologies: [],
  graduatedUniversity: '',
  resumes: [],
  isDeepKnowledge: false,
  username: '',
  password: '',
  passwordConfirmation: '',
  hobby: ''
}

// Component
export const SmartFormDemo = () => {
  // Hooks
  const form = useAppForm({
    formId: 'smart-form-demo',
    defaultValues: defaultFormValue,
    validators: {
      onSubmit: formSchema
    },
    onSubmit: ({ value }) => {
      const safeValue = formSchema.parse(value)
      console.log(safeValue)
    }
  })

  // Template
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Sign up form</DialogTitle>
          <DialogDescription>Fill information below to create the account</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <form
            id={form.formId}
            className='space-y-6'
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            {/* Personal */}
            <FieldSet>
              <FieldLegend>Personal</FieldLegend>
              <FieldDescription>Fill personal information</FieldDescription>

              {/* Form template fields */}
              <div className='grid grid-cols-3 gap-x-4 gap-y-6'>
                {/* <form.AppField
                  name='province'
                  listeners={{
                    onChangeDebounceMs: 400,
                    onChange: () => {
                      form.setFieldValue('district', null)
                      form.setFieldValue('ward', null)
                    }
                  }}
                >
                  {(field) => (
                    <field.SelectWithQuery
                      label='Province'
                      isRequired
                      originalApiPath='/version/1.0/options/province'
                    />
                  )}
                </form.AppField> */}

                <form.AppField name='fullName'>{(field) => <field.Input label='Full name' isRequired />}</form.AppField>
                <form.AppField name='age'>{(field) => <field.Number label='Age' isRequired />}</form.AppField>
                <form.AppField name='birthdate'>{(field) => <field.Date label='Birthdate' isRequired />}</form.AppField>
                <form.AppField name='gender'>
                  {(field) => (
                    <field.SelectWithOptions
                      label='Gender'
                      isRequired
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' }
                      ]}
                    />
                  )}
                </form.AppField>
                <form.AppField name='phoneNumber'>
                  {(field) => <field.PhoneNumber label='Phone number' isRequired />}
                </form.AppField>
                <form.AppField name='email'>{(field) => <field.Input label='Email' isRequired />}</form.AppField>
                <form.AppField name='description'>
                  {(field) => <field.Textarea label='Description' isRequired className='col-span-full' />}
                </form.AppField>
              </div>
            </FieldSet>

            {/* Professional skills */}
            <FieldSet>
              <FieldLegend>Professional skills</FieldLegend>
              <FieldDescription>Fill professional skills</FieldDescription>

              {/* Form template fields */}
              <div className='grid grid-cols-3 gap-x-4 gap-y-6'>
                <form.AppField name='department'>
                  {(field) => (
                    <field.SelectWithOptions
                      label='Department'
                      isRequired
                      options={[
                        { value: 'development', label: 'Development' },
                        { value: 'design', label: 'Design' },
                        { value: 'marketing', label: 'Marketing' }
                      ]}
                    />
                  )}
                </form.AppField>
                <form.AppField name='technologies'>
                  {(field) => (
                    <field.MultiSelectWithOptions
                      label='Technologies'
                      isRequired
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'nextjs', label: 'Next.js' },
                        { value: 'tailwindcss', label: 'Tailwind CSS' },
                        { value: 'typescript', label: 'TypeScript' }
                      ]}
                    />
                  )}
                </form.AppField>
                <form.AppField name='graduatedUniversity'>
                  {(field) => (
                    <field.AutocompleteWithOptions
                      label='Graduated university'
                      isRequired
                      options={[
                        {
                          value: 'TDTU',
                          label: 'Ton Duc Thang University'
                        },
                        {
                          value: 'VLU',
                          label: 'Van Lang University'
                        },
                        {
                          value: 'UIT',
                          label: 'University of information technology'
                        }
                      ]}
                    />
                  )}
                </form.AppField>
                <form.AppField name='resumes'>
                  {(field) => <field.MultiFile label='Resumes' isRequired className='col-span-full' />}
                </form.AppField>
                <form.AppField name='isDeepKnowledge'>
                  {(field) => <field.Checkbox label='Is deep knowledge' />}
                </form.AppField>
              </div>
            </FieldSet>

            {/* Account */}
            <FieldSet>
              <FieldLegend>Account</FieldLegend>
              <FieldDescription>Fill account information</FieldDescription>

              {/* Form template fields */}
              <div className='grid grid-cols-3 gap-x-4 gap-y-6'>
                <form.AppField name='username'>{(field) => <field.Input label='Username' isRequired />}</form.AppField>
                <form.AppField name='password'>
                  {(field) => <field.Password label='Password' isRequired />}
                </form.AppField>
                <form.AppField name='passwordConfirmation'>
                  {(field) => <field.Password label='Password confirmation' isRequired />}
                </form.AppField>
                <form.AppField name='hobby'>
                  {(field) => <field.Editor label='Hobby' isRequired className='col-span-full' />}
                </form.AppField>
              </div>
            </FieldSet>

            {/* Action buttons */}
            <div className='flex flex-col justify-stretch gap-4 xl:flex-row xl:justify-end'>
              <Button
                variant='outline'
                onClick={() => {
                  form.reset()
                }}
              >
                Cancel
              </Button>

              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type='submit' form={form.formId} disabled={!canSubmit} isLoading={isSubmitting}>
                    Submit
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
