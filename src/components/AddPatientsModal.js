import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
//  in this file->
//      1. create resuable component called Modal.
//      2. with the help of state true||false it will display modal or popup.
//      3. it will recieve a PatientRegistrationForm component as props and display it.
export default function AddPatientModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                fullWidth
                variant='outlined'
                size='medium' sx={
                    {
                        borderColor: "blueviolet",
                        color: "blueviolet"
                        //textTransform: "none"
                    }
                }
                onClick={handleOpen}
            >
                Add Patients
            </Button>




            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.data}
                </Box>

            </Modal>
        </div>
    );
}