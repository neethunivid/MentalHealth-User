import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../API/API-client';
import { Snackbar, Alert, AlertColor, Grid } from '@mui/material';
import Navbar from './Navbar';

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: "success",
        snackbaraopen: false,
        message: ""
    });

    const handleSnackbarClose = () => {
        setSnackbarInfo(prevState => ({
            ...prevState,
            snackbaraopen: false
        }));
    };

    const onSubmit = async (data: any) => {
        if (data.id === undefined || data.id === "") {
            alert("まずは会員IDを入力してください");
            return;
        }
        if (data.password === undefined || data.password === "") {
            alert("パスワードが間違っています");
            return;
        }
        if (data.roomSelection === undefined) {
            alert("部屋を選択してください。");
            return;
        }
        
        try {
            const DataRequest = {
                "username": data.id,
                "password": data.password,
                "role": "USER"
            };

            const apiData = await apiClient.post("login/authenticate", DataRequest);

            if (apiData?.data?.data === "Invalid credentials") {
                setSnackbarInfo({
                    severity: "error",
                    snackbaraopen: true,
                    message: "ログイン情報が間違っています"
                });
            } else {
                setSnackbarInfo({
                    severity: "success",
                    snackbaraopen: true,
                    message: "ログイン成功"
                });
                localStorage.setItem('roomType', data.roomSelection)
                localStorage.setItem('memberId', apiData.data.data.user.memberId);
                localStorage.setItem('memberNo', apiData.data.data.user.id);
                localStorage.setItem('memberName', apiData.data.data.user.name); 
                apiClient.setToken(apiData.data.data.token);
                navigate('/remarklist');
            }
        } catch (error) {
            //console.error("Login Failed : ", error)
        }
    }

    return (
        <Grid>
            <Grid container className='container'>
                <Grid item xs={12} alignItems='center' justifyContent='center'>
                    <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
                        <Navbar />

                        {/* Sub Header */}
                        <div style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontWeight: 'bold' }}>
                            Enter the room
                        </div>

                        {/* Main Content */}
                        <div style={{ backgroundColor: '#e6ffff', padding: '20px' }}>
                            <ul style={{ fontSize: '14px', lineHeight: '1.8', marginTop: 0, paddingLeft: '20px' }}>
                                <li>This form uses SSL technology (encrypted transmission) for sending and receiving data, so you can use it safely and securely without worrying about the leakage of personal information.</li>
                                <li>Please check the room you will be entering.</li>
                                <li><span style={{ color: 'red' }}>*</span> indicates a required field.</li>
                            </ul>

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                                        ID <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <textarea 
                                        {...register('id')} 
                                        rows={1}
                                        style={{ backgroundColor: '#ffffe0', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '300px', resize: 'both' }} 
                                    />
                                </div>

                                <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                                        password <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        {...register('password')} 
                                        style={{ backgroundColor: '#ffffe0', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '300px', height: '35px', boxSizing: 'border-box' }} 
                                    />
                                </div>

                                <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                                <div style={{ marginBottom: '20px', fontSize: '14px' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ marginRight: '15px' }}>
                                            Please select the room you wish to enter <span style={{ color: 'red' }}>*</span>
                                        </span>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="normal" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            A normal room
                                        </label>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="anxiety" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            Room of Anxiety
                                        </label>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="blackmail" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            The Room of Obsessive-Compulsive Disorder
                                        </label>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="other" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            Other rooms
                                        </label>
                                    </div>
                                    <div>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="growth" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            Room of Growth
                                        </label>
                                        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                                            <input type="radio" value="diary" {...register('roomSelection')} style={{ marginRight: '5px' }} />
                                            diary
                                        </label>
                                    </div>
                                </div>

                                <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '40px', marginLeft: '80px', marginBottom: '20px', marginTop: '30px' }}>
                                    <button type="submit" style={{ backgroundColor: '#d3d3d3', border: '1px solid #999', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', textAlign: 'center', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>
                                        Enter the<br />room
                                    </button>
                                    <button type="button" onClick={() => reset()} style={{ backgroundColor: '#d3d3d3', border: '1px solid #999', padding: '8px 30px', borderRadius: '4px', cursor: 'pointer', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', marginBottom: '8px' }}>
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer Section */}
                        <div style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontWeight: 'bold' }}>
                            Editing Member Information and Canceling Membership
                        </div>
                        <div style={{ backgroundColor: '#e6ffff', padding: '20px' }}>
                            <ul style={{ fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                                <li>Click here to edit your member information.</li>
                                <li>Click here to cancel your membership.</li>
                            </ul>
                        </div>

                        <Snackbar
                            open={snackbarInfo.snackbaraopen}
                            autoHideDuration={3000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert
                                onClose={handleSnackbarClose}
                                severity={snackbarInfo.severity as AlertColor}
                            >
                                {snackbarInfo.message}
                            </Alert>
                        </Snackbar>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;
