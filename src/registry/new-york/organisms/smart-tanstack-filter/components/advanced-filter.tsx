import { formOptions } from '@tanstack/react-form'
import { CircleCheckBigIcon, ListFilterIcon, PlusIcon, RefreshCwIcon, TrashIcon } from 'lucide-react'
import { memo, Suspense, useState } from 'react'
import { Badge } from '@/registry/new-york/ui/badge/components/badge'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner.tsx'
import AdvancedFilterNameField from './advanced-filter-name-field'
import AdvancedFilterOperationField from './advanced-filter-operation-field'
import AdvancedFilterValueField from './advanced-filter-value-field'
import { type Filter, operationsPerType } from './lib/base'
import {
  advancedFilterFormSchema,
  defaultAdvancedFilterFormValue,
  defaultValuePerOperation,
  useAppForm
} from './lib/form'
import { useSmartFilterContext } from './smart-filter'

export const generateAdvancedFilterFormId = (id: string) => {
  return `${id}-advanced-filter`
}

export const advancedFilterFormOptions = formOptions({
  defaultValues: defaultAdvancedFilterFormValue,
  validators: { onSubmit: advancedFilterFormSchema }
})

// Component
const AdvancedFilter = memo(() => {
  // Hooks
  const { id, filters, setFilters } = useSmartFilterContext()
  const formId = generateAdvancedFilterFormId(id)

  const advancedFilterForm = useAppForm({
    formId,
    defaultValues: defaultAdvancedFilterFormValue,
    validators: { onSubmit: advancedFilterFormSchema },
    onSubmit: ({ value }) => {
      const safeValue = advancedFilterFormSchema.parse(value)
      setFilters(safeValue.filters)
      setTotalFilterApplied(safeValue.filters.length)
      setIsOpenPopover(false)
    }
  })

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [totalFilterApplied, setTotalFilterApplied] = useState(0)

  // Methods
  const addFilter = (filter: Filter) => {
    const { name, type } = filter
    const operation = operationsPerType[type][0]
    advancedFilterForm.pushFieldValue('filters', {
      name,
      type,
      operation,
      value: defaultValuePerOperation[operation]
    })
  }

  const executeLogicOnOpenPopover = () => {
    if (advancedFilterForm.state.values.filters.length === 0) {
      addFilter(filters[0])
    }
  }

  const clickAddingButton = () => {
    const selectedFilters = advancedFilterForm.state.values.filters.map((field) => field.name)
    const unSelectFilters = filters.filter((filter) => !selectedFilters.includes(filter.name))
    if (unSelectFilters.length > 0) {
      addFilter(unSelectFilters[0])
    }
  }

  const resetFilter = () => {
    advancedFilterForm.clearFieldValues('filters')
    setTotalFilterApplied(0)
    setFilters(defaultAdvancedFilterFormValue.filters)
    if (filters.length > 0) {
      addFilter(filters[0])
    }
  }

  // Template
  return (
    <advancedFilterForm.AppForm>
      <form
        id={advancedFilterForm.formId}
        onSubmit={(e) => {
          e.preventDefault()
          advancedFilterForm.handleSubmit()
        }}
      >
        <Popover modal onOpenChange={setIsOpenPopover} open={isOpenPopover}>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <span>Filters</span>
              <ListFilterIcon />
              {totalFilterApplied > 0 && (
                <Badge
                  className='flex size-5 items-center justify-center rounded-sm p-0 leading-none'
                  variant='secondary'
                >
                  {totalFilterApplied}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align='start'
            className='w-(--radix-popper-available-width) xl:w-auto'
            onOpenAutoFocus={executeLogicOnOpenPopover}
          >
            <advancedFilterForm.AppField mode='array' name='filters'>
              {(field) => {
                return (
                  <>
                    <h3 className='typography-h3'>Filters</h3>
                    <div className='-mx-1 my-2 max-h-72 overflow-y-auto px-1'>
                      {/* Filters */}
                      {field.state.value.map((field, index) => (
                        <div className='flex gap-x-4' key={field.name}>
                          <div className='flex grow flex-col gap-4 py-2 xl:w-auto xl:flex-row'>
                            {/* Name */}
                            <advancedFilterForm.AppField
                              listeners={{
                                onChange: ({ value }) => {
                                  if (!value) {
                                    return
                                  }

                                  const selectedFilter = filters.find((filter) => filter.name === value)
                                  if (!selectedFilter) {
                                    return
                                  }

                                  const operation = operationsPerType[selectedFilter.type][0]
                                  advancedFilterForm.setFieldValue(`filters[${index}].type`, selectedFilter.type)
                                  advancedFilterForm.setFieldValue(`filters[${index}].operation`, operation)
                                  advancedFilterForm.setFieldValue(
                                    `filters[${index}].value`,
                                    defaultValuePerOperation[operation]
                                  )
                                }
                              }}
                              name={`filters[${index}].name`}
                            >
                              {(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field className='w-full shrink-0 xl:w-52' data-invalid={isInvalid}>
                                    <advancedFilterForm.Subscribe selector={(state) => state.values.filters}>
                                      {(formFilters) => <AdvancedFilterNameField formFilters={formFilters} />}
                                    </advancedFilterForm.Subscribe>

                                    {isInvalid && <FieldError errors={subField.state.meta.errors} />}
                                  </Field>
                                )
                              }}
                            </advancedFilterForm.AppField>

                            {/* Operation */}
                            <advancedFilterForm.AppField
                              listeners={{
                                onChange: ({ value }) => {
                                  if (!value) {
                                    return
                                  }

                                  const selectedFilter = filters.find((filter) => filter.name === value)
                                  if (!selectedFilter) {
                                    return
                                  }

                                  advancedFilterForm.setFieldValue(
                                    `filters[${index}].value`,
                                    defaultValuePerOperation[value]
                                  )
                                }
                              }}
                              name={`filters[${index}].operation`}
                            >
                              {(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field className='w-full shrink-0 xl:w-52' data-invalid={isInvalid}>
                                    <advancedFilterForm.Subscribe
                                      selector={(state) => state.values.filters[index].name}
                                    >
                                      {(formFilterName) => (
                                        <AdvancedFilterOperationField formFilterName={formFilterName} />
                                      )}
                                    </advancedFilterForm.Subscribe>
                                    {isInvalid && <FieldError errors={subField.state.meta.errors} />}
                                  </Field>
                                )
                              }}
                            </advancedFilterForm.AppField>

                            {/* Value */}
                            <Suspense
                              fallback={
                                <div className='flex items-center'>
                                  <Spinner />
                                </div>
                              }
                            >
                              <advancedFilterForm.AppField name={`filters[${index}].value`}>
                                {(subField) => {
                                  const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                  return (
                                    <Field className='w-full shrink-0 xl:w-52' data-invalid={isInvalid}>
                                      <advancedFilterForm.Subscribe
                                        selector={(state) => ({
                                          formFilterName: state.values.filters[index].name,
                                          formFilterOperation: state.values.filters[index].operation,
                                          formFilterValueAdditional: state.values.filters[index].value.additional
                                        })}
                                      >
                                        {({ formFilterName, formFilterOperation, formFilterValueAdditional }) => (
                                          <AdvancedFilterValueField
                                            formFilterName={formFilterName}
                                            formFilterOperation={formFilterOperation}
                                            formFilterValueAdditional={formFilterValueAdditional}
                                            index={index}
                                          />
                                        )}
                                      </advancedFilterForm.Subscribe>
                                      {isInvalid && <FieldError errors={subField.state.meta.errors} />}
                                    </Field>
                                  )
                                }}
                              </advancedFilterForm.AppField>
                            </Suspense>
                          </div>

                          {/* Remove button */}
                          <advancedFilterForm.Subscribe selector={(state) => state.values.filters.length}>
                            {(formFiltersLength) =>
                              formFiltersLength > 1 ? (
                                <Button
                                  className='mt-2 shrink-0'
                                  onClick={() => advancedFilterForm.removeFieldValue('filters', index)}
                                  size='icon'
                                  variant='outline'
                                >
                                  <TrashIcon className='h-4 w-4' />
                                </Button>
                              ) : null
                            }
                          </advancedFilterForm.Subscribe>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className='flex items-center justify-end gap-4'>
                      <advancedFilterForm.Subscribe selector={(state) => state.values.filters.length}>
                        {(formFiltersLength) =>
                          formFiltersLength < filters.length ? (
                            <Button onClick={clickAddingButton} variant='outline'>
                              <PlusIcon />
                              <span>Add</span>
                            </Button>
                          ) : null
                        }
                      </advancedFilterForm.Subscribe>

                      <Button onClick={resetFilter} variant='secondary'>
                        <RefreshCwIcon />
                        <span>Reset</span>
                      </Button>

                      <Button form={formId} type='submit'>
                        <CircleCheckBigIcon />
                        <span>Apply</span>
                      </Button>
                    </div>
                  </>
                )
              }}
            </advancedFilterForm.AppField>
          </PopoverContent>
        </Popover>
      </form>
    </advancedFilterForm.AppForm>
  )
})

AdvancedFilter.displayName = 'AdvancedFilter'
export default AdvancedFilter
