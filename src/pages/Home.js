import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TableComponent from '../components/Table';
import { useDispatch } from 'react-redux';
import { readPatientAction } from '../Action/index'
import { READ_DATA } from '../constants'
//in this file->
// 1. fetching data from database when component rendered first TimeRanges.
// 2. push all data to redux reducer which will share data to the whole app.
// 3. call table component which will render user detais such as id and email in tabular form
function Home(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        getPatients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // this function calls the /read_user api at the backend and fetch all the registered  patients  
    const getPatients = async () => {
        try {
            // fetch data using fetch api 
            const response = await fetch('http://localhost:3000/read_users')
            const patientList = await response.json()
            dispatch(readPatientAction(READ_DATA, patientList))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Grid>
            {/* // pass patient list to as a props to Table component */}
            <TableComponent />
        </Grid>
    );
}
export default Home;