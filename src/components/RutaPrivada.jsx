import React from 'react'
import { useAtuh } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const RutaPrivada = ({children}) => {
const usuario = useAtuh().usuario
console.log(usuario)
if(usuario !== null){
    return children
} else {
    return <Navigate replace to='/sign-in' />
}

}
