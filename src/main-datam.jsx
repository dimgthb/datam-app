import React, { useEffect } from 'react'
import Axios from 'axios'
import { Box } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// components
import Navbar from './components/navbar'
import Navigation from './components/navigation'
import Loading from './components/loading'

// pages
import ShowTable from './pages/showtable'
import ShowFormInput from './pages/form-input'
import Login from './pages/login'
import Register from './pages/register'


function MainDatam() {
    const location = useLocation()

    // global state
    const loading = useSelector((state) => state.member.loading)
    const dispatch = useDispatch()

    // side-effect
    useEffect(() => {
        const id = localStorage.getItem("token")
        dispatch({ type : 'ON_START' })

        Axios.get(process.env.REACT_APP_API_URL + `/members/${id}`)
        .then((respond) => {
            dispatch({ type : 'LOGIN', payload : respond.data })
            dispatch({ type : 'ON_END'})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : 'ON_END'})
        })
    }, [])

    return (
        <Box w="100vw" h="100vh" backgroundColor="#F7F7F7">
            <Navbar pathname={location.pathname}/>
            { location.pathname !== '/login' && location.pathname !== '/regis' ? <Navigation/> : null }
            <Routes>
                <Route path="/" element={<ShowFormInput/>}/>
                <Route path="/table" element={<ShowTable/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/regis" element={<Register/>}/>
            </Routes>
            <Loading isLoading={loading}/>
        </Box>    
    )
}

export default MainDatam