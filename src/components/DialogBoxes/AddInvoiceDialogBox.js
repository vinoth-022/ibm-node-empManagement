import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import css from './Dialog.module.css';
import axios from 'axios';

export default function AddInvoiceDialogBox({setTableData, openAddInvoiceConfirmationDialog, setOpenAddInvoiceConfirmationDialog}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [result, setResult] = useState(0);


    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [salary, setSalary] = useState(null); // Initialize salary as null

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';
    const handleClose = () => {
        setOpenAddInvoiceConfirmationDialog(false);
    };

    const handleClosePositive = () => {
        const employeeData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            address: address,
            salary: salary
        };

        // Send a POST request to your endpoint with the employee data
        axios.post('http://localhost:8080/emp/add-emp', employeeData)
            .then(response => {
                console.log('Employee data saved:', response.data);
                // Update table data or perform any necessary actions
                setTableData([]);
                axios.get("http://localhost:8080/emp/get-all-emps")
                    .then(response => setTableData(response.data));
            })
            .catch(error => {
                console.error('Error saving employee data:', error);
                // Handle error if necessary
            });

        // Close the dialog
        handleClose();
    };
 
    const onLastNameTextChange = (e) => {
        const re = /^[A-Za-z]+$/; // Regular expression to allow only alphabets
        if (e.target.value.length < 50 && (e.target.value === "" || re.test(e.target.value))) {
            setLastName(e.target.value);
        }
    }
    
    const onEmailTextChange = (e) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (e.target.value.length < 50 && (e.target.value === "" || re.test(e.target.value))) {
        setEmail(e.target.value);
        }
    };
    
    const onAddressTextChange = (e) => {
        // You might need a different validation pattern for address
        if (e.target.value.length < 100) {
            setAddress(e.target.value);
        }
    }
    
    const onSalaryTextChange = (e) => {
        // Regular expression to allow only numbers
        const re = /^[0-9]*$/;
        if (e.target.value.length < 10 && (e.target.value === "" || re.test(e.target.value))) {
            setSalary(e.target.value !== "" ? parseInt(e.target.value, 10) : null);
        }
    }
    

    const onFirstNameChange = (e) => {
        const re = /^[A-Za-z]+$/; // Regular expression to allow only alphabets
        if (e.target.value.length < 50 && (e.target.value === "" || re.test(e.target.value))) {
            setFirstName(e.target.value);
        }
    }
    

    return (
        <div className={css.dialogContainer}>
        <Dialog
        fullScreen={fullScreen}
            open={openAddInvoiceConfirmationDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={css.dialog}
            scroll='paper'
            disableEscapeKeyDown={true}
        >
            <span className={css.dialogContent}>
                <DialogTitle id="alert-dialog-title">
                {"ADD details for new Employee"}
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClosePositive}>
                    Save
                </Button>
                </DialogActions>
            </span>
        </Dialog>
        </div>
    );
}