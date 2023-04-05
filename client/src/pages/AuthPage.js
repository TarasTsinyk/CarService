
import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.Context'
import { redirect, useNavigate } from "react-router-dom";
export const AuthPage = () => {
    const { loading, request, err, clearErr } = useHttp()
    const [form, setForm] = useState({ email: '', password: '' })
    const auth = useContext(AuthContext)
    const message = useMessage()
    const navigate = useNavigate();
   
    useEffect(() => {
        console.log('useEffect', err)
        message(err)
    }, [err, message, clearErr])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm(
            { ...form, [event.target.name]: event.target.value }
        )
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form }, { 'Content-Type': 'application/json' })
            message(data.message)
        } catch (error) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form }, { 'Content-Type': 'application/json' })
            auth.login(data.token, data.userId)
            navigate(`/vehicles`);
        } catch (error) { }
    }
    return (
        <div className='row' style={{ marginTop: 100 }}>
            <div className="col s6 offset-s3">
                {/* <h1>Auth page</h1> */}
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Car service</span>
                        <div>
                            <div className="input-field ">
                                <input id="email" name='email' type="text" placeholder='Enter email' onChange={changeHandler} value={form.email} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input id="password" name='password' type="password" placeholder='Enter password' onChange={changeHandler} value={form.password} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {/* <a href="#">This is a link</a>
                        <a href="#">This is a link</a> */}
                        <button className='btn  teal lighten-3' style={{ marginRight: 10 }} onClick={loginHandler} disabled={loading} >Login</button>
                        <button className='btn deep-orange lighten-3' onClick={registerHandler} disabled={loading} >Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}