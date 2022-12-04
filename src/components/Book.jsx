import React, { useState, useEffect } from 'react'
import { event } from '../components/Home'
import { useNavigate } from 'react-router-dom'


export const ticket = {
    id:""
}
const Book = () => {
    const navigate = useNavigate()
    const [creds, setCreds] = useState({quantity:""})
   
    const [events, setEvents] = useState({})
    const [slots, setSlots] = useState([])

    useEffect(() => {
        const eData = async () => {
            fetch(`/events`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: event.id
                })


            }, [])
                .then(res => res.json())
                .then((res) => {
                    setEvents({ ...res.data })
                })
        };
        const sData = async () => {
            fetch(`/slot/${event.id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }, [])
                .then(res => res.json())
                .then((res) => {
                    setSlots([...res.data])
                })
        };
        eData()
        sData()
    }, [])
    const click =async (e) =>{
        e.preventDefault()
        const Id = e.currentTarget.id
           await fetch(`/createTicket/${event.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slotId:Id,
                quantity:creds.quantity
            })
        })
            .then(res => res.json())
            .then((res) => {
                if(res.status){
                    ticket['id'] = res.data._id
                    navigate('/order')
                }else{
                    alert(res.msg)
                }
            })
        
      }
      const handleChange = (e)=>{
        if(e.target.value < 0){
            e.target.value=0
        }
        if(e.target.value >= 6){
            e.target.value = 5
        }
        setCreds({...creds,[e.target.name]:e.target.value})
      }

    return (
        <>
            <div className='container'>
            <h2 className='my-3'>{`${events.name}`}</h2>
            {
                slots.length === 0 && (
                    <h3>Their is no slot for this movie</h3>
                )
            }
            <div className="row">
                {
                    slots.map(data => {
                        return (
                            <div className='col-md-3' key={data._id}>
                                <div className="card my-2" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <p className="card-title">{`PRICE-${data.price}`}</p>
                                        <p className="card-title">{`Dates-${data.date}`}</p>
                                        <p className="card-text">{`Show Time-${data.description}`}</p>
                                        <p className="card-text">{`Available slots-${data.available_quantity}`}</p>
                                        <p className="card-text">Quantity :-</p>
                                        <input type="number" className="form-control" name='quantity' onChange={handleChange} value={creds.quantity}/>

                                        <button  className="btn btn-primary my-2" id={data._id} onClick={click} >Confirm Ticket</button> 
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Book
