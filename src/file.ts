/**
 * 파일 다운로드
 * @param data
 * @param fileName 다운로드시 파일이름
 */
export const downloadFile = (data: BlobPart, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
