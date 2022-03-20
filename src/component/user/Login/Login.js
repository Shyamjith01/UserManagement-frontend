import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import GoogleLogin from "react-google-login"

function Login() {

    const navigate = useNavigate();

    const [LoginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })

    const LoginChanger = (event) => {
        let name = event.target.name
        let usernameAndPassword = event.target.value;
        setLoginDetails(LoginChanger => ({
            ...LoginDetails,
            [name]: event.target.value
        }))
        
    }

    const LoginSubmit = (e) => {

        e.preventDefault();
        const { email, password } = LoginDetails;
        if (!email || !password) {
            toast.warning("please enter valid data");
            
        } else if (password.length < 4) {
            toast.warning("please enter atlease 4 charector")
        } else {
            axios.post('http://localhost:9000/login', LoginDetails)
                .then((resp) => {
                  
                    if (resp.data.status == false) {
                        toast.error(resp.data.resp.message)
                    } else if (resp.data.status == true) {
                  
                        let obj = {
                            name: resp.data.userdetails.uname,
                            email: resp.data.userdetails.email,
                            id: resp.data.userdetails._id
                        }
                  

                        localStorage.setItem("username", JSON.stringify(obj.name))
                        localStorage.setItem("email", JSON.stringify(obj.email))
                        localStorage.setItem("id", JSON.stringify(obj.id))
                        navigate('/home')
                    }
                })
        }
    }
    //google response
    const googleSuccess = (response) => {
      
        let userProfile = response.profileObj;
        axios.post('http://localhost:9000/googleOauth', userProfile).then((response) => {

            localStorage.setItem("username",JSON.stringify(userProfile.name))
            localStorage.setItem("email",JSON.stringify(userProfile.email))
            navigate('/home')
        })

    }


    return (
        <div>
            <div class="login-page">
                <div class="form">

                    <form class="login-form" onSubmit={LoginSubmit} >
                        <p class="sign-in"> USER LOGIN</p>
                        <input type="email" placeholder="email" name="email" onChange={LoginChanger} />
                        <input type="password" placeholder="password" name="password" onChange={LoginChanger} />
                        <div class="checkboxes">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember Me</label>
                        </div>
                        <Link to="/forgetPassword" class="forgot-password">Forgot Password!</Link>
                        <button className='submitBtn' type='submit' >login</button>
                        <GoogleLogin
                            clientId='937311493612-ob4n6m7d5sk6ab8sg1rgplphtnoicsdo.apps.googleusercontent.com'
                            buttonText='Login'
                            onSuccess={googleSuccess}
                            onFailure={googleSuccess}
                            className="googleBtn"
                            cookiePolicy={'single_host_origin'}
                        />
                        <p class="message">Not registered? <Link to="/SignUp" >Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login