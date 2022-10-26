export default function Shoutout({header, subtext}) {
    return (
        <div className='flex flex-col justify-center py-8 px-16 md:p-28 text-center space-y-3 md:space-y-6'>
            <h1 className='text-3xl '>{header}</h1>
            <p className='opacity-60'>{subtext}</p>
        </div>
    )

}