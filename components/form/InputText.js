
export default function InputText({name, placeholder="",value, onChange, maxLength=56}){
    // const pattern = /[^a-zA-Z0-9 ]/;
    return (
        <div>
            <input
                className={'bg-transparent border-div1 border-b block text-color-white w-full focus:outline-none'}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                pattern="[A-Za-z0-9]+"
                maxLength={maxLength}
            />
        </div>
    )
}