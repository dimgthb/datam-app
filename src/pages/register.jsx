import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Grid, Box, Stack, Input, Button, Text, Spinner, useToast } from '@chakra-ui/react'

const API_URL = process.env.REACT_APP_API_URL

export default function Register () {
    const usern = useRef("")
    const email = useRef("")
    const passw = useRef("")
    const cpass = useRef("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const onButtonSU = () => {
        // input validation -> nama dan email tidak boleh sama dengan kosong
        if (usern.current.value === "" || email.current.value === "" || passw.current.value === "" || cpass.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Please fill all the empty box.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        if (usern.current.value == Axios.get(API_URL + `/members?username=${usern.current.value}`)) {
            return toast({
                title: 'Warning.',
                description: "Username already exist.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        if (passw.current.value !== cpass.current.value) {
            return toast({
                title: 'Warning.',
                description: "password didn't match.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

        const newMember = {
            username : usern.current.value,
            email : email.current.value,
            password : passw.current.value
        }
        console.log(newMember)

        setLoading(true)
        Axios.post(API_URL+'/members', newMember)
        .then((respond) =>  {
            console.log("respond : ", respond.data)

            // reset state
            usern.current.value = ""
            email.current.value = ""
            passw.current.value = ""
            cpass.current.value = ""

            setLoading(false)
            navigate('/login')
            return toast({
                title: 'Info',
                description: "Registration Succesfull, Please Login.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        }) 
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }

    return (
        <Box px="21%" py={10} w="100%" h="auto">
            <Stack px="6%" py={10} borderRadius="10px" spacing="30px" backgroundColor="#FFFFFF">
                <Grid
                h='280px'
                templateRows='repeat(3, 1fr)'
                templateColumns='repeat(2, 1fr)'
                templateAreas="     'user ..'
                                    'email ..'
                                    'pass cpass'"
                gap={4}
                >
                    <Box gridArea="user">
                        <Text marginBottom="10px" fontWeight="bold">Username</Text>
                        <Input ref={usern} type="text" placeholder='FirasKun.89'/>
                    </Box>
                    <Box gridArea="email">
                        <Text marginBottom="10px" fontWeight="bold">Email</Text>
                        <Input ref={email} type="email" placeholder='FirasKun.89@gmail.com'/>                    
                    </Box>
                    <Box gridArea="pass">
                        <Text marginBottom="10px" fontWeight="bold">Password</Text>
                        <Input ref={passw} type="password" placeholder='********'/>
                    </Box>
                    <Box gridArea="cpass">
                        <Text marginBottom="10px" fontWeight="bold">Confirm Password</Text>
                        <Input ref={cpass} type="password" placeholder='********'/>
                    </Box>
                </Grid>
                <Button
                    w="15%"
                    colorScheme='teal' 
                    variant='solid'
                    onClick={onButtonSU}
                    disabled={loading}
                >
                    { loading ? <Spinner size="md"/> : "Sign Up" }
                </Button>
            </Stack>
        </Box>

    )
}