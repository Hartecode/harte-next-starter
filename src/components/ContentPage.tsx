import { PageTemplateProps, PageProps } from '../interface/page'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import useEditModeState from '../lib/hooks/editModeState'

const DynamicPlainPage: ComponentType<PageTemplateProps> = dynamic(() => import('../components/PageTemplate'))
const DynamicEditorPage: ComponentType<PageProps> = dynamic(() => import('../components/PageEditor'))


const ContentPage = ({ file, formTitle }: PageProps) => {
  const editMode = useEditModeState()

  return (
    <>
      {editMode ? <DynamicEditorPage formTitle={formTitle} file={file} /> 
      : <DynamicPlainPage {...file?.data}/>}
    </>
  )
}

export default ContentPage