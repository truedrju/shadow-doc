import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"

export default withIronSessionApiRoute(user, ironOptions)
async function user(req, res) {
    try {
        res.status(200).send({ user: req.session.user })
    } catch (e) {
        console.log(e)
        res.status(500).json({ status: e.message })
    }
}
