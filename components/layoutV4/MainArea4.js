export default function MainArea4({children})  {
    return (
        <div className="px-3 py-1 md:px-12 md:py-8" style={{gridArea: "2/1"}}>
            {children}
        </div>
    )
}