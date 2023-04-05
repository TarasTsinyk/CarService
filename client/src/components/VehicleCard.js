import React, { useCallback, useState, useContext, useEffect } from 'react'

export const VehicleCard = ({ vehicle, reportData, reportHandler ,changeHandler,clearReportData}) => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card blue-grey darken-1">
          <div className="row">
            <div className="card-content white-text">

              <span className="card-title ">Vehicle card</span>
              <div className="card-content"><div className="row">
                <div className="col s4">
                  <p>vehicle: {vehicle.name}</p>
                  <p>number : {vehicle.number}</p>
                  <p>vin: {vehicle.vin}</p>
                  <p>ID: {vehicle._id}</p>


                </div>
                <div className="col s4">
                  <p>engine: {vehicle.engine}</p>
                  <p>color: {vehicle.color}</p>
                  <p>desc : {vehicle.desc}</p>
                </div>
              </div> </div>

              <div className="card-content">
                <span className="card-title">Maintense details</span>
                <div className="row">
                  <div className="col s4"> <input id="dateFrom" name='dateFrom' type="date" placeholder='dateFrom' onClick={changeHandler} /> </div>
                  <div className="col s4"> <input id="dateTo" name='dateTo' type="date" placeholder='dateTo' onClick={changeHandler}  /></div>
                  <div className="col s4">
                    <button className='btn  teal lighten-3' style={{ marginTop: 13 }} onClick={reportHandler} >Get report</button>
                    <button className='btn  teal lighten-3' style={{ marginTop: 13 , marginLeft: 10}}  onClick={clearReportData}>Clear</button>
                    <button className='btn  teal lighten-3 disabled' style={{ marginTop: 13, marginLeft: 10 }}  >Print</button>
                    </div>

                </div>
                <div className="row">

                  <div className="col s1">No.</div>
                  <div className="col s2">Docdate</div>
                  <div className="col s1">DocNum</div>
                  <div className="col s1">carmileage</div>
                  <div className="col s2">Auto part</div>
                  <div className="col s3">Work</div>
                  <div className="col s1">Price</div>
                  <div className="col s1">WorkPrice</div>
                </div>

                {reportData.map((el,index) => {
                  return (
                    <div className="row" key = {index}>
                      <div className="col s1">{index}</div>
                      <div className="col s2">{el.docdate.substr(0, 10)}</div>
                      <div className="col s1">{el.docnum}</div>
                      <div className="col s1">{el.carmileage}</div>
                      <div className="col s2">{el.part}</div>
                      <div className="col s3">{el.work}</div>
                      <div className="col s1">{el.price}</div>
                      <div className="col s1">{el.workprice}</div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>      
        </div>
      </div>
    </div>
  )
}