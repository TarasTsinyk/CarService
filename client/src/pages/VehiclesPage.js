
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.Context'
import { VehiclesList } from '../components/VehiclesList'
import { Loader } from '../components/Loader'
export const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([])
    const { loading, request, err, clearErr } = useHttp()
    const { token } = useContext(AuthContext)
    const fetchVehicles = useCallback(async () => {
        try {
            const fetched = await request(`/api/vehicle/`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            setVehicles(fetched)
            console.log('fetched', fetched)
        } catch (error) { }
    }, [token, request])

    async function removeVehicle(_id) {
        try {
            const rm_data = await request(`/api/vehicle/${_id}`, 'DELETE', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            if (rm_data.ok) {
                setVehicles(vehicles.filter(el => el._id != _id))
            }

        } catch (error) { }
    }

    useEffect(() => {
        fetchVehicles()
    }, [fetchVehicles])


    if(loading){
       return <Loader/>
    }
    return (
        <div>
            <VehiclesList list={vehicles} rm={removeVehicle} />
        </div>
    )
}