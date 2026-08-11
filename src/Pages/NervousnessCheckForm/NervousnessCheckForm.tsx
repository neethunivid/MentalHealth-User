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
import SquareIcon from '@mui/icons-material/Square';
import SubHeader from '../../Components/Common/subHeader'

const questions = [
  {
    id: "q1",
    label: "Q1. 私は今の自分では環境に適応できない（仕事や家庭や学校でうまくやってゆけない）のではないかと不安です"
  },
  {
    id: "q2",
    label: "Q2. 私は今の悩みを、非常につらく感じます"
  },
  {
    id: "q3",
    label: "Q3. 私の今の悩みは、自分の性格と関係があると思います"
  },
  {
    id: "q4",
    label: "Q4. 私はつらい場面（状態）がまたおこるのではないかといつも不安です"
  },
  {
    id: "q5",
    label: "Q5. 私の悩みは、ほかの人にはない特別なものだと思います"
  },
  {
    id: "q6",
    label: "Q6. 私はなんとか私の悩みを取りのぞきたいと思っています"
  },
  {
    id: "q7",
    label: "Q7. 現在、私は自分の悩みしか考えることができません"
  },
  {
    id: "q8",
    label: "Q8. 自分の悩みに注意をむければむけるほど、悩みは強くなってしまいます"
  },
  {
    id: "q9",
    label: "Q9. 私はこの悩みさえなかったら、自分の望むことができると考えています"
  },
  {
    id: "q10",
    label: "Q10. 私は今の自分をまったくだめな人間と思っています"
  },
  {
    id: "q11",
    label: "Q11. 私はこうありたいという自分の欲望のため、くるしんでいます"
  },
  {
    id: "q12",
    label: "Q12. 私は自分の悩みを取りのぞくためにいつも努力をしています"
  },
  {
    id: "q13",
    label: "Q13. 私は内気で、ちょっとしたことでも気にする（苦にする）ほうである"
  },
  {
    id: "q14",
    label: "Q14. 私は物事にこだわってしまい、なかなかそこから抜けだせません"
  },
  {
    id: "q15",
    label: "Q15. 私はほかの人のいうことが気になったり、傷つきやすいと思います"
  },
  {
    id: "q16",
    label: "Q16. 私は自分の体や体の調子が気になる性分です"
  },
  {
    id: "q17",
    label: "Q17. 私は引っこみ思案で新しいことにとりかかるのが苦手です"
  },
  {
    id: "q18",
    label: "Q18. 私は物事をきちんとしないと、気になってしかたがありません"
  },
  {
    id: "q19",
    label: "Q19. 私は負けずぎらいです"
  },
  {
    id: "q20",
    label: "Q20. 私は自尊心（プライド）が強いほうです"
  },
  {
    id: "q21",
    label: "Q21. 私はまったく不安のない状態を望んでいます"
  },
  {
    id: "q22",
    label: "Q22. 私は自分の気持ちや周囲の人たちを思いどおりに動かしたいほうです"
  },
  {
    id: "q23",
    label: "Q23. 私は白か黒か、ゼロか100か、どちらかに決めないと気がすまないほうです"
  },
  {
    id: "q24",
    label: "Q24. 私は内弁慶（外でおとなしく、内でわがまま）です"
  },
  {
    id: "q25",
    label: "Q25. 私は理屈っぽく、頭でっかちのほうです"
  }
];

/**
 * Component used to display test questions which allows users to select their problems regarding Nervousness and submit
 */

const NervousnessCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false)
  const [characteristicsTrueCount, setCharacteristicsTrueCount] = useState(0)
  const [preoccupationTrueCount, setPreoccupationTrueCount] = useState(0)
  const [neuroticTrueCount, setNeuroticTrueCount] = useState(0)
  const [conclusion, setConclusion] = useState<string>("")
  const [testResult, setTestResult] = useState<string>("")
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const [characteristics, setCharacteristics] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false
  })

  const [preoccupation, setPreoccupation] = useState({
    q8: false,
    q9: false,
    q10: false,
    q11: false,
    q12: false
  })

  const [neurotic, setNeurotic] = useState({
    q13: false,
    q14: false,
    q15: false,
    q16: false,
    q17: false,
    q18: false,
    q19: false,
    q20: false,
    q21: false,
    q22: false,
    q23: false,
    q24: false,
    q25: false,
  })

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
    { title: '神経質性格度チェック' }
  ];

  /**
   * Method used to take the total count of selected items
   * @param event 
   */

  const handleCheckedCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedCount(prevCount => prevCount + (checked ? 1 : -1));

    if (["q1", "q2", "q3", "q4", "q5", "q6", "q7"].includes(id)) {
      setCharacteristics(prevState => ({
        ...prevState,
        [id]: checked
      }));
    } else if (["q8", "q9", "q10", "q11", "q12"].includes(id)) {
      setPreoccupation(prevState => ({
        ...prevState,
        [id]: checked
      }));
    } else {
      setNeurotic(prevState => ({
        ...prevState,
        [id]: checked
      }));
    }
  };

  /**
   * Method used to submit the answers
   * @param data 
   */

  const onSubmit = async (data: any) => {
    const characteristicsTrueCount = Object.values(characteristics).filter(item => item).length;
    const preoccupationTrueCount = Object.values(preoccupation).filter(item => item).length;
    const neuroticTrueCount = Object.values(neurotic).filter(item => item).length;
    setCharacteristicsTrueCount(characteristicsTrueCount)
    setPreoccupationTrueCount(preoccupationTrueCount)
    setNeuroticTrueCount(neuroticTrueCount)

    let localConclusion = checkedCount <= 15
      ? `該当する項目は全部で ${checkedCount} 個（６割以下）で必ずしも森田神経質とは限りません。一度医師にご相談下さい。`
      : `該当する項目は全部で ${checkedCount} 個（６割以上）で典型的な森田神経質です。`;

    const summary =`該当項目の内訳】<br/>■「症状の特徴」があてはまるのは ${characteristicsTrueCount} 個でした<br/>■「とらわれの症状」であてはまるのは ${preoccupationTrueCount} 個でした<br/>■「神経質症状の特徴」であてはまるのは ${neuroticTrueCount} 個でした`
    setConclusion(localConclusion);
    const result = `${localConclusion} <br/> ${summary}`
    console.log(result);
    setTestResult(result);
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
      <Heading title='神経質性格度チェック' />
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
                  {questions.map((question, index) => (
                    <FormControlLabel
                      key={question.id}
                      control={
                        <Checkbox
                          onChange={handleCheckedCount}
                          id={question.id}
                        />
                      }
                      label={
                        <Typography variant='h3'>
                          {question.label}
                        </Typography>
                      }
                      className={index % 2 === 0 ? "whiteBackground-questions" : "blueBackground-questions"}
                      id={`nervousness-selftest-question-${question.id}`}
                    />
                  ))}
                </FormGroup>
                <Typography variant='h2'>
                  北西憲二著「実践森田療法」 付記2・3の質問表より
                </Typography>
                <Typography className='pinkBackground-blueContent'>
                  該当する項目は {checkedCount} 個
                </Typography>
                <Grid item container alignItems='flex-start' justifyContent='flex-start' spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit" className="selftest-form-button" id="nervousness-selftest-form-diagnose-button">診断する</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleRedoClick} className="selftest-form-button" id="nervousness-selftest-form-redo-button">やり直し</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} alignItems='center' justifyContent='center'>
              {openForm &&
                <Grid>
                  <Typography variant='body1'>{conclusion}</Typography>
                  <Typography variant='caption'>
                    <br />【該当項目の内訳】<br />
                    ■  症状の特徴」があてはまるのは {characteristicsTrueCount} 個でした<br />
                    ■「とらわれの症状」であてはまるのは {preoccupationTrueCount} 個でした<br />
                    ■「神経質症状の特徴」であてはまるのは {neuroticTrueCount} 個でした
                  </Typography>
                  <RequestDiagnosisResult type={1} result={testResult} onFlagChange={handleSubmitFlagChange} />
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

export default NervousnessCheckForm
