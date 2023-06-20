import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-custom-alert"
import { useState } from 'react'
import Navbar from '../Navbar';
import "./signup.css"

import { useGoogleLogin } from '@react-oauth/google';
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", userType: "" })
    const [usertype, setUsertype] = useState("Student");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const userType = usertype;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, userType })
        });
        const json = await response.json()

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userType', json.userType);
            localStorage.setItem('user', JSON.stringify(json.result));

            navigate("/")

            toast.success('success');
        }
        else {

            toast.error('Invalid Credentials');

        }
    }
    async function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ googleAccessToken: accessToken })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userType', json.userType);
            localStorage.setItem('user', JSON.stringify(json.result));
            localStorage.setItem('firstTime', json.firstTime);
            navigate("/")

            toast.success('success');

        }
        else {
            toast.error('Invalid Credentials');
        }


    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    return (
        <>

            <Navbar />
            <section className='Form my-4 mx-5 '>
                <div className="container">
                    <div className="row signuprow no-gutters">
                        <div className="col-lg-7 px-5 pt-2">
                            <div><h1 className='font-weight-bold py-3'>InternOp</h1></div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input type="name" placeholder="Name" className="form-control my-3 p-3" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="email" placeholder="Email-Address" className="form-control my-3 p-3" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-row">
                                    <input type="password" placeholder="*******" className="form-control my-3 p-3" value={credentials.password} onChange={onChange} name="password" id="password" />
                                </div>
                                <div className="form-row">
                                    <input type="radio" name="usertype" value="Alum" onChange={e => setUsertype(e.target.value)} />
                                    <label className="form-check-label " htmlFor="flexRadioDisabled">
                                        <h6 className='font-weight-bold py-2'>Alum</h6>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <input type="radio" name="usertype" value="Student" onChange={e => setUsertype(e.target.value)} />
                                    <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                                        <h6 className='font-weight-bold py-2'>Student</h6>
                                    </label>
                                </div>

                                <button type="submit" className="btn btn1 btn-dark my-3 px-4">SignUp</button>

                            </form>
                            <div className='d-flex justify-content-between'>
                                <div className='my-4'>
                                    <p>Login with google</p>
                                    <button onClick={() => login()} className="btn btn2">
                                        <i className="fa-brands fa-google "></i></button>
                                </div>
                                <div className='my-4 mb-4'>
                                    <p>Already have an account?</p><Link to="/login">Login here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 px-0">
                            <img src="https://img.freepik.com/free-vector/successful-financial-operation-cash-currency-money-income-credit-approval-savings-insurance-finance-contract-creative-budget-management_335657-2094.jpg?w=740&t=st=1686698730~exp=1686699330~hmac=02aa3718351f5404fceb99a95d005080fa7d65ed4e5dd21233c75d5a0d2724b0" className='img-fluid signupimg' alt="..." />
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}

export default Signup
