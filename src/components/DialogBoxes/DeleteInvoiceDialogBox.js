import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import css from './Dialog.module.css';
import axios from 'axios';

export default function DeleteInvoiceDialogBox({setTableData,empIds, openDeleteInvoiceConfirmationDialog, setOpenDeleteInvoiceConfirmationDialog}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';
    const handleClose = () => {
        setOpenDeleteInvoiceConfirmationDialog(false);
    };

    const handleClosePositive = () => {
        const employeeIds = empIds; 
    
        // Delete each employee record one by one
        Promise.all(employeeIds.map(id => {
            return axios.post(`http://localhost:8080/emp/delete-emp/${id}`);
        }))
        .then(responses => {
            console.log('Employees data deleted:', responses);
            setTableData([]);
            axios.get("http://localhost:8080/emp/get-all-emps")
                .then(response => setTableData(response.data));
        })
        .catch(error => {
            console.error('Error deleting employees data:', error);
        });
    
        handleClose();
    };
    

    return (
        <div >
        <Dialog
        fullScreen={fullScreen}
            open={openDeleteInvoiceConfirmationDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={css.dialog}
            scroll='paper'
            disableEscapeKeyDown={true}
        >
            <span className={css.dialogContent}>
                <DialogTitle id="alert-dialog-title">
                {"Delete the following Employees?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <span className={css.DialogContentText}>{"Employee IDs: "  + empIds}</span>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClosePositive} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </span>
        </Dialog>
        </div>
    );
}