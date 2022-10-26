import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"

import { authMsg } from "../../../web3/shared"
import { randomString } from "../../../utils/str"

export default withIronSessionApiRoute(start, ironOptions)

async function start(req, res) {
    try {
        let { publicKey } = req.query

        let code = randomString(6)
        req.session.auth_message = authMsg(code)
        req.session.publicKey = publicKey
        await req.session.save()

        res.status(200).send({ message: req.session.auth_message })
    } catch (e) {
        console.log(e)
        res.status(500).json({ status: e.message })
    }
}
