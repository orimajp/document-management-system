export const useDocumentFolder = () => {
  const documentFolder = useState('documentFolder', () => '')

  return {
    documentFolder,
  }
}
