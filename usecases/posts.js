import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPost, savePost, getPostsAll } from "../services/postsService"
import { setToast } from "../store/helperSlice"

export function useGetPostsAll() {
    let [posts, setPosts] = useState()
    useEffect(
        function getPosts() {

            async function run() {
                let {posts} = await getPostsAll()
                if (posts) setPosts([...posts, ...data])
                else setPosts(data)
                
            }
            run()
        },
        []
    )
    
    return {
        posts
    }
}

export function useGetPost() {
    let [post, setPost] = useState()

    let router = useRouter()
    let {postID} = router.query
    useEffect(
        function getPosts() {
            if (!postID) return    

            async function run() {
                let res = await getPost(postID)
                setPost(res.post)
            }
            run()
        },
        [postID]
    )
    
    return {
        post
    }

}

export function useCreatePost() {
    let dispatch = useDispatch()    
    let router = useRouter()

    let [selectedTags, setSelectedTags] = useState([])
    let [title, setTitle] = useState("")

    let { user } = useSelector((state) => state.user)

    const handleSavePost = async (data) => {
        let content = JSON.stringify(data)
        console.log("user", user)
        if (!user?.publicKey) {
            dispatch(
                setToast({
                    type: "error",
                    text: "user must sign in to post this",
                })
            )
            return
        }

        let {postID} = await savePost({
            selectedTags,
            title,
            content,
            userID: user.publicKey,
            userName: user.userName,
            imageURL: "https://source.unsplash.com/random/900×700/?crypto",
            createdTime: new Date()
        })

        router.push(`/posts/${postID}`)
    }

    return {
        setSelectedTags,
        selectedTags,
        title,
        setTitle,

        handleSavePost,
        tagsOptions,
    }
}


let tagsOptions = [
     "Life",
     "Startup",
     "Blockchain",
     "Poetry",
     "Life",
     "Politics",
     "Health",
     "Love",
     "Travel",
     "Technology",
     "Entrepreneurship",
     "Self",
     "Education",
     "Writing",
     "Business",
     "Cryptocurrency",
     "Design",
     "Social",
     "Music",
     "Relationships",
     "Social",
     "Sports",
     "Mental",
     "Productivity",
     "Programming",
     "Food",
     "Leadership",
     "Javascript",
     "Art",
     "Fiction",
     "Humor",
     "Artificial",
     "UX",
     "Culture",
     "Books",
     "Photography",
     "Creativity",
     "Data",
     "Psychology",
     "Software",
     "Coronavirus",
     "Self",
     "Family",
]

let data = [{"postID":"KAr8c","selectedTags":["Life","Blockchain"],"title":"testests","content":"[{\"type\":\"paragraph\",\"children\":[{\"text\":\"What is Lorem Ipsum?\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop pWhat is Lorem Ipsum?\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p\"}]}]","userID":"E3X3YETRe7ieQH2W7BqW67Wj794v9BPYmDWToTzJg1np","userName":"Jg1np","imageURL":"https://source.unsplash.com/random/900×700/?crypto","createdTime":"2022-10-26T19:36:18.836Z"},{"postID":"X4ETE","selectedTags":[],"title":"Another Great Test","content":"[{\"type\":\"paragraph\",\"children\":[{\"text\":\"I've been telling yall about that ne\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]},{\"type\":\"image\",\"url\":\"https://storage.googleapis.com/plum_talk_images/07a05c02-64d4-4cf4-a70a-4c929f25d0d5?q=1666817845\",\"children\":[{\"text\":\"\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]},{\"type\":\"image\",\"url\":\"https://storage.googleapis.com/plum_talk_images/eea7f418-1618-46fc-8b2a-c3a080646d73?q=1666817803\",\"children\":[{\"text\":\"\"}]}]","userID":"E3X3YETRe7ieQH2W7BqW67Wj794v9BPYmDWToTzJg1np","userName":"Jg1np","imageURL":"https://source.unsplash.com/random/900×700/?crypto","createdTime":"2022-10-26T20:57:50.845Z"}]