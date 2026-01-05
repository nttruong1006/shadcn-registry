import { formOptions } from '@tanstack/react-form'
import { CircleCheckBig, ListFilter, Plus, RefreshCw, TrashIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import AdvancedFilterNameField from './advanced-filter-name-field'
import AdvancedFilterOperationField from './advanced-filter-operation-field'
import AdvancedFilterValueField from './advanced-filter-value-field'
import {
  advancedFilterFormSchema,
  defaultAdvancedFilterFormValue,
  defaultValuePerOperation,
  type Filter,
  operationsPerType,
  useAppForm
} from './lib'
import { useSmartFilterContext } from './smart-filter'

export const generateAdvancedFilterFormId = (id: string) => {
  return `${id}-advanced-filter`
}

export const advancedFilterFormOptions = formOptions({
  defaultValues: defaultAdvancedFilterFormValue,
  validators: { onSubmit: advancedFilterFormSchema }
})

// Component
const AdvancedFilter = React.memo(() => {
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
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)
  const [totalFilterApplied, setTotalFilterApplied] = React.useState(0)

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
        <Popover open={isOpenPopover} modal onOpenChange={setIsOpenPopover}>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <span>Filters</span>
              <ListFilter />
              {totalFilterApplied > 0 && (
                <Badge
                  variant='secondary'
                  className='flex size-5 items-center justify-center rounded-sm p-0 leading-none'
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
            <advancedFilterForm.AppField name='filters' mode='array'>
              {(field) => {
                return (
                  <React.Fragment>
                    <h3 className='typography-h3'>Filters</h3>
                    <div className='-mx-1 my-2 max-h-72 overflow-y-auto px-1'>
                      {/* Filters */}
                      {field.state.value.map((field, index) => (
                        <div key={field.name} className='flex gap-x-4'>
                          <div className='flex grow flex-col gap-4 py-2 xl:w-auto xl:flex-row'>
                            {/* Name */}
                            <advancedFilterForm.AppField
                              name={`filters[${index}].name`}
                              listeners={{
                                onChange: ({ value }) => {
                                  if (!value) return

                                  const selectedFilter = filters.find((filter) => filter.name === value)
                                  if (!selectedFilter) return

                                  const operation = operationsPerType[selectedFilter.type][0]
                                  advancedFilterForm.setFieldValue(`filters[${index}].type`, selectedFilter.type)
                                  advancedFilterForm.setFieldValue(`filters[${index}].operation`, operation)
                                  advancedFilterForm.setFieldValue(
                                    `filters[${index}].value`,
                                    defaultValuePerOperation[operation]
                                  )
                                }
                              }}
                            >
                              {(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid} className='w-full shrink-0 xl:w-52'>
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
                              name={`filters[${index}].operation`}
                              listeners={{
                                onChange: ({ value }) => {
                                  if (!value) return

                                  const selectedFilter = filters.find((filter) => filter.name === value)
                                  if (!selectedFilter) return

                                  advancedFilterForm.setFieldValue(
                                    `filters[${index}].value`,
                                    defaultValuePerOperation[value]
                                  )
                                }
                              }}
                            >
                              {(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid} className='w-full shrink-0 xl:w-52'>
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
                            <advancedFilterForm.AppField name={`filters[${index}].value`}>
                              {(subField) => {
                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid} className='w-full shrink-0 xl:w-52'>
                                    <advancedFilterForm.Subscribe
                                      selector={(state) => ({
                                        formFilterName: state.values.filters[index].name,
                                        formFilterOperation: state.values.filters[index].operation,
                                        formFilterValueAdditional: state.values.filters[index].value.additional
                                      })}
                                    >
                                      {({ formFilterName, formFilterOperation, formFilterValueAdditional }) => (
                                        <AdvancedFilterValueField
                                          index={index}
                                          formFilterName={formFilterName}
                                          formFilterOperation={formFilterOperation}
                                          formFilterValueAdditional={formFilterValueAdditional}
                                        />
                                      )}
                                    </advancedFilterForm.Subscribe>
                                    {isInvalid && <FieldError errors={subField.state.meta.errors} />}
                                  </Field>
                                )
                              }}
                            </advancedFilterForm.AppField>
                          </div>

                          {/* Remove button */}
                          <advancedFilterForm.Subscribe selector={(state) => state.values.filters.length}>
                            {(formFiltersLength) =>
                              formFiltersLength > 1 ? (
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='mt-2 shrink-0'
                                  onClick={() => advancedFilterForm.removeFieldValue('filters', index)}
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
                            <Button variant='outline' onClick={clickAddingButton}>
                              <Plus />
                              <span>Add</span>
                            </Button>
                          ) : null
                        }
                      </advancedFilterForm.Subscribe>

                      <Button variant='secondary' onClick={resetFilter}>
                        <RefreshCw />
                        <span>Reset</span>
                      </Button>

                      <Button form={formId} type='submit'>
                        <CircleCheckBig />
                        <span>Apply</span>
                      </Button>
                    </div>
                  </React.Fragment>
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
