import React,{useState,useEffect} from 'react'

const Manage = () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetching = async () => {
            fetch(`/events`, {
                method: "GET",
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

        // eslint-disable-next-line
    })
    const initialCred = {
        eventId:"",
        slug:"",
        name:"",
        description:"",
        start_date:"",
        end_date:"",
        published: true,
        price:"",
        total_quantity:"",
        available_quantity:"",
        date:""
    }
    const [creds, setCreds] = useState(initialCred)
    
    
    const updateEvent =async (e) => {
    e.preventDefault()
    await fetch(`/event/${creds.eventId}`,{
        method:"PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key':localStorage.getItem('token')
          },
        body: JSON.stringify({
          slug:creds.slug,
          name:creds.name,
          description:creds.description,
          start_date:creds.start_date,
          end_date:creds.end_date,
          published:creds.published
        })
    }).then(res=>res.json())
    .then(res=>{
        if(res.status){
          alert("update successFully")
          setCreds(initialCred)

        }else{
            alert(res.msg)
        }
        
    })
    }
    
    const handleChange = (e) =>{
         setCreds({...creds,[e.target.name]:e.target.value})
    }
    const slotSubmit = async (e) =>{
    e.preventDefault()
    await fetch(`/createSlot`,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key':localStorage.getItem('token')
          },
        body: JSON.stringify({
            event:creds.eventId,
            date:creds.date,
          description:creds.description,
          price:creds.price,
          total_quantity:creds.total_quantity,
          available_quantity:creds.available_quantity
        })
    }).then(res=>res.json())
    .then(res=>{
        if(res.status){
          alert("Slot created successFully")
          setCreds(initialCred)
        }else{
            alert(res.msg)
        }
        
    })

    }
    const deleteEvent =async (e) =>{
        e.preventDefault()
        await fetch(`/deleteEvent/${creds.eventId}`,{
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key':localStorage.getItem('token')
              }
        }).then(res=>res.json())
        .then(res=>{
            if(res.status){
              alert("Delete successFully")
              setCreds(initialCred)
            }else{
                alert(res.msg)
            }
            
        })
    }
   
  return (
    <>
   <div className='container'>
            <h4 className='my-2'>all Events</h4>
            <div className="d-flex" style={{overflowY:"hidden",overflowX:"scroll"}}>
                {
                    events.map(data => {
                        return (
                            <div className='container' key={data._id} >
                                <div className="card" style={{ width: "16rem" }} >
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}</h5>
                                        <p className="card-text">{`eventId-${data._id}`}</p>
                                        <p className="card-text">{`${data.start_date} to ${data.end_date}`}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='d-flex justify-content-md-around'>
        <form onSubmit={slotSubmit} >
        <div className='container my-5' style={{width:"500px"}} >
        <h4>Create Slot</h4>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Event</label>
                <input type="text" className="form-control" name="eventId" onChange={handleChange} value={creds.eventId}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Date </label>
                <input type="date" className="form-control" name="date"  onChange={handleChange} value={creds.date}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Description </label>
                <input type="text" className="form-control" name="description"  onChange={handleChange} value={creds.description}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Price </label>
                <input type="number" className="form-control" name="price"  onChange={handleChange} value={creds.price}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Total_Quantity </label>
                <input type="number" className="form-control" name="total_quantity"  onChange={handleChange} value={creds.total_quantity}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Available Quantity </label>
                <input type="number" className="form-control" name="available_quantity"  onChange={handleChange} value={creds.available_quantity}/>
            </div>
            <button>Submit</button>
        </div>
        </form>
        <form onSubmit={updateEvent}>
        <div className='container my-5' style={{width:"500px"}}>
        <h4>Update Event</h4>
        <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Event Id</label>
                <input type="text" className="form-control" name="eventId" onChange={handleChange} value={creds.eventId}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">slug</label>
                <input type="text" className="form-control" name="slug" onChange={handleChange} value={creds.slug}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> name </label>
                <input type="text" className="form-control" name="name"  onChange={handleChange} value={creds.name}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> description </label>
                <input type="text" className="form-control" name="description"  onChange={handleChange} value={creds.description}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> start_date </label>
                <input type="date" className="form-control" name="start_date"  onChange={handleChange} value={creds.start_date}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> end_date </label>
                <input type="date" className="form-control" name="end_date"  onChange={handleChange} value={creds.end_date}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"> Published </label>
                <input type="boolean" className="form-control" name="published"  onChange={handleChange} value={creds.published}/>
            </div>
            <button>Update</button>
        
        </div>
        </form>
        <form onSubmit={deleteEvent}>
        <div className='container my-5' style={{width:"500px"}}>
        <h4>Delete event</h4>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Event Id</label>
                <input type="text" className="form-control" name="eventId" onChange={handleChange} value={creds.eventId}/>
            </div>
            
            <button>Delete</button>
        </div>
        </form>
        </div>
    
    </>
  )
}

export default Manage