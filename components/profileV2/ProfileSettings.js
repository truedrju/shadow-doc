import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useUpdateUserMutation } from "../../services/rtk"
import MainArea4 from "../layoutV4/MainArea4"
import Loader from '../Loader'
import { setToast } from "../../store/helperSlice"
import Image from 'next/image'
import { getSelf } from "../../services/oauthService"
import { validImageURL, toDataURL, dataURLtoFile } from './util'
import SocialLinkItem from './SocialLinkItem'
import WalletLinkItem from './WalletLinkItem'
import ToggleButton from "./ToggleButton"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useScreenSize } from '../../effects/effects'
import { signIn, useSession, } from 'next-auth/react'


export default function ProfileSettings() {
  let screenSize = useScreenSize()
  let dispatch = useDispatch()
  const { data: session } = useSession()
  let [
    updateUser,
    { isLoading: isUpdating },
  ] = useUpdateUserMutation()

  let { user } = useSelector((state) => state.user)

  let [inputUserName, setInputUsername] = useState("")
  let [inputProfilePic, setInputProfilePic] = useState("")
  let [previewProfilePic, setPreviewProfilePic] = useState("")
  let [inputBio, setInputBio] = useState("")
  let [inputIsPublic, setInputIsPublic] = useState(false)
  let [inputResidence, setInputResidence] = useState("SG")
  let [inputDisplayName, setInputDisplayName] = useState("")
  const [birthDate, setBirthDate] = useState(new Date())
  const [openDatePicker, setOpenDatePicker] = useState(false)

  useEffect(() => {
    if (user) {
      setInputUsername(user.userName)
      setInputDisplayName(user.displayName)
      setInputBio(user.bio)
      setInputIsPublic(user.isPublic)
      setInputResidence(user.location)
      setBirthDate(new Date(user.birthday))
    }
  }, [user])

  useEffect(() => {
    updateUserSocialsSession(session, user)
    }, [session])
  

  const handleSave = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append("userID", user.userId)
    body.append("userName", inputUserName)
    body.append("photo", inputProfilePic)
    body.append("bio", inputBio)
    body.append("isPublic", inputIsPublic)
    body.append("displayName", inputDisplayName)
    body.append("birthday", birthDate.toJSON())
    body.append("location", inputResidence)
    body.append("isPublic",inputIsPublic)
    
    updateUser(body).unwrap()
      .then(() => dispatch(setToast({ type: "success", text: `Updated User Profile` })))
      .catch((error) => dispatch(setToast({ type: "error", text: `${error}` })))
  }

  if (!user) {
    return <MainArea4><h1>Sign in to edit profile</h1></MainArea4>
  }

  if (isUpdating) {
    return <MainArea4><Loader /></MainArea4>
  }

  const handleChange = (e) => {
    setInputProfilePic(e.target.files[0])
    setPreviewProfilePic(URL.createObjectURL(e.target.files[0]))
  }

  const selectDefaultProfile = (source) => {
    toDataURL(source)
      .then(async (dataUrl) => {
        var fileData = dataURLtoFile(dataUrl, source)
        setInputProfilePic(fileData)
      })

    setPreviewProfilePic(source)
  }

  const handleLinkAccounts = (providerType) => {
    signIn(providerType)
  } 

  return (
    <MainArea4>
      <div className="flex flex-row justify-between pb-2">
        <p className="text-[#AEBBE9] text-[30px]">Tell us <b>who you are</b>,</p>
        <button 
          // onClick={handleReq}
          className="bg-shadow-color h-fit w-fit min-h-[42px] rounded-[70px] px-10 my-auto" onClick={() => { }}>
          View my Profile
        </button>
      </div>

      <div className="bg-plum-grey rounded-[15px] p-5 flex flex-col h-full w-full">
        <div className="flex h-full w-full" style={{ "flex-direction": (screenSize != "large") ? "column" : "row" }}>
          <div className="flex flex-col" 
          style={{ "padding": (screenSize != "large") ? "0.25rem" : "1.25rem", "width": (screenSize != "large") ? "100%" : "40%" }}>
            <div className="relative h-[310px] w-full rounded-[15px] overflow-hidden">
              <div className="relative h-[310px]">
                {validImageURL(previewProfilePic || user.imageUrl) ? <Image src={previewProfilePic != '' ? previewProfilePic : user.imageUrl} layout="fill" objectFit="cover" /> : <Image src={"/images/seed.svg"} width={340} height={311} />}
              </div>
              <div className="absolute bg-[#24201E] h-[311px] w-full flex flex-col justify-end opacity-0 hover:opacity-100 bg-opacity-90 duration-300 inset-0 z-10">
                <input accept="image/png, image/gif, image/jpeg" type="file" onChange={handleChange} className="h-full w-full absolute opacity-0 z-20" />
                <Image src={"/images/camera.svg"} width={132} height={100} />
                <p className="text-[20px] font-bold mx-auto py-10">Upload</p>
              </div>
            </div>
            <p className="text-[12px] text-white/[0.5] py-4">Defaults</p>
            <div className="flex flex-row space-x-2">
              <div className="relative w-[60px] h-[55px] cursor-pointer flex justify-center rounded-[5px] overflow-hidden" onClick={() => selectDefaultProfile("/images/defaults_profile_1.png")}>
                <Image src={"/images/defaults_profile_1.png"} layout="fill" objectFit="cover" />
              </div>
              <div className="relative w-[60px] h-[55px] cursor-pointer flex justify-center rounded-[5px] overflow-hidden" onClick={() => selectDefaultProfile("/images/defaults_profile_2.png")}>
                <Image src={"/images/defaults_profile_2.png"} layout="fill" objectFit="cover" />
              </div>
              <div className="relative w-[60px] h-[55px] cursor-pointer flex justify-center rounded-[5px] overflow-hidden" onClick={() => selectDefaultProfile("/images/defaults_profile_3.png")}>
                <Image src={"/images/defaults_profile_3.png"} layout="fill" objectFit="cover" />
              </div>
              <div className="relative w-[60px] h-[55px] cursor-pointer flex justify-center rounded-[5px] overflow-hidden" onClick={() => selectDefaultProfile("/images/defaults_profile_4.png")}>
                <Image src={"/images/defaults_profile_4.png"} layout="fill" objectFit="cover" />
              </div>
              <div className="relative w-[60px] h-[55px] cursor-pointer flex justify-center rounded-[5px] overflow-hidden" onClick={() => selectDefaultProfile("/images/defaults_profile_5.png")}>
                <Image src={"/images/defaults_profile_5.png"} layout="fill" objectFit="cover" />
              </div>
            </div>
            <div className="bg-shadow-color rounded-[15px] my-4 px-2 flex flex-col overflow-hidden">
              <h1 className="text-[25px] text-white py-4"> Social Links</h1>
              <SocialLinkItem socialMedia="twitter" handleLink={() => handleLinkAccounts("twitter")} />
              <SocialLinkItem socialMedia="discord" handleLink={() => handleLinkAccounts("discord")} />
              {/* <SocialLinkItem socialMedia="facebook" /> */}
              {/* <SocialLinkItem socialMedia="instagram" /> */}
              {/* <SocialLinkItem socialMedia="link_in" /> */}
            </div>
            <p className="text-[25px] text-white py-4">Residence</p>
            <div className="bg-shadow-color rounded-[15px] my-4 px-4 flex flex-row overflow-hidden">
              <div className="my-auto mr-2">
                <Image src={`/images/pin-location.svg`} width={18.45} height={26} />
              </div>

              <div className="w-full">
                <select className="bg-shadow-color h-[52px] w-full px-4 rounded-[15px] focus:outline-none text-center" value={inputResidence} onChange={(item) => setInputResidence(item.target.value)}>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>Î
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia, Plurinational State of</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, the Democratic Republic of the</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d&apos;Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People&apos;s Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People&apos;s Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthélemy</option>
                  <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela, Bolivarian Republic of</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
              </div>
            </div>
            <p className="text-[25px] text-white py-4">Birthday</p>
            <div className="relative">
              <button className="bg-shadow-color w-full rounded-[15px] my-4 px-4 flex flex-row overflow-hidden" onClick={() => setOpenDatePicker(!openDatePicker)}>
                <div className="my-auto mr-2">
                  <Image src={`/images/birthday-balloon.svg`} width={16} height={20} />
                </div>
                <h1 className="text-[18px] text-white py-4 mx-auto">{birthDate.toLocaleDateString()}</h1>
              </button>
              {openDatePicker ?
                <div className="absolute">
                  <DatePicker selected={birthDate} onChange={(date) => {
                    setBirthDate(date)
                    setOpenDatePicker(false)
                  }} inline />
                </div>

                : <div />}
            </div>

          </div>

          <div className="flex flex-col space-y-4" 
          style={{ "padding": (screenSize != "large") ? "0.25rem" : "1.25rem", "width": (screenSize != "large") ? "100%" : "60%" }}>
            <div className="flex flex-row justify-center space-x-4">
              <span className="m-auto inline-block align-middle text-[25px]">Name</span>
              <input className="m-auto text-[25px] rounded-[15px] bg-shadow-color text-start w-full indent-4 focus:outline-none" type="text" value={inputDisplayName} onChange={(e) => setInputDisplayName(e.target.value)}
              />
            </div>
            <p className="text-[12px] text-white/[0.5]">
              Help people discover your account by using the name that you&apos;re known by: either your full name, nickname or business name. You can only change your name twice within 14 days.
            </p>

            <div className="flex flex-row justify-center space-x-4 pt-4">
              <span className="m-auto inline-block align-middle text-[25px]">Username</span>
              <input className="m-auto text-[25px] rounded-[15px] bg-shadow-color text-start w-full indent-4 focus:outline-none" type="text" value={inputUserName} maxLength="16" onChange={(e) => setInputUsername(e.target.value)} />
            </div>
            <div className="flex flex-row">
              <p className="text-[12px] text-white/[0.5] w-2/3 mr-2">
                Help people discover your account by using the name that you&apos;re known by: either your full name, nickname or business name. You can only change your name twice within 14 days.
              </p>
              <p className="text-[12px] text-white/[0.5]">
                Maximum 16 characters
              </p>
            </div>

            <div className="flex flex-row justify-between space-x-4 pt-4">
              <span className="inline-block align-middle text-[25px]">Plum Learn Status</span>
              <div>
                <select className="bg-shadow-color h-[32px] w-[124px] px-4 rounded-[15px] focus:outline-none" value={inputIsPublic} onChange={(item) => setInputIsPublic(item.target.value)}>
                  <option value={true}>Public</option>
                  <option value={false}>Private</option>
                </select>
              </div>
            </div>
            <p className="text-[12px] text-white/[0.5]">
              Share your Learning status so others can see your progress, & learn from fellow plums from different Ranges.
            </p>

            <div className="flex flex-row justify-between space-x-4">
              <span className="inline-block align-middle text-[25px] w-2/3">Show Academic Range</span>
              <ToggleButton />
            </div>

            <div className="flex flex-row justify-between space-x-4">
              <span className="inline-block align-middle text-[25px] w-2/3">Show Progress Bar</span>
              <ToggleButton />
            </div>

            <div className="flex flex-row justify-between space-x-4">
              <span className="inline-block align-middle text-[25px] w-2/3">Show Karma Plums</span>
              <ToggleButton />
            </div>

            <div className="flex flex-row space-x-2 pt-4">
              <div className="flex flex-col">
                <span className="inline-block align-middle text-[25px]">Bio:</span>
                <p className="text-[12px] text-white/[0.5]">
                  Maximum 100 Characters
                </p>
              </div>

              <textarea className="text-[25px] rounded-[15px] bg-shadow-color text-start w-full h-[200px] indent-4 focus:outline-none resize-none" maxLength="100" onChange={(e) => setInputBio(e.target.value)}  value={inputBio} />
            </div>

            <p className="text-[25px] text-white pt-2">Wallets</p>
            <div className="flex flex-col">
              <p className="text-[12px] text-white/[0.5]">
                We reccomend connecting your wallet on Plum Club so we can understand your preferences. Connecting your wallet also allows you to  save your content preferences & fully enjoy Plum Learn.
              </p>
              <WalletLinkItem wallet="metamask" />
              <WalletLinkItem wallet="phantom" />
              <WalletLinkItem wallet="torus" />
            </div>

          </div>
        </div>
        <div className="flex justify-center">
          <input className="bg-[#AFBCEA] text-black rounded-[70px] w-[107px] h-[42px]" type="submit" value="Done" onClick={handleSave} />
        </div>
      </div>
    </MainArea4>
  )
}

const updateUserSocialsSession = async (session, user) => {
  if (!session || !user) {
    return
  }


  let socialType = getSocialType(session.user.image)

  if (!hasSocialAccount(socialType, user.socialAccounts)) {
    await getSelf(user.userId, socialType)
  }   
}

const hasSocialAccount = (t, socialAccounts) => {
  if (!socialAccounts) return false 

  socialAccounts.forEach(acct => {
    if (acct.socialType == t) {
      return true
    }
  })
  return false
}

const getSocialType = (image) => {
  if (image.includes("pbs.twimg")) return "twitter"
  if (image.includes("cdn.discordapp")) return "discord"
}

