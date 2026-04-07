import { PDFViewer } from '@/components/organisms/pdf-viewer/pdf-viewer'

export function PdfViewerDemo() {
  return (
    <PDFViewer
      className='h-[400px] grow'
      config={{
        src: 'https://snippet.embedpdf.com/ebook.pdf'
      }}
    />
  )
}
