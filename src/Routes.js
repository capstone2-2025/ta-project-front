import React from 'react';
import { Route, Routes } from "react-router-dom";
import LoginCallback from "./auth/LoginCallback";
import Header from "./Layout/Header";
import AlignPage from "./Pages/AlignPage";
import ContactPage from './Pages/ContactPage';
import DetailPage from "./Pages/DetailPage";
import IntroPage from "./Pages/IntroPage";
import MakePage from "./Pages/MakePage";
import ReceivedDocuments from "./Pages/ReceiveListPage"; // 요청받은 문서 리스트 페이지
import RequestedDocuments from "./Pages/RequestListPage"; // 요청한 문서 리스트 페이지
import RequestPage from "./Pages/RequestPage";
import SignatureCompletePage from "./Pages/SignatureCompletePage";
import SignaturePage from './Pages/SignaturePage';
import TaskSetupPage from "./Pages/TaskSetupPage";


function MyRoutes() {
    return (
        <Routes>
            <Route element={<Header />}>
                <Route path="/" index="index" element={<IntroPage />} />
                <Route path="/tasksetup" element={<TaskSetupPage />} />
                <Route path="/detail/:documentId" element={<DetailPage />} />
                <Route path="/login-ing" element={<LoginCallback />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/align" element={<AlignPage />} />
                <Route path="/request-document" element={<RequestedDocuments />} /> {/* 요청한 문서 리스트 */}
                <Route path="/receive-document" element={<ReceivedDocuments />} /> {/* 요청받은 문서 리스트 */}
                <Route path="/sign" element={<SignaturePage />} />
                <Route path="/sign-complete" element={<SignatureCompletePage/>} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/make" element={<MakePage />} />
                
                
            </Route>
            
        </Routes>
    );
}

export default MyRoutes;
