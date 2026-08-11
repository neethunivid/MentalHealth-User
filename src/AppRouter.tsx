import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import { Grid } from "@mui/material";

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import './Components/Common/commonstyle.scss'
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Form1Ui from "./Components/Grant Permission/Kenkyu1/Form1Ui";
import Form2Ui from "./Components/Grant Permission/Kenkyu2/Form2Ui";
import Form3Ui from "./Components/Grant Permission/Kenkyu3/Form3Ui";
import PreviewPageUi from "./Components/Grant Permission/Kenkyu Preview/PreviewPageUi";
import Thank_page from "./Components/Grant Permission/ThanksPage";
import Layout from "./Components/Layout";
import InquiryForm from "./Pages/InquiryForm/InquiryForm";
import Login from "./Pages/Login/Login";
import MagazineSubscription from "./Pages/MagazineSubscription/MagazineSubscription";
import MembershipForm from "./Pages/MembershipForm/MembershipForm";
import SocialPhobiaCheckForm from "./Pages/SocialPhobiaCheckForm/SocialPhobiaCheckForm";
import NervousnessCheckForm from "./Pages/NervousnessCheckForm/NervousnessCheckForm";
import PanicDisorderCheckForm from "./Pages/PanicDisorderCheckForm/PanicDisorderCheckForm";
import ObsessiveCompulsiveDisorderCheckForm from "./Pages/ObsessiveCompulsiveDisorderCheckForm/ObsessiveCompulsiveDisorderCheckForm";
import DepressionCheckForm from "./Pages/DepressionCheckForm/DepressionCheckForm";
import AnxietyCheckForm from "./Pages/AnxietyCheckForm/AnxietyCheckForm";
import ZoomMeeting from "./Pages/ConsultationCounter/ZoomMeeting";
import ReservationChart from "./Pages/ConsultationCounter/ReservationChart";
import MoritaTherapyBooks from "./Pages/SupportingActivities/MoritaTherapyBooks";
import OtherBooks from "./Pages/SupportingActivities/OtherBooks";
import RemarkList from "./Pages/Remarks/RemarkList";
import RemarkTreeList from "./Pages/Remarks/RemarkTreeList";
import RemarkSuccess from "./Pages/Remarks/RemarkSuccess";
import RedirectToHome from "./Pages/HomePage/RedirecttoHome";

const baseTheme = createTheme({
  typography: {
    fontFamily: ["Yu Gothic"].join(","),
    fontWeightRegular: 400,
    fontSize: 12,
  },
});

// Make the theme responsive
const theme2 = responsiveFontSizes(baseTheme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2, // Adjust the scaling factor as needed
});

const AppRouter: React.FC = () => {
  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <BrowserRouter>
          <Layout>
            <ThemeProvider theme={baseTheme}>
              <Routes>
                <Route path="/" element={<RedirectToHome />} />
                <Route path="/kenkyu1" element={<Form1Ui />} />
                <Route path="/kenkyu2" element={<Form2Ui />} />
                <Route path="/kenkyu3" element={<Form3Ui />} />
                <Route path="/kenkyuprev" element={<PreviewPageUi />} />
                <Route path="/kenkyuThanks" element={<Thank_page />} />
                <Route path="/inquiry" element={<InquiryForm />} />
                <Route path="/forumlogin" element={<Login />} />
                <Route path="/mailmagazine" element={<MagazineSubscription />} />
                <Route path="/forumkaisoku" element={<MembershipForm />} />
                <Route path="/check1" element={<NervousnessCheckForm />} />
                <Route path="/check2" element={<SocialPhobiaCheckForm />} />
                <Route path="/check3" element={<PanicDisorderCheckForm />} />
                <Route path="/check4" element={<ObsessiveCompulsiveDisorderCheckForm />} />
                <Route path="/check5" element={<DepressionCheckForm />} />
                <Route path="/check6" element={<AnxietyCheckForm />} />
                <Route path="/online_consultation" element={<ZoomMeeting />} />
                <Route path="/reservation_chart" element={<ReservationChart />} />
                <Route path="/morita_therapy_reference_books" element={<MoritaTherapyBooks />} />
                <Route path="/other_reference_books" element={<OtherBooks />} />
                <Route path="/remarklist" element={<RemarkList />} />
                <Route path="/remarktree_reply" element={<RemarkTreeList />} />
                <Route path="/remarksuccess" element={<RemarkSuccess />} />
             
              </Routes>
            </ThemeProvider>
          </Layout>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
};

export default AppRouter;
