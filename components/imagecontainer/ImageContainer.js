import Image from 'next/image'

export default function ImageContainer({url, height, onClick, fitType='contain'}) {
  return (
    <div 
      onClick={onClick}
      className='flex justify-center w-full items-stretch'
      style={
      {height: `${height}vh`}
      }
    >
      <div className="flex-1 relative"> 
        <Image
          className='' 
          src={url}
          alt=""
          layout="fill" // required
          objectFit={fitType} // change to suit your needs
        />
      </div>
    </div>
  ) 
}

// used for non relevant styles backward compatiblity shit sucks
export function ImageContainerFill({url, height, onClick, fitType='contain'}) {
  return (
    <div 
      onClick={onClick}
      className='flex justify-center w-full items-stretch'
      style={
      {
        height: `${height}vh`
      }
      
      }
    >
      <div className=""> 
        <Image
          className='' 
          src={url}
          alt=""
          layout="fill" // required
          objectFit={fitType} // change to suit your needs
        />
      </div>
    </div>
  ) 
}