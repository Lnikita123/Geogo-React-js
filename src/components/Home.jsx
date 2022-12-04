import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const event = {
    id:""
}
const Home = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetching = async () => {
           fetch(`/events`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((res) => {
                    setEvents([...res.data])
                })
        }
        fetching()

        
    },[events])
const click = (e) => {
  e.preventDefault()
  event['id'] = e.currentTarget.id
  navigate('/book')
}

    return (
        <div className='container'>
            <h2 className='my-3'>Book your movies</h2>
            <div className="row">
                {
                    events.map(data => {
                        return (
                            <div className='col-md-3' key={data._id}>
                                <div className="card my-2" style={{ width: "18rem" }}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQPcR3jI3ihVHPFGSndPTbHAoZU5iphAoUdw&usqp=CAU" className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <p className="card-text">{data.description}</p>
                                        <p className="card-text">{`Show - ${data.start_date} to ${data.end_date}`}</p>
                                        <button  className="btn btn-primary mx-1" id={data._id} onClick={click}>Book</button> 
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home