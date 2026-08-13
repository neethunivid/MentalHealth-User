import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import getDeviceDetails from '../../Components/Common/DeviceDetails';
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
        handleSubmit,
        control,
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
            if (checkedBoxs.checkbox4.checked && (!data.message || data.message.trim() === ''))
                alert("内容を入力してください")
            else {
                const checkedContentArray = Object.entries(checkedBoxs)
                    .filter(([key, item]) => key !== 'checkbox4' && item.checked)
                    .map(([, item]) => ('value' in item ? item.value : undefined));

                const checksheet = `${checkedBoxs.checkbox1.checked ? "1) 症状について詳しく知りたい <br/> " : ""}${checkedBoxs.checkbox2.checked ? "2) 治療方法を知りたい <br/> " : ""}${checkedBoxs.checkbox3.checked ? "3) 治療機関を知りたい <br/>" : ""}`

                try {
                    setIsSubmitting(true);
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
                finally {
                    setIsSubmitting(false);
                }
            }
        }
        else {
            alert("チェックボックスを記入してください。")
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} id="request-result-form" sx={{ width: '100%' }}>
            {/* Blue Title Header with Bottom Divider */}
            <Typography
                variant="h6"
                sx={{
                    color: '#0066cc',
                    fontWeight: 'bold',
                    fontSize: '1.05rem',
                    pb: 1,
                    mb: 2,
                    borderBottom: '1px solid #d0d7de',
                }}
            >
                診断結果についてメールで相談する
            </Typography>

            {/* Checkboxes List */}
            <FormGroup sx={{ gap: 0.5, mb: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleChecked}
                            value={1}
                            id="checkbox1"
                            checked={checkedBoxs.checkbox1.checked}
                            icon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #767676',
                                        borderRadius: '2px',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            }
                            checkedIcon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #0066cc',
                                        borderRadius: '2px',
                                        backgroundColor: '#0066cc',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        lineHeight: 1,
                                    }}
                                >
                                    ✓
                                </Box>
                            }
                            sx={{ padding: '4px 8px 4px 0' }}
                        />
                    }
                    label={
                        <Typography sx={{ fontSize: '0.9rem', color: '#333333' }}>
                            症状について詳しく知りたい
                        </Typography>
                    }
                    id="request-result-content-1"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleChecked}
                            value={2}
                            id="checkbox2"
                            checked={checkedBoxs.checkbox2.checked}
                            icon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #767676',
                                        borderRadius: '2px',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            }
                            checkedIcon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #0066cc',
                                        borderRadius: '2px',
                                        backgroundColor: '#0066cc',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        lineHeight: 1,
                                    }}
                                >
                                    ✓
                                </Box>
                            }
                            sx={{ padding: '4px 8px 4px 0' }}
                        />
                    }
                    label={
                        <Typography sx={{ fontSize: '0.9rem', color: '#333333' }}>
                            治療方法を知りたい
                        </Typography>
                    }
                    id="request-result-content-2"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleChecked}
                            value={3}
                            id="checkbox3"
                            checked={checkedBoxs.checkbox3.checked}
                            icon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #767676',
                                        borderRadius: '2px',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            }
                            checkedIcon={
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        border: '1px solid #0066cc',
                                        borderRadius: '2px',
                                        backgroundColor: '#0066cc',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        lineHeight: 1,
                                    }}
                                >
                                    ✓
                                </Box>
                            }
                            sx={{ padding: '4px 8px 4px 0' }}
                        />
                    }
                    label={
                        <Typography sx={{ fontSize: '0.9rem', color: '#333333' }}>
                            治療機関を知りたい
                        </Typography>
                    }
                    id="request-result-content-3"
                />
            </FormGroup>

            {/* Others Textarea Field */}
            <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" sx={{ color: '#555555', fontSize: '0.88rem', mb: 0.8 }}>
                    その他
                </Typography>
                <Controller
                    control={control}
                    name="message"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            multiline
                            rows={5}
                            fullWidth
                            variant="outlined"
                            id="request-result-form-message"
                            sx={{
                                backgroundColor: '#ffffff',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '3px',
                                    fontSize: '0.9rem',
                                    '& fieldset': {
                                        borderColor: '#b3b3b3',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#767676',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0066cc',
                                    },
                                },
                            }}
                        />
                    )}
                />
            </Box>

            {/* Name Input Field */}
            <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" sx={{ color: '#555555', fontSize: '0.88rem', mb: 0.8 }}>
                    お名前（ニックネーム可）
                </Typography>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="request-result-form-name"
                            sx={{
                                backgroundColor: '#ffffff',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '3px',
                                    fontSize: '0.9rem',
                                    height: '38px',
                                    '& fieldset': {
                                        borderColor: '#b3b3b3',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#767676',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0066cc',
                                    },
                                },
                            }}
                        />
                    )}
                />
            </Box>

            {/* Email Input Field */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#555555', fontSize: '0.88rem', mb: 0.8 }}>
                    メールアドレス:
                </Typography>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            type="email"
                            placeholder="example@example.com"
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="request-result-form-email"
                            sx={{
                                backgroundColor: '#ffffff',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '3px',
                                    fontSize: '0.9rem',
                                    height: '38px',
                                    '& fieldset': {
                                        borderColor: '#b3b3b3',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#767676',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0066cc',
                                    },
                                },
                            }}
                        />
                    )}
                />
            </Box>

            {/* Centered Send Pill Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    id="request-result-form-save-button"
                    sx={{
                        backgroundColor: '#0066cc',
                        color: '#ffffff',
                        borderRadius: '25px',
                        px: 7,
                        py: 1.2,
                        fontSize: '0.98rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#004c99',
                            boxShadow: 'none',
                        },
                    }}
                >
                    送信
                </Button>
            </Box>
        </Box>
    );
};

export default RequestDiagnosisResult;
