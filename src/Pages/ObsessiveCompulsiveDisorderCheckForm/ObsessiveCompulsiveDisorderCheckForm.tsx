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
    label: "Q1. 特定の思考や衝動、またはイメージがふいに頭に現れ、そのことに強い不安や苦痛を感じる。"
  },
  {
    id: "q2",
    label: "Q2. 1のような状態を、無視や抑えこもうとしたり、他の思考や行動（例：強迫行為を行う）をして気持ちを落ち着かせようとすることがある。"
  },
  {
    id: "q3",
    label: "Q3. くり返しの行動（手を洗う、順番に並べる、確認するなど）または心の中の行為（祈る、数える、声を出さずに言葉を繰り返すなど）の特定の決まりに従って繰り返し行動するように駆り立てられるように感じている。"
  },
  {
    id: "q4",
    label: "Q4. その行動または心の中の行為は、不安や苦痛を避けるか緩和すること、または何か恐ろしい出来事や状況を避けることを目的としている。しかし、その行動や心の中の行為は、それによって中和したり予防したりしようとしているが、現実的にはつながりません。"
  },
  {
    id: "q5",
    label: "Q5. 強迫観念や強迫行為に1日1時間以上かける。"
  },
  {
    id: "q6",
    label: "Q6. 強迫観念や強迫行為によって、肉体的・精神的な苦痛が実際にある。または、学業や仕事などの社会生活に重要な支障がある。"
  }
];

/**
 * Component used to display test questions which allows users to select their problems regarding OCD and submit
 */
const ObsessiveCompulsiveDisorderCheckForm = () => {
  const [checkedCount, setCheckedCount] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [obsessionsTrueCount, setObsessionsTrueCount] = useState(0);
  const [compulsionsTrueCount, setCompulsionsTrueCount] = useState(0);
  const [testResult, setTestResult] = useState<string>("");
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);

  const handleSubmitFlagChange = (value: boolean) => {
    setSubmitFlag(value);
  };

  const [obsessions, setObsessions] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
    q4: false
  });

  const [compulsions, setCompulsions] = useState<Record<string, boolean>>({
    q5: false,
    q6: false
  });

  const { handleSubmit } = useForm();

  const isQuestionChecked = (id: string) => {
    if (["q1", "q2", "q3", "q4"].includes(id)) {
      return !!obsessions[id];
    } else {
      return !!compulsions[id];
    }
  };

  const handleToggleQuestion = (id: string) => {
    let nextObs = { ...obsessions };
    let nextComp = { ...compulsions };

    if (["q1", "q2", "q3", "q4"].includes(id)) {
      nextObs[id] = !obsessions[id];
      setObsessions(nextObs);
    } else {
      nextComp[id] = !compulsions[id];
      setCompulsions(nextComp);
    }

    const totalCount =
      Object.values(nextObs).filter(Boolean).length +
      Object.values(nextComp).filter(Boolean).length;

    setCheckedCount(totalCount);
  };

  const onSubmit = async () => {
    const obsessionsCount = Object.values(obsessions).filter(Boolean).length;
    const compulsionsCount = Object.values(compulsions).filter(Boolean).length;
    setObsessionsTrueCount(obsessionsCount);
    setCompulsionsTrueCount(compulsionsCount);

    const result = `強迫観念の該当個数が ${obsessionsCount} 個あります。 <br/> 強迫行為の該当個数が ${compulsionsCount} 個あります。` + (obsessionsCount ? `あなたは強迫観念と強迫行為があり、強迫性障害と診断されます。` : ``);
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
      <Heading title='強迫症チェック' />

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
              <span style={{ color: '#666666' }}>強迫症チェック</span>
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
                        id={`obsessivecompulsivedisorder-selftest-question-${question.id}`}
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
                    id="obsessivecompulsivedisorder-selftest-form-diagnose-button"
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
                    id="obsessivecompulsivedisorder-selftest-form-redo-button"
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
                          強迫観念の該当個数が {obsessionsTrueCount} 個あります。
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <Typography variant="body1" sx={{ color: '#333333' }}>
                          強迫行為の該当個数が {compulsionsTrueCount} 個あります。
                        </Typography>
                      </ListItem>
                    </List>
                    {obsessionsTrueCount > 0 && (
                      <Typography variant="body1" sx={{ color: '#cc0000', fontWeight: 'bold', mb: 2 }}>
                        あなたは強迫観念と強迫行為があり、強迫性障害と診断されます。
                      </Typography>
                    )}
                    <RequestDiagnosisResult
                      type={4}
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

export default ObsessiveCompulsiveDisorderCheckForm;
