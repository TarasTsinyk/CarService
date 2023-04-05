import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/Auth.Context'
import { Loader } from '../components/Loader'
import { VehicleCard } from '../components/VehicleCard'
export const VehicleDetailPage = () => {
    const vehId = useParams().id
    const { loading, request, err, clearErr } = useHttp()
    const { token } = useContext(AuthContext)
    const [vehicle, setVehicle] = useState({})
    const [reportData, setReportData] = useState([])

    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const changeHandler = (event) => {
        if (event.target.name === 'dateFrom') {
            setDateFrom(event.target.value)
        }
        if (event.target.name === 'dateTo') {
            setDateTo(event.target.value)
        }
    }

    const clearReportData = function () {
        setReportData([])
    }

    const gVehicle = useCallback(async () => {
        try {
            const fetched = await request(`/api/vehicle/${vehId}`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            setVehicle(fetched)
        } catch (error) { }
    }, [token, vehId, request])

    useEffect(() => {
        gVehicle()
    }, [gVehicle])

    const reportHandler = async function () {
        try {
            const fetched = await request(`/api/maintenance/report/${vehId}`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, dateFrom, dateTo })
            setReportData(fetched.docsDetails)
        } catch (error) { }
    }

    return (<div>
        <VehicleCard vehicle={vehicle} reportData={reportData} reportHandler={reportHandler} changeHandler={changeHandler} clearReportData={clearReportData} />
    </div>)
}