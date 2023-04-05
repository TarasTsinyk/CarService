
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.Context'
import { redirect, useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom'
import { MaintenanceDetails } from '../components/MaintenanceDetails'


import { useMessage } from '../hooks/message.hook'
export const DocMaintancePage = () => {
    const message = useMessage()
    const docId = useParams().id

    const [form, setForm] = useState({ docnum: '', vehiclename: '', vehicleID: '', docdate: '', vehiclenumber: '', vin: '', engine: '', carmileage: 0 })

    const { loading, request, err, clearErr } = useHttp()
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([])

    //-------------------------------------------------------------------
    const [tblRows, setTblRows] = useState([{ id: 0 }])

    //-------------------------------------------------------------------
    const { token } = useContext(AuthContext)

    const fetchVehicles = useCallback(async () => {
        try {
            const fetched = await request(`/api/vehicle/`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            setVehicles(fetched)
            window.M.FormSelect.init(document.querySelectorAll('select'))
        } catch (error) { }
    }, [token, request])

    
    const fetchDoc = useCallback(async () => {
        try {
            if (docId) {
                const fetched = await request(`/api/maintenance/${docId}`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                fetched.form.docdate = fetched.form.docdate.substr(0, 10)

                setForm(fetched.form)
                setTblRows(fetched.tblRows)

            }
            else {
                const fetched = await request(`/api/maintenance/`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
                const countDocs = fetched.documents.length
                const NewForm = { ...form }
                if (countDocs) {
                    NewForm.docnum = countDocs + 1
                } else {
                    NewForm.docnum = 1
                }
                setForm(NewForm)
            }
        } catch (error) { }
    }, [token, request])



    useEffect(() => {
        window.M.updateTextFields()
        // var elems = document.querySelectorAll('.datepicker');
        //var instances = window.M.Datepicker.init(elems, { autoClose: true, format: 'm d, yyyy',i18n :{}, onSelect: (nD) => { setForm({...form, docdate: nD})} });
    }, [])

    useEffect(() => {
        fetchVehicles()
    }, [fetchVehicles])


    useEffect(() => {
        fetchDoc()
    }, [fetchDoc])


    useEffect(() => {
        message()
    }, [message])


    const saveHandler = async (event) => {
        try {
            const data = await request('/api/maintenance/create_update', 'POST', { form, tblRows }, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` })
            message(data.message)
            navigate(`/documents`);
        } catch (error) { }
    }

    const changeHandler = (event) => {
        if (event.target.name === 'vehiclename') {
            const inx = Number(event.target.value)
            const carData = vehicles[inx]
            const { vin, engine, number: vehiclenumber, name: vehiclename, _id: vehicleID } = carData
            const ob = { vin, engine, vehiclenumber, vehiclename, vehicleID }
            const f2 = { ...form, [event.target.name]: event.target.value, ...ob }

            setForm(f2)
        }
        else {
            setForm(
                { ...form, [event.target.name]: event.target.value }

            )
        }
    }

    function chHndlRowHandler(event) {
        const ntblRows = tblRows.map((el) => {
            if (Number(event.target.id) === el.id) {
                return { ...el, [event.target.name]: event.target.value }
            }
            return el
        })
        setTblRows(ntblRows)
    }

    const addRowHandler = (event) => {
        setTblRows(tblRows.concat({ id: tblRows.length }))
    }

    const removeRowHandler = (id) => {
        setTblRows(tblRows.slice(0, tblRows.length - 1))
    }

    return (
        <div>
            <button className='btn  teal lighten-3' style={{ marginTop: 13 }} onClick={saveHandler}>Save document</button>
            <button className='btn  teal lighten-2 disabled' style={{ marginTop: 13, marginLeft: 10 }} onClick={saveHandler}>Post document</button>
            <button className='btn  waves-light red lighten-2 disabled' style={{ marginTop: 13, marginLeft: 10 }} onClick={saveHandler}>Mark deleted</button>
            <div className="row">
                <div className="col s12 ">
                    <div className="row">
                        <div className="input-field col s3">
                            <input id="docnum" name='docnum' type="number" value={form.docnum} placeholder='docnum' onChange={changeHandler} />
                            <label htmlFor="docnum">docnum</label>
                        </div>

                        <div className="input-field col s3">
                            <input id="carmileage" name='carmileage' type="number" value={form.carmileage} placeholder='carmileage' onChange={changeHandler} />
                            <label htmlFor="carmileage">carmileage</label>
                        </div>

                        <div className="input-field col s6">
                            <input id="docdate" name='docdate' type="date" value={form.docdate} onChange={changeHandler} placeholder='docdate' />
                            <label htmlFor="docdate">docdate</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <select id="vehiclename" name='vehiclename' onChange={changeHandler} >

                                {/* <option value="" disabled {  ? 'selected':  'selected' } > 'Choose your car'</option>  */}
                                <option value="" disabled  > 'Choose your car'</option>
                                {vehicles.map((v, index) => {
                                    return (
                                        <option value={index} >{v.name}</option>
                                    )
                                })}
                            </select>

                        </div>

                        <div className="input-field col s6">
                            <input id="vehiclenumber" name='vehiclenumber' value={form.vehiclenumber} type="text" placeholder='vehiclenumber' onChange={changeHandler} />
                            <label htmlFor="vehiclenumber">vehiclenumber</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="engine" name='engine' type="text" value={form.engine} placeholder='engine' onChange={changeHandler} />
                            <label htmlFor="engine">engine</label>

                        </div>

                        <div className="input-field col s6">
                            <input id="vin" name='vin' type="text" value={form.vin} placeholder='vin' onChange={changeHandler} />
                            <label htmlFor="vin">vin</label>
                        </div>
                    </div>


                    <div className="row">

                        <button className='btn  teal lighten-3' style={{ marginTop: 13, marginLeft: 10 }} onClick={addRowHandler}>Add</button>
                        <button className='btn  waves-light red lighten-2' style={{ marginTop: 13, marginLeft: 10 }} onClick={removeRowHandler}>Remove</button>
                    </div>

                    {< MaintenanceDetails rows={tblRows} chHndlRow={chHndlRowHandler} />}

                </div>
            </div>

        </div>
    )
}