import React, { useEffect, useState } from 'react';
import {
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Grid, TextField, Button, Typography,
    Divider
}
    from '@mui/material';
import { makeStyles } from '@mui/styles'
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddPatientModal from './AddPatientsModal';
import PatientRegistrationForm from './PatientRegistrationForm';
import { useSelector } from 'react-redux'
// in this file->
//      1. get data from redux store using useSelector hook.
//      2. when component renders it will set List data to the state named as filteredData, useState hook.
//      3. map all data inside the table and add DELETE  button with each row.
//      4. onClick event trigger when Delete button pressed and call deletePatientHandler method 
//      which receive a parameter id and inside the function call fetch api Delete method and pass id to it to backend
//      5. perform search bar .
//      6. Call AddPatient Modal and pass Patient RegistrationForm component as a props to the modal

// A style sheet
const useStyles = makeStyles({
    root: {
        backgroundColor: "whitesmoke",
        marginTop: "10%",
    }, // a style rule
    textField: {
        borderColor: "blueviolet",
        marginTop: "5%%",
        marginBottom: "5%"
    }, // a nested style rule
    headingcolors: {
        color: 'blueviolet',
    }, // a nested style rule

});
export default function TableComponent() {
    const list = useSelector((data) => data.readDataReducer.data)
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        setFilteredData(list)
    }, [list])

    const deletePatientHandler = async (_id) => {
        const confirmStateValue = window.confirm('Press "OK!" to Delete Patient else "Cancle!" ')

        if (confirmStateValue === true) {

            try {
                const deletedPatient = await fetch(`http://localhost:3000/delete_users/${_id}`, {
                    method: "DELETE"
                })
                var deletedmsg = await deletedPatient.json()
                console.log('deletedPatient.status', deletedPatient.status)
                if (deletedPatient.status === 200) {
                    return window.location.reload();
                }
            } catch (error) {
                console.log(error);
                alert(deletedmsg.error)
            }
        }
    }
    const searchBarHandler = (value) => {
        const filteringValue = value.toLowerCase()

        const filteredData = list.filter((filterdata) => {
            return filterdata.email.includes(filteringValue)
        })
        setFilteredData(filteredData)
    }

    const classes = useStyles()
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Paper sx={{
                width: '60%',
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
            }}
                className={classes.root}
            >

                <Grid container item
                    xs={12} md={12} lg={12}
                    justifyContent="center"
                >
                    <Typography variant='h6' className={classes.headingcolors}>Patients List</Typography>

                </Grid>
                <br /><br />
                <Divider />
                <br /><br />
                {/* // SearchBar and Add Patients Design */}
                <Grid item
                    xs={12} md={12} lg={12}
                    container
                    justifyContent='space-between'
                    alignItems="center"
                    justifySelf="center"
                    className={classes.textField}

                >
                    <Grid item
                        xs={6} md={6} lg={6}

                    >
                        <TextField sx={{ width: "100%" }}
                            label=""
                            id="outlined-size-small"
                            size="small"
                            placeholder="Search patients"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => searchBarHandler(e.target.value)}
                        />
                    </Grid>

                    <Grid item

                        xs={4} md={4} lg={4}
                    >

                        <AddPatientModal data={
                            <PatientRegistrationForm />
                        } />
                    </Grid>


                </Grid>
                <Grid container item
                    xs={12} lg={12} md={12}
                >
                    <TableContainer component={Paper} style={{ marginBottom: "5%", maxHeight: 250 }}>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headingcolors} ><b> Patient ID</b></TableCell>
                                    <TableCell className={classes.headingcolors} align="right"><b>Patient Email</b></TableCell>
                                    <TableCell align="right">
                                        <Button
                                            sx={{ textTransform: "none" }}
                                            disabled={true}
                                            style={{ backgroundColor: "white", color: "red" }}
                                        >
                                            <b>Delete</b>
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    filteredData
                                    &&
                                    filteredData.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row._id}
                                            </TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">
                                                <Button size='small' variant='outlined' sx={
                                                    {
                                                        color: "red",
                                                        borderColor: "blueviolet",
                                                        textTransform: "none"

                                                    }
                                                }
                                                    onClick={() => deletePatientHandler(row._id)}
                                                >
                                                    Delete
                                        </Button>
                                            </TableCell>

                                        </TableRow>

                                    )


                                    )

                                }
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Grid>
            </Paper>
        </Grid >
    );
}