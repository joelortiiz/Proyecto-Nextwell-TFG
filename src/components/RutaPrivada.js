import React from 'react'
import { useAtuh } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const RutaPrivada = ({children}) => {
const usuario = useAtuh()

if(usuario){
    return children
} else {
    return <Navigate replace to='/iniciar-sesion' />
}

}
