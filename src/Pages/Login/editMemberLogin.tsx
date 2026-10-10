import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../API/API-client';
import { Snackbar, Alert, AlertColor, Grid, Box } from '@mui/material';
import Navbar from './Navbar';

const EditMemberLogin = () => {
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
        <Grid container style={{ width: '100%', justifyContent: 'center', fontFamily: '"MPLUSRounded1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif', color: '#333333' }}>
            <Grid item xs={12} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <Box style={{ margin: 0, padding: 0, width: '100%' }}>
                    <Navbar title="体験フォーラム" />

                    {/* Sub Header */}
                    <Box style={{ backgroundColor: '#fff', color: 'white', padding: '4px 0px', fontWeight: 'bold' }}>

                    </Box>
                    <Box style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontWeight: 'bold' }}>
                        会員情報の修正
                    </Box>
                    {/* Main Content */}
                    <Box style={{ backgroundColor: '#e6ffff', padding: '20px', width: '100%', boxSizing: 'border-box' }}>
                        <ul style={{ fontSize: "14px", lineHeight: '1.8', marginTop: 0, paddingLeft: '20px' }}>
                            <li>登録された会員情報を修正したい場合は、あなたのID、PWを入力して下さい。</li>
                            <li>このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。</li>
                            <li><span style={{ color: 'red' }}>*</span>は入力必須項目です。未入力の場合はログインできません。</li>
                        </ul>

                        <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '20px 0' }} />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box style={{ marginBottom: '4px' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '400' }}>
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
                                        width: '100%',
                                        maxWidth: '320px',
                                        boxSizing: 'border-box',
                                        resize: 'vertical'
                                    }}
                                />
                            </Box>

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '10px 0' }} />

                            <Box style={{ marginBottom: '4px' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '400' }}>
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

                            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '10px 0' }} />

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
                                    送信
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
                    <Box style={{ backgroundColor: '#6495ed', color: 'white', padding: '10px 20px', fontWeight: 'bold' }}>
                        会員情報の修正と退会
                    </Box>
                    <Box style={{ backgroundColor: '#e6ffff', padding: '20px' }}>
                        <ul style={{ lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                            <li><a href="/forumlogin" style={{ color: '#0066cc', textDecoration: 'none' }}>入室（ログイン）こちらへ</a></li>
                            <li><a href="/cancelMembership" style={{ color: '#0066cc', textDecoration: 'none' }}>退会手続きはこちらへ</a></li>
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

export default EditMemberLogin;
