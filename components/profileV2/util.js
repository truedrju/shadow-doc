export const validImageURL = (imageURL) => {
  if (!imageURL || !imageURL.includes("/")) {
      return false
  } 
  return true
}

export const validWebImageURL = (imageURL) => {
  if (!imageURL || !imageURL.includes("/")) {
      return false
  } 
  return (imageURL.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null)
}

export const validOrDefaultImageURL = (imageURL, defaultImageURL) => {
  if (!imageURL || !imageURL.includes("/")) {
      return defaultImageURL
  } 
  return imageURL
}

export const validStorageURL = (imageURL) => {
  if (!imageURL || !imageURL.includes("storage.googleapis.com")) {
      return false
  } 
  return true
}


//convert image url to base64
export const toDataURL = (url) => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

//convert image base64 to object
export function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
      u8arr[n] = bstr.charCodeAt(n)
      }
    return new File([u8arr], filename, {type:mime})
   }
