import React, { useEffect, useState } from 'react'
import { ticket } from '../components/Book'
import { useNavigate } from 'react-router-dom'


const Order = () => {

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const user = parseJwt(localStorage.getItem('token'))

    const navigate = useNavigate()

    const [order, setOrder] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/')
    }

    useEffect(() => {
        const createOrder = async () => {
            await fetch(`/createOrder`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user.userId,
                    ticket: ticket.id,
                    status: 'confirmed'
                })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.status) {
                        setOrder({ ...res.data })

                    } else {
                        alert(res.msg)
                    }
                })
        }

        createOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        <div className='container my-4'>
            <div className="card" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Order Summary</h5>
                    <p className="card-text">{`Total Price - ${order.total_price}`} </p>
                    <p className="card-text">{`Purchase Date - ${order.purchase_date}`} </p>
                    <button  className="btn btn-primary" onClick={handleClick}>Confirm order</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default Order
