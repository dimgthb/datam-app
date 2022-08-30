import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Text, Flex, Button, Box, Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

function Navbar (props) {
    const title = {
        '/' : 'Home',
        '/table' : 'Data Management',
        '/login' : 'Login',
        '/regis' : 'Register'
    }
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const dispatch =  useDispatch()

    const username = useSelector((state) => state.member.username)
    const email = useSelector((state) => state.member.email)

    const onButtonLogout = () => {
        localStorage.removeItem("token")
        dispatch({ type : 'LOGOUT' })
    }

    return (
        <Flex 
            w="100%" 
            h="120px" 
            px="161px" 
            paddingBottom="20px" 
            backgroundColor="#319795" 
            flexDirection="row" 
            justifyContent="space-between"
            alignItems="flex-end"
        >
            <Text fontSize="4xl" fontWeight="bold" color="#F9F9F9">
                { title[props.pathname] } 
            </Text>
            <Box>
            {   username?   <Menu>
                                <MenuButton>
                                    <Avatar name={username} size="sm" marginRight={5}/> 
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>{email}</MenuItem>
                                </MenuList>
                            </Menu>
            : null }
            { 
                token?
                <Button onClick={onButtonLogout}>Logout</Button>
                :
                <Button onClick={() => navigate(props.pathname === '/login' ? '/' : '/login')}>
                    { props.pathname === '/login' ? 'Back to Home' : 'Login' }
                </Button>
            }
            {
                token?
                null
                :
                <Button marginLeft="10px" onClick={() => navigate(props.pathname === '/regis' ? '/' : '/regis')}>
                    { props.pathname === '/regis' ? 'Back to Home' : 'Register' }
                </Button>
            }
            </Box>
        </Flex>
    )
}

export default Navbar

            //    <Button marginLeft="10px" onClick={() => navigate(props.pathname === '/regis' ? '/' : '/regis')}>
            //         { props.pathname === '/regis' ? 'Back to Home' : 'Register' }
            //     </Button>