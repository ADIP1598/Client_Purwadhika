import Axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Verification = () => {
    const [message, setMessage] = useState("Loading...")
    const { token } = useParams();

    const sendVerification = () => {
        Axios.patch(`http://localhost:3300/users/verification`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.success === true) {
                    setMessage(res.data.message)
                }
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        sendVerification()
    }, [])

    return (
        <div>
            <h1>{message}</h1>
            <div>{token}</div>
        </div>
    )
}

export default Verification