import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(null)

    const request = useCallback(
        async function (url, method = 'GET', body = null, headers = {}) {
            try {
                if (body) {
                    body = JSON.stringify(body)
                }
                setLoading(true)
                const response = await fetch(url, { method, body, headers })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }
                setLoading(false)
                return data
            } catch (error) {
                setLoading(false)
                setErr(error.message)
                console.log('catch', error.message)
                throw error
            }
        }
        ,
        []
    )
    const clearErr = useCallback(() => { setErr(null) }, [])
    return { loading, request, err, clearErr }
}