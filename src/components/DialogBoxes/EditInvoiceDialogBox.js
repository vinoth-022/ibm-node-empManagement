import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import css from './Dialog.module.css';
import axios from 'axios';

export default function EditInvoiceDialogBox({ setTableData, empId, firstname: initialFirstName, lastname: initialLastName, email: initialEmail, address: initialAddress, salary: initialSalary, openEditInvoiceConfirmationDialog, setOpenEditInvoiceConfirmationDialog }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [firstname, setFirstName] = useState(initialFirstName);
    const [lastname, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialEmail);
    const [address, setAddress] = useState(initialAddress);
    const [salary, setSalary] = useState(initialSalary);


    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';
    const handleClose = () => {
        setOpenEditInvoiceConfirmationDialog(false);
    };

    const handleClosePositive = () => {
        const employeeData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            address: address,
            salary: salary
        };

        // Send a PUT request to your endpoint with the updated employee data
        axios.put(`http://localhost:8080/emp/update-emp/${empId}`, employeeData)
            .then(response => {
                console.log('Employee data updated:', response.data);
                setTableData([]);
                axios.get("http://localhost:8080/emp/get-all-emps")
                    .then(response => setTableData(response.data));
            })
            .catch(error => {
                console.error('Error updating employee data:', error);
            });

        handleClose();
    };
    const onLastNameTextChange = (value) => {
        const re = /^[A-Za-z]+$/; // Regular expression to allow only alphabets
        if (value.length < 50 && (value === "" || re.test(value))) {
            setLastName(value);
        }
    }
    
    const onEmailTextChange = (value) => {
        // Regular expression for email validation (basic)
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length < 100 && (value === "" || re.test(value))) {
            setEmail(value);
        }
    }
    
    const onAddressTextChange = (value) => {
        // You might need a different validation pattern for address
        if (value.length < 100) {
            setAddress(value);
        }
    }
    
    const onSalaryTextChange = (value) => {
        // Regular expression to allow only numbers
        const re = /^[0-9]*$/;
        if (value.length < 10 && (value === "" || re.test(value))) {
            setSalary(value !== "" ? parseInt(value, 10) : null);
        }
    }

const onFirstNameChange = (e) => {
    const re = /^[A-Za-z]+$/; // Regular expression to allow only alphabets
    if (e.target.value.length < 50 && (e.target.value === "" || re.test(e.target.value))) {
        setFirstName(e.target.value);
    }
};




return (
    <div className={css.dialogContainer}>
        <Dialog
            fullScreen={fullScreen}
            open={openEditInvoiceConfirmationDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={css.dialog}
            scroll='paper'
            disableEscapeKeyDown={true}
        >
            <span className={css.dialogContent}>
                <DialogTitle id="alert-dialog-title">
                    {"Enter the new data for Employee ID: " + empId}
                </DialogTitle>
                <DialogContent>
                    <div
                        className={css.edit}>
                        <TextField
                            required
                            id="first-name"
                            label="FIRST NAME:"
                            value={firstname} // Use member variable here
                            className={css.textField}
                            onChange={onFirstNameChange} // Update function call
                        />
                        <TextField
                            required
                            id="last-name"
                            label="LAST NAME:"
                            value={lastname} // Use member variable here
                            className={css.textField}
                            onChange={onLastNameTextChange} // Add function for lastname
                        />
                        <TextField
                            required
                            id="email"
                            label="EMAIL:"
                            value={email} // Use member variable here
                            className={css.textField}
                            onChange={onEmailTextChange} // Add function for email
                        />
                        <TextField
                            required
                            id="address"
                            label="ADDRESS:"
                            value={address} // Use member variable here
                            className={css.textField}
                            onChange={onAddressTextChange} // Add function for address
                        />
                        <TextField
                            required
                            id="salary"
                            label="SALARY:"
                            value={salary != null ? salary.toString() : ""} // Handle null value for salary
                            className={css.textField}
                            onChange={onSalaryTextChange} // Add function for salary (assuming String input)
                        />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClosePositive}>
                        Agree
                    </Button>
                </DialogActions>
            </span>
        </Dialog>
    </div>
);
}