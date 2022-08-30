import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { Box, Text, Input, Button, Stack, Spinner, useToast } from '@chakra-ui/react'
import { connect } from 'react-redux'

const API_URL = process.env.REACT_APP_API_URL

export default function Login () {
    const usern = useRef("")
    const passw = useRef("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onButtonLogin = () => {
        setLoading(true)
        Axios.get(API_URL + `/members?username=${usern.current.value}&password=${passw.current.value}`)
        .then((respond) => {
            console.log(respond.data)
            setLoading(false)

            // if failed
            if (!respond.data.length) return toast({
                title: 'Info',
                description: "username and password doesn't found.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })

            // save token to localstorage
            localStorage.setItem("token", respond.data[0].id)

            // save user data to global state
            dispatch({ type : 'LOGIN', payload : respond.data[0] })

            // if success
            toast({
                title: 'Login success',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            // redirect to home page
            navigate('/')
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }
    // protection
    const token = localStorage.getItem('token')
    if (token) return <Navigate to="/"/>

    return (
        <Box px="21%" py={65} w="100%" h="auto" backgroundColor="#F7F7F7">
            <Stack px="30%" py={20} spacing="15px" backgroundColor="#FFFFFF" borderRadius="10px">
                <Text fontWeight="bold">Username</Text>
                <Input ref={usern} type="text" placeholder='FirasKun.89'/>
                <Text fontWeight="bold">Password</Text>
                <Input ref={passw} type="password" placeholder='********'/>
                <Button
                    w="90px"
                    colorScheme='teal' 
                    variant='solid'
                    onClick={onButtonLogin}
                    disabled={loading}
                >
                    { loading ? <Spinner size="md"/> : "Login" }
                </Button>
            </Stack>
        </Box>
    )
}