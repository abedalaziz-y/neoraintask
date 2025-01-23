import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { CRUDUSER } from '../../functions/auth';
import './registerComplete.css'; // Import the CSS for animation

const RegisterComplete = () => {
  const state = useSelector((state) => state);
  const { registeration } = state;
  const { email } = registeration;
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(registeration,password)
    if (!registeration.email || !password) {
      toast.error('Email and Password are required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password is too short!');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);

      if (result.user.emailVerified) {
        const currentUser = auth.currentUser;
        await currentUser.updatePassword(password);

        const idTokenResult = await currentUser.getIdTokenResult();

        // Redux store
        CRUDUSER(idTokenResult.token)
        .then((res) => {
          console.log("CRUDUSER API Response:", res.data); // Debugging log
          if (res.data && res.data.role && res.data.token) {
            dispatch({
              type: "LOGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                picture: res.data?.picture?.url,
                token: res.data.token,
              },
            });
            toast.success("User successfully logged in.");
          } else {
            toast.error("Invalid response from the server.");
          }
        })
        .catch((err) => {
          console.error("Error saving user info:", err); 
          toast.error("Error saving user info. Please try again.");
        });
      
        // navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
      setPassword('');
      setPicture([]);
    }
  }
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate password strength
    setPasswordStrength({
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasMinLength: value.length >= 6,
    });
  };
  const [passwordStrength, setPasswordStrength] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
  });
  return (

    <div>

<section className='customize'> 
  <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> <small></small> 
  <div className="signin">
          <div className="register-form">
            <h1 className="title text-white">Register Complete</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Create password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoFocus
                />
              </div>

              {/* Password Requirements */}
              <div className="alert alert-info mt-3">
                <p className="mb-1">Password must include:</p>
                <ul className="mb-0">
                  <li style={{ color: passwordStrength.hasUppercase ? 'green' : 'red' }}>
                    {passwordStrength.hasUppercase ? '✔' : '✘'} At least one uppercase letter
                  </li>
                  <li style={{ color: passwordStrength.hasLowercase ? 'green' : 'red' }}>
                    {passwordStrength.hasLowercase ? '✔' : '✘'} At least one lowercase letter
                  </li>
                  <li style={{ color: passwordStrength.hasNumber ? 'green' : 'red' }}>
                    {passwordStrength.hasNumber ? '✔' : '✘'} At least one number
                  </li>
                  <li style={{ color: passwordStrength.hasMinLength ? 'green' : 'red' }}>
                    {passwordStrength.hasMinLength ? '✔' : '✘'} Minimum 6 characters
                  </li>
                </ul>
              </div>

              <button
                className="btn-submit"
                type="submit"
                disabled={
                  !passwordStrength.hasUppercase ||
                  !passwordStrength.hasLowercase ||
                  !passwordStrength.hasNumber ||
                  !passwordStrength.hasMinLength
                }
              >
                Finish
              </button>
            </form>
            <div className="already text-center text-white-50">
              You already have an account? <Link to="/Login">Login here</Link>
            </div>
          </div>
        </div></section> </div>
  );
};

export default RegisterComplete;
