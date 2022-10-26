export default function Loader({text="Loading"}) {
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <p style={{fontSize: '2em'}}>{text}</p>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}
