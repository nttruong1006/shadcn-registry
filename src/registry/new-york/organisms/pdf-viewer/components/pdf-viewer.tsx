import { PDFViewer as EmbedPDFViewer, type PDFViewerProps } from '@embedpdf/react-pdf-viewer'
import { themeOption } from './lib'

export function PDFViewer(props: PDFViewerProps) {
  return (
    <EmbedPDFViewer
      {...props}
      config={{
        theme: {
          dark: themeOption,
          light: themeOption
        },
        ...props.config
      }}
    />
  )
}
