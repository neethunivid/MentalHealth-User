import { title } from 'process';
import React from 'react'
import { useForm } from 'react-hook-form';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { Button, FormControlLabel, Grid, Link, Radio, RadioGroup, Typography } from '@material-ui/core';

/**
 * Component used for user to book a zoom appoinment
 */
const ZoomMeeting = () => {
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
        { title: '相談窓口', href: '/soudan.html' },
        { title: 'オンライン面接の予約にあたって' }
    ];

    /**
     * Method  is used to know about the prerequisites of online meeting and corresponding download links
     * If all requirements are satiisfied then can book a reservation for counselling
     * @param data 
     */
    const onSubmit = async (data: any) => {
        const allYes = Object.values(data).every((value: any) => value === "yes");
        if (allYes) {
            navigate('/reservation_chart', { state: { type: "Online" } });
        } else {
            alert("Zoomミーティングソフトをダウンロードして下さい。ソフトが使用できるかテストして下さい。")
        }
    }

    return (
        <Grid>
            <Heading title='オンライン面接の予約にあたって' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' alignItems='center' justifyContent='center'>
                <Grid item xs={12}>
                    <form id="zoom-conditions-form" className="confirmation" onSubmit={handleSubmit(onSubmit)}>
                        <Grid item>
                            <Typography variant='h6'>
                                無料カウンセリングをオンライン面接で実施することになり
                            </Typography>
                            <Typography variant='h6' display="inline">
                                ました。当財団のオンライン面接は、
                            </Typography>
                            <Typography variant='h1' display="inline">
                                Zoomミーティング
                            </Typography>
                            <Typography variant='h6' display="inline">
                                というソフトウエアを使用して実施します。
                            </Typography>
                            <Typography variant='h6'>
                                そのためオンラインで面接を予約される方に、その環境条件
                                として以下の項目をチェックすることをお願い致します。
                            </Typography>
                        </Grid>
                        <Grid>
                            <Grid item>
                                <Typography variant='h4'>
                                    Q1: Zoomミーティングというソフトを知っていますか？
                                </Typography>
                                <RadioGroup
                                    name="know_before"
                                    className='radioGroup'
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="know_before-yes" required />}
                                        value="yes"
                                        label={
                                            <Typography variant="subtitle2">
                                                はい
                                            </Typography>
                                        }
                                        {...register("know_before", { required: true })}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="know_before_no" required />}
                                        value="no"
                                        label={
                                            <Typography variant="subtitle2">
                                                いいえ
                                            </Typography>
                                        }
                                        {...register("know_before", { required: true })}
                                    />
                                </RadioGroup>
                                <Link href="https://explore.zoom.us/ja/products/meetings/" underline="hover" className='link'>
                                    （→ ZoomミーティングのHPはこちら）
                                </Link>
                            </Grid>
                            <Grid>
                                <Typography variant='h4'>
                                    Q2: Zoomミーティングというソフトを保有していますか？
                                </Typography>
                                <RadioGroup
                                    name="installation_status"
                                    className='radioGroup'
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="installation_status_yes" required />}
                                        value="yes"
                                        label={
                                            <Typography variant="subtitle2">
                                                はい
                                            </Typography>
                                        }
                                        {...register("installation_status", { required: true })}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="installation_status_no" required />}
                                        value="no"
                                        label={
                                            <Typography variant="subtitle2">
                                                いいえ
                                            </Typography>
                                        }
                                        {...register("installation_status", { required: true })}
                                    />
                                </RadioGroup>
                                <Link href="https://zoom.us/download#client_4meeting" underline="hover" className='link'>
                                    （→ Zoomミーティングダウンロードはこちら）
                                </Link>
                            </Grid>
                            <Grid>
                                <Typography variant='h4'>
                                    Q3: Zoomミーティングというソフトを使用したことがありますか？
                                </Typography>
                                <RadioGroup
                                    name="used_before"
                                    className='radioGroup'
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="used_before_yes" required />}
                                        value="yes"
                                        label={
                                            <Typography variant="subtitle2">
                                                はい
                                            </Typography>
                                        }
                                        {...register("used_before", { required: true })}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="used_before_no" required />}
                                        value="used_before"
                                        label={
                                            <Typography variant="subtitle2">
                                                いいえ
                                            </Typography>
                                        }
                                        {...register("used_before", { required: true })}
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid>
                                <Typography variant='h4'>
                                    Q4: Zoomミーティングというソフトを使用して映像と音声 がきちんと視聴できますか？
                                </Typography>
                                <RadioGroup
                                    name="call_clarity"
                                    className='radioGroup'
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="call_clarity_yes" required />}
                                        value="yes"
                                        label={
                                            <Typography variant="subtitle2">
                                                はい
                                            </Typography>
                                        }
                                        {...register("call_clarity", { required: true })}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="call_clarity_no" required />}
                                        value="no"
                                        label={
                                            <Typography variant="subtitle2">
                                                いいえ
                                            </Typography>
                                        }
                                        {...register("call_clarity", { required: true })}
                                    />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <Grid xs={12} justifyContent="center">
                            <Button variant="contained" color="primary" size="large" id="online-meeting-form-submit-button" className="online-meeting-form-goto-reservation-button" type="submit">
                                予約表へ移動
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ZoomMeeting
