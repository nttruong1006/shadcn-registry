import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { SmartFormFieldData } from './base'

// Use dependency fields
export const useDependencyFields = ({ fieldData }: { fieldData: SmartFormFieldData }) => {
  // Hooks
  const { control } = useFormContext()

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
  const formDependencyFields = useWatch({
    name: dependencyFieldCodes,
    control,
    exact: true
  })

  // Memos
  const dependencyFieldValuePerCode = React.useMemo(() => {
    return dependencyFieldCodes.reduce<Record<string, string>>((acc, selectionFieldCode, index) => {
      acc[selectionFieldCode] = formDependencyFields[index]
      return acc
    }, {})
  }, [formDependencyFields, dependencyFieldCodes])

  return {
    dependencyFieldCodes,
    dependencyFieldValuePerCode
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
