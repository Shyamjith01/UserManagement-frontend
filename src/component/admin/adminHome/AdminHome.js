import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import Header from '../header/Header'
import './AdminHome.css'
import { useNavigate } from 'react-router'
import EditUser from '../EditUser/EditUser'

function AdminHome() {
    const navigate = useNavigate();
    const [Allusers, setAllusers] = useState([])



    useEffect(() => {
        axios.get('http://localhost:9000/admin/admin').then((response) => {
            console.log(response.data, "all users")
            setAllusers(response.data)

        })

    }, [])
    //delete user
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to delet the User?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (id) {
                    axios.delete(`http://localhost:9000/admin/user-delete/${id}`)
                        .then((response) => {
                            console.log(response, "delte response")
                            if (response.data.status) {

                                Swal.fire(
                                    'Deleted!',
                                    'user has been deleted.',
                                    'success'
                                ).then((resp) => {
                                    location.reload()
                                })
                            }
                        })
                }

            }
        })

    }

    //block user
    const blockuser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "are you sure to block the user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Block!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:9000/admin/block-user/${userId}`)
                    .then((resp) => {
                        if (resp.status) {
                            Swal.fire(
                                'blocked!',
                                'success'
                            ).then((res) => {
                                location.reload()
                            })
                        } else {
                            Swal.fire(
                                resp.data.message,
                                'error'
                            )
                        }
                    })

            }
        })
    }
    //unblock user
    const UnblockUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are You Sure to Unblock user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, UnBlock!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:9000/admin/Unblock-user/${userId}`)
                    .then((resp) => {
                        if (resp.status) {
                            Swal.fire(
                                'Unblocked!',
                                'success'
                            ).then((res) => {
                                location.reload()
                            })
                        } else {
                            Swal.fire(
                                resp.data, message,
                                'error'
                            )
                        }
                    })



            }
        })

    }

    return (
        <div>

            <Header />
            <h1 className='adminHeader'>All Users</h1>
            <hr />
            <table className='users_table'>
                <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Allusers.map((user, key) => {
                            return (
                                <tr key={key}>
                                    <td data-label="Account">{user.uname}</td>
                                    <td data-label="Due Date">{user.MobileNumber}</td>
                                    <td data-label="Amount">{user.email}</td>
                                    {user.status ? (<td data-label="Amount">active</td>) : (<td data-label="Amount">Blocked</td>)}
                                    <td data-label="Period"><Link to={`/admin/Edit-user/${user._id}`} ><i class="fa-solid fa-pen-to-square" style={{ fontSize: '25px', color: 'blue', cursor: 'pointer' }} ></i></Link>
                                        <i style={{ fontSize: '25px', marginLeft: '2rem', color: 'red', cursor: 'pointer' }} onClick={() => { deleteUser(user._id) }} class="fa-solid fa-trash-can"></i>
                                        {user.blocked ? (<i class="fa-solid fa-unlock" style={{ marginLeft: "2rem", color: "green", cursor: 'pointer', fontSize: "25px" }} onClick={() => { UnblockUser(user._id) }}></i>) : (<i class="fa-solid fa-ban" style={{ fontSize: '25px', marginLeft: '2rem', cursor: 'pointer', color: 'red' }} onClick={() => { blockuser(user._id) }}></i>)}

                                    </td>


                                </tr>
                            )
                        })
                    }


                </tbody>

            </table>

        </div>
    )
}

export default AdminHome