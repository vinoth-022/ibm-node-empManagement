import React, { useState } from 'react';
import './Control.css'
import {TextField} from '@mui/material';




export default function Search({email:initialEmail}) {
    const [email, setEmail] = useState(initialEmail);

    

    var onSearchIDChange = (e) => {
        
    }
    return (
        <div className='control'>
            <TextField id="search" type='string' label={'SEARCH BY MAIL ID'} variant="outlined" onChange={onSearchIDChange}/>
        </div>
    );
}