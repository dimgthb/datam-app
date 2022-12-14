import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { 
    Flex, 
    Box, 
    InputGroup, 
    InputLeftElement, 
    Input, 
    Button, 
    Menu, 
    MenuList, 
    MenuButton, 
    MenuItem 
} from '@chakra-ui/react'
import { Search2Icon, ChevronDownIcon } from '@chakra-ui/icons'

// actions
import { sortStudentData } from '../redux/actions/user-action'


export default function Navigation (props) {
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <Flex w="100%" py="20px" px="161px" justifyContent="space-between" backgroundColor="#F7F7F7">
            <Flex>
                <Box 
                    py="8px" 
                    px="15px" 
                    cursor="pointer"
                    borderBottom={ location.pathname === "/" ? "2px" : "0px" } 
                    borderBottomColor="#2B6CB0"
                >
                    <Link to="/">Form Input</Link>
                </Box>
                <Box 
                    py="8px" 
                    px="15px" 
                    cursor="pointer" 
                    borderBottom={ location.pathname === "/table" ? "2px" : "0px" } 
                    borderBottomColor="#2B6CB0"
                >
                    <Link to="/table">Table</Link>
                </Box>
            </Flex>
            <Flex>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<Search2Icon color='gray.300' />}
                    />
                    <Input type='text' placeholder='Search' backgroundColor="#FFFFFF"/>
                </InputGroup>
                <Menu>
                    <MenuButton minW="150px" ml="10px" backgroundColor="#FFFFFF" as={Button} rightIcon={<ChevronDownIcon />}>
                        Sort By
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => dispatch(sortStudentData('asc'))}>Name A-Z</MenuItem>
                        <MenuItem onClick={() => dispatch(sortStudentData('desc'))}>Name Z-A</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}