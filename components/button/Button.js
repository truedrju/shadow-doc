
export default function PlumBtn({text, onClick, type, size="text-sm"}) {
  let bg
  if (type == "secondary") {
    bg = "bg-plum-med-gray"
  } else {
    bg = "bg-plum-purple"
  }

  return (
      <button 
        className={`${size} font-extrabold rounded-3xl py-2 px-6 `+bg}
        onClick={onClick}
      >
        {text}
      </button>
    )
}