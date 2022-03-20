import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './adminLogin.css'
import { useNavigate } from 'react-router'
function AdminLogin() {
    const navigate = useNavigate();

    const [adminInfo, setAdminInfo] = useState({
        email: '',
        password: ''

    })
    const adminInput = (e) => {
        let name = e.target.name

        setAdminInfo(Loginchanger => ({
            ...adminInfo,
            [name]: e.target.value
        }))
    }
    const adminLogin = (e) => {
        e.preventDefault();
        const { email, password } = adminInfo;
        if (!email || !password) {
            toast.warning("please enter the email and password")
        } else if (password.length < 4) {
            toast.error("password must be 4 letter");
        } else {
            
            axios.post('http://localhost:9000/admin/login', adminInfo)
                .then((response) => {
                   
                    if (response.data.status) {
                        let obj = {
                            email: response.data.response.admin.email,
                            id: response.data.response.admin._id
                        }
                        localStorage.setItem("Adminemail",JSON.stringify(obj.email))
                        localStorage.setItem("adminId",JSON.stringify(obj.id))
                        navigate('/adminHome')
                    } else {
                        toast.warning(response.data.response.message)
                    }
                })
        }

    }

    return (
        <div>
            <div class="login-page">
                <div class="form">

                    <form class="login-form" onSubmit={adminLogin}  >
                        <p class="admin_loginHeader">ADMIN LOGIN</p>
                        <input type="email" placeholder="email" name="email" onChange={adminInput} />
                        <input type="password" placeholder="password" name="password" onChange={adminInput} />
                        <button className='submitBtn' type='submit' >login</button>
                        <p class="message">Not registered? <Link to="/SignUp" >Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin