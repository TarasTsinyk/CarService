import { useCallback } from "react"

export const useMessage = () => {
    const mes = useCallback((text) => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
    return mes

}