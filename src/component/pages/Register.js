import React from 'react';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './register.css'
import { useState, useEffect } from 'react'
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    // const meetingPic = new URL("meeting.jpg", import.meta.url)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner and disable button
     
        try {
       
          const response = await fetch("https://user-analytics-system-825467496328.us-central1.run.app/api/register-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            toast.success(`The link has been sent successfully to ${email}. Click on the link sent to complete the registration`);
            
     
            dispatch({
              type: "REGISTERATION",
              payload: { email },
            });
          } else {
            // Handle the error case from the backend
            toast.error(data.message || "There was an issue sending the registration link. Please try again later.");
          }
        } catch (error) {
            
          toast.error("There was an issue sending the registration link. Please try again later.");
        }finally {
            setLoading(false); // Hide spinner and re-enable button
          }
      };
      

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            navigate("/")
        }
    }, [user, navigate])
    const RegisterForm = () => (
        <form onSubmit={handleSubmit} className=' productA pulse animated form-container mt-5 mb-5'>
            <h2 className="text-center text-white"><strong>Create</strong> an account.</h2>
            <div className="form-group">
                <input type="email" className="form-control form-control-lg" name="email" placeholder="Email" 
                value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus required/>
           </div>
            <div className="form-group"><button className="btn btn-danger btn-block w-100 mt-2" type="submit" disabled={!email || !email.includes("@") || !email.includes(".com")}>Send Email Code </button>
            </div><div className="already text-center text-white"  >You already have an account? 
             <Link to='/Login' className=' text-primary'> Login here.
            </Link></div>
        </form>
    )

    return (
        <div className=" " >
           <section className='custom'> 
  <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> 

  <div className="signin"> 
   
        <div className='row '>    
        
                       <div className='col mb-2'>
                    {RegisterForm()}
                       </div>
                  
            
        </div>
        </div> 
        </section> 
    </div>

)
    
};

export default Register