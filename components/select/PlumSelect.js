import Select from 'react-select'
import Image from 'next/image'
import { components } from 'react-select'

export default function PlumSelect({ value, options, handleSelect, instanceId, placeholder }) {
  return (
    <div className={'w-full'}>
      <Select
        defaultValue={value}
        value={value}
        onChange={handleSelect}
        options={options}
        isSearchable={false}
        components={{
          Control: controlWithIcon,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={customStylesGray}
        placeholder={placeholder || "select"}
        instanceId={instanceId || "default"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            //hover color
            primary25: null,
            //active color
            primary50: '#4344B0',
            //focus color
            primary: '#4344B0',
          },
        })}
      />
    </div>
  )
}

const customStylesGray = {
  option: (provided) => ({
    ...provided,
    borderBottom: '1px solid #202124',
    color: '#E0CFC4',
    backgroundColor: "rgba(50, 45, 43, .8899)",
    padding: 20,
  }),
  menu: (provided) => ({
    ...provided,
    color: "white",
    backgroundColor: "rgba(50, 45, 43, .8899)",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
    margin: "1px",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#4E4A48",
    color: "white",
    border: "1px solid #332E3C",
    borderRadius: "70px",
    fontSize: "16px"

    // none of react-select's styles are passed to <Control />
    // width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    const color = 'white'

    return { ...provided, opacity, transition, color }
  }
}

const controlWithIcon = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <div className="flex flex-row justify-between px-5 py-1 w-full">
        {children}
        <Image src="/images/arrow-down.svg" height={9} width={9} />
      </div>
    </components.Control>
  )
}

