import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const emailSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:9000/emailFinder/${email}`).then((resp) => {
            if (resp.data.user) {
                toast.success("email verified")
                localStorage.setItem("editUserId", JSON.stringify(resp.data.user._id))
                navigate('/changePassword')
            }else{
                toast.error("User Not Found!")
            }

            
        })
    }

    return (
        <div>
            <div class="login-page">
                <div class="form">

                    <form class="login-form" onSubmit={emailSubmit} >
                        <p class="sign-in">email -verification</p>
                        <input type="email" placeholder="email" name="email" value={email} onChange={(evt) => { setEmail(evt.target.value) }} />
                        <button className='submitBtn' type='submit' >confirm</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword