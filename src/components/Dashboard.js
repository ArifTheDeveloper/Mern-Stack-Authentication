import React,{useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { addData } from './context/ContextProvider';

 const Dashboard = () => {

  const { loginData,setLoginData } = useContext(addData);

  const navigate = useNavigate();

  const dashboardValid = async()=>{
    let token = localStorage.getItem("usersdatatoken");
    

    let res =  await fetch("http://127.0.0.1:8001/validuser",{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "authorization" : token
      }
    });

    let data = await res.json();
    console.log(data);

    if(data.status == 401 || !data){
      navigate('*');
    }else{
      console.log("user verifed");
      setLoginData(data.validUserOne);
      navigate('/dashboard');
    }
  }

  useEffect(()=>{
    dashboardValid();
  }, []);

//  console.log(loginData.validUserOne.email);

  
  return (
   
    <>
     {/* <pre>{JSON.stringify(loginData.validUserOne)}</pre> */}
       <section className="my-5">
       <h1>Welcome To Dashboard</h1>
        <img className="my-3" src="https://www.w3schools.com/howto/img_avatar.png" width="100" height="100" alt="" />
        <h1>User Email:{loginData.email}</h1>
       </section>
        
    </>
  )
}

export default Dashboard;
