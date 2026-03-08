import { PDFViewer as EmbedPDFViewer, type PDFViewerProps } from '@embedpdf/react-pdf-viewer'
import { themeOption } from './lib'

// Component
export const PDFViewer = (props: PDFViewerProps) => {
  // Template
  return (
    <EmbedPDFViewer
      {...props}
      config={{
        theme: {
          light: themeOption,
          dark: themeOption
        },
        ...props.config
      }}
    />
  )
}
