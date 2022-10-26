import Select from 'react-select'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { useGetPostGroupsQuery } from '../../services/rtk'
import { components } from 'react-select'
import { setPostGroupType } from '../../store/helperSlice'

export default function SelectPostType() {
  let dispatch = useDispatch()
  let { selectedPostGroupType } = useSelector(state => state.helper)
  const { data, error, isLoading } = useGetPostGroupsQuery()
  if (error) {
    console.error(`could not get data ${error}`)
    return null
  }

  if (isLoading) {
    return <Loader />
  }
  let allOptions = data.map(a => ({ ...a }))

  allOptions.unshift({ name: "All", imageURL: "/images/plum.png" })

  const setPostTypes = (selected) => {
    dispatch(setPostGroupType(selected))
  }

  return (
    <div className="rounded-[15px] bg-primary-black p-5 mx-1 w-full h-[863px]">
      <Select
        menuIsOpen={true}
        maxMenuHeight="863"
        defaultValue={selectedPostGroupType}
        value={selectedPostGroupType}
        onChange={setPostTypes}
        options={allOptions.map(d => ({ label: d.name, value: d.name, imageURL: d.imageURL }))}
        components={{
          Menu: menuComponent,
          Control: controlComponent,
          Option: optionComponent,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
        instanceId={"selectedPostType"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            //hover color
            primary25: null,
            //active color
            primary50: '#BFBEBD',
            //focus color
            primary: '#BFBEBD',
          },
        })}
      />
    </div>
  )
}

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'white',
    padding: 20,

  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none',
    color: "#2A2523",
    backgroundColor: "#202124",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
    margin: "5px",
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: "#202124",
    color: "#2A2523",
    border: "1px solid #3F3B39",
    borderRadius: "70px",
    fontSize: "16px",

  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    const color = 'white'

    return { ...provided, opacity, transition, color, }
  }
}

const optionComponent = ({ children, ...props }) => {
  return (
    <div className="rounded-[15px] overflow-hidden">
      <components.Option {...props}>
        <div className="flex flex-row cursor-pointer">
          <div className='flex justify-center px-2'>
            <Image src="/images/pt-icon.svg" height={29} width={39} />
          </div>
          {children}
        </div>
      </components.Option>
    </div>
  )
}

const controlComponent = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <div className="px-3 py-1">
        {children}
      </div>
    </components.Control>
  )
}

const menuComponent = ({ children, ...props }) => {
  return (
    <components.Menu {...props}>
      <div className="flex flex-col">
        <p className='text-xs text-white/[.4] px-5 pt-5'>My communities</p>
        {/* <div className="flex flex-row p-5 cursor-pointer active:bg-primary-light-gray rounded-[15px]" onClick={create}>
          <div className='flex justify-center px-2'>
            <Image src="/images/add-circle.svg" height={29} width={29} />
          </div>
          <p className='text-white px-1'>Create Community</p>
        </div> */}
        {children}
      </div>
    </components.Menu>
  )
}

