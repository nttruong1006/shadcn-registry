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
import { getAutocompleteFieldSchema } from '@/components/organisms/smart-form/lib/schemas/autocomplete'
import { getCheckboxFieldSchema } from '@/components/organisms/smart-form/lib/schemas/checkbox'
import { getDateFieldSchema } from '@/components/organisms/smart-form/lib/schemas/date'
import { getEditorFieldSchema } from '@/components/organisms/smart-form/lib/schemas/editor'
import { getInputFieldSchema } from '@/components/organisms/smart-form/lib/schemas/input'
import { getMultiFileFieldSchema } from '@/components/organisms/smart-form/lib/schemas/multi-file'
import { getMultiSelectFieldSchema } from '@/components/organisms/smart-form/lib/schemas/multi-select'
import { getNumberFieldSchema } from '@/components/organisms/smart-form/lib/schemas/number'
import { getPasswordFieldSchema } from '@/components/organisms/smart-form/lib/schemas/password'
import { getPhoneNumberFieldSchema } from '@/components/organisms/smart-form/lib/schemas/phone-number'
import { getSelectFieldSchema } from '@/components/organisms/smart-form/lib/schemas/select'
import { getTextareaFieldSchema } from '@/components/organisms/smart-form/lib/schemas/textarea'

const formSchema = z
  .object({
    age: getNumberFieldSchema({
      required: 'Please enter the age'
    }),
    birthdate: getDateFieldSchema({
      required: 'Please enter the birthdate'
    }),
    department: getSelectFieldSchema({
      required: 'Please select the department'
    }),
    description: getTextareaFieldSchema({
      required: 'Please enter the description'
    }),
    email: getInputFieldSchema({
      email: 'Please enter a valid email',
      required: 'Please enter the email'
    }),
    fullName: getInputFieldSchema({
      required: 'Please enter the full name'
    }),
    gender: getSelectFieldSchema({
      required: 'Please select the gender'
    }),
    graduatedUniversity: getAutocompleteFieldSchema({
      required: 'Please enter the graduated university'
    }),
    hobby: getEditorFieldSchema({
      required: 'Please enter the hobby'
    }),
    isDeepKnowledge: getCheckboxFieldSchema(),
    password: getPasswordFieldSchema({
      required: 'Please enter the password'
    }),
    passwordConfirmation: getPasswordFieldSchema(),
    phoneNumber: getPhoneNumberFieldSchema({
      phone: 'Please enter a valid phone number',
      required: 'Please enter the phone number'
    }),
    resumes: getMultiFileFieldSchema({
      required: 'Please upload the resumes'
    }),
    technologies: getMultiSelectFieldSchema({
      required: 'Please select the technologies'
    }),
    username: getInputFieldSchema({
      required: 'Please enter the username'
    })
  })
  .superRefine((value, context) => {
    const { password, passwordConfirmation } = value
    if (password !== passwordConfirmation) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
      })
    }
  })

const defaultFormValue: z.input<typeof formSchema> = {
  age: '',
  birthdate: null,
  department: null,
  description: '',
  email: '',
  fullName: '',
  gender: null,
  graduatedUniversity: '',
  hobby: '',
  isDeepKnowledge: false,
  password: '',
  passwordConfirmation: '',
  phoneNumber: '',
  resumes: [],
  technologies: [],
  username: ''
}

// Component
export const SmartFormDemo = () => {
  // Hooks
  const form = useAppForm({
    defaultValues: defaultFormValue,
    formId: 'smart-form-demo',
    onSubmit: ({ value }) => {
      const safeValue = formSchema.parse(value)
      console.log(safeValue)
    },
    validators: {
      onSubmit: formSchema
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
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' }
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
                            { label: 'Development', value: 'development' },
                            { label: 'Design', value: 'design' },
                            { label: 'Marketing', value: 'marketing' }
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
                            { label: 'React', value: 'react' },
                            { label: 'Next.js', value: 'nextjs' },
                            { label: 'Tailwind CSS', value: 'tailwindcss' },
                            { label: 'TypeScript', value: 'typescript' }
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
