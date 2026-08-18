import React, { useState } from 'react'
import {
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Paper,
  List,
  ListItem
} from '@mui/material'
import Heading from '../../Components/Common/Heading'
import { useForm } from 'react-hook-form'
import RequestDiagnosisResult from '../../Components/Common/RequestDiagnosisResult'
import SubHeader from '../../Components/Common/subHeader'
import CheckedCounterBox from '../../Components/Common/CheckedCounterBox'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Notice from '../../Components/Common/Notice'

const questions = [
  {
    id: "q1",
    label: "Q1. 抑うつ気分"
  },
  {
    id: "q2",
    label: "Q2. 興味と喜びの喪失"
  },
  {
    id: "q3",
    label: "Q3. 集中力と注意力の減退がある"
  },
  {
    id: "q4",
    label: "Q4. 自己評価と自信の低下"
  },
  {
    id: "q5",
    label: "Q5. 罪責感と無価値観（軽症エピソードでも）"
  },
  {
    id: "q6",
    label: "Q6. 将来に対する希望のない悲観的な見方"
  },
  {
    id: "q7",
    label: "Q7. 自傷あるいは自殺の観念や行為"
  },
  {
    id: "q8",
    label: "Q8. 睡眠障害"
  },
  {
    id: "q9",
    label: "Q9. 食欲不振"
  }
];

/**
 * Component used to display test questions which allows users to select their problems regarding Depression and submit
 */
const DepressionCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [depression1TrueCount, setDepression1TrueCount] = useState(0);
  const [depression2TrueCount, setDepression2TrueCount] = useState(0);
  const [conclusion, setConclusion] = useState<string>("");
  const [testResult, setTestResult] = useState<string>("");
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const [depression1, setDepression1] = useState<Record<string, boolean>>({
    q1: false,
    q2: false
  });

  const [depression2, setDepression2] = useState<Record<string, boolean>>({
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
    q8: false,
    q9: false
  });

  const { handleSubmit } = useForm();

  const isQuestionChecked = (id: string) => {
    if (["q1", "q2"].includes(id)) {
      return !!depression1[id];
    } else {
      return !!depression2[id];
    }
  };

  const handleToggleQuestion = (id: string) => {
    let nextDep1 = { ...depression1 };
    let nextDep2 = { ...depression2 };

    if (["q1", "q2"].includes(id)) {
      nextDep1[id] = !depression1[id];
      setDepression1(nextDep1);
    } else {
      nextDep2[id] = !depression2[id];
      setDepression2(nextDep2);
    }

    const totalCount =
      Object.values(nextDep1).filter(Boolean).length +
      Object.values(nextDep2).filter(Boolean).length;

    setCheckedCount(totalCount);
  };

  const onSubmit = async () => {
    const depression1Count = Object.values(depression1).filter(Boolean).length;
    const depression2Count = Object.values(depression2).filter(Boolean).length;
    setDepression1TrueCount(depression1Count);
    setDepression2TrueCount(depression2Count);

    let localConclusion = "";
    if (depression1Count === 0)
      localConclusion = "Q1～Q2のいずれも該当がなく、あなたはうつ病と診断されません。";
    else if ((depression1Count === 1 && depression2Count <= 3) || (depression1Count === 2 && depression2Count <= 2))
      localConclusion = "Q1～Q2のいずれかとQ3～Q9のうち、うつ病の該当個数が5個以下ですので、あなたはうつ病ではありません。";
    else if ((depression1Count === 1 && depression2Count >= 4) || (depression1Count === 2 && depression2Count >= 3))
      localConclusion = "Q1～Q2のいずれかとQ3～Q9のうち、うつ病の該当個数が5個以上ありますので、あなたはうつ病と診断されます。";

    setConclusion(localConclusion);
    const result = `Q1～Q2のうち、うつ病の該当個数は ${depression1Count} 個あります。<br/> Q3-Q9のうち、うつ病に該当する項目の数は ${depression2Count} です。<br/> ${localConclusion} <br/> ＜大うつ病のエピソード＞ <br/> 患者は通常、抑うつ気分、興味と喜びの喪失、および活力の減退による、易疲労感の増大や活動性の減少に悩まされる。わずかに頑張ったあとでも、ひどく疲労を感じることがふつうである。普通、少なくとも2週間の持続が必要とされるが、もし症状がきわめて重症で急激な発症であれば、より短い期間であってもかまわない。`;
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
      <Heading title='うつ病チェック' />

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
              <span style={{ color: '#666666' }}>うつ病チェック</span>
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
                  現在のあなたの状態について、以下のあてはまる項目にチェックをつけてください。
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
                        id={`depression-selftest-question-${question.id}`}
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
                  米国精神医学会(APA)の精神疾患の診断分類、改訂第5版（DSM-5）より
                </Typography>

                {/* Separate Counter Box Component */}
                <CheckedCounterBox count={checkedCount} />

                {/* Buttons Row */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    id="depression-selftest-form-diagnose-button"
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
                    id="depression-selftest-form-redo-button"
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
                    <List disablePadding sx={{ mb: 2, id: 'selftest-basic-details' }}>
                      <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <Typography variant="body1" sx={{ color: '#333333' }}>
                          Q1～Q2のうち、うつ病の該当個数は {depression1TrueCount} 個あります。
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <Typography variant="body1" sx={{ color: '#333333' }}>
                          Q3-Q9のうち、うつ病に該当する項目の数は {depression2TrueCount} です。
                        </Typography>
                      </ListItem>
                    </List>
                    <Typography variant="body1" sx={{ color: '#cc0000', fontWeight: 'bold', mb: 2 }}>
                      {conclusion}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666', display: 'block', lineHeight: 1.6, mb: 2 }}>
                      ＜大うつ病のエピソード＞<br />
                      患者は通常、抑うつ気分、興味と喜びの喪失、および活力の減退による、易疲労感の増大や活動性の減少に悩まされる。わずかに頑張ったあとでも、ひどく疲労を感じることがふつうである。普通、少なくとも2週間の持続が必要とされるが、もし症状がきわめて重症で急激な発症であれば、より短い期間であってもかまわない。
                    </Typography>
                    <RequestDiagnosisResult
                      type={5}
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

export default DepressionCheckForm;
