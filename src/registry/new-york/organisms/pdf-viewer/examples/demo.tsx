import { PDFViewer } from '@/registry/new-york/organisms/pdf-viewer/components/pdf-viewer'

// Component
export const PdfViewerDemo = () => {
  // Template
  return (
    <PDFViewer
      className='h-[400px] grow'
      config={{
        src: 'https://snippet.embedpdf.com/ebook.pdf'
      }}
    />
  )
}
