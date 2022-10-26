import { COLOR_COMPONENT, SIZE_COMPONENT } from "../../consts"

export default function SpanColor({ color, content, size }) {
    let fontColor = color == COLOR_COMPONENT.WHITE ? '#202124' : "#fff"
    if (size == SIZE_COMPONENT.LARGE) {
        return (<span className="px-[26px] rounded-[70px] text-[30px] font-bold w-fit h-fit truncate min-w-[123px]" style={{ "backgroundColor": color, "color": fontColor }}>{content}</span>)
    } else if (size == SIZE_COMPONENT.SMALL) {
        return (<span className="px-4 py-0 rounded-[70px] bg-plum-green text-sm w-fit h-fit truncate" style={{ "backgroundColor": color, "color": fontColor }}>{content}</span>)
    } else if (size == SIZE_COMPONENT.XS) {
    return (<span className="px-1 py-0 rounded-[70px] bg-plum-green text-xs w-fit h-fit truncate" style={{ "backgroundColor": color, "color": fontColor }}>{content}</span>)
}
    else {
        return (<span className="px-4 py-0 rounded-[70px] bg-plum-green text-sm w-fit h-fit truncate" style={{ "backgroundColor": color, "color": fontColor }}>{content}</span>)
    }
}