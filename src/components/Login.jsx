import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const initialCred = {
      email:"",
      password:""
  }
const [creds, setCreds] = useState(initialCred)


const handleSubmit =async (e) => {
  e.preventDefault()
  await fetch("/login",{
      method:"POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
      email:creds.email,
      password:creds.password
      })
  }).then(res=>res.json())
  .then(res=>{
      if(res.status){
        localStorage.setItem('token',res.token)
        localStorage.setItem('role',res.role)
          navigate("/")
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
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={handleChange} value={creds.email}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={handleChange} value={creds.password}/>
            </div>
            <button>Login</button>
        </div>
        </form>
    </>
  )
}

export default Login