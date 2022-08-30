import Axios from 'axios'
import { GET_STUDENT_DATA, ON_FETCH_START, ON_FETCH_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getStudentData = (page = 1, limit = 5) => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })

        Axios.get(API_URL +  `/users?_page=${page}&_limit=${limit}`)
        .then((respond) => {
            dispatch({ type : GET_STUDENT_DATA, payload : respond.data })
            dispatch({ type : ON_FETCH_END })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
}

// delete data
export const deleteStudent = (id) => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })

        Axios.delete(API_URL + `/users/${id}`)
        .then((respond) => {
            Axios.get(API_URL + `/users?_page=${1}&_limit=${5}`)
            .then((respond2) => {
                dispatch({ type : GET_STUDENT_DATA, payload : respond2.data })
                dispatch({ type : ON_FETCH_END })
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
}

// edit data
export const editStudent = (id, data) => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })
        
        Axios.put(API_URL +  `/users/${id}`, data)
        .then((respond) => {
            Axios.get(API_URL + `/users?_page=${1}&_limit=${5}`)
            .then((respond2) => {
                dispatch({ type : GET_STUDENT_DATA, payload : respond2.data })
                dispatch({ type : ON_FETCH_END })
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
    
}

// sort data
export const sortStudentData = (type = 'asc') => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })
        
        Axios.get(API_URL + `/users?_sort=name&_order=${type}`)
        .then((respond) => {
            dispatch({ type : GET_STUDENT_DATA, payload : respond.data })
            dispatch({ type : ON_FETCH_END })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
}