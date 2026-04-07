import type { Component } from './lib'

function ComponentList({ title, type, components }: { title: string; type: string; components: Component[] }) {
  return (
    <div className='space-y-6'>
      <h3 className='font-bold text-2xl'>{title}</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-10'>
        {components.map((component) => (
          <a
            className='font-medium no-underline hover:underline'
            href={`/components/${type}/${component.name}`}
            key={component.name}
          >
            {component.title}
          </a>
        ))}
      </div>
    </div>
  )
}
export default ComponentList
