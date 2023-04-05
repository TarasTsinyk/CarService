
import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.Context'
import { redirect ,useNavigate} from "react-router-dom";

export const AddPage = () => {
    const [form, setForm] = useState({ name: '', desc: '' , number: '',vin: '',engine: '',color: ''})
    const { loading, request, err, clearErr } = useHttp()
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    const saveHandler = async (event) => {
        try {
            const data = await request('/api/vehicle/add', 'POST', { ...form },  { 'Content-Type': 'application/json','Authorization' : `Bearer ${auth.token}` } )
            navigate(`/vdetail/${data.vehicle._id}`);    
        } catch (error) { }
    }
    const changeHandler = (event) => {
        setForm(
            { ...form, [event.target.name]: event.target.value }
        )
    }
    return (
        <div>
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="input-field ">
                         <input id="name" name='name' type="text" placeholder='vehicle' onChange={changeHandler} />
                         <label htmlFor="name">Vehicle name</label>
                    </div>
                   
                    <div className="input-field ">
                        <input id="number" name='number' type="text" placeholder='number' onChange={changeHandler} />
                    </div>
                    <div className="input-field ">
                        <input id="vin" name='vin' type="text" placeholder='vin' onChange={changeHandler} />
                    </div>

                    <div className="input-field ">
                       <input id="engine" name='engine' type="text" placeholder='engine' onChange={changeHandler} />
                    </div>
                    <div className="input-field ">
                        <input id="color" name='color' type="text" placeholder='color' onChange={changeHandler} />
                    </div>
                    <div className="input-field ">
                        <input id="desc" name='desc' type="text" placeholder='comment' onChange={changeHandler} />
                        {/* <label for="desc">Comment</label> */}
                    </div>
                    <button className='btn  teal lighten-3' style={{ marginRight: 10 }} onClick={saveHandler}>Save</button>
                    </div>
            </div>
        </div>
    )
}