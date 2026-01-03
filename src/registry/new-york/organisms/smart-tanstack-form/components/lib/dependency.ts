import { useStore } from '@tanstack/react-form'
import React from 'react'
import { type SmartFormFieldData, useFormContext } from './base'

// Use dependency fields
export const useDependencyFields = ({ fieldData }: { fieldData: SmartFormFieldData }) => {
  // Hooks
  const form = useFormContext()

  // States
  const [dependencyFieldCodes] = React.useState(() => {
    return (
      fieldData.config?.referenceFields?.reduce<string[]>((acc, field) => {
        if (fieldData.config?.apiPath?.includes(`{${field.code}}`)) {
          acc.push(field.code)
        }
        return acc
      }, []) ?? []
    )
  })

  // Form
  const dependencyFieldsValue = useStore(form.store, (state) =>
    dependencyFieldCodes.reduce<Record<string, string | null>>((acc, fieldCode) => {
      acc[fieldCode] = state.values[fieldCode]
      return acc
    }, {})
  )

  return {
    dependencyFieldCodes,
    dependencyFieldsValue
  }
}

// Extract dependencies
export const extractDependencies = (apiPath?: string): string[] => {
  if (!apiPath) return []

  const regex = /\{([^}]+)\}/g
  const deps: string[] = []

  let match: RegExpExecArray | null
  match = regex.exec(apiPath)
  while (match) {
    deps.push(match[1])
    match = regex.exec(apiPath)
  }

  return deps
}

// Build dependent graph
export type DependentGraph = ReturnType<typeof buildDependentGraph>
export const buildDependentGraph = (fields: SmartFormFieldData[]) => {
  const graph = new Map<string, string[]>()

  fields.forEach((field) => {
    const deps = extractDependencies(field.config?.apiPath)

    deps.forEach((dep) => {
      if (!graph.has(dep)) {
        graph.set(dep, [])
      }
      graph.get(dep)?.push(field.code)
    })
  })

  return graph
}

// Get all dependents
export const getAllDependents = (graph: Map<string, string[]>, fieldCode: string): string[] => {
  const result = new Set<string>()

  const dfs = (code: string) => {
    const dependents = graph.get(code) ?? []
    for (const dep of dependents) {
      if (!result.has(dep)) {
        result.add(dep)
        dfs(dep)
      }
    }
  }

  dfs(fieldCode)
  return Array.from(result)
}
