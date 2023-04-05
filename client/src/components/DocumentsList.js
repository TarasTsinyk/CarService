import React from 'react'

import { Link } from 'react-router-dom'

export const DocumentsList = ({ list, rm }) => {

    if (!list.length) {
        return (<p className='center'> VehiclesList dont existes</p>)
    }
    return (
        <table>
            <thead>
                <tr>
                   
                    <th>docnum</th>
                    <th>docdate</th>
                    <th>vehiclename</th>
                    <th>carmileage</th>

                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                {list.map((v, index) => {
                    return (
                        <tr className="highlight" key = {index}>
                           
                            <td>{v.docnum}</td>
                            <td>{v.docdate.substr(0, 10)}</td>
                            <td>{v.vehiclename}</td>
                            <td>{v.carmileage}</td>

                            <td><Link to={`/editmaintance/${v._id}`}>Open</Link></td>
                            <td> <button onClick={() => rm(v._id)}>&times;</button ></td>

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}