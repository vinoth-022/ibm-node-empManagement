import React, { useState } from 'react';
import './Control.css'
import { Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import DeleteInvoiceDialogBox from '../../DialogBoxes/DeleteInvoiceDialogBox';
import EditInvoiceDialogBox from '../../DialogBoxes/EditInvoiceDialogBox';
import AddInvoiceDialogBox from '../../DialogBoxes/AddInvoiceDialogBox';

function AlterControlButtons({ setTableData, selectedFlatRows, isOneRowSelected, isRowSelected }) {

    const [empIds, setEmpIds] = useState(null);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [salary, setSalary] = useState(null); 

    const [openDeleteInvoiceConfirmationDialog, setOpenDeleteInvoiceConfirmationDialog] = useState(false);
    const [openEditInvoiceConfirmationDialog, setOpenEditInvoiceConfirmationDialog] = useState(false);
    const [openAddInvoiceConfirmationDialog, setOpenAddInvoiceConfirmationDialog] = useState(false);


    axios.defaults.baseURL = 'http://localhost:8080/emp/get-all-emps';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*';

    var getEmpInfo = (selectedFlatRows) => {

        let empIds = []

        selectedFlatRows.map((row) => {
            empIds = [...empIds,row.values['employeeId']];
            console.log(empIds)
            setEmpIds(empIds);

            return null;
        })
    }

    var getEditableProperties = (selectedFlatRows) => {
        getEmpInfo(selectedFlatRows)
        selectedFlatRows.map((row) => {


            setFirstName(row.values['firstname'])
            setLastName(row.values['lastname'])
            setEmail(row.values['email'])
            setAddress(row.values['address'])
            setSalary(row.values['salary'])

            return null;
        })
    }
    var addData = (e) => {
        setOpenAddInvoiceConfirmationDialog(true);
    }
    var deleteData = (e) => {
        setOpenDeleteInvoiceConfirmationDialog(true)
        // getInvoiceInfo(selectedFlatRows);
        getEmpInfo(selectedFlatRows);
    }
    var editData = (e) => {
        getEditableProperties(selectedFlatRows)
        setOpenEditInvoiceConfirmationDialog(true);
    }

    return (
        <>
            <ButtonGroup size="large" aria-label="large button group" className='alter control'>
                <Button size='large' id='add-button' variant="outlined" onClick={addData}>ADD</Button>
                <Button size='large' id='edit-button' className='middleButton' variant="outlined" onClick={editData} disabled={!isOneRowSelected}>EDIT</Button>
                <Button size='large' id='delete-button' variant="outlined" onClick={deleteData} disabled={!isRowSelected} >DELETE</Button>
                {isRowSelected && openDeleteInvoiceConfirmationDialog && <DeleteInvoiceDialogBox setTableData={setTableData} empIds={empIds} openDeleteInvoiceConfirmationDialog={openDeleteInvoiceConfirmationDialog} setOpenDeleteInvoiceConfirmationDialog={setOpenDeleteInvoiceConfirmationDialog} />}
                {isOneRowSelected && openEditInvoiceConfirmationDialog && <EditInvoiceDialogBox setTableData={setTableData} empId={empIds[0]} firstname={firstname} lastname={lastname} email={email} address={address} salary={salary} openEditInvoiceConfirmationDialog={openEditInvoiceConfirmationDialog} setOpenEditInvoiceConfirmationDialog={setOpenEditInvoiceConfirmationDialog} />}
                {openAddInvoiceConfirmationDialog && <AddInvoiceDialogBox setTableData={setTableData} openAddInvoiceConfirmationDialog={openAddInvoiceConfirmationDialog} setOpenAddInvoiceConfirmationDialog={setOpenAddInvoiceConfirmationDialog} />}
            </ButtonGroup>
        </>
    );
}

export default AlterControlButtons;