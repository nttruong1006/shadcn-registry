import { CircleCheckBigIcon, ListFilterIcon, PlusIcon, RefreshCwIcon, TrashIcon } from 'lucide-react'
import { Suspense, useState } from 'react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Field, FieldError } from '@/components/atoms/field'
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/atoms/popover'
import { Spinner } from '@/components/atoms/spinner'
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

export function generateAdvancedFilterFormId(id: string) {
  return `${id}-advanced-filter`
}

export default function AdvancedFilter() {
  const { id, filters, setFilters } = useSmartFilterContext()
  const formId = generateAdvancedFilterFormId(id)

  const [openPopover, setOpenPopover] = useState(false)
  const [totalFilterApplied, setTotalFilterApplied] = useState(0)

  const advancedFilterForm = useAppForm({
    defaultValues: defaultAdvancedFilterFormValue,
    formId,
    onSubmit: ({ value }) => {
      const safeValue = advancedFilterFormSchema.parse(value)
      setFilters(safeValue.filters)
      setTotalFilterApplied(safeValue.filters.length)
      setOpenPopover(false)
    },
    validators: { onSubmit: advancedFilterFormSchema }
  })

  function addFilter(filter: Filter) {
    const { name, type } = filter
    const [operation] = operationsPerType[type]
    advancedFilterForm.pushFieldValue('filters', {
      name,
      operation,
      type,
      value: defaultValuePerOperation[operation]
    })
  }

  function clickAddingButton() {
    const selectedFilters = advancedFilterForm.state.values.filters.map((field) => field.name)
    const unSelectFilters = filters.filter((filter) => !selectedFilters.includes(filter.name))
    if (unSelectFilters.length > 0) {
      addFilter(unSelectFilters[0])
    }
  }

  function resetFilter() {
    advancedFilterForm.clearFieldValues('filters')
    setTotalFilterApplied(0)
    setFilters(defaultAdvancedFilterFormValue.filters)
    if (filters.length > 0) {
      addFilter(filters[0])
    }
  }

  return (
    <Popover
      modal
      onOpenChange={(open) => {
        setOpenPopover(open)
        if (open && advancedFilterForm.state.values.filters.length === 0) {
          addFilter(filters[0])
        }
      }}
      open={openPopover}
    >
      <PopoverTrigger
        render={
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
        }
      />

      <PopoverContent align='start' className='w-auto'>
        <PopoverHeader>
          <PopoverTitle>Filters</PopoverTitle>
        </PopoverHeader>

        <advancedFilterForm.AppForm>
          <form
            id={advancedFilterForm.formId}
            onSubmit={(e) => {
              e.preventDefault()
              advancedFilterForm.handleSubmit()
            }}
          >
            <advancedFilterForm.AppField mode='array' name='filters'>
              {(field) => {
                return (
                  <>
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

                                  const [operation] = operationsPerType[selectedFilter.type]
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
                              {(nameField) => {
                                const isInvalid = nameField.state.meta.isTouched && !nameField.state.meta.isValid
                                return (
                                  <Field className='w-full shrink-0 xl:w-52' data-invalid={isInvalid}>
                                    <advancedFilterForm.Subscribe selector={(state) => state.values.filters}>
                                      {(formFilters) => <AdvancedFilterNameField formFilters={formFilters} />}
                                    </advancedFilterForm.Subscribe>
                                    {isInvalid && <FieldError errors={nameField.state.meta.errors} />}
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

                                  advancedFilterForm.setFieldValue(
                                    `filters[${index}].value`,
                                    defaultValuePerOperation[value]
                                  )
                                }
                              }}
                              name={`filters[${index}].operation`}
                            >
                              {(operationField) => {
                                const isInvalid =
                                  operationField.state.meta.isTouched && !operationField.state.meta.isValid
                                return (
                                  <Field className='w-full shrink-0 xl:w-52' data-invalid={isInvalid}>
                                    <advancedFilterForm.Subscribe
                                      selector={(state) => state.values.filters[index].name}
                                    >
                                      {(formFilterName) => (
                                        <AdvancedFilterOperationField formFilterName={formFilterName} />
                                      )}
                                    </advancedFilterForm.Subscribe>
                                    {isInvalid && <FieldError errors={operationField.state.meta.errors} />}
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
                                {(valueField) => {
                                  const isInvalid = valueField.state.meta.isTouched && !valueField.state.meta.isValid
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
                                      {isInvalid && <FieldError errors={valueField.state.meta.errors} />}
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
                    <div className='flex items-center justify-end gap-2'>
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
          </form>
        </advancedFilterForm.AppForm>
      </PopoverContent>
    </Popover>
  )
}
