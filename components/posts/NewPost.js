import Commentor from "./CommentorV3"
import TagsSelect from "../select/TagsSelect"
import { useCreatePost } from "../../usecases/posts"
import InputText from "../form/InputText"

export default function NewPost() {
    let { 
        tagsOptions,
        title,
        setTitle,
        handleSavePost,
        selectedTags,
        setSelectedTags
    } = useCreatePost()

    // let [subGroupType, setsubGroupType] = useState("All")
    //   let [savedTitle, setSavedTitle] = useState()

    //   const handleTitleSet = (e) => {
    //     e.preventDefault()
    //     setSavedTitle(e.target.value)
    //   }
    console.log(selectedTags)
    return (
        <>
            <div className="bg-black/[.1] rounded-[15px] flex flex-col justify-center px-8">
                <div className={"flex flex-col min-h-100 w-full space-y-1 "}>
                    <div className="flex flex-col justify-between mb-8 lg:w-1/2">
                        <div className="w-full mt-8 mb-2 text-2xl text-emph2">
                            <InputText
                                name={"title"}
                                placeholder="Title..."
                                value={title}
                                onChange={setTitle}
                            />
                        </div>

                        <TagsSelect
                            instanceId={"plum-postgroup-select"}
                            value={
                                selectedTags.map(t=>({
                                    label: t,
                                    value: t,
                                }))
                            }
                            handleSelect={(opt) => {
                                console.log("select", opt)
                                setSelectedTags(opt.map(v=>v.value))
                            }}
                            options={tagsOptions.map(o =>({label:o, value:o}))}
                        />
                    </div>

                    <Commentor
                        placeholder="Whats 🅱️rackin?"
                        onSave={handleSavePost}
                    />
                </div>
            </div>
        </>
    )
}
