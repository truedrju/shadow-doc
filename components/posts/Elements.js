import { useSlateStatic, ReactEditor, useSelected, useFocused, } from "slate-react"
import ImageUploading from 'react-images-uploading'
import { Transforms } from 'slate'
import { saveImage, deleteImage } from "../../services/postsService"
import { validWebImageURL, validStorageURL } from '../profileV2/util'

export const Element = ({ attributes, children, element, readOnly = true }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>
    case "list-item":
      return <li {...attributes}>{children}</li>
    case 'image':
      // eslint-disable-next-line react/no-children-prop
      return <Image attributes={attributes} children={children} element={element} readOnly={readOnly} />
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}


const Image = ({ attributes, children, element, readOnly }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div
        className="relative"
      // contentEditable={false}
      >
        <img
          src={element.url}
          className="block m-1"
          style={{ "box-shadow": (selected && focused) ? "0 0 0 3px #B4D5FF" : "none" }}
        />
        {!readOnly ? <button
          className="absolute top-[0.5em] left-[1em] text-[#B4D5FF] bg-white w-[25px] h-[25px] rounded-[5px]"
          style={{ "display": (selected && focused) ? "inline" : "none" }}
          onClick={async () => {
            const body = new FormData()
            body.append("urls", element.url)
            await deleteImage(body)
            Transforms.removeNodes(editor, { at: path })

            return
          }}
        >
          X
        </button> : <div />}
      </div>
    </div>
  )
}

const insertImage = async (editor, url) => {
  const text = { text: "" }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

//convert image url to base64
const toDataURL = (url) => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

//convert image base64 to object
function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
      while(n--){
      u8arr[n] = bstr.charCodeAt(n)
      }
    return new File([u8arr], filename, {type:mime})
   }

export const withImages = (editor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element)
  }

  editor.insertData = async (data) => {
    const text = data.getData("text/plain")
    const { files } = data

    //insert image file
    if (files && files.length > 0) {
      for (const file of files) {   
        const [mime] = file.type.split("/")

        if (mime === "image") {
          const body = new FormData()
          body.append("image", file)
          //save to our storagge first
          let url = await saveImage(body)
          insertImage(editor, url)   
        }
      }
    }
    else if(validStorageURL(text)){
      insertImage(editor, text)
    }
    //convert image url to our storage
    else if (validWebImageURL(text)) {
        toDataURL(text)
        .then(async (dataUrl) => {
           var fileData = dataURLtoFile(dataUrl, text)    
           const body = new FormData()
           body.append("image", fileData)
           let url = await saveImage(body)
           insertImage(editor, url)    
         }) 
    } 
    else {
      insertData(data)
    }
  }

  return editor
}

const maxNumber = 4
export const UploadImage = ({ images, handleLoad, size }) => {
  return (
    //TO DO: should remove ImageUploading unuse library
    <ImageUploading
      multiple
      value={images}
      onChange={handleLoad}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        onImageUpload,
        // imageList,
        // onImageRemoveAll,
        // onImageUpdate,
        // onImageRemove,
        isDragging,
        dragProps,
      }) => {
        return (
          // write your building UI
          <div className="upload__image-wrapper rounded-[.3236em] py-[.3236em] px-[.5663em] my-0 mx-[.1618em] flex justify-center align-center hover:bg-primary-black">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <img src={`/images/image.svg`} width={size} height={size} />
            </button>
            {/* &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button> */}
          </div>
        )
      }}
    </ImageUploading>
  )
}