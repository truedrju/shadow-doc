import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"
import { randomString } from "../../../utils/str"

export default withIronSessionApiRoute(handler, ironOptions)
async function handler(req, res) {
    try {
        if (req.method == 'POST') {
            let postID = randomString(5)
            if (!req.session.posts) {
                req.session.posts = {[postID]: req.body}
            } else {
                req.session.posts[postID] = req.body
            }

            await req.session.save()

            res.status(200).send({ postID })
            return
          }

        else if(req.method == "GET") {
            let {posts} = req.session
            let out = posts && Object.keys(posts).map(postID => ({
                postID,
                ...posts[postID]
            }))
            res.status(200).send({ posts: out })
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).json({ status: e.message })
    }
}
