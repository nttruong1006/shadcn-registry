import { CircleCheckBigIcon, ListFilterIcon, PlusIcon, RefreshCwIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type UseFieldArrayReturn, useFormContext, useWatch } from 'react-hook-form'
import { Badge } from '@/registry/new-york/ui/badge/components/badge'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import AdvancedFilterNameField from './advanced-filter-name-field'
import AdvancedFilterOperationField from './advanced-filter-operation-field'
import AdvancedFilterValueField from './advanced-filter-value-field'
import { defaultSmartFilterFormValue, type Filter, type SmartFilterFormInput, type SmartFilterFormOutput } from './lib'
import { type SmartFilterProps, useSmartFilterContext } from './smart-filter'

// Component
const AdvancedFilter = ({
  formFilters,
  addFilter,
  setFilters
}: Pick<SmartFilterProps, 'setFilters'> & {
  formFilters: UseFieldArrayReturn<SmartFilterFormInput, 'filters'>
  addFilter: (filter: Filter) => void
}) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()
  const formFiltersWatcher = useWatch({
    control: form.control,
    name: 'filters'
  })

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [totalFilterApplied, setTotalFilterApplied] = useState(form.formState.defaultValues?.filters?.length ?? 0)

  // Methods
  const executeLogicOnOpenPopover = () => {
    if (formFilters.fields.length === 0) {
      addFilter(filters[0])
    }
  }

  const clickAddingButton = () => {
    const selectedFilters = formFiltersWatcher.map((field) => field.name)
    const unSelectFilters = filters.filter((filter) => !selectedFilters.includes(filter.name))
    if (unSelectFilters.length > 0) {
      addFilter(unSelectFilters[0])
    }
  }

  const resetFilter = () => {
    formFilters.remove()
    setTotalFilterApplied(0)
    setFilters(defaultSmartFilterFormValue)
    if (filters.length > 0) {
      addFilter(filters[0])
    }
  }

  const applyFilter = (fieldValues: SmartFilterFormOutput) => {
    setFilters(fieldValues)
    setTotalFilterApplied(fieldValues.filters.length)
    setIsOpenPopover(false)
  }

  // Template
  return (
    <Popover onOpenChange={setIsOpenPopover} open={isOpenPopover}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <span>Filters</span>
          <ListFilterIcon />
          {totalFilterApplied > 0 && (
            <Badge className='flex size-5 items-center justify-center rounded-sm p-0 leading-none' variant='secondary'>
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
        <h3 className='typography-h3'>Filters</h3>
        <div className='-mx-1 my-2 max-h-72 overflow-y-auto px-1'>
          {/* Filters */}
          {formFilters.fields.map((field, index) => (
            <div className='flex gap-x-4' key={field.id}>
              <div className='flex grow flex-col gap-4 py-2 xl:w-auto xl:flex-row'>
                {/* Name */}
                <Controller
                  control={form.control}
                  name={`filters.${index}.name`}
                  render={({ field, fieldState }) => (
                    <Field className='w-full shrink-0 xl:w-52' data-invalid={fieldState.invalid}>
                      <AdvancedFilterNameField field={field} formFiltersWatcher={formFiltersWatcher} index={index} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Operation */}
                <Controller
                  control={form.control}
                  name={`filters.${index}.operation`}
                  render={({ field, fieldState }) => (
                    <Field className='w-full shrink-0 xl:w-52' data-invalid={fieldState.invalid}>
                      <AdvancedFilterOperationField field={field} index={index} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Value */}
                <AdvancedFilterValueField index={index} />
              </div>

              {/* Remove button */}
              {formFilters.fields.length > 1 && (
                <Button
                  className='mt-2 shrink-0'
                  onClick={() => formFilters.remove(index)}
                  size='icon'
                  variant='outline'
                >
                  <TrashIcon className='h-4 w-4' />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end gap-4'>
          {formFilters.fields.length < filters.length && (
            <Button onClick={clickAddingButton} variant='outline'>
              <PlusIcon />
              <span>Add</span>
            </Button>
          )}

          <Button onClick={resetFilter} variant='secondary'>
            <RefreshCwIcon />
            <span>Reset</span>
          </Button>

          <Button onClick={form.handleSubmit(applyFilter)} type='submit'>
            <CircleCheckBigIcon />
            <span>Apply</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AdvancedFilter
