import React from 'react'
export const MaintenanceDetails = ({rows,chHndlRow}) => {
    return (
        <div>
            <div className="row blue-grey darken-1"  >
                <div className="col s1">No.</div>
                <div className="col s4">Auto part</div>
                <div className="col s4">Auto work</div>
                <div className="col s1">Price</div>
                <div className="col s1">Work price</div>
            </div>
            
            {rows.map( (v ,index) => {
                    return (
                        <div className="row" key = {index +1}>
                        <div className="col s1">{index}</div>
                        <div className="col s4"><input id={index} type="text"  name = 'part' value={v.part}  onChange={ chHndlRow}/></div>
                        <div className="col s3"><input id={index} type="text"  name = 'work' value={v.work}  onChange={ chHndlRow}/></div>
                        <div className="col s2"><input id={index} type="number" name = 'price' value={v.price} onChange={ chHndlRow}/></div> 
                        <div className="col s2"><input id={index} type="number" name = 'workprice' value={v.workprice} onChange={ chHndlRow}/></div>   
                    </div>    
                    )
                })}
        </div>
    )
}