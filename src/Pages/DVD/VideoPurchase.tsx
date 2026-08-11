import { Grid } from '@mui/material';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FormInputTextField from '../../Components/Common/FormInputTextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import apiClient from '../../API/API-client';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';

const VideoPurchase = () => {
    const [prefectureData, setPrefectureData] = useState<any[]>([]);
    const [prefecture, setPrefecture] = useState<string>('北海道');
    const [prefectureIndex, setPrefectureIndex] = useState<string>("1");
    const [paymentMode, setPaymentMode] = useState<string>("代引き（全国一律400円）");

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: 'サポート活動 ', href: '/support.html' },
        { title: ' 森田療法DVD', href: '/dvd.html' },
        { title: '購入申し込みフォーム' }
    ];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        console.log("Form submitted with data: ", data);
    };

    const fetchData = async () => {
        const apiData = await apiClient.post("api/members/prefList", {});
        setPrefectureData(apiData?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid>
            <Heading title='購入申し込みフォーム' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' alignItems='center' justifyContent='center'>
                <Grid item xs={12} py={3}>


                </Grid>
                <Grid item xs={12}>
                    <form id="videopurchase-form" className="form" onSubmit={handleSubmit(onSubmit)}>
                        <Grid item container xs={12} pb={3}>
                            <Grid item xs={12}>
                                <Typography className='pinkBackground-whiteContent'>
                                    購入申し込みフォーム
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h1'>
                                    以下の項目にもれなくご記入下さい。*は必須項目です。
                                </Typography>
                                <FormInputTextField
                                    name="name"
                                    label="お名前"
                                    required={true}
                                    control={control}
                                    caption="（漢字）"
                                    id="videopurchase-form-name"
                                />
                                <FormInputTextField
                                    name="profession"
                                    label="ご職業"
                                    required={true}
                                    control={control}
                                    id="videopurchase-form-profession"
                                />
                                <FormInputTextField
                                    name="post_code"
                                    label="郵便番号"
                                    required={true}
                                    control={control}
                                    caption="（半角数字）"
                                    id="videopurchase-form-post_code"
                                />
                                <Grid container item xs={12} className='inputcontainer'>
                                    <Grid item sm={3} xs={12}>
                                        <Typography variant='h4'>
                                            都道府県
                                            <span className="span-star"> * </span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            defaultValue="北海道"
                                            value={prefecture}
                                            {...register("prefecture")}
                                            onChange={(e) => setPrefecture(e.target.value)}
                                            id="videopurchase-form-prefecture"
                                        >
                                            {prefectureData?.map((item: any) => (
                                                <MenuItem key={item.id} value={item.name} onClick={() => setPrefectureIndex(item.id)}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <FormInputTextField
                                    name="city"
                                    label="市区町村"
                                    required={true}
                                    control={control}
                                    id="videopurchase-form-city"
                                />
                                <FormInputTextField
                                    name="street_address"
                                    label="番地・ビル、マンション名、番"
                                    required={true}
                                    control={control}
                                    id="videopurchase-form-street_address"
                                />
                                <FormInputTextField
                                    name="mobile_number"
                                    label="電　話"
                                    required={true}
                                    control={control}
                                    caption="（半角数字）"
                                    id="videopurchase-form-mobile_number"
                                />
                                <FormInputTextField
                                    name="email"
                                    label="Ｅメール"
                                    required={true}
                                    control={control}
                                    id="videopurchase-form-email"
                                />
                                <Grid item xs={12} className='inputcontainer'>
                                    <Typography variant='h4'>
                                        性別
                                        <span className="span-star"> * </span>
                                    </Typography>
                                    <RadioGroup
                                        name="payment_mode"
                                        value={paymentMode}
                                        onChange={(event) => setPaymentMode(event.target.value)}
                                        row
                                    >
                                        <FormControlLabel
                                            control={<Radio color="primary" id="videopurchase-form-cod" required />}
                                            className="radio-label"
                                            value="代引き（全国一律400円）"
                                            label={
                                                <Typography variant="subtitle1">
                                                    代引き（全国一律400円）
                                                </Typography>
                                            }
                                            {...register("payment_mode", { required: true })}
                                        />
                                        <FormControlLabel
                                            control={<Radio color="primary" id="videopurchase-form-bank" required />}
                                            className="radio-label"
                                            value="銀行振込（手数料はご負担下さい）"
                                            label={
                                                <Typography variant="subtitle1">
                                                    銀行振込（手数料はご負担下さい）
                                                </Typography>
                                            }
                                            {...register("payment_mode", { required: true })}
                                        />
                                    </RadioGroup>
                                    <Typography variant='h6'>
                                        ※振込先：三井住友銀行　御堂筋支店　普通No.7520671
                                        <br />
                                        公益財団法人メンタルヘルス岡本記念財団
                                        <br />
                                        ※銀行振込の場合は、お支払い確認後の発送となります。
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="form-preview-container">
                                    <Button variant="contained" id="videopurchase-form-submit-button" className="form-page-button" type="submit">次へ</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default VideoPurchase;
