import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    // setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    console.log(secure_url);
    
    onUploaded && onUploaded(secure_url, height, width)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {/* {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />} */}
      <label className="upload-btn" htmlFor="imgUpload">Select from computer</label>
      <input hidden type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}

// export function ImgUploader1({ onUploaded = null }) {

//     const [imgData, setImgData] = useState({ imgUrl: null })
//     const [isUploading, setIsUploading] = useState(false)

//     async function uploadImg(ev) {
//         ev.preventDefault()
//         console.log("🚀 ~ uploadImg ~ ev:", ev)
//         setIsUploading(true)

//         const { secure_url } = await uploadService.uploadImg(ev)

//         setImgData({ imgUrl: secure_url, })
//         setIsUploading(false)
//         onUploaded && onUploaded(secure_url)
//     }

//     function getUploadLabel() {
//         if (imgData.imgUrl) return 'Change picture?'
//         return isUploading ? <img src="https://media.tenor.com/axAeNjNIUBsAAAAC/spinner-loading.gif" /> : 'Upload Image'
//     }

//     return (
//         <div >
//             <div >{getUploadLabel()}</div>


//             <label
//                 onDrop={uploadImg}
//                 // onDragOver={console.log}
//                 onDragOver={ev => ev.preventDefault()}
//             >

//                 <img src={imgData.imgUrl || 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png'} style={{ width: '200px', height: '200px' }} />

//                 <input hidden
//                     type="file"
//                     onChange={uploadImg} accept="img/*" />
//             </label>

//         </div>
//     )
// }