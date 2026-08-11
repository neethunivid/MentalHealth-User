import { Button, Typography, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import FormInputTextField from '../../Components/Common/FormInputTextField'
import { useForm } from 'react-hook-form';
import { Alert, AlertColor } from '@mui/material';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import apiClient from '../../API/API-client';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

/**
 * Component used for login (possible only after admin approval)
 */

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: '心の体験フォーラム 会員入口' }
    ];

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

    /**
     * Method used to submit the login details and retrive the authentication status
     * @param data 
     */
    const onSubmit = async (data: any) => {
        if (data.id === undefined) {
            alert("まずは会員IDを入力してください")
        }
        else if (data.password === undefined) {
            alert("パスワードが間違っています")
        }
        else if (data.roomSelection === undefined) {
            alert("部屋を選択してください。")
        }
        else {
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
                    //console.log("Login Failed : ", apiData.data.data)
                } else {
                    setSnackbarInfo({
                        severity: "success",
                        snackbaraopen: true,
                        message: "ログイン成功"
                    });
                    localStorage.setItem('roomType', data.roomSelection)
                    localStorage.setItem('memberId', apiData.data.data.user.memberId);
                    localStorage.setItem('memberNo', apiData.data.data.user.id);//memberNo is also available in the data and sometimes need to change. here used id because for old members no memberid available beacause it is a new field.
                    localStorage.setItem('memberName', apiData.data.data.user.name); 
                    apiClient.setToken(apiData.data.data.token);
                    navigate('/remarklist');
                    // console.log("Login Successfull : ", apiData.data.data)
                }

            } catch (error) {
                //console.error("Login Failed : ", error)
            }
        }
    }

    return (
        <Grid>
            <Heading title='心の体験フォーラム 会員入口' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container'>
                <Grid item xs={12} alignItems='center' justifyContent='center'>
                    <form className="form" onSubmit={handleSubmit(onSubmit)} id="login-form">
                        <Grid item container xs={12} pb={3}>
                            <Grid item xs={12}>
                                <Typography className='pinkBackground-whiteContent'>
                                    入室する
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h1'>
                                    *入力必須項目
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h1'>
                                    ★このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h1'>
                                    ★入室する部屋をチエックして下さい。
                                </Typography>
                            </Grid>
                        </Grid>
                        <FormInputTextField
                            required={true}
                            label="ID"
                            name="id"
                            control={control}
                            id="login-form-id"
                        />
                        <FormInputTextField
                            required={true}
                            label="パスワード"
                            name="password"
                            control={control}
                            id="login-form-password"
                        />
                        <Grid xs={12} className='inputcontainer'>
                            <Typography variant='h4'>
                                入室する部屋
                                <span className="span-star"> * </span>
                            </Typography>
                            <RadioGroup
                                name="roomSelection"
                                row
                            >
                                <FormControlLabel
                                    control={<Radio color="primary" required id="login-form-usually" />}
                                    className="radio-label"
                                    value="normal"
                                    label={
                                        <Typography variant="subtitle1">
                                            普通
                                        </Typography>
                                    }
                                    {...register("roomSelection", { required: true })}
                                />
                                <FormControlLabel
                                    control={<Radio color="primary" required id="login-form-anxiety" />}
                                    className="radio-label"
                                    value="anxiety"
                                    label={
                                        <Typography variant="subtitle1">
                                            不安
                                        </Typography>
                                    }
                                    {...register("roomSelection", { required: true })}
                                />
                                <FormControlLabel
                                    control={<Radio color="primary" required id="login-form-duress" />}
                                    className="radio-label"
                                    value="blackmail"
                                    label={
                                        <Typography variant="subtitle1">
                                            強迫
                                        </Typography>
                                    }
                                    {...register("roomSelection", { required: true })}
                                />
                                <FormControlLabel
                                    control={<Radio color="primary" required id="login-form-others" />}
                                    className="radio-label"
                                    value="other"
                                    label={
                                        <Typography variant="subtitle1">
                                            うつ他
                                        </Typography>
                                    }
                                    {...register("roomSelection", { required: true })}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid xs={12} className="form-submit-container">
                            <Button variant="contained" id="login-form-submit-button" className="form-page-button" type="submit">送信</Button>
                        </Grid>
                    </form>

                    {/* Show notification on top of the screen about the login status */}

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
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login
