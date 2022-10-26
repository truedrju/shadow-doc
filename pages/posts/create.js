import { useSelector } from "react-redux"
import MainArea4 from "../../components/layoutV4/MainArea4"
import NewPost from "../../components/posts/NewPost"

export default function Create() {
    let { user } = useSelector((state) => state.user)

    if (!user) {
        return (
            <>
                <MainArea4>Please login</MainArea4>
            </>
        )
    }


    return (
        <MainArea4>
            <NewPost />
        </MainArea4>
    )
}
