import RenderPost from "./RenderPost"
import Link from 'next/link'

export default function PostList({ postData }) {
    if (!postData || !Object.keys(postData)) {
        return null
    }
    return (
        postData.map(d =>
            <Link key={d.postID} href={`/posts/${d.postID}`}>
                <a className='text-white hover:no-underline'>
                    <div className='my-9 mx-12 cursor-pointer'>
                        <RenderPost
                            {...d}
                            includeCommentor={false}
                            />
                    </div>
                </a>
            </Link>
        )
    )
}