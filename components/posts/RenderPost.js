/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useMemo } from "react"
import { Slate, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { createEditor } from "slate"
import { Editable } from "slate-react"
import { Element, Leaf, withImages } from "./Elements"
import ContentContext from "./ContentContext"
// import Commentor from "./CommentorV3"
// import Comments from "./Comments"
// import { setToast, setIsLoginModalOpen } from "../../store/helperSlice"
// import Voter from "./Voter"

export default function RenderPost({
  title,
  selectedTags,
  content,
  userName,
  imageURL,
  createdTime,
  // includeCommentor,
  // postID,
  // interactions,
  // comments,
  // userID,
}) {

  // let dispatch = useDispatch()
  // let saveComment = (ok) => console.log(ok)
  // let { user } = useSelector((state) => state.user)
  // let [isCommenting, setIsCommenting] = useState(false)
  // const handleSaveComment = async (comment) => {
  //   if (!user || !user.userId) {
  //     dispatch(setIsLoginModalOpen(true))
  //     return
  //   }

  //   //  TODO save raw content
  //   let userID = user.userId
  //   let content = JSON.stringify(comment)
  //   let res = await saveComment({ content, userID, postID })
  //   if (res.data.commentID) {
  //     dispatch(setToast({ text: "Thanks for posting", type: "success" }))
  //   } else {
  //     console.error("comment not posted successfully")
  //   }
  // }

  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  let renderContent = JSON.parse(content)
  if (!renderContent) {
    return null
  }
  


  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )

  return (
    <div className="bg-primary-black border border-plum-med-gray rounded-[15px] py-4 px-9 space-y-5">
      <ContentContext
        selectedTags={selectedTags}
        userName={userName}
        userImage={imageURL} // refers to user image in repsonse TODO change that
        time={createdTime}
      />

      <h1 className="text-xl">{title}</h1>
      
      <Slate
        editor={editor}
        value={renderContent}
      >
        <div className="h-fit">
          <Editable
            className="mt-6 mb-12 text-sm"
            spellCheck
            renderElement={(props) => <Element {...props} />}
            renderLeaf={renderLeaf}
            onChange={() => null}
            readOnly
          />
        </div>
      </Slate>

      {/* {includeCommentor && (
        <div className="flex justify-end">
          <Voter
            interactions={interactions}
            voteType={"post"}
            contentID={postID}
            userID={userID}
            size={16}
          />
          <button
            className="text-[#9EA8D0]"
            onClick={() => {
              setIsCommenting(!isCommenting)
            }}
          >
            Reply
          </button>
          <div className="border-t mb-3 border-plum-med-gray" />
        </div>
      )}

      {includeCommentor && (
        <div>
          {isCommenting && (
            <div className="pb-5">
              <Commentor
                onSave={handleSaveComment}
                placeholder="What do you think?"
              />
            </div>
          )}
          <Comments comments={comments} />
        </div>
      )} */}
    </div>
  )
}
