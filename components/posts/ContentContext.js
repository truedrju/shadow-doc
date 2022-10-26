import { timeSince } from "../../utils/time"
import CirclePic from "../layoutV4/CirclePic"
import SpanColor from "./SpanColor"
import { COLOR_COMPONENT, SIZE_COMPONENT } from "../../consts"

export default function ContentContext({
    selectedTags,
    userName,
    userImage,
    time,
}) {
    return (
        <>
            <div className="flex justify-between items-center space-x-4">
                <div className="flex space-x-2">
                    <CirclePic imageURL={userImage} size={64} />
                    <p className="m-auto text-xs text-emph3">{userName}</p>
                </div>
                
                <div className="flex space-x-3">
                    <div className="flex flex-row space-x-1 flex-wrap">
                        {selectedTags?.map(tag => 
                            <SpanColor
                                key={tag}
                                content={tag}
                                color={COLOR_COMPONENT.WHITE}
                                size={SIZE_COMPONENT.SMALL}
                        />
                        )}
                    </div>
                    <p className="flex-2 text-emph3 my-auto text-xs opacity-70 justify-self-end">{`${timeSince(
                        Date.parse(time)
                    )} ago`}</p>
                </div>
            </div>
        </>
    )
}
