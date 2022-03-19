import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import "./Signup.css"

function SignUp() {
    const [User, setUser] = useState({
        fname: '',
        lname: '',
        uname: '',
        MobileNumber: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate();

    //form submit 
    const signUpfrom = (e) => {
        e.preventDefault();

        const { fname, sname, uname, MobileNumber, password, email } = User;
        if (fname && sname && uname && MobileNumber && password && email) {
            toast.warning("enter all the details");
        } else if (password < 4) {
            toast.warning("Please enter 4 charector in password")
        } else {
            axios.post('http://localhost:9000/signUp', User)
                .then((resp) => {
                    if (resp.data.status == false) {
                        toast.error(resp.data.message)
                    } else {
                        console.log(resp, "yes respnse")
                        let Userdata = {
                            id: resp.data.id,
                            name: resp.data.name,
                            email: resp.data.email
                        }

                        localStorage.setItem("username", JSON.stringify(Userdata.name));
                        localStorage.setItem("email", JSON.stringify(Userdata.email))
                        localStorage.setItem("userId", JSON.stringify(Userdata.id))
                        navigate('/home')
                    }
                })
        }
    }




    const SignUpChanger = (e) => {
        let name = e.target.name
        setUser(User => ({
            ...User,
            [name]: e.target.value
        }))
        console.log(User, ":this");
    }

    return (
        <div>
            <div class="login-page">
                <div class="form">
                    <form class="register-formm" onSubmit={signUpfrom}>
                        <input type="text" placeholder="First Name" name='fname' onChange={SignUpChanger} />
                        <input type="text" placeholder="Last Name" name='lname' onChange={SignUpChanger} />
                        <input type="text" placeholder="Username" name='uname' onChange={SignUpChanger} />
                        <input type="number" placeholder="Telephone Number" name='MobileNumber' onChange={SignUpChanger} />
                        <input type="password" placeholder="Password" name='password' onChange={SignUpChanger} />
                        <input type="email" placeholder="E-mail address" name='email' onChange={SignUpChanger} />
                        <button type='submit' className='submit_btn'>create</button>
                        <p class="message">Already registered? <Link to="/">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp