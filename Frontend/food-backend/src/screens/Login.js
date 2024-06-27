import React ,{useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const[crede, setcrede] = useState({email:"",password:""})
  const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:crede.email, password:crede.password})
        });

        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials");
        }
        if(json.success){
            localStorage.setItem("authToken",json.authToken);
            navigate('/');
        }
    }

    const onChange = (e) =>{
        setcrede({...crede,[e.target.name]:e.target.value});
    }
  return (
    <div>
      <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={crede.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={crede.password} onChange={onChange}/>
                </div>
                
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
            </form>
            </div>
    </div>
  )
}

export default Login