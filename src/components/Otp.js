import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../services/Apis"
const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      alert("Enter Your Otp")
    } else if (!/[^a-zA-Z]/.test(otp)) {
      alert("Enter Valid Otp")
    } else if (otp.length < 6) {
      alert("Otp Length minimum 6 digit")
    } else {
      const data = {
        otp, email: location.state
      }

      const response = await userVerify(data);
      console.log(response)
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        localStorage.setItem("useremail",data.email);
        setTimeout(() => {
          navigate("/Showdates")
        }, 5000)
      } else {
        alert(response.response.data.error)
      }
    }
  }

  return (
    <div style={{"backgroundColor":"Highlight","width":"100vw","height":"100vh"}}>
      <section>
        <div className="form_data" style={{"backgroundColor":"gray"}}>
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input type="text" name="otp" id="" onChange={(e) => setOtp(e.target.value)} placeholder='Enter Your OTP' />
            </div>
            <button className='btn' onClick={LoginUser}>Submit</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Otp
