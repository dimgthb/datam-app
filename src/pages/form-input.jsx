import React, { useState, useEffect, useRef } from 'react'
import { Box, Text, Input, Button, Menu, MenuButton, MenuList, MenuItem, Stack, Spinner, useToast } from '@chakra-ui/react'
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
import Axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export default function ShowFormInput () {
    const inputName = useRef("")
    const inputEmail = useRef("")
    const [program, setProgram] = useState("Fullstack Web Development")
    const [country, setCountry] = useState("Japan")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    
    const formRoleClick = (event) => {
        setProgram(event.target.value)
    }
    const formCountryClick = (event) => {
        setCountry(event.target.value)
    }

    const onButtonSubmit = () => {
        // input validation -> nama dan email tidak boleh sama dengan kosong
        if (inputName.current.value === "" || inputEmail.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Name and email cannot be empty.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

        const newStudent = {
            name : inputName.current.value,
            email : inputEmail.current.value,
            program : program,
            country : country
        }
        console.log(newStudent)

        setLoading(true)
        Axios.post(API_URL+'/users', newStudent)
        .then((respond) =>  {
            console.log("respond : ", respond.data)

            // reset state
            setProgram("Fullstack Web Development")
            setCountry("Japan")
            inputName.current.value = ""
            inputEmail.current.value = ""

            setLoading(false)

            return toast({
                title: 'Info',
                description: "New data has been added.",
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
        <Box px="10%" py={35} w="100%" h="auto" backgroundColor="#F7F7F7">
            <Stack spacing="15px">
                <Text fontWeight="bold">Name</Text>
                <Input w="25%" ref={inputName} type="text" placeholder='e.x. Firas Kun' backgroundColor="#FFFFFF"/>
                <Text fontWeight="bold">Email</Text>
                <Input w="25%" ref={inputEmail} type="email" placeholder='e.x. firas.kun@gmail.com' backgroundColor="#FFFFFF"/>
                <Text fontWeight="bold">Programs</Text>
                <Menu>
                    <MenuButton w="25%" textAlign="left" as={Button} rightIcon={<ChevronDownIcon />} backgroundColor="#FFFFFF">
                        { program }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Fullstack Web Development" onClick={formRoleClick}>Fullstack Web Development</MenuItem>
                        <MenuItem value="Data Science" onClick={formRoleClick}>Data Science</MenuItem>
                        <MenuItem value="UI/UX Designer" onClick={formRoleClick}>UI/UX Designer</MenuItem>
                        <MenuItem value="Digital Marketing" onClick={formRoleClick}>Digital Marketing</MenuItem>
                    </MenuList>
                </Menu>
                <Text fontWeight="bold">Countries</Text>
                <Menu>
                    <MenuButton w="25%" textAlign="left" as={Button} rightIcon={<ChevronDownIcon />} backgroundColor="#FFFFFF">
                        { country }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Japan" onClick={formCountryClick}>Japan</MenuItem>
                        <MenuItem value="Korea" onClick={formCountryClick}>Korea</MenuItem>
                        <MenuItem value="USA" onClick={formCountryClick}>USA</MenuItem>
                        <MenuItem value="Rusia" onClick={formCountryClick}>Rusia</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Button 
                marginTop="35px" 
                leftIcon={ loading ? <Spinner size="md"/> : <AddIcon/>} 
                colorScheme='teal' 
                variant='solid'
                onClick={onButtonSubmit}
                disabled={loading}
            >
                { loading ? "Loading..." : "Submit" }
            </Button>
        </Box>
    )
}