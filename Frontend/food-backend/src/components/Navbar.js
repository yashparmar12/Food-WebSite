import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Card from '../screens/Card';
import { useCart } from './ContextReducer';
const Navbar = () => {
    
    const item = useCart();

    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();

    const handlelogout = () =>{
        localStorage.removeItem("authToken");
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mb-2 me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                </li>
                                : ""}
                        </ul>

                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                                    My Carts {" "}
                                    <Badge pill bg="danger">{item.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={()=>{setCartView(false)}}><Card/></Modal> : null}
                                <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar