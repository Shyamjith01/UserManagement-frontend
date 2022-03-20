import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../header/Header'

function Blockeduser() {

    const [BlockedUsers, setBlockedUsers] = useState([])

    useEffect(async () => {
        let BlockedUsers = await axios.get('http://localhost:9000/admin/getBlockedUsers')
        if (BlockedUsers) {
            setBlockedUsers(BlockedUsers.data)
        }
    }, [])

    //unblock user
    const unblockuser = (userId) => {
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
                        BlockedUsers.map((user, key) => {
                            return (
                                <tr key={key}>
                                    <td data-label="Account">{user.uname}</td>
                                    <td data-label="Due Date">{user.MobileNumber}</td>
                                    <td data-label="Amount">{user.email}</td>
                                    <td data-label="Amount">Blocked</td>
                                    <td data-label="Period">
                                        <i class="fa-solid fa-unlock" onClick={() => { unblockuser(user._id) }} style={{ marginLeft: "2rem", color: "green", cursor: 'pointer', fontSize: "25px" }} ></i>
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

export default Blockeduser