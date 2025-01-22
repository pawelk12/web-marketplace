export const getOriginalFileName = (fileName: string) => {
    //uuid4-fileName
    //36 characters - fileName
    return fileName.slice(37);
}