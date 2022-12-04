import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const click = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ">
                            {
                                localStorage.getItem("role") === "admin_user" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/event">Create Event</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/slot" className="nav-link">Manage</Link>
                                        </li>
                                    </>
                                )
                            }
                            {
                                !localStorage.getItem("token") ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup">SignUp</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">LogIn</Link>
                                        </li>
                                    </>
                                ) : <li className="nav-item">
                                    <button className="btn btn-outline-warning" onClick={click} >Logout</button>
                                </li>
                            }


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar