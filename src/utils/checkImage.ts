const checkImage = (name: string) => {
  let isValid = true;
  if (!name.match(/(.*?)\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
    alert("jpg, png 이미지 형식만 업로드 할 수 있습니다.");
    isValid = false;
  }
  return isValid;
};
export default checkImage;
