import React from 'react'
//import { Switch, Route, Redirect } from 'react-router-dom'


import { Routes, Route, redirect  } from "react-router-dom";



import { AuthPage } from './pages/AuthPage'

import { AddPage } from './pages/AddPage'
import { DocMaintancePage} from './pages/DocMaintancePage'

import { VehiclesPage } from './pages/VehiclesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/add' element={<AddPage />} />
                <Route path='/addmaintance' element={<DocMaintancePage />} />
                
                <Route path='/vehicles' element={<VehiclesPage />} />
                <Route path='/vdetail/:id' element={<VehicleDetailPage />} />
                <Route path='/editmaintance/:id' element={<DocMaintancePage />} />
                <Route path='/documents' element={<DocumentsPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />    
        </Routes>)
}