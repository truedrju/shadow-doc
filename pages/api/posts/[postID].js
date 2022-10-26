import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"

export default withIronSessionApiRoute(handler, ironOptions)
async function handler(req, res) {
    try {
        const { postID } = req.query
        let post = req.session.posts[postID]
        console.log("sess", req.session)
        res.status(200).json({ post }) 
    } catch (e) {
        console.log(e)
        res.status(500).json({ status: e.message })
    }
}
