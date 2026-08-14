import React, { useState } from 'react'
import {
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Paper
} from '@mui/material'
import Heading from '../../Components/Common/Heading'
import Breadcrumb from '../../Components/Common/BreadCrumb'
import { useForm } from 'react-hook-form'
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'
import CheckedCounterBox from '../../Components/Common/CheckedCounterBox';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Notice from '../../Components/Common/Notice';

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
  const [openForm, setOpenForm] = useState(false);
  const [characteristicsTrueCount, setCharacteristicsTrueCount] = useState(0);
  const [preoccupationTrueCount, setPreoccupationTrueCount] = useState(0);
  const [neuroticTrueCount, setNeuroticTrueCount] = useState(0);
  const [conclusion, setConclusion] = useState<string>("");
  const [testResult, setTestResult] = useState<string>("");
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
  });

  const [preoccupation, setPreoccupation] = useState({
    q8: false,
    q9: false,
    q10: false,
    q11: false,
    q12: false
  });

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
  });

  const { handleSubmit } = useForm();

  const breadcrumbItems = [
    { title: 'HOME', href: '/home.html' },
    { title: '自己診断チェック', href: '/check.html' },
    { title: '神経質性格度チェック' }
  ];

  const isQuestionChecked = (id: string) => {
    if (["q1", "q2", "q3", "q4", "q5", "q6", "q7"].includes(id)) {
      return characteristics[id as keyof typeof characteristics];
    } else if (["q8", "q9", "q10", "q11", "q12"].includes(id)) {
      return preoccupation[id as keyof typeof preoccupation];
    } else {
      return neurotic[id as keyof typeof neurotic];
    }
  };

  const handleToggleQuestion = (id: string) => {
    let nextVal = false;
    let nextChar = { ...characteristics };
    let nextPre = { ...preoccupation };
    let nextNeu = { ...neurotic };

    if (["q1", "q2", "q3", "q4", "q5", "q6", "q7"].includes(id)) {
      nextVal = !characteristics[id as keyof typeof characteristics];
      nextChar[id as keyof typeof characteristics] = nextVal;
      setCharacteristics(nextChar);
    } else if (["q8", "q9", "q10", "q11", "q12"].includes(id)) {
      nextVal = !preoccupation[id as keyof typeof preoccupation];
      nextPre[id as keyof typeof preoccupation] = nextVal;
      setPreoccupation(nextPre);
    } else {
      nextVal = !neurotic[id as keyof typeof neurotic];
      nextNeu[id as keyof typeof neurotic] = nextVal;
      setNeurotic(nextNeu);
    }

    const totalCount =
      Object.values(nextChar).filter(Boolean).length +
      Object.values(nextPre).filter(Boolean).length +
      Object.values(nextNeu).filter(Boolean).length;

    setCheckedCount(totalCount);
  };

  const onSubmit = async () => {
    const characteristicsTrueCount = Object.values(characteristics).filter(item => item).length;
    const preoccupationTrueCount = Object.values(preoccupation).filter(item => item).length;
    const neuroticTrueCount = Object.values(neurotic).filter(item => item).length;
    setCharacteristicsTrueCount(characteristicsTrueCount);
    setPreoccupationTrueCount(preoccupationTrueCount);
    setNeuroticTrueCount(neuroticTrueCount);

    let localConclusion = checkedCount <= 15
      ? `該当する項目は全部で ${checkedCount} 個（６割以下）で必ずしも森田神経質とは限りません。一度医師にご相談下さい。`
      : `該当する項目は全部で ${checkedCount} 個（６割以上）で典型的な森田神経質です。`;

    const summary = `【該当項目の内訳】<br/>■「症状の特徴」があてはまるのは ${characteristicsTrueCount} 個でした<br/>■「とらわれの症状」であてはまるのは ${preoccupationTrueCount} 個でした<br/>■「神経質症状の特徴」であてはまるのは ${neuroticTrueCount} 個でした`;
    setConclusion(localConclusion);
    const result = `${localConclusion} <br/> ${summary}`;
    setTestResult(result);
    setOpenForm(true);
  };

  const handleRedoClick = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: '100%',
        pb: 6,
        fontFamily: '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        '& *': {
          fontFamily: '"MPLUSRounded1c", "M PLUS Rounded 1c", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif !important',
        },
      }}
    >
      <SubHeader />
      <Heading title='神経質性格度チェック' />

      <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 2, sm: 3 }, pt: 2 }}>
        <Grid container spacing={3}>
          {/* Left Main Content Column */}
          <Grid item xs={12} md={8}>
            {/* Breadcrumb Navigation */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 0.8,
                fontSize: '0.82rem',
                color: '#666666',
                mb: 2,
              }}
            >
              <HomeRoundedIcon sx={{ fontSize: '1rem', color: '#666666' }} />
              <a href="/home.html" style={{ color: '#666666', textDecoration: 'none' }}>
                HOME
              </a>
              <span>/</span>
              <a href="/check.html" style={{ color: '#666666', textDecoration: 'none' }}>
                自己診断チェック
              </a>
              <span>/</span>
              <span style={{ color: '#666666' }}>神経質性格度チェック</span>
            </Box>

            {!submitFlag ? (
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Instruction Line */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555555',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    mb: 2.5,
                  }}
                >
                  問：現在のあなたの状態で以下に該当する項目にチェックしてください。
                </Typography>

                {/* Questions Checklist */}
                <FormGroup sx={{ mb: 2 }}>
                  {questions.map((question, index) => {
                    const isColored = index % 2 === 0;
                    return (
                      <Box
                        key={question.id}
                        onClick={() => handleToggleQuestion(question.id)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: isColored ? '#e5effd' : 'transparent',
                          borderTop: isColored ? '1px solid #7ea1d0' : '1px solid transparent',
                          borderBottom: isColored ? '1px solid #7ea1d0' : '1px solid transparent',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderRadius: 0,
                          padding: '16px 20px',
                          marginBottom: '12px',
                          cursor: 'pointer',
                        }}
                        id={`nervousness-selftest-question-${question.id}`}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: '0.88rem', sm: '0.93rem' },
                            color: '#333333',
                            lineHeight: 1.5,
                            pr: 2,
                            flexGrow: 1,
                          }}
                        >
                          {question.label}
                        </Typography>
                        <Checkbox
                          checked={isQuestionChecked(question.id)}
                          onChange={() => {}}
                          id={question.id}
                          icon={
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                border: '1px solid #767676',
                                borderRadius: '3px',
                                backgroundColor: '#ffffff',
                              }}
                            />
                          }
                          checkedIcon={
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                border: '1px solid #0066cc',
                                borderRadius: '3px',
                                backgroundColor: '#0066cc',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                lineHeight: 1,
                              }}
                            >
                              ✓
                            </Box>
                          }
                          sx={{
                            padding: 0,
                            pointerEvents: 'none',
                          }}
                        />
                      </Box>
                    );
                  })}
                </FormGroup>

                {/* Reference Note */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontSize: '0.82rem',
                    mt: 1,
                    mb: 3,
                  }}
                >
                  （北西憲二著「実践森田療法」 付記2・3の質問表より）
                </Typography>

                {/* Separate Counter Box Component */}
                <CheckedCounterBox count={checkedCount} />

                {/* Buttons Row */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    id="nervousness-selftest-form-diagnose-button"
                    sx={{
                      backgroundColor: '#0066cc',
                      px: 4,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#004c99',
                      },
                    }}
                  >
                    診断する
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleRedoClick}
                    id="nervousness-selftest-form-redo-button"
                    sx={{
                      borderColor: '#0066cc',
                      color: '#0066cc',
                      px: 4,
                      py: 1,
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#004c99',
                        backgroundColor: '#f0f7ff',
                      },
                    }}
                  >
                    やり直し
                  </Button>
                </Box>

                {/* Open Diagnosis Result Form */}
                {openForm && (
                  <Box
                    sx={{
                      mt: 3,
                      p: { xs: 2.5, sm: 3.5 },
                      backgroundColor: '#fff7df',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#cc0000', fontWeight: 'bold', mb: 1, fontSize: '1.05rem' }}>
                      {conclusion}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#444444', lineHeight: 1.8, mb: 3 }}>
                      【該当項目の内訳】
                      <br />
                      ■「症状の特徴」があてはまるのは {characteristicsTrueCount} 個でした
                      <br />
                      ■「とらわれの症状」であてはまるのは {preoccupationTrueCount} 個でした
                      <br />
                      ■「神経質症状の特徴」であてはまるのは {neuroticTrueCount} 個でした
                    </Typography>
                    <RequestDiagnosisResult
                      type={1}
                      result={testResult}
                      onFlagChange={handleSubmitFlagChange}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              /* Success Submission View */
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: '#f0f7ff',
                  border: '1px solid #b3d7ff',
                }}
              >
                <Typography variant="h6" sx={{ color: '#0066cc', fontWeight: 'bold', mb: 2 }}>
                  ご利用ありがとうございました。
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#333333' }}>
                  内容を確認の上、後日、事務局よりメールにてご連絡致しますので、よろしくお願い致します。
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666', lineHeight: 1.7 }}>
                  （注）通信キャリアにより、迷惑メール対策をされている場合、拒否される可能性があります。送信後、3日以上経過しても通知メールが届かない場合、「mentalzaidan@mental-health.org」のメールアドレスを受信するように設定して下さい。
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Right Sidebar Column (Notice Section) */}
          <Grid item xs={12} md={4}>
            <Notice />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NervousnessCheckForm;


