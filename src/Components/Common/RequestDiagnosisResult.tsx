import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormInputTextField from './FormInputTextField'
import { useForm } from 'react-hook-form';
import getDeviceDetails from '../../Components/Common/DeviceDetails'
import { isMobile } from 'react-device-detect';
import apiClient from '../../API/API-client';

interface TestAndResult {
    type: number;
    result: string;
    onFlagChange: (value: boolean) => void;
}

const RequestDiagnosisResult: React.FC<TestAndResult> = ({ type, result, onFlagChange }) => {
    const [checked, setChecked] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [checkedBoxs, setCheckedBoxs] = React.useState({
        checkbox1: { checked: false },
        checkbox2: { checked: false },
        checkbox3: { checked: false },
        checkbox4: { checked: false },
    });

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked, value } = event.target;
        if (id === "checkbox4") {
            setCheckedBoxs((prevState) => ({
                ...prevState,
                [id]: { checked }
            }));
        } else {
            setCheckedBoxs((prevState) => ({
                ...prevState,
                [id]: { checked, value: checked && value }
            }));
        }
        setChecked(prevCount => prevCount + (checked ? 1 : -1));
    };


    const onSubmit = async (data: any) => {
        if (checked > 0) {
            if (checkedBoxs.checkbox4.checked && data.message === undefined)
                alert("内容を入力してください")
            else {
                const checkedContentArray = Object.entries(checkedBoxs)
                    .filter(([key, item]) => key !== 'checkbox4' && item.checked)
                    .map(([, item]) => ('value' in item ? item.value : undefined));

                const checksheet = `${checkedBoxs.checkbox1.checked ? "1) 症状について詳しく知りたい <br/> " : ""}${checkedBoxs.checkbox2.checked ? "2) 治療方法を知りたい <br/> " : ""}${checkedBoxs.checkbox3.checked ? "3) 治療機関を知りたい <br/>" : ""}`

                try {
                    setIsSubmitting(true); // Disable button
                    const DataRequest = {
                        "deviceData": getDeviceDetails(),
                        "checksheetContent": checksheet,
                        "name": data.name,
                        "email": data.email,
                        "diagnoseResult": result,
                        "other": data.message,
                        "type": type,
                        "talkType": checkedContentArray,
                        "isSmartphone": isMobile ? "1" : "0"
                    }

                    const apiData = await apiClient.post("api/diagnose/save", DataRequest)
                    if (apiData)
                        onFlagChange(true)

                } catch (error) {
                    //console.error("Error sending Data : ", error)
                }
                finally{
                    setIsSubmitting(false); //to be active after submission
                }
            }
        }
        else {
            alert("チェックボックスを記入してください。")
        }
    };

    /**
     * Method used for reset the details entered in the form
     */

    const handleResetForm = () => {
        reset({
            message:"",
        });
        setCheckedBoxs({
            checkbox1: { checked: false },
            checkbox2: { checked: false },
            checkbox3: { checked: false },
            checkbox4: { checked: false },
        });   
        setChecked(0);     
        setIsSubmitting(false); // Reset the button 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="request-result-form" className="form">
            <Typography className='pinkBackground-whiteContent'>
                予約フォーム
            </Typography>
            <Typography variant='h1' pb={2}>
                （チエックして送信して下さい）
            </Typography>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChecked} value={1} id="checkbox1" checked={checkedBoxs.checkbox1.checked}/>
                    }
                    label={
                        <Typography variant="h6">
                            症状について詳しく知りたい
                        </Typography>
                    }
                    id="request-result-content-1"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChecked} value={2} id="checkbox2" checked={checkedBoxs.checkbox2.checked}/>
                    }
                    label={
                        <Typography variant="h6" >
                            治療方法を知りたい
                        </Typography>
                    }
                    id="request-result-content-2"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChecked} value={3} id="checkbox3" checked={checkedBoxs.checkbox3.checked} />
                    }
                    label={
                        <Typography variant="h6" >
                            治療機関を知りたい
                        </Typography>
                    }
                    id="request-result-content-3"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={handleChecked} id="checkbox4" checked={checkedBoxs.checkbox4.checked}/>
                    }
                    label={
                        <Typography variant="h6" >
                            その他
                        </Typography>
                    }
                    id="request-result-content-4"
                />
            </FormGroup>
            <Grid xs={12} sm={7.2}>
                <FormInputTextField
                    name="message"
                    control={control}
                    textarea={true}
                    id="request-result-form-message"
                />
            </Grid>
            <FormInputTextField
                name="name"
                label="お名前（ニックネーム可）"
                required={true}
                control={control}
                id="request-result-form-name"
            />
            <FormInputTextField
                name="email"
                label="メールアドレス"
                type="email"
                required={true}
                control={control}
                id="request-result-form-name"
            />
            <Grid item container pt={3}>
                <Grid item>
                    <Button type="submit" variant="contained" id="request-result-form-save-button" className="form-save-container-submit-button"  disabled={isSubmitting} >送信</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" id="request-result-form-reset-button" className="form-save-container-reset-button" type='reset' onClick={handleResetForm}>リセット</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default RequestDiagnosisResult
