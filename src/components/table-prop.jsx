//bisa disebut App.js
import React, {useState} from "react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'


function TableRow(props) {
    return (
        <Tr>
            <Td>{props.name.toLocaleUpperCase()}</Td>
            <Td>{props.email}</Td>
            <Td>{props.program}</Td>
            <Td>{props.country}</Td>
            <Td style={{textAlign:"center"}}>
                <button onClick={props.onButtonClickdel}>
                    Delete</button>
            </Td>
        </Tr>
    )
}

export default TableRow