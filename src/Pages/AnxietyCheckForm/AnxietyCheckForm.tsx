import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Heading from '../../Components/Common/Heading'
import Breadcrumb from '../../Components/Common/BreadCrumb'
import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'

/**
 * Component used to display test questions which allows users to select their problems regarding Anxiety and submit
 */

const AnxietyCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false)
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<string>("")
  const [q1Status, setQ1Status] = useState<boolean>(false)


  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  // const [anxiety, setAnxiety] = React.useState({
  //   q1: false,
  //   q2: false,
  //   q4: false,
  // });

  const [anxiety, setAnxiety] = React.useState({
    q3a: false,
    q3b: false,
    q3c: false,
    q3d: false,
    q3e: false,
    q3f: false,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const breadcrumbItems = [
    { title: 'HOME', href: '/home.html' },
    { title: '自己診断チェック', href: '/check.html' },
    { title: '全般性不安症（不安神経症）チェック' }
  ];

  /**
   * Method used to take the total count of selected items
   * @param event 
   */

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedCount(prevCount => prevCount + (checked ? 1 : -1));

    if (["q3a", "q3b", "q3c", "q3d", "q3e", "q3f"].includes(id)) {
      setAnxiety((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
    }

    if (id == "q1" && checked) {
      setQ1Status(true)
    }
  };

  /**
   * Method used to submit the answers
   * @param data 
   */

  const onSubmit = async (data: any) => {
    const anxietyTrueCount = Object.values(anxiety).filter(item => item).length;

    if (q1Status === false)
      setConclusion(`チェック項目数は ${checkedCount} 個ですが、全般性不安症(不安神経症)ではないと 思われます。`)
    else if (q1Status === true && anxietyTrueCount >= 3)
      setConclusion(`チェック項目数は ${checkedCount} 個で、全般性不安症(不安神経症)の可能性があり ます。`)
    else if (q1Status === true && anxietyTrueCount < 3)
      setConclusion(`チェック項目数は ${checkedCount} 個で、全般性不安症(不安神経症)の可能性は低い と思われます。`)
    
    setOpenForm(true)
  }

  /**
   * Method used to clear the entire selection of items
   */

  const handleRedoClick = () => {
    window.location.reload();
  };

  return (
    <Grid>
      <SubHeader/>
      <Heading title='全般性不安症（不安神経症）チェック' />
      <Breadcrumb items={breadcrumbItems} />
      <Grid container className='container'>
        {!submitFlag ? (
          <>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              <form className="test" onSubmit={handleSubmit(onSubmit)}>
                <Typography className='blueBackground-blackContent'>
                  現在のあなたの状態について、以下のあてはまる項目にチェックをつけてください。
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q1" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q1. （仕事や学業など）多数の出来事または活動についての過剰な不安と心配（予期憂慮）が、起こる日の方が起こらない日より多い状態が、少なくても6か月間にわたる。
                      </Typography>
                    }
                    className="whiteBackground-questions"
                    id="anxiety-selftest-question-q1"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q2" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q2. その心配を抑制することが難しいと感じている。
                      </Typography>
                    }
                    className="blueBackground-questions"
                    id="anxiety-selftest-question-q2"
                  />
                  <FormControlLabel
                    control={
                      <></>
                    }
                    label={
                      <Typography variant="h3" >
                        Q3. その不安および心配は、以下の6つの症状のうち3つ（またはそれ以上）を伴っている（過去6か月間、少なくとも数個の症状が、起こる日のほうが起こらない日より多い）。<br />（注：子どもの場合は1項目だけが必要）
                      </Typography>
                    }
                    className="whiteBackground-question-with-subquestions"
                    id="anxiety-selftest-question-q3"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3a" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-1. 落ち着きのなさ、緊張感、または神経の高ぶり
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3a"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3b" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-2. 疲労しやすいこと
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3b"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3c" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-3. 集中困難、または心が空白になること
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3c"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3d" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-4. 易怒性（怒りっぽい）
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3d"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3e" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-5. 筋肉の緊張
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3e"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q3f" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q3-6. 睡眠障害（入眠または睡眠維持の困難、または、落ち着かず熟眠感のない睡眠）
                      </Typography>
                    }
                    className="whiteBackground-subquestion"
                    id="anxiety-selftest-question-q3f"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleCheckedCount} id="q4" />
                    }
                    label={
                      <Typography variant="h3" >
                        Q4. 不安、心配、または身体症状は、社会的、職業的、またはその他重要な機能領域に重大な苦痛または障害を起こしている。
                      </Typography>
                    }
                    className="blueBackground-questions"
                    id="anxiety-selftest-question-q4"
                  />
                </FormGroup>
                <Typography className='pinkBackground-blueContent'>
                  該当する項目は {checkedCount} 個
                </Typography>
                <Grid item container alignItems='flex-start' justifyContent='flex-start' spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="anxiety-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="anxiety-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Grid>
                    <Typography variant='body1'>{conclusion}</Typography>
                  </Grid>
                  <RequestDiagnosisResult type={6} result={conclusion} onFlagChange={handleSubmitFlagChange} />
                </Grid>
              }
            </Grid>
          </>
        ) : (
          <Grid xs={10} md={11} className='success-page'>
            <Typography>
              ご利用ありがとうございました。内容を確認の上、後日、事務局より
              <Typography>
                メールにてご連絡致しますので、よろしくお願い致します。
              </Typography>
            </Typography>
            <Typography>
              <br />（注）<br />
              通信キャリアにより、迷惑メール対策をされている場合、拒否される 可能性があります。送信後、3日以上経過しても通知メールが届かない場合、 「mentalzaidan@mental-health.org」のメールアドレスを受信するように設定し て下さい。
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default AnxietyCheckForm
