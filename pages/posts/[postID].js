import RenderPost from "../../components/posts/RenderPost"
import MainArea4 from "../../components/layoutV4/MainArea4"
import MetaTags from "../../components/posts/MetaTags"
import { useGetPost } from "../../usecases/posts"

export default function Post() {
    let {post} = useGetPost()
    console.log("Recover", post)

    if (!post) {
        return null
    }
    return (
        <MainArea4>
            <MetaTags post={post} />
            <div className="w-full md:w-3/4 py-4 px-6">
                <RenderPost {...post} includeCommentor={false} />
            </div>
        </MainArea4>
    )
}
