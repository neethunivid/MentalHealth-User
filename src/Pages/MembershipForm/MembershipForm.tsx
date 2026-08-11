import { Button, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import FormInputTextField from '../../Components/Common/FormInputTextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormInputPreview from '../../Components/Common/FormInputPreview';
import { Grid } from '@mui/material';
import apiClient from '../../API/API-client';

/**
 * Component used for user to register
 */

const MembershipForm = () => {
    const [membershipData, setMembershipData] = useState<any>({})
    const [FilledForm, setFilledForm] = useState(false)
    const [SendDataFlag, setSendDataFlag] = useState(false)
    const [sex, setSex] = useState("sex");
    const [profession, setProfession] = useState<string>('会社員');
    const [prefecture, setPrefecture] = useState<string>('北海道');
    const [newsletterSubscription, setNewsletterSubscription] = useState("購読");
    const [prefectureData, setPrefectureData] = useState<any>([])
    const [prefectureIndex, setPrefectureIndex] = useState("1");
    const [professionData, setProfessionData] = useState<any>([])
    const [professionIndex, setProfessionIndex] = useState("1");

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm();

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: 'サポート活動', href: '/home.html' },
        { title: 'ハートエクスペリエンスフォーラム（会員掲示板）', href: '/home.html' },
        { title: '心の体験フォーラム 入会希望' }
    ];

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const formatDateString = (dateString: string) => {

        if (/[^0-9.\/\-]/.test(dateString)) {
            return 'yyyy-mm-dd';
        }

        const normalizedDate = dateString.replace(/[\.\,\/]/g, '-');
        let [year, month, day] = normalizedDate.split('-').map(part => part.padStart(2, '0'));

        if (year.length < 4) {
            [year, month, day] = [day, month, year];
        }

        if (!year || !month || !day || year.length < 4 || year.length > 4 || month.length < 1 || month.length > 2 || day.length < 1 || day.length > 2) {
            return `yyyy-mm-dd`;
        }

        return `${year}-${month}-${day}`;
    };

    const convertToDate = (dateString: string) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return new Date(dateString);
        } else {
            return `yyyy-mm-dd`;
        }
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
        return formatted;
    };

    const formatPinNumber = (pinNumber: string) => {
        const cleaned = pinNumber.replace(/\D/g, '');
        const formatted = cleaned.replace(/(\d{3})(\d{3})/, '$1-$2');
        return formatted;
    };

    /**
     * Method  is used to save the data and goto section that allows preview the details entered in the form
     * @param data 
     */

    const onSubmit = async (data: any) => {

        const today = convertToDate(getCurrentDate())

        if (data.name === undefined && data.name1 === undefined) {
            alert("フルネームを入力してください。");
        }
        else if (data.namek === undefined && data.namek1 === undefined) {
            alert("ふりがなを入力してください。");
        }
        else if (!(/^.{4,15}$/.test(data.memberId))) {
            alert("会員IDを入力してください");
        }
        else if (!/^(?=.*[A-Z]).{6,15}$/.test(data.password)) {
            alert("パスワードは6字から15字以内の英数字で、1つ以上の大文字を含めてください。");
        }
        else if (data.password !== data.confirmPassword) {
            alert("パスワードが一致していません")
        }
        else if (data.sex === undefined) {
            alert("あなたの性別を選択してください");
        }
        else if (data.post_code === undefined) {
            alert("郵便番号を記入してください。")
        }
        else if (data.city === undefined) {
            alert("市区町村を入力してください。");
        }
        else if (data.street_address === undefined) {
            alert("住所を入力してください");
        }
        else if (!(/^(\d{4}-\d{4}-\d{4}|\d{12})$/.test(data.mobile_number))) {
            alert("有効な電話番号を入力して下さい。");
        }
        else if (data.reference === undefined) {
            alert("記入してください。どこから当社について知りましたか？");
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email1))) {
            alert("メールアドレス1を正しく入力してください");
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email2))) {
            alert("メールアドレス2を正しく入力してください");
        }
        else if (data.speech_title === undefined) {
            alert("投稿タイトルを入力してください。");
        }
        else if ((data.message.length > 400)) {
            alert("400文字以内のコメントを入力してください。");
        }
        else {
            if (formatDateString(data.dob) === `yyyy-mm-dd`) {
                setFilledForm(false)
                alert("正しい日付形式を入力してください")
            } else {
                const date_of_birth = convertToDate(formatDateString(data.dob))
                if (date_of_birth > today) {
                    setFilledForm(false)
                    alert("生年月日が無効です")
                } else {
                    membershipData.dob = formatDateString(data.dob)
                    setMembershipData(data)
                    setFilledForm(true)
                    setSex(data.sex)
                    setProfession(data.profession)
                    setPrefecture(data.prefecture)
                    setNewsletterSubscription(data.subscribeNewsletter);
                }
            }
        }
    }

    /**
     * Method is used to edit the data after preview the details entered in the form
     */

    const handleEditData = async () => {
        setFilledForm(false)
    }

    /**
     * Method used to submit the form after verifying details through preview section are correct
     * This will also sent data to database
     */

    const handleSendData = async () => {

        if (membershipData) {
            try {
                const DataRequest = {
                    "name": membershipData.name,
                    "name2": membershipData.name2,
                    "namek": membershipData.namek,
                    "namek2": membershipData.namek2,
                    "memberid": membershipData.memberId,
                    "password": membershipData.password,
                    "sex": membershipData.sex === '男性' ? "1" : "2",
                    "dob": formatDateString(membershipData.dob),
                    "job": professionIndex.toString(),
                    "job_additional": membershipData.occupation,
                    "zipcode": formatPinNumber(membershipData.post_code),
                    "address1": membershipData.city,
                    "address2": membershipData.street_address,
                    "tel": formatPhoneNumber(membershipData.mobile_number),
                    "workplace": membershipData.work_place,
                    "howfound": membershipData.reference,
                    "email_pc": membershipData.email1,
                    "email_mob": membershipData.email2,
                    "mailmagazine": membershipData.subscribeNewsletter === '購読' ? "1" : "2",
                    "pref": prefectureIndex.toString(),
                    "statement_title": membershipData.speech_title,
                    "statement_text": membershipData.message,
                    "remarks_initial": 0,
                    "ngMember": 0,
                    "deleteRequest": 0,
                    "date": getCurrentDate(),
                }

                const apiData = await apiClient.post("api/members/addMember", DataRequest, {});
                if (apiData) {
                    setSendDataFlag(true)
                }
            } catch (error: any) {
                // console.error("Error sending Data : ",error)
                if (error.response.data.error == "MemberId already exists") {
                    alert("別の会員IDを選択してください。")
                } else if (error.response.data.error == "Email already exists") {
                    alert("メールは既に存在します")
                }
            }
        }
    }

    useEffect(() => {
        fetchProfessionData();
        fetchPrefectureData();
    }, []);

    const fetchPrefectureData = async () => {
        const apiData = await apiClient.post("api/members/prefList", {});
        setPrefectureData(apiData?.data?.data);
    }

    const fetchProfessionData = async () => {
        const apiData = await apiClient.post("api/members/job", {});
        setProfessionData(apiData?.data?.data);
    }

    return (
        <Grid>
            <Heading title='心の体験フォーラム 入会希望' />
            <Breadcrumb items={breadcrumbItems} />
            <Grid container className='container' alignItems='center' justifyContent='center'>
                <Grid item sm={12} xs={12}>

                    {/* Display as default when page loads to the first time and the form is not entered or in case of edit the details */}

                    {!FilledForm && SendDataFlag == false &&
                        <form id="membership-form" className="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid item container xs={12} pb={3}>
                                <Grid item xs={12} sm={12}>
                                    <Typography className='pinkBackground-whiteContent'>
                                        入会申し込みフォーム
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant='h1'>
                                        ★下記の項目を入力して下さい。*は必須入力項目です。未入力の場合、申し込みは無効となります。
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant='h1'>
                                        ★このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12}>
                                <Grid container item xs={12} sm={8} spacing={2}>
                                    <Grid item xs={12} sm={5.5}>
                                        <FormInputTextField
                                            required={true}
                                            label="名前（漢字）"
                                            name="name"
                                            control={control}
                                            caption="名"
                                            fullwidth={true}
                                            id="membership-form-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5.5}>
                                        <FormInputTextField
                                            required={true}
                                            name="name2"
                                            control={control}
                                            caption="姓"
                                            fullwidth={true}
                                            className='second-field-inputs'
                                            id="membership-form-name2"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={12}>
                                <Grid container item xs={12} sm={8} spacing={2}>
                                    <Grid item xs={12} sm={5.5}>
                                        <FormInputTextField
                                            required={true}
                                            label="ふりがな"
                                            name="namek"
                                            control={control}
                                            caption="名"
                                            fullwidth={true}
                                            id="membership-form-namek"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5.5}>
                                        <FormInputTextField
                                            name="namek2"
                                            required={true}
                                            control={control}
                                            caption="姓"
                                            fullwidth={true}
                                            className='second-field-inputs'
                                            id="membership-form-namek2"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="memberId"
                                    label="希望ID"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    caption="※4～15字の英数大小文字※掲示板使用時のニックネーム"
                                    id="membership-form-memberId"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="password"
                                    label="パスワード"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    caption="※6～15字英数大小文字"
                                    id="membership-form-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="confirmPassword"
                                    label="パスワード再入力"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    id="membership-form-confirmPassword"
                                />
                            </Grid>
                            <Grid item xs={12} className='inputcontainer'>
                                <Typography variant='h4'>
                                    性別
                                    <span className="span-star"> * </span>
                                </Typography>
                                <RadioGroup
                                    name="sex"
                                    value={sex}
                                    onChange={(event) => setSex(event.target.value)}
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="membership-form-male" required />}
                                        className="radio-label"
                                        value="男性"
                                        label={
                                            <Typography variant="subtitle1">
                                                男性
                                            </Typography>
                                        }
                                        {...register("sex", { required: true })}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="membership-form-woman" required />}
                                        className="radio-label"
                                        value="女性"
                                        label={
                                            <Typography variant="subtitle1">
                                                女性
                                            </Typography>
                                        }
                                        {...register("sex", { required: true })}
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="dob"
                                    label="生年月日"
                                    placeholder="2000/01/01"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    id="membership-form-dob"
                                />
                            </Grid>
                            <Grid container item sm={12} xs={12} className='inputcontainer'>
                                <Grid item sm={3} xs={12}>
                                    <Typography variant='h4'>
                                        職業
                                        <span className="span-star"> * </span>
                                    </Typography>
                                    <Select
                                        // name="profession"
                                        fullWidth
                                        defaultValue="会社員"
                                        value={profession}
                                        {...register("profession", { required: true })}
                                        onChange={(event) => setProfession(event.target.value)}
                                        id="membership-form-profession"
                                    >
                                        {professionData.map((item: any) => (
                                            <MenuItem key={item.id} value={item.name} onClick={(e) => setProfessionIndex(item.id)}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="occupation"
                                    label="職業の詳細"
                                    control={control}
                                    id="membership-form-occupation"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="post_code"
                                    label="郵便番号"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    id="membership-form-id"
                                />
                            </Grid>
                            <Grid container item sm={12} xs={12} className='inputcontainer'>
                                <Grid item sm={3} xs={12}>
                                    <Select
                                        // name="prefecture"
                                        fullWidth
                                        defaultValue="北海道"
                                        value={prefecture}
                                        {...register("prefecture")}
                                        onChange={(e) => setPrefecture(e.target.value)}
                                        id="membership-form-prefecture"
                                    >
                                        {prefectureData?.map((item: any) => (
                                            <MenuItem key={item.id} value={item.name} onClick={(e) => setPrefectureIndex(item.id)}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="city"
                                    label="市区郡町村"
                                    required={true}
                                    control={control}
                                    id="membership-form-city"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="street_address"
                                    label="番地"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    id="membership-form-street_address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="mobile_number"
                                    label="電話・携帯番号"
                                    type="tel"
                                    required={true}
                                    control={control}
                                    smalltextField={true}
                                    id="membership-form-mobile_number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="work_place"
                                    label="勤め先・学校"
                                    control={control}
                                    id="membership-form-work_place"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="reference"
                                    required={true}
                                    label="何で知ったか"
                                    control={control}
                                    id="membership-form-reference"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="email1"
                                    label="メールアドレス1"
                                    type="email"
                                    required={true}
                                    control={control}
                                    caption="（半角英数字）"
                                    id="membership-form-email1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="email2"
                                    label="メールアドレス2"
                                    type="email"
                                    required={true}
                                    control={control}
                                    caption="（半角英数字）"
                                    id="membership-form-email2"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="speech_title"
                                    label="発言タイトル"
                                    required={true}
                                    control={control}
                                    id="membership-form-speech_title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputTextField
                                    name="message"
                                    label="発言内容"
                                    required={true}
                                    textarea={true}
                                    control={control}
                                    caption="※400字以内で記入して下さい。"
                                    id="membership-form-message"
                                />
                            </Grid>
                            <Grid item xs={12} className='inputcontainer'>
                                <Typography variant='h4'>
                                    メルマガ購読希望の有無
                                </Typography>
                                <RadioGroup
                                    name="subscribeNewsletter"
                                    defaultValue="購読"
                                    value={newsletterSubscription}
                                    onChange={(event) => setNewsletterSubscription(event.target.value)}
                                    row
                                >
                                    <FormControlLabel
                                        control={<Radio color="primary" id="membership-form-duress" defaultChecked />}
                                        className="radio-label"
                                        value="購読"
                                        label={
                                            <Typography variant="subtitle1">
                                                購読
                                            </Typography>
                                        }
                                        {...register("subscribeNewsletter")}
                                    />
                                    <FormControlLabel
                                        control={<Radio color="primary" id="membership-form-others" />}
                                        className="radio-label"
                                        value="中止"
                                        label={
                                            <Typography variant="subtitle1">
                                                中止
                                            </Typography>
                                        }
                                        {...register("subscribeNewsletter")}
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} className="form-preview-container">
                                <Button variant="contained" id="membership-form-submit-button" className="form-page-button" type="submit">プレビュー</Button>
                            </Grid>
                        </form>
                    }

                    {/* Displays when the form is filled and not submitted, and also used to review the details entered in the form */}

                    {FilledForm && membershipData && SendDataFlag == false &&
                        <Grid container className="form" alignItems='center' justifyContent='center' pt={2}>
                            <FormInputPreview
                                label="名前（漢字）"
                                inputValue={`${membershipData.name} ${membershipData.name2}`}
                                id="membership-form-name"
                            />
                            <FormInputPreview
                                label="ふりがな"
                                inputValue={`${membershipData.namek} ${membershipData.namek2}`}
                                id="membership-form-namek"
                            />
                            <FormInputPreview
                                label="希望ID"
                                inputValue={membershipData.memberId}
                                id="membership-form-memberId"
                            />
                            <FormInputPreview
                                label="パスワード"
                                inputValue={membershipData.password}
                                id="membership-form-password"
                            />
                            <FormInputPreview
                                label="性別"
                                inputValue={membershipData.sex}
                                id="membership-form-sex"
                            />
                            <FormInputPreview
                                label="生年月日"
                                inputValue={membershipData.dob}
                                id="membership-form-dob"
                            />
                            <FormInputPreview
                                label="職業"
                                inputValue={membershipData.profession}
                                id="membership-form-profession"
                            />
                            <FormInputPreview
                                label="職業の詳細"
                                inputValue={membershipData.occupation}
                                id="membership-form-occupation"
                            />
                            <FormInputPreview
                                label="郵便番号"
                                inputValue={formatPinNumber(membershipData.post_code)}
                                id="membership-form-address1"
                            />
                            <FormInputPreview
                                inputValue={membershipData.prefecture}
                                id="membership-form-address2"
                            />
                            <FormInputPreview
                                label="市区郡町村"
                                inputValue={membershipData.city}
                                id="membership-form-city"
                            />
                            <FormInputPreview
                                label="番地"
                                inputValue={membershipData.street_address}
                                id="membership-form-street_address"
                            />
                            <FormInputPreview
                                label="電話・携帯番号"
                                inputValue={formatPhoneNumber(membershipData.mobile_number)}
                                id="membership-form-mobile_number"
                            />
                            <FormInputPreview
                                label="勤め先・学校"
                                inputValue={membershipData.work_place}
                                id="membership-form-work_place"
                            />
                            <FormInputPreview
                                label="何で知ったか"
                                inputValue={membershipData.reference}
                                id="membership-form-reference"
                            />
                            <FormInputPreview
                                label="メールアドレス1"
                                inputValue={membershipData.email1}
                                id="membership-form-email1"
                            />
                            <FormInputPreview
                                label="メールアドレス2"
                                inputValue={membershipData.email2}
                                id="membership-form-email2"
                            />
                            <FormInputPreview
                                label="発言タイトル"
                                inputValue={membershipData.speech_title}
                                id="membership-form-speech_title"
                            />
                            <FormInputPreview
                                label="発言内容"
                                inputValue={membershipData.message}
                                id="membership-form-message"
                            />
                            <FormInputPreview
                                label="電子メールニュースレターを購読する"
                                inputValue={membershipData.subscribeNewsletter}
                                id="membership-form-subscribeNewsletter"
                            />
                            <Grid container className="form-save-container">
                                <Grid item className="form-save-container-confirm-text">
                                    上記の内容でよろしければ、送信ボタンをクリックしてください。
                                </Grid>
                                <Grid item container>
                                    <Grid item>
                                        <Button variant="contained" id="membership-form-save-button" className="form-save-container-submit-button" type="submit" onClick={handleSendData}>送信</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" id="membership-form-back-button" className="form-save-container-back-button" onClick={handleEditData}>戻る</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }

                    {/* Display only when the form data is submitted successfully */}

                    {SendDataFlag === true &&
                        <Grid sx={{ backgroundColor: "#f9f9f9", padding: 5, fontSize: 16, border: 1, borderColor: "#9f9f9f", margin: 10 }}>
                            <Typography>
                                お問合わせいただき、ありがとうございます。
                            </Typography>
                            <Typography>
                                後日、事務局よりメールにてご連絡致しますので、しばらくお待ち下さい。
                            </Typography>
                        </Grid>}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MembershipForm;
