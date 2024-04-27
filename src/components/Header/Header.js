import './Header.css'
import React, { useState } from 'react';
import companyLogo from '../../asset/companyLogo.svg'
import Logo from '../../asset/logo.svg'

export default function Header() {
    return (
        <div>
            <div className='header'>
                <div className='companyName'>
                    <a href='/'>
                        <img src={companyLogo} className='AppLogo' alt='Company Logo'/>
                    </a>
                </div>
                <div className='Logo'>
                    <a href='/'>
                        <img src={Logo} alt='Highradius Logo'/>
                    </a>
                </div>
                <div className='heading'>
                    <p>EMPLOYEES</p>
                </div>
            </div>
        </div>
    );
}