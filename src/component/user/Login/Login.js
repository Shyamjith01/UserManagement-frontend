import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {

    const navigate = useNavigate();

    const [LoginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })

    const LoginChanger = (event) => {
        let name = event.target.name
        let usernameAndPassword = event.target.value;
        console.log(event.target.value);
        setLoginDetails(LoginChanger => ({
            ...LoginDetails,
            [name]: event.target.value
        }))
        console.log(LoginDetails, "yes")
    }

    const LoginSubmit = (e) => {

        e.preventDefault();
        const { email, password } = LoginDetails;
        console.log(email, password, "login details")
        if (!email || !password) {
            toast.warning("please enter valid data");
            console.log("empty data")
        } else if (password.length < 4) {
            toast.warning("please enter atlease 4 charector")
        } else {
            console.log("inside of else")
            axios.post('http://localhost:9000/login', LoginDetails)
                .then((resp) => {
                    console.log(resp, "respo in then")
                    if (resp.data.status == false) {
                        toast.warning(resp.data.message)
                    } else if (resp.data.status == true) {
                        console.log(resp, "response in then");
                        let obj = {
                            name:resp.data.userdetails.uname,
                            email:resp.data.userdetails.email,
                            id:resp.data.userdetails._id
                        }
                        console.log(obj,"detail obj")

                        localStorage.setItem("username",JSON.stringify(obj.name))
                        localStorage.setItem("email",JSON.stringify(obj.email))
                        localStorage.setItem("id",JSON.stringify(obj.id))
                        navigate('/home')
                    }
                })
        }
    }


    return (
        <div>
            <div class="login-page">
                <div class="form">

                    <form class="login-form" onSubmit={LoginSubmit} >
                        <p class="sign-in">SIGN IN</p>
                        <input type="email" placeholder="email" name="email" onChange={LoginChanger} />
                        <input type="password" placeholder="password" name="password" onChange={LoginChanger} />
                        <div class="checkboxes">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember Me</label>
                        </div>
                        <a href="/" class="forgot-password">Forgot Password!</a>
                        <button className='submitBtn' type='submit' >login</button>
                        <p class="message">Not registered? <Link to="/SignUp" >Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login