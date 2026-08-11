import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Common/Heading';
import Breadcrumb from '../../Components/Common/BreadCrumb';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { Button, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import FormInputTextField from '../../Components/Common/FormInputTextField';
import { AgeData } from "../../Components/Common/age"
import { ProfessionData } from "../../Components/Common/profession";
import apiClient from '../../API/API-client';
import { isMobile } from 'react-device-detect';
import { useNavigate, useLocation } from 'react-router-dom';

interface ReservationData {
    date: string;
    regionName: string;
    name: string;
    slots: { id: number; timeStart: string; reservationstatus: string }[];
}

/**
 * Component used for user to reserve a slot for counselling
 */

const ReservationChart = () => {
    const memberNo = localStorage.getItem('memberNo');
    const navigate = useNavigate();

    const [openForm, setOpenForm] = useState(false)
    const [reservationData, setReservationData] = useState<ReservationData[]>([]);
    const [sex, setSex] = useState("sex");
    const [age, setAge] = useState<string>("");
    const [counsellingType, setCounsellingType] = useState<string>("Online");
    const [submitForm, setSubmitForm] = useState(false)
    const [uniqueTimeRanges, setUniqueTimeRanges] = useState<string[]>([]);
    const [uniqueTimeCount, setUniqueTimeCount] = useState<number>()
    const [clickedCell, setClickedCell] = useState<{ row: number, column: number } | null>(null);
    const [slot, setSlot] = useState<any>(null)
    const [SendDataFlag, setSendDataFlag] = useState(false)
    const [id, setId] = useState<any>(null)

    /** Checking Params to give request */
    const location = useLocation();
    const param = location.state?.type; 
    const type = param ? "Online" : "interview";

    const breadcrumbItems = [
        { title: 'HOME', href: '/home.html' },
        { title: '相談窓口', href: '/soudan.html' },
        { title: '無料カウンセリング予約表' }
    ];

    /**
     * Method used to trace the cell or slot which user want reserve 
     * @param index 
     */

    const handleCellClick = (row: number, column: number, slot: string, id: any) => {
        setClickedCell({ row, column });
        setSlot(slot)
        setId(id)
    };

    /**
     * Method used to popup a form for collecting user information
     */

    const handleBooking = () => {
        if (clickedCell != null) {
            setOpenForm(true);
        }
        else
            alert("続行するには期間を選択してください")
    }

    /**
     * Method used for cancel the slot selected
     */

    const handleCancelling = () => {
        setClickedCell(null);
        setSlot(null)
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    /**
     * Method used to reserve a slot
     * @param data 
     */

    const onSubmit = async (data: any) => {
        // const token = localStorage.getItem('token')
        // if(!token){
        //     navigate('/forumlogin');
        //     return;
        // }
        if (data) {
            try {
                const DataRequest = {
                    "reservation_id": id,
                    "name": data.name,
                    "furigana": data.namek,
                    "sex": data.sex === 'male' ? "M" : "F",
                    "age": data.age.slice(0, -1),
                    "job": data.profession,
                    "postalcode": data.post_code,
                    "pref": data.prefecture,
                    "town": data.city,
                    "address": data.street_address,
                    "phone": data.mobile_number,
                    "email": data.email,
                    "type_of_consultation": type,
                    "dbaction": "INSERT",
                    "mobile_reservation": isMobile ? "1" : "0",
                }

                const apiData = await apiClient.post('api/reservation/reserveUserSlot', DataRequest)
                if (apiData) {
                    setSendDataFlag(true)
                }

            } catch (error) {
                //console.error("Error sending Data : ", error)
            }
        }
    }

    /**
     * Method used for reset the details entered in the form
     */

    const handleResetForm = () => {
        reset();
    };  

    /**
     * Method to get the slot timings when loading 
     */

    const slotTimings = async () => {
        const uniqueTimes = new Set<string>();
        const req = { typeOfCounselling: type };
        const apiData = await apiClient.post("api/reservation/counselingReservationPage", req);
        const reservationMap = new Map<string, ReservationData>();

        apiData?.data?.data.forEach((item: any) => {
            const key = `${item.name}-${item.regionName}-${item.date.join('-')}`;
            if (reservationMap.has(key)) {
                reservationMap.get(key)?.slots.push({ id: item.id, timeStart: item.timeStart, reservationstatus: item.reservationstatus });
            } else {
                reservationMap.set(key, {
                    date: item.date.join('-'),
                    regionName: item.regionName,
                    name: item.name,
                    slots: [{ id: item.id, timeStart: item.timeStart, reservationstatus: item.reservationstatus }]
                });
            }
            uniqueTimes.add(item.timeStart);
        });

        setReservationData(Array.from(reservationMap.values()));
        setUniqueTimeCount(uniqueTimes.size)
        const sortedTimes = Array.from(uniqueTimes).sort();
        setUniqueTimeRanges(sortedTimes);
    };

    useEffect(() => {
        slotTimings();
    }, [uniqueTimeCount])

    return (
        <Grid>
            <Heading title='無料カウンセリング予約表' />
            <Breadcrumb items={breadcrumbItems} />
            {!SendDataFlag &&
                <Grid container className='container'>
                    <Grid item className='table' xs={12} pb={1}>
                        <Grid item pt={1} pb={1}>
                            <Typography variant='h1' display="inline"> ● </Typography>
                            <Typography variant='h6' display="inline">
                                印をクリックして予約／お一人45分間
                            </Typography>
                        </Grid>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell size="small" rowSpan={2} className='table-header-cell'>予約日</TableCell>
                                        <TableCell size="small" rowSpan={2} className='table-header-cell'>地域</TableCell>
                                        <TableCell size="small" rowSpan={2} className='table-header-cell'>担当</TableCell>
                                        <TableCell size="small" colSpan={uniqueTimeCount} className='table-header-cell'>
                                            <span> 時間帯（❌は予約済 <Typography variant='h1' display="inline"> ● </Typography>は予約可）</span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {uniqueTimeRanges.map((item) => (
                                            <TableCell size="small" className='table-header-cell'>{item}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservationData.map((data, rowIndex) => (
                                        <TableRow
                                            key={rowIndex}
                                            style={{ backgroundColor: rowIndex % 2 === 0 ? '#d4e1f5' : '#ffffff' }}
                                        >
                                            <TableCell className='table-body-cell'>{data.date}</TableCell>
                                            <TableCell className='table-body-cell'>{data.regionName}</TableCell>
                                            <TableCell className='table-body-cell'>{data.name}</TableCell>
                                            {uniqueTimeRanges.map((item, columnIndex) => {
                                                const matchingSlot = data.slots.find(slot => slot.timeStart === item);
                                                if (matchingSlot) {
                                                    if (matchingSlot.reservationstatus === "UNRESERVED") {
                                                        return (
                                                            <TableCell
                                                                key={`${rowIndex}-${columnIndex}`}
                                                                className='table-body-cell'
                                                                style={{
                                                                    backgroundColor: clickedCell?.row === rowIndex && clickedCell?.column === columnIndex ? 'yellow' : '',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => matchingSlot && handleCellClick(rowIndex, columnIndex, `${data.date} ( ${matchingSlot.timeStart} )`, matchingSlot.id)}
                                                            >
                                                                <Typography
                                                                    variant='h1'
                                                                    display="inline"
                                                                >
                                                                    ●
                                                                </Typography>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                key={`${rowIndex}-${columnIndex}`}
                                                                className='table-body-cell'
                                                            >
                                                                <Typography variant='h1' display="inline">❌</Typography>
                                                            </TableCell>
                                                        );
                                                    }
                                                } else {
                                                    return (
                                                        <TableCell
                                                            key={`${rowIndex}-${columnIndex}`}
                                                            className='table-body-cell'
                                                        />
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <Grid container pt={2} pb={2} justifyContent="space-between">
                            <Grid item >
                                <Button variant="contained" color="primary" type="submit" className='ActionButton' onClick={handleBooking}>
                                    予約する
                                </Button>
                                <Button href='#' variant="contained" color="primary" className='ActionButton' onClick={handleCancelling}>
                                    キャンセル
                                </Button>
                            </Grid>
                            <Grid item alignItems="flex-start" className='ActionButton'>
                                <Link href="https://www.mental-health.org/pdf/access-map.pdf" target="_blank">
                                    地図を表示
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Displays a form to enter user date when a time slot is selected and also clicked the Reservation button */}

                    {openForm && clickedCell !== null && !submitForm &&
                        <Grid container xs={12}>
                            <form id="reservation-form" className="form" onSubmit={handleSubmit(onSubmit)}>
                                <Grid item xs={12} pb={2}>
                                    <Typography className='pinkBackground-whiteContent'>
                                        予約フォーム
                                    </Typography>
                                    <Typography variant='h1'>
                                        ★このフォームは、SSL技術（暗号化送信）で送受信されますので、個人情報の流失等がなく、安心・安全にご利用いただけます。*印は入力必須項目です。
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="name"
                                        label="お名前"
                                        required={true}
                                        control={control}
                                        id="reservation-form-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="namek"
                                        label="ふりがな"
                                        required={true}
                                        control={control}
                                        id="reservation-form-namek"
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
                                            control={<Radio color="primary" id="reservation-form-male" required />}
                                            className="radio-label"
                                            value="male"
                                            label={
                                                <Typography variant="subtitle1">
                                                    男性
                                                </Typography>
                                            }
                                            {...register("sex", { required: true })}
                                        />
                                        <FormControlLabel
                                            control={<Radio color="primary" id="reservation-form-woman" required />}
                                            className="radio-label"
                                            value="woman"
                                            label={
                                                <Typography variant="subtitle1">
                                                    女性
                                                </Typography>
                                            }
                                            {...register("sex", { required: true })}
                                        />
                                    </RadioGroup>
                                </Grid>
                                <Grid container item sm={12} xs={12} className='inputcontainer'>
                                    <Grid item sm={3} xs={12}>
                                        <Typography variant='h4'>
                                            年代
                                            <span className="span-star"> * </span>
                                        </Typography>
                                        <Select
                                            // name="age"
                                            fullWidth
                                            defaultValue="10代"
                                            value={age}
                                            {...register("age", { required: true })}
                                            onChange={(event) => setAge(event.target.value)}
                                            id="reservation-form-age"
                                        >
                                            {AgeData.map((item) => (
                                                <MenuItem key={item.name} value={item.label}>
                                                    {item.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="profession"
                                        label="ご職業"
                                        control={control}
                                        id="reservation-form-profession"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="post_code"
                                        label="郵便番号"
                                        required={true}
                                        control={control}
                                        smalltextField={true}
                                        id="reservation-form-post_code"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="prefecture"
                                        label="都道府県"
                                        required={true}
                                        control={control}
                                        smalltextField={true}
                                        id="reservation-form-prefecture"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="city"
                                        label="市町村"
                                        required={true}
                                        control={control}
                                        smalltextField={true}
                                        id="reservation-form-city"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="street_address"
                                        label="町番地"
                                        required={true}
                                        control={control}
                                        smalltextField={true}
                                        id="reservation-form-street_address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="mobile_number"
                                        label="電話番号"
                                        type="tel"
                                        required={true}
                                        control={control}
                                        caption=" (例：06-6809-1211）"
                                        id="reservation-form-mobile_number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="email"
                                        label="メールアドレス"
                                        type='email'
                                        required={true}
                                        control={control}
                                        caption="(半角英数文字で）"
                                        id="reservation-form-email"
                                    />
                                </Grid>
                                {/* <Grid container item xs={12} className='inputcontainer'> */}
                                    {/* <Grid item sm={7.2} md={3} xs={12}> */}
                                        {/* <Typography variant='h4'>
                                            面接形式
                                            <span className="span-star"> * </span>
                                        </Typography> */}
                                        {/* <Select
                                            // name="type_of_counselling"
                                            fullWidth
                                            defaultValue="Online"
                                            value={counsellingType}
                                            {...register("type_of_counselling", { required: true })}
                                            onChange={(event) => setCounsellingType(event.target.value)}
                                            id="membership-form-profession"
                                        >
                                            <MenuItem value="Online">
                                                Online
                                            </MenuItem>
                                            <MenuItem value="面接">
                                                面接
                                            </MenuItem>
                                        </Select> */}
                                    {/* </Grid> */}
                                {/* </Grid> */}
                                <Grid item xs={12}>
                                    <FormInputTextField
                                        name="date_time"
                                        label="希望日時"
                                        control={control}
                                        defaultValue={slot}
                                        disabled
                                        id="reservation-form-date_time"
                                    />
                                </Grid>
                                <Grid container className="form-save-container">
                                    <Grid item className="form-save-container-confirm-text">
                                        上記の内容でよろしければ、送信ボタンをクリックしてください。
                                    </Grid>
                                    <Grid item container>
                                        <Grid item>
                                            <Button variant="contained" id="reservation-form-save-button" className="form-save-container-submit-button" type="submit">送信</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" id="reservation-form-reset-button" className="form-save-container-reset-button" type='reset' onClick={handleResetForm}>リセット</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    }
                </Grid >
            }
            {SendDataFlag &&
                <Grid sx={{ backgroundColor: "#f9f9f9", padding: 5, fontSize: 16, border: 1, borderColor: "#9f9f9f", margin: 10 }}>
                    <Typography>
                        「無料カウンセリング相談」のお申し込みを受付ました。
                    </Typography>
                    <br />
                    <Typography>
                        無料カウンセリングのご予約、ありがとうございました。この後、当方より自動で返信メールが届きますのでご希望の内容をご確認下さい。また後日、当事務局より調整致しまして、改めてご確認のメールを送付致します。ご予約、ありがとうございました。                  </Typography>
                </Grid>
            }
        </Grid >
    )
}

export default ReservationChart
