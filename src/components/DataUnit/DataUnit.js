import './DataUnit.css'
import React, { useState } from 'react';
import ControlPanel from '../ControlPanel/ControlPanel'
import TableView from './Table/TableView';

export default function DataUnit(props) {

    const [tableData, setTableData] = useState([]);
    const [selectedFlatRows, setSelectedFlatRows] = useState([]);
    const [isOneRowSelected, setIsOneRowSelected] = useState(false);
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);


    return (
        <div className='dataUnit'>
            <ControlPanel setTableData={setTableData} selectedFlatRows={selectedFlatRows} isOneRowSelected={isOneRowSelected} isRowSelected={isRowSelected} updateTable={updateTable} setUpdateTable={setUpdateTable}/>
            <TableView tableData={tableData} setTableData={setTableData} setSelectedFlatRows={setSelectedFlatRows} setIsOneRowSelected={setIsOneRowSelected} setIsRowSelected={setIsRowSelected} updateTable={updateTable}/>
        </div>
    );
}