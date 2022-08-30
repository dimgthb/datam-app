import React from 'react'
import { Tr, Td, Menu, MenuButton, MenuList, MenuItem, IconButton, Input, Button } from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { MdOutlineMoreVert, MdEdit, MdDelete } from 'react-icons/md'

export default function RowStudent ({ student, index, onDelete, onEdit }) {
    return (
        <Tr>
            <Td>{index + 1}</Td>
            <Td>{student.name}</Td>
            <Td>{student.email}</Td>
            <Td>{student.program}</Td>
            <Td>{student.country}</Td>
            <Td>
                <Menu>
                    <MenuButton as={IconButton} icon={<MdOutlineMoreVert />}/>
                    <MenuList>
                        <MenuItem icon={<MdEdit/>} onClick={onEdit}>Edit</MenuItem>
                        <MenuItem icon={<MdDelete/>} onClick={onDelete}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    )
}

export function RowStudentEdited ({ 
    student, 
    onCancel, 
    onSave, 
    nameRef,
    emailRef, 
    onProgramMenuClick, 
    programTitle, 
    countryTitle,
    onCountryMenuClick 
}) {
    return (
        <Tr>
            <Td>#</Td>
            <Td>
                <Input ref={nameRef} type="text" defaultValue={student.name}/>
            </Td>
            <Td>
                <Input ref={emailRef} type="email" defaultValue={student.email}/>
            </Td>
            <Td>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        { programTitle }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Fullstack Web Development" onClick={onProgramMenuClick}>Fullstack Web Development</MenuItem>
                        <MenuItem value="Data Science" onClick={onProgramMenuClick}>Data Science</MenuItem>
                        <MenuItem value="UI/UX Designer" onClick={onProgramMenuClick}>UI/UX Designer</MenuItem>
                        <MenuItem value="Digital Marketing" onClick={onProgramMenuClick}>Digital Marketing</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
            <Td>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        { countryTitle }
                    </MenuButton>
                    <MenuList>
                        <MenuItem value="Japan" onClick={onCountryMenuClick}>Japan</MenuItem>
                        <MenuItem value="Korea" onClick={onCountryMenuClick}>Korea</MenuItem>
                        <MenuItem value="USA" onClick={onCountryMenuClick}>USA</MenuItem>
                        <MenuItem value="Rusia" onClick={onCountryMenuClick}>Rusia</MenuItem>
                    </MenuList>
                </Menu>
            </Td>
            <Td>
                <IconButton
                    colorScheme='green'
                    icon={<CheckIcon />}
                    onClick={onSave}
                />
                <IconButton
                    onClick={onCancel}
                    ml="5px"
                    colorScheme='red'
                    icon={<CloseIcon />}
                />
            </Td>
        </Tr>
    )
}