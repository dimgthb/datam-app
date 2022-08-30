import React from "react"
import ReactDOM from "react-dom"
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import MainCount from "./main-count"
import MainTableAxios from "./main-table-axios"
import MainDatam from "./main-datam"

import userReducer from './redux/reducers/user-reducer'
import memberReducer from './redux/reducers/member-reducer'
import MainCoba from "./maincoba"

const Reducers = combineReducers({
    user : userReducer,
    member : memberReducer
})
const store = createStore(Reducers, composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <MainDatam/>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
,document.getElementById("root")
)