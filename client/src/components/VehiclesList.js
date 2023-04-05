import React from 'react'

import { Link } from 'react-router-dom'

export const VehiclesList = ({ list ,rm }) => {

    if (!list.length) {
        return (<p className='center'> VehiclesList dont existes</p>)
    }
    return (
        <table>
            <thead>
                <tr>
                <th>No.</th>
                    <th>Name</th>
                    <th>number</th>
                    <th>vin</th>
                    <th>engine</th>
                    <th>color</th>
                    <th>desc</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {list.map( (v ,index) => {
                    return (
                        <tr  className="highlight" key = {index}> 
                            <td>{index +1}</td>
                            <td>{v.name}</td>
                            <td>{v.number}</td>
                            <td>{v.vin}</td>
                            <td>{v.engine}</td>
                            <td>{v.color}</td>
                            <td>{v.desc}</td>
                            <td><Link to ={`/vdetail/${v._id}`}>Open</Link></td>
                            <td> <button  onClick= { ()=>rm(v._id)}>&times;</button ></td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}