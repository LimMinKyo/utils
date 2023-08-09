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

/**
 * 파일 다운로드 by Http
 * @param {string} url http 요청 주소
 * @param {string} fileName 다운로드시 파일이름
 */
export const downloadFileByHttp = async (url: string, fileName: string) => {
  return fetch(url)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};
