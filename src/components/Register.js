import React,{useState} from 'react'
import {NavLink} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";


 const Register = () => {

  const [showPass, setShowPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);

  const navigate = useNavigate();

  const [inpval, setInval] = useState({
    fname : '',
    email : '',
    password : '',
    cpassword : ''
  });


  

  const setInputValue = (e) =>{
    setInval({
      ...inpval,
      [e.target.name]  :  e.target.value
    })
  }

  //submit form data

  const submitUserData = async(e) =>{
     e.preventDefault();

     const {fname,email,password,cpassword} = inpval;

     if(fname === ''){
        toast.error("First name is  required !"); 
     }else if(email === ''){
        toast.error("Email is  required !"); 
     }else if(!email.includes("@")){
        toast.error("Enter Valid Email !"); 
     }
     else if(password === ''){
        toast.error('password is required')
     }else if(cpassword === ''){
        toast.error('cpassword is required')
     }
     else if(password !== cpassword){
        toast.error('password is not match')
     }
     else{
        
         const data = await fetch("http://127.0.0.1:8001/register",{
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :  JSON.stringify( {fname,email,password,cpassword})
         });
        
        const response = await data.json();

       if(response.status === 201){
        setInval({...inpval,fname : "",email:"",password:"",cpassword : ""});
        toast.success('submitted...');
        setTimeout(()=>{
                navigate('/')
        }, 3000);
       }
    
     }
  }

  return (
    <>
    <pre>{JSON.stringify(inpval)}</pre>
        <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Welcome Back, Register Page</h1>
                <p>Hi, we are you glad you are back. Please  Register Here.</p>
            </div>

            <form onSubmit={submitUserData}>
            <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setInputValue} value={inpval.fname} name="fname" id="fname"  placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setInputValue} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                <div className="form_input">
                    <label htmlFor="password">  Password</label>
                    <div className="two">
                        <input type={!showPass ? "password" : "text"} onChange={setInputValue} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                        <div className="showpass" onClick={()=>setShowPass(!showPass)}>
                            {!showPass ? "Show" : "Hide"}
                        </div>
                    </div>
                </div>
                <div className="form_input">
                    <label htmlFor="password">Confirm Password</label>
                    <div className="two">
                        <input type={!confirmPass ? "password" : "text"} onChange={setInputValue} value={inpval.cpassword} name="cpassword" id="cpassword" placeholder='Enter Your password' />
                        <div className="showpass" onClick={()=>setConfirmPass(!confirmPass)}>
                            {!confirmPass ? "Show" : "Hide"}
                        </div>
                    </div>
                </div>

                <button className='btn' >Register</button>
                <p>Don't have an Account? <NavLink to="/login">SignIn</NavLink> </p>
            </form>
          
        </div>
    </section>
    <ToastContainer position="top-center"/>
    </>
  )
}

export default Register;
