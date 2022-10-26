import Image from "next/image"
// import SelectPostType from "../../components/select/SelectPostType"
import MainArea4 from "../components/layoutV4/MainArea4"
import { useRouter } from "next/router"
import PostList from "../components/posts/PostList"
import { useGetPostsAll } from "../usecases/posts"

export default function Talks() {
    let router = useRouter()
    let { posts } = useGetPostsAll()
    console.log("all my po", posts)

    return (
        <>
            <MainArea4>
                <div className="flex flex-row-reverse">
                    <div
                        className="cursor-pointer mr-3 flex flex-col"
                        onClick={() => router.push("/posts/create")}
                    >
                        <Image
                            src="/images/add-circle.svg"
                            height={32}
                            width={32}
                        />
                        New Post
                    </div>
                </div>
                <PostList postData={posts} />
            </MainArea4>
        </>
    )
}
