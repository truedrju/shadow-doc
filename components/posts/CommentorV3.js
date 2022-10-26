import { useState, useEffect, useMemo, useCallback } from "react"
import { saveImage } from "../../services/postsService"
import { UploadImage } from "./Elements"
import { Editable, withReact, Slate, useSlate } from "slate-react"
import NextImage from "next/image"
import isHotkey from "is-hotkey"
import { withHistory } from "slate-history"
import { createEditor, Editor, Transforms } from "slate"
import { Element, Leaf, withImages } from "./Elements"
import Loader from "../Loader"

const maxChar = 10360
const minChar = 2

const Commentor = ({ onSave, isLoading, placeholder = "Comment..." }) => {
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        []
    )
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    const [slateData, setSlateData] = useState(initialValue)

    const [imageURLs, setImageURLs] = useState([])

    const handleSaveImage = async (imageList) => {
        let firstImage = imageList[0]

        const body = new FormData()
        body.append("image", firstImage.file)
        let url = await saveImage(body)
        setImageURLs([url])
    }
    useEffect(() => {
        imageURLs &&
            imageURLs.map((url) => {
                insertImage(editor, url)
            })
    }, [imageURLs])


    let hasUserInput = hasWritten(slateData)
    return (
        <>
        <div className="w-full">
            <Slate
                editor={editor}
                value={slateData}
                onChange={(value) => {
                    setSlateData(value)

                    // setErrorText("")
                    //set validate error text
                    let totalCharacter = 0
                    value.forEach((node) =>
                        node.children.forEach(
                            (child) => (totalCharacter += child.text.length)
                        )
                    )

                    // if (totalCharacter < minChar) {
                    //     setErrorText(`Minimum ${minChar} character`)
                    // }

                    // if (totalCharacter > maxChar) {
                    //     setErrorText(`Maximum ${maxChar} character`)
                    // }
                }}
            >
                <div
                    className="h-fit min-h-[209px] bg-primary-black rounded-t-[15px] mb-[6px] overflow-hidden"
                >
                    
                    <Editable
                        className="m-5 font-medium placeholder-black-500 focus:outline-none !min-h-[209px]"
                        spellCheck
                        renderElement={(props) => (
                            <Element readOnly={false} {...props} />
                        )}
                        renderLeaf={renderLeaf}
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                        placeholder={placeholder}
                    />
                </div>

                <div className="flex flex-row">
                    <div className="w-full bg-primary-black h-[66px] rounded-bl-[15px] mr-[6px] flex flex-row p-2">
                        <ToolBtn type="mark" format="bold" size={19.416} />
                        <ToolBtn type="mark" format="italic" size={19.416} />
                        <ToolBtn type="mark" format="underline" size={20.652} />
                        <UploadImage
                            // images={images}
                            handleLoad={handleSaveImage}
                            size={20.652}
                        />
                    </div>
                    <div className="w-[200px] bg-primary-black h-[66px] rounded-br-[15px] flex flex-column justify-center">
                        <button
                            type="submit"
                            className={`m-auto ${
                                hasUserInput
                                    ? "bg-primary"
                                    : "bg-primary-medium-gray"
                            }  text-[#35302E] font-medium rounded-[70px] w-[93.95px] h-[28.95px]`}
                            disabled={!hasUserInput}
                            onClick={async (e) => {
                                e.preventDefault()
                                await onSave(slateData)
                                editor.children = initialValue
                            }}
                        >
                            {isLoading ? <Loader /> : "Save"}
                        </button>
                    </div>
                </div>
            </Slate>
        </div>
        {/* {errorText && <h1 className="text-rose-500">{errorText}</h1>} */}
        </>
    )
}

const hasWritten = (slateData) => {
    let hasWritten = false
    let totalCharacter = 0

    slateData.forEach((node) => {
        node.children.forEach((child) => {
            totalCharacter += child.text.length

            if (child.text || node.url) {
                hasWritten = true
            }

            //prevent click
            if (totalCharacter < minChar) {
                hasWritten = false
            }

            if (totalCharacter > maxChar) {
                hasWritten = false
            }
        })
    })
    return hasWritten
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format,
    })
    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(n.type),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    })

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const insertImage = (editor, url) => {
    const text = { text: "" }
    const image = { type: "image", url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const ToolBtn = ({ format, type, size }) => {
    let handler
    const [onClickHover, setOnClickHover] = useState(false)
    switch (type) {
        case "block":
            handler = toggleBlock
            break

        case "mark":
            handler = toggleMark
            break

        default:
            break
    }

    const editor = useSlate()
    return (
        <div
            className="rounded-[.3236em] py-[.3236em] px-[.5663em] my-0 mx-[.1618em] flex justify-center align-center cursor-pointer hover:bg-primary-black"
            onMouseDown={(event) => {
                event.preventDefault()
                setOnClickHover(!onClickHover)
                handler(editor, format)
            }}
            style={{ backgroundColor: onClickHover ? "#202124" : null }}
        >
            <NextImage
                src={`/images/${format}.svg`}
                height={size}
                width={size}
            />
        </div>
    )
}

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
]

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
}

const LIST_TYPES = ["numbered-list", "bulleted-list"]

export default Commentor
