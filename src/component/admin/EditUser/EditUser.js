import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import "../EditUser/Edituser.css"
import Header from '../header/Header';


function EditUser() {
    let { id } = useParams();
    let navigate = useNavigate()

    const [inputvalue, setInputValue] = useState({
        id: '',
        fname: '',
        lname: '',
        uname: '',
        email: '',
        phone: ''
    })


    //axios
    useEffect(async () => {
        await axios.get(`http://localhost:9000/admin/Edit-user/${id}`)
            .then((response) => {
                if (response.data) {
                    setInputValue({
                        ...inputvalue,
                        id: response.data._id,
                        fname: response.data.fname,
                        lname: response.data.lname,
                        uname: response.data.uname,
                        email: response.data.email,
                        phone: response.data.MobileNumber
                    })
                }

            })
    }, [])

    const userEditChange = (e) => {
        let name = e.target.value
        setInputValue({
            ...inputvalue,
            [name]: e.target.value
        })
    }

    //form submition
    const userEditUpdation = (e) => {
        e.preventDefault()

        axios.post('http://localhost:9000/admin/userEdit-updation', inputvalue).then((response) => {
            toast.success("change Updated")
            navigate('/adminHome');
        })
    }
    // alert(inputvalue)

    return (

        <>
            <Header />
            <h1 className='editUserdetails'>Edit user details</h1>
            <div className='editUserMain'>

                <form class="row g-3 needs-validation" onSubmit={userEditUpdation} novalidate>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip01" placeholder='enter your first name' class="form-label flex_start">First name</label>
                        <input type="text" class="form-control" id="validationTooltip01" name='fname' onChange={(e) => { setInputValue({ ...inputvalue, fname: e.target.value }) }} value={inputvalue.fname} required />
                        <div class="valid-tooltip">
                            Looks good!
                        </div>
                    </div>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltip02" placeholder='enter your last name' class="form-label flex_start">Last name</label>
                        <input type="text" class="form-control" id="validationTooltip02" name='lname' onChange={(e) => { setInputValue({ ...inputvalue, lname: e.target.value }) }} value={inputvalue.lname} required />
                        <div class="valid-tooltip">
                            Looks good!
                        </div>
                    </div>
                    <div class="col-md-4 position-relative">
                        <label for="validationTooltipUsername" class="form-label flex_start">Username</label>
                        <div class="input-group has-validation">

                            <input type="text" class="form-control" placeholder='enter the usernaem' name='uname' value={inputvalue.uname} onChange={(e) => { setInputValue({ ...inputvalue, uname: e.target.value }) }} id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required />
                            <div class="invalid-tooltip">
                                Please choose a unique and valid username.
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 position-relative">
                        <label for="validationTooltip03" class="form-label flex_start">Email</label>
                        <input type="email" class="form-control" placeholder='enter your email' id="validationTooltip03" name='email' onChange={(e) => { setInputValue({ ...inputvalue, email: e.target.value }) }} value={inputvalue.email} required />
                        <div class="invalid-tooltip">
                            Please provide a valid city.
                        </div>
                    </div>

                    <div class="col-md-6 position-relative">
                        <label for="validationTooltip05" class="form-label flex_start">MobileNumber</label>
                        <input type="tel" class="form-control" placeholder='enter your mobile number' name='phone' value={inputvalue.phone} onChange={(e) => { setInputValue({ ...inputvalue, phone: e.target.value }) }} id="validationTooltip05" required />
                        <div class="invalid-tooltip">
                            Please provide a valid zip.
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditUser;