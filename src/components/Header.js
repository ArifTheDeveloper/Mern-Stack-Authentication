import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {addData} from './context/ContextProvider';
import "./header.css"
import {useNavigate, NavLink} from "react-router-dom"

const Header = () => {

    const {loginData, setLoginData} = useContext(addData);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://127.0.0.1:8001/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
             history("/");
        } else {
            console.log("error");
        }
    }


    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
      history("*")
  }

    return (
        <>
            <header>
                <nav className="d-flex justify-content-space-between align-item-center">
                    <NavLink className="text-black text-decoration-none" to="/">
                        <h3>Authentication</h3>
                    </NavLink>
                    <div className="avatar">

                        <Button id="demo-positioned-button"
                            aria-controls={
                                open ? 'demo-positioned-menu' : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                                open ? 'true' : undefined
                            }
                            onClick={handleClick}>
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </Button>
                        <Menu id="demo-positioned-menu" aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={
                                {
                                    vertical: 'top',
                                    horizontal: 'left'
                                }
                            }
                            transformOrigin={
                                {
                                    vertical: 'top',
                                    horizontal: 'left'
                                }
                        }>

                            {
                            loginData.validUserOne ? (
                              <>
                                    <MenuItem onClick={()=>{
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            ) : (
                               

                                <>
                                    <MenuItem onClick={
                                        () => {
                                            goDash()
                                            handleClose()
                                        }
                                    }>Profile</MenuItem>
                                    <MenuItem onClick={()=>{
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            )
                        } </Menu>

                    </div>


                </nav>
            </header>
        </>
    )
}

export default Header;
