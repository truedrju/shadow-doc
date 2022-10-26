/* eslint-disable no-undef */
import {
    get200, 
    post200,
    postForm200,
    // deleteForm200,
    // encodeParams,
} from "./request"

export async function savePost(post) {
    return await post200("/api/posts", post)
}

export async function getPostsAll() {
    return await get200("/api/posts")
}


export async function getPost(postID) {
    return await get200(`/api/posts/${postID}`, postID)
}

export async function saveImage(body) {
    console.log("hitting",  process.env.NEXT_PUBLIC_TEMP_IMAGE_SVC)
    let imageURL = await postForm200(
        process.env.NEXT_PUBLIC_TEMP_IMAGE_SVC,
        body
    )
    let answer = imageURL.substring(1, imageURL.length - 1)
    console.log("returning ", imageURL)
    return answer
}

export async function deleteImage(body) {
    let imageURL = await deleteForm200(
        process.env.NEXT_PUBLIC_TEMP_IMAGE_SVC,
        body
    )
    let answer = imageURL.substring(1, imageURL.length - 1)
    return answer
}



// export async function getTalks() {
//     return await get200(process.env.NEXT_PUBLIC_API_URL + "/talks")
// }

