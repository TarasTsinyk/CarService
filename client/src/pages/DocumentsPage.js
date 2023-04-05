
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/Auth.Context'
import { DocumentsList } from '../components/DocumentsList'
import { Loader } from '../components/Loader'
export const DocumentsPage = () => {
    const [documents, setDocuments] = useState([])
    const { loading, request, err, clearErr } = useHttp()
    const { token } = useContext(AuthContext)
    const fetchDocuments = useCallback(async () => {
        try {
            const fetched = await request(`/api/maintenance/`, 'GET', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            setDocuments(fetched.documents)
            console.log('fetched', fetched)
        } catch (error) { }
    }, [token, request])

    async function removeDocument(_id) {
        try {
            const rm_data = await request(`/api/maintenance/${_id}`, 'DELETE', null, { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
            if (rm_data.ok) {
                setDocuments(documents.filter(el => el._id != _id))
            }

        } catch (error) { }
    }

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <DocumentsList list={documents} rm={removeDocument} />
        </div>
    )
}