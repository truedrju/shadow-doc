import { useState, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { Slate, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { createEditor } from "slate"
import { Editable } from "slate-react"

import { Element, Leaf, withImages } from "./Elements"
import Commentor from "./CommentorV3"
import ContentContext from "./ContentContext"

export default function Comments({ comments }) {
    if (!comments || !comments.length) {
        return null
    }

    let { user } = useSelector((state) => state.user)

    return (
        <>
            {comments.map((c) => {
                if (!c && !c.content) {
                    return null
                }
                return (
                    <Comment
                        key={c.commentID}
                        userID={user && user.userId}
                        comment={c}
                    />
                )
            })}
        </>
    )
}

const Comment = ({ comment }) => {
    if (!comment.content) {
        return null
    }
    const handleSaveComment = async (data) => {
        console.log(data)
    }

    let [isCommenting, setIsCommenting] = useState(false)

    let content = JSON.parse(comment.content)
    return (
        <div className="pl-5">
            <div className="flex flex-col border-b border-plum-med-gray py-5">
                <ContentContext
                    talkType={"comment"}
                    talkID={comment.commentID}
                    userID={comment.userId}
                    userName={comment.userName}
                    userImage={comment.imageURL}
                    time={comment.createdTimeRead + "Z"}
                    interactions={comment.interactions}
                />
                {/* <div className="flex flex-row justify-start px-5 space-x-5">
          <div className="relative rounded-[50px] w-[46px] h-[46px] overflow-hidden"> <Image src={validOrDefaultImageURL(comment.imageURL, "/images/seed.svg")} layout="fill" />  </div>
          <p className="m-auto">{comment.userName}</p>
          <p className="m-auto text-xs opacity-70">{`${timeSince(Date.parse(comment.createdTimeRead+"Z"))} ago`}</p>
          <Voter
            interactions={comment.interactions}
            voteType={"post"}
            contentID={comment.postID}
            userID={comment.userId}
            size={12}
          />
        </div> */}
                <RenderComment content={content} />
                <div className="pr-5">
                    <button
                        className="text-[#9EA8D0]"
                        onClick={() => {
                            setIsCommenting(!isCommenting)
                        }}
                    >
                        Reply
                    </button>
                </div>

                {
                    //commentor nest
                    comment.replies?.map((reply) => {
                        let replyContent = JSON.parse(reply.content)

                        return (
                            <div key={reply.postID} className="flex flex-col bg-black/[.1] border border-slate-50 rounded-[15px] m-5 p-6">
                                <ContentContext
                                    talkType={"comment"}
                                    talkID={reply.commentID}
                                    userID={reply.userId}
                                    userName={reply.userName}
                                    userImage={reply.imageURL}
                                    time={reply.createdTimeRead + "Z"}
                                    interactions={reply.interactions}
                                />
                                <RenderComment content={replyContent} />

                                <div>
                                    <button
                                        className="text-[#9EA8D0]"
                                        onClick={() => {
                                            setIsCommenting(!isCommenting)
                                        }}
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {isCommenting && (
                <div className="pt-5">
                    <Commentor
                        // isLoading={isLoading}
                        onSave={handleSaveComment}
                    />
                </div>
            )}
        </div>
    )
}

function RenderComment({ content }) {
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        []
    )
    return (
        <Slate editor={editor} value={content}>
            <div>
                <Editable
                    className="my-2"
                    spellCheck
                    renderElement={(props) => <Element {...props} />}
                    renderLeaf={renderLeaf}
                    onChange={() => null}
                    readOnly
                />
            </div>
        </Slate>
    )
}
