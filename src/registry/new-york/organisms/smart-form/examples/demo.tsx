import z from 'zod'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScroll,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '@/components/atoms/field'
import { useAppForm } from '@/components/organisms/smart-form/lib/form'
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
  getTextareaFieldSchema
} from '@/components/organisms/smart-form/lib/schema'

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
      <DialogTrigger render={<Button>Open</Button>} />

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Sign up form</DialogTitle>
          <DialogDescription>Fill information below to create the account</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <form
            className='space-y-6'
            id={form.formId}
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <form.AppForm>
              <form.FormContainer>
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
                      required
                      originalApiPath='/version/1.0/options/province'
                    />
                  )}
                </form.AppField> */}

                    <form.AppField name='fullName'>
                      {(field) => <field.Input label='Full name' required />}
                    </form.AppField>
                    <form.AppField name='age'>{(field) => <field.Number label='Age' required />}</form.AppField>
                    <form.AppField name='birthdate'>
                      {(field) => <field.Date label='Birthdate' required />}
                    </form.AppField>
                    <form.AppField name='gender'>
                      {(field) => (
                        <field.SelectWithOptions
                          label='Gender'
                          options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' }
                          ]}
                          required
                        />
                      )}
                    </form.AppField>
                    <form.AppField name='phoneNumber'>
                      {(field) => <field.PhoneNumber label='Phone number' required />}
                    </form.AppField>
                    <form.AppField name='email'>{(field) => <field.Input label='Email' required />}</form.AppField>
                    <form.AppField name='description'>
                      {(field) => <field.Textarea className='col-span-full' label='Description' required />}
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
                          options={[
                            { value: 'development', label: 'Development' },
                            { value: 'design', label: 'Design' },
                            { value: 'marketing', label: 'Marketing' }
                          ]}
                          required
                        />
                      )}
                    </form.AppField>
                    <form.AppField name='technologies'>
                      {(field) => (
                        <field.MultiSelectWithOptions
                          label='Technologies'
                          options={[
                            { value: 'react', label: 'React' },
                            { value: 'nextjs', label: 'Next.js' },
                            { value: 'tailwindcss', label: 'Tailwind CSS' },
                            { value: 'typescript', label: 'TypeScript' }
                          ]}
                          required
                        />
                      )}
                    </form.AppField>
                    <form.AppField name='graduatedUniversity'>
                      {(field) => (
                        <field.AutocompleteWithOptions
                          label='Graduated university'
                          options={[
                            'Ton Duc Thang University',
                            'Van Lang University',
                            'University of information technology'
                          ]}
                          required
                        />
                      )}
                    </form.AppField>
                    <form.AppField name='resumes'>
                      {(field) => <field.MultiFile className='col-span-full' label='Resumes' required />}
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
                    <form.AppField name='username'>
                      {(field) => <field.Input label='Username' required />}
                    </form.AppField>
                    <form.AppField name='password'>
                      {(field) => <field.Password label='Password' required />}
                    </form.AppField>
                    <form.AppField name='passwordConfirmation'>
                      {(field) => <field.Password label='Password confirmation' required />}
                    </form.AppField>
                    <form.AppField name='hobby'>
                      {(field) => <field.Editor className='col-span-full' label='Hobby' required />}
                    </form.AppField>
                  </div>
                </FieldSet>

                {/* Action buttons */}
                <div className='flex flex-col justify-stretch gap-4 xl:flex-row xl:justify-end'>
                  <Button
                    onClick={() => {
                      form.reset()
                    }}
                    variant='outline'
                  >
                    Cancel
                  </Button>

                  <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                      <Button disabled={!canSubmit} form={form.formId} loading={isSubmitting} type='submit'>
                        Submit
                      </Button>
                    )}
                  </form.Subscribe>
                </div>
              </form.FormContainer>
            </form.AppForm>
          </form>
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
