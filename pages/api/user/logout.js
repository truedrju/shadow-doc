import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"

export default withIronSessionApiRoute(logout, ironOptions)
async function logout(req, res) {
    try {
        req.session.user = null
        await req.session.save()
        res.status(200).send({ ok: true })
    } catch (e) {
        console.log(e)
        res.status(500).json({ status: e.message })
    }
}
