import Tags from './Tags'
import Nav from './nav/Nav'
import { useScreenSize } from '../../utils/effects'

export default function LayoutV4({children}) {
    let screen = useScreenSize() 
    let styles

    if (screen == "small" || screen == "super-small") {
        styles = {
            // display: "grid",
            // gridTemplateRows: "6vh auto",
            alignItems: "center",

        }
    } else {
        styles = {
            display: "grid",
            gridTemplateRows: "6vh auto",
            alignItems: "center",

        }
    }

    return (
        <div style={styles}>
            <Nav />
            {children}
            <Tags />
        </div>
  )
}
 