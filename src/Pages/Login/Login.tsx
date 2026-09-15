import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../API/API-client';
import { Snackbar, Alert, AlertColor, Grid, Box } from '@mui/material';
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
            alert("パスワードを入力してください");
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
                localStorage.setItem('roomType', data.roomSelection);
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
        <Grid container style={{ width: '100%', justifyContent: 'center' }}>
            <Grid item xs={12} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                <Box style={{ margin: 0, padding: 0, width: '100%' }}>
                    <Navbar />

                    {/* Sub Header */}
                    <Box style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}>
                        入室する
                    </Box>

                    {/* Main Content */}
                    <Box style={{ backgroundColor: '#e6ffff', padding: '20px', width: '100%', boxSizing: 'border-box' }}>
                        <ul style={{ fontSize: '16px', lineHeight: '1.8', marginTop: 0, paddingLeft: '20px' }}>
                            <li>このフォームは、SSL技術（暗号化送信）で送受信されますので個人情報の流失等がなく、安心・安全にご利用いただけます。</li>
                            <li>入室する部屋をチエックして下さい。</li>
                            <li><span style={{ color: 'red' }}>*</span>は入力必須項目です。</li>
                        </ul>

                        <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                                    ID <span style={{ color: 'red' }}>*</span>
                                </label>
                                <textarea
                                    {...register('id')}
                                    rows={1}
                                    style={{
                                        backgroundColor: '#ffffe0',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '16px',
                                        width: '100%',
                                        maxWidth: '320px',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </Box>

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                            <Box style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                                    パスワード <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    style={{
                                        backgroundColor: '#ffffe0',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '14px',
                                        width: '100%',
                                        maxWidth: '320px',
                                        height: '35px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </Box>

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                            <Box style={{ marginBottom: '20px', fontSize: '14px' }}>
                                <Box style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>
                                    入室する部屋を選択して下さい <span style={{ color: 'red' }}>*</span>
                                </Box>

                                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '15px 20px', alignItems: 'center', fontSize: '14px' }}>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="normal" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        普通の部屋
                                    </label>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="anxiety" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        不安の部屋
                                    </label>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="blackmail" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        強迫の部屋
                                    </label>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="other" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        うつ他の部屋
                                    </label>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="growth" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        成長の部屋
                                    </label>
                                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: '14px' }}>
                                        <input type="radio" value="diary" {...register('roomSelection')} style={{ marginRight: '6px' }} />
                                        日記
                                    </label>
                                </Box>
                            </Box>

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                            <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '30px 0 20px 0' }}>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#4682b4',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 30px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        minWidth: '120px'
                                    }}
                                >
                                    入室する
                                </button>
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    style={{
                                        backgroundColor: '#d3d3d3',
                                        color: '#333',
                                        border: '1px solid #999',
                                        padding: '10px 30px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        minWidth: '120px'
                                    }}
                                >
                                    リセット
                                </button>
                            </Box>
                        </form>
                    </Box>

                    {/* Footer Section */}
                    <Box style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}>
                        会員情報の修正と退会
                    </Box>
                    <Box style={{ backgroundColor: '#e6ffff', padding: '20px' }}>
                        <ul style={{ fontSize: '16px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                            <li><a href="/forumbbs2.html" style={{ color: '#0066cc', textDecoration: 'none' }}>会員情報の修正はこちらへ</a></li>
                            <li><a href="/forumbbs3.html" style={{ color: '#0066cc', textDecoration: 'none' }}>退会手続きはこちらへ</a></li>
                        </ul>
                    </Box>

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
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
