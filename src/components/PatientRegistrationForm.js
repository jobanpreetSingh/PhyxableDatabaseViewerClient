import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { readPatientAction } from '../Action/index';
import { ADD_DATA } from '../constants';
//  in this file->
//      1.collect all info from the forms patient's name,email,phone and id is auto generated and
//      perform validations on frontend and back end.

//     2.set all the collected data into state using useState Hooks.
//     3.usinng fetch() api hit add_user backend and post all info into data base.
//     4. getting the response from user if status===200 it will send all data to redux reducer.

// A style sheet
const useStyles = makeStyles({
    button: {
        marginTop: "5%",
        marginBottom: "2%"
    },
    textColor: {
        color: "blueviolet"
    }
});
export default function PatientRegistrationForm() {
    const dispatch = useDispatch()
    const [patient, setPatient] = useState({
        name: "", email: "", phone: ""
    });
    const [isError, setIsError] = useState(false);

    const patientDetailsHandler = (key, val) => {
        setPatient({
            ...patient,
            [key]: val
        })
    }
    const patientRegisterHandler = async (e) => {
        e.preventDefault();
        try {
            const { name, email, phone } = patient;
            const response = await fetch('http://localhost:3000/add_users', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ name, email, phone })
            })
            var data = await response.json()
            if (response.status === 201) {
                dispatch(readPatientAction(ADD_DATA, data))

                setPatient({ name: "", email: "", phone: "" });
                alert(`${data.email} is added successfully`)
                window.location.reload();
            }

            else {
                alert(data.error)
            }
        } catch (error) {
            console.log(error)
            alert(data.error)
        }

    }
    const classes = useStyles()

    return (
        <Grid container
            justifyContent="space-around"
            alignItems="center">
            <Typography variant='h6' className={classes.textColor}>Add Patient Details</Typography>

            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <TextField id="standard-basic" label="Id is auto generated" focused disabled={true} variant="standard" />
                </Grid>

                <Grid item>
                    <TextField
                        className={classes.textColor}
                        id="standard-basic"
                        label="Name"
                        value={patient.name}
                        required
                        variant="standard"
                        name='name'
                        onChange={(e) => patientDetailsHandler(e.target.name, e.target.value)}
                    />
                </Grid>

            </Grid>
            <br /><br />
            <br /><br />

            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item>
                    <TextField
                        className={classes.textColor}
                        id="standard-basic"
                        label="Email"
                        value={patient.email}
                        variant="standard"
                        name="email"
                        required
                        onChange={(e) => patientDetailsHandler(e.target.name, e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        type='number'
                        required
                        sx={{ color: "red" }}
                        id="standard-basic"
                        label="Phone"
                        name='phone'
                        error={isError}
                        variant="standard"
                        value={patient.phone}
                        onChange={(e) => {
                            patientDetailsHandler(e.target.name, e.target.value)
                            if (e.target.value.length === 10) {
                                setIsError(false)
                            }
                            else if (e.target.value.length > 10 || e.target.value.length < 10) {
                                setIsError(true)
                            }
                        }}
                    />
                </Grid>

            </Grid>

            <Button
                variant='contained'
                fullWidth
                className={classes.button}
                sx={
                    {
                        backgroundColor: "blueviolet",
                        textTransform: "none",
                        color: "white"
                    }
                }
                onClick={(e) => patientRegisterHandler(e)}
            >
                Register
            </Button>
        </Grid>
    );
}