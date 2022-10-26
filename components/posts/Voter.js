import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setIsLoginModalOpen } from "../../store/helperSlice"
import Image from "next/image"

export default function Voter({
    userID,
    voteType,
    contentID,
    interactions,
    size,
}) {
    let dispatch = useDispatch()
    let [upVotes, setUpVotes] = useState(0)
    let [downVotes, setDownVotes] = useState(0)
    let [userVote, setUserVote] = useState({})
    let [userVoteDirection, setUserVoteDirection] = useState({})
    let { user } = useSelector((state) => state.user)

    useEffect(() => {
        // count initial vote
        interactions &&
            interactions.forEach((interaction) => {
                if (interaction.userID == userID) {
                    setUserVote(interaction)
                }
                if (interaction.vote == 1) {
                    setUpVotes((upVotes += 1))
                } else if (interaction.vote == -1) {
                    setDownVotes((downVotes += 1))
                } else if (interaction.vote == 0) {
                    // no op it means we have an interaction with no vote direction
                }
            })
    }, [])

    useEffect(() => {
        setUserVoteDirection(Object.keys(userVote) && userVote.vote)
    }, [userVote.vote])

    const saveInteraction = (args) => console.log(args)

    const handleUpVoteClicked = async () => {
        if (!user || !user.userId) {
            dispatch(setIsLoginModalOpen(true))
            return
        }

        if (userVoteDirection == 1) {
            // user had upvoted already; undo upvote
            setUserVote({ vote: 0, interactionID: userVote.interactionID })
            setUpVotes((upVotes -= 1))

            await handleSaveInteraction(voteType, contentID, 0, user.userId)
        } else if (userVoteDirection == -1) {
            // user had downvoted already; reverse vote
            setUserVote({ vote: 1, interactionID: userVote.interactionID })
            setUpVotes((upVotes += 1))
            setDownVotes((downVotes -= 1))

            await handleSaveInteraction(voteType, contentID, 1, user.userId)
        } else {
            setUserVote({ vote: 1, interactionID: userVote.interactionID })
            setUpVotes((upVotes += 1))

            await handleSaveInteraction(voteType, contentID, 1, user.userId)
        }
    }

    const handleDownVoteClicked = async () => {
        if (!user || !user.userId) {
            dispatch(setIsLoginModalOpen(true))
            return
        }

        if (userVoteDirection == 1) {
            // user had upvoted already; reverse vote
            setUserVote({ vote: -1, interactionID: userVote.interactionID })
            setUpVotes((upVotes -= 1))
            setDownVotes((downVotes += 1))

            await handleSaveInteraction(voteType, contentID, -1, user.userId)
        } else if (userVoteDirection == -1) {
            // user had downvoted already; undo downvote
            setUserVote({ vote: 0, interactionID: userVote.interactionID })
            setDownVotes((downVotes -= 1))

            await handleSaveInteraction(voteType, contentID, 0, user.userId)
        } else {
            setUserVote({ vote: -1, interactionID: userVote.interactionID })
            setDownVotes((downVotes += 1))

            await handleSaveInteraction(voteType, contentID, -1, user.userId)
        }
    }

    const handleSaveInteraction = async (reactionTo, id, direction, userID) => {
        let interactionID
        let voteDirection = direction

        if (userVote.interactionID) {
            interactionID = userVote.interactionID
        }

        await saveInteraction({
            id,
            voteDirection,
            reactionTo,
            userID,
            interactionID,
        })
    }
    return (
        <div className="flex flex-row my-auto">
            <span
                className={`cursor-pointer text-[#9EA8D0] ${
                    userVoteDirection == 1 ? "opacity-100" : "opacity-30"
                }`}
                onClick={handleUpVoteClicked}
            >
                {" "}
                <Image
                    src={"/images/thrumb-up.svg"}
                    width={size}
                    height={size}
                />{" "}
            </span>{" "}
            <span className="ml-1 mr-3 cursor-pointer text-[#9EA8D0]">
                {upVotes}
            </span>
            <span
                className={`cursor-pointer text-[#9EA8D0] ${
                    userVoteDirection == -1 ? "opacity-100" : "opacity-30"
                }`}
                onClick={handleDownVoteClicked}
            >
                <Image
                    src={"/images/thrumb-down.svg"}
                    width={size}
                    height={size}
                />{" "}
            </span>{" "}
            <span className="ml-1 mr-3 cursor-pointer text-[#9EA8D0]">
                {downVotes}
            </span>
        </div>
    )
}
