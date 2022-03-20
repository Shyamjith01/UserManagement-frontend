import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function ChangePassword() {
    const navigate = useNavigate();  
    const [password, setPassword] = useState({
        pass1: '',
        pass2: ''
    })

    //form submition
    const newPassword = (e) => {
        e.preventDefault();
        let id = localStorage.getItem("editUserId")
        let UserId = id.replaceAll('"', '');
        let obj = {
            id: UserId,
            pass1: password.pass1,
            pass2: password.pass2
        }
        if (obj.pass1 == obj.pass2) {
            axios.post('http://localhost:9000/changePassword', obj).then((response) => {
                if (response.status) {
                    toast.success("password changed sucessfuly");
                    localStorage.clear();
                    navigate('/')
                }
            })
        } else {
            toast.error("password not match!")
        }

    }

    return (
        <div>
            <div class="login-page">
                <div class="form">

                    <form class="login-form" onSubmit={newPassword} >
                        <p class="sign-in">Enter New Password</p>
                        <input type="text" minLength={4} placeholder="password" name="pass1" value={password.pass1} onChange={(e) => { setPassword({ ...password, pass1: e.target.value }) }} />
                        <input type="text" minLength={4} placeholder="Re-enter password" name="pass2" onChange={(e) => { setPassword({ ...password, pass2: e.target.value }) }} />
                        <button className='submitBtn' type='submit' >confirm</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword