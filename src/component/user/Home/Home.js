import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import './Home.css'

function Home() {

    const [userInfo, setUserInfo] = useState({
        name: null,
        email: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        let Uname = localStorage.getItem("username")
        let Uemail = localStorage.getItem("email")
        let Rname = Uname.replaceAll('"', '');


        setUserInfo({
            ...userInfo,
            name: Rname,
            email: Uemail
        })
    }, [])

    const logouBtn = () => {
        localStorage.clear();
        navigate('/')
    }



    return (

        <div>
            <div>
                <h1 className='greetings'>Hi <span>{userInfo.name}</span></h1>
                <button className='home_btn' onClick={logouBtn}>Logout</button>
            </div>
        </div>
    )
}

export default Home