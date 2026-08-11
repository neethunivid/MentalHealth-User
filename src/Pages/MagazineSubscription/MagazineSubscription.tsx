import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import FormInputTextField from '../../Components/Common/FormInputTextField'
import { useForm } from 'react-hook-form';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import apiClient from '../../API/API-client';

/**
 * Component is used for subscribe and unsubscribe the mail magazine
 */

const MagazineSubscription = () => {

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: 'メルマガ購読' }
    ];

    /**
     * Method used to subscribe mail magazine
     * @param data 
     */

    const subscribeMagazine = async (data: any) => {
        if (data) {
            try {
                const DataRequest = {
                    "email": data.pc_email_address,
                    "emailMob": data.mobile_email_address,
                    "name": data.name,
                };

                const details = await apiClient.post("api/magadd/checkEmail", DataRequest)
                if (details.data.data !== null) {
                    alert("アクティブなサブスクリプションがあります")
                } else {
                    const apiData = await apiClient.post("api/magadd/add", DataRequest);
                    if (apiData) {
                        alert("メールニュースレターを購読しました。")
                        reset({
                            name: '',
                            pc_email_address: '',
                            mobile_email_address: ''
                        });
                    }
                }

            } catch (error) {
                //console.error("Subscription Failed : ", error)
            }
        }
    }

    /**
     * Method used to unsubscribe mail magazine
     * @param data 
     */

    const unsubscribeMagazine = async (data: any) => {
        if (data) {
            try {

                const DataRequest = {
                    "email": data.pc_email,
                    "emailMob": data.mobile_email,
                };

                const details = await apiClient.post("api/magadd/getMagid", DataRequest)

                if (details?.data?.data === 0) {
                    alert("サブスクリプションが見つかりません")
                }
                else {
                    const apiData = await apiClient.delete("api/magadd/delete/" + details.data.data);
                    if (apiData) {
                        alert("メールマガジンを退会しました。")
                        reset({
                            pc_email : '',
                            mobile_email : ''
                        });
                    }
                }
            } catch (error) {
                //console.error("Unsubscription Failed : ", error)
            }
        }
    }

    return (
        <Grid>
            <Heading title='メルマガ購読' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' alignItems='center' justifyContent='center'>
                <Grid item xs={12}>
                    <form id="subscription-form" className="form" onSubmit={handleSubmit(subscribeMagazine)}>
                        <Grid xs={12}><Typography className='blueBackground-blueContent'>
                            メルマガ購読申し込みフォーム
                        </Typography>
                        </Grid>
                        <Typography variant='h6'>
                            ★メールマガジンの購読を希望される方はメールアドレスを登録して下さい。
                        </Typography>
                        <Grid>
                            <Typography variant='h6' display="inline">★</Typography>
                            <Typography variant='h1' display="inline">
                                パソコン（PC用）又は携帯のいずれかで購読できます。どちらも購読したい方は、2つとも登録して下さい。
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant='h6' display="inline">★</Typography>
                            <Typography variant='h1' display="inline">
                                このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。
                            </Typography>
                        </Grid>
                        <br />
                        <Typography variant='h6'>
                            ■メールアドレスの新規登録
                        </Typography>
                        <FormInputTextField
                            required={true}
                            label="お名前"
                            name="name"
                            control={control}
                            id="subscription-form-name"
                        />
                        <FormInputTextField
                            required={true}
                            label="メールアドレス（PC用）"
                            type="email"
                            name="pc_email_address"
                            control={control}
                            id="subscription-form-pc-email"
                        />
                        <FormInputTextField
                            required={true}
                            label="メールアドレス（携帯用）"
                            type="email"
                            name="mobile_email_address"
                            control={control}
                            id="subscription-form-mobile-email"
                        />
                        <Grid xs={12} className="form-submit-container">
                            <Button variant="contained" id="subscription-form1-submit-button" className="form-page-button" type="submit"> 送信 </Button>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <form id="unsubscription-form" className='form' onSubmit={handleSubmit(unsubscribeMagazine)}>
                        <Grid>
                            <Typography className='blueBackground-blueContent'>
                                メールアドレスの変更・削除（購読中止）
                            </Typography>
                            <Typography variant='h6' display="inline">
                                ★登録メールアドレスを変更したい方、又はメールマガジンの購読を中止したい方は、
                            </Typography>
                            <Typography variant='h1' display="inline">
                                現在登録済みのメールアドレスを削除して下さい。
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant='h6' display="inline">★</Typography>
                            <Typography variant='h1' display="inline">
                                このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。
                            </Typography>
                        </Grid>
                        <br />
                        <Typography variant='h6'>
                            ■登録メールアドレスの削除
                        </Typography>
                        <FormInputTextField
                            label="メールアドレス（PC用）"
                            type="email"
                            name="pc_email"
                            control={control}
                            id="unsubscription-form-pc-email"
                        />
                        <FormInputTextField
                            label="メールアドレス（携帯用）"
                            type="email"
                            name="mobile_email"
                            control={control}
                            id="unsubscription-form-mobile-email"
                        />
                        <Grid xs={12} className="form-submit-container">
                            <Button variant="contained" id="unsubscription-form2-submit-button" className="form-page-button" type="submit"> 送信 </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MagazineSubscription
