import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { sentOtpFunction } from "../services/Apis";
import "../styles/mix.css"
const Login = () => {
    const [email, setEmail] = useState("");
    const [spiner,setSpiner] = useState(false);
    const navigate = useNavigate();
    const sendOtp = async (e) => {
        e.preventDefault();
        if (email === "") {
            alert("Enter Your Email !")
        } else if (!email.includes("@")) {
            alert("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

            const response = await sentOtpFunction(data);

            if (response.status === 200) {
                setSpiner(true)
                navigate("/user/otp",{state:email})
            } else {
                alert(response.response.data.error);
            }
        }
    }
    return (
        <div style={{"backgroundColor":"Highlight","width":"100vw","height":"100vh"}}>
            <section >
                <div className="form_data" style={{"backgroundColor":"gray"}}>
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p style={{"color":"blue"}}>Hi, we are glad that you are back. Please login.</p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                        </div>
                        <button className='btn' onClick={sendOtp}>
                        {
                            spiner ? <span style={{"cursor":"not-allowed"}}>Loading...</span>:"Login"
                        }
                        </button>
                        <p style={{"color":"blue"}}>Don't have and account?  <NavLink to="/register" style={{"color":"ButtonHighlight","fontWeight":"bold"}}>Sign up</NavLink> </p>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login