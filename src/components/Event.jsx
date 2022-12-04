import React,{useState} from 'react'

const Event = () => {

  const initialCred = {
    slug:"",
    name:"",
    description:"",
    start_date:"",
    end_date:"",
    published: false,
}
const [creds, setCreds] = useState(initialCred)


const handleSubmit =async (e) => {
e.preventDefault()
await fetch("/create",{
    method:"POST",
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
      alert("event created successFully")
      setCreds(initialCred)
    }else{
        alert("error ,try again")
    }
    
})
}

const handleChange = (e) =>{
     setCreds({...creds,[e.target.name]:e.target.value})
}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='container my-5' style={{width:"500px"}}>
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
            <button>Submit</button>
        </div>
        </form>
    </>
  )
}

export default Event