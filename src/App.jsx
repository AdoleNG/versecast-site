import { BrowserRouter, Routes, Route } from "react-router-dom";

import AcceptInvite from "./AcceptInvite";
import InvitationSuccess from "./InvitationSuccess";
import Login from "./Login";
import Signup from "./Signup";
import AuthCallback from "./AuthCallback";
import CreateChurch from "./CreateChurch";

// NEW DASHBOARD FILES
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import StartSession from "./dashboard/StartSession";
import EndSession from "./dashboard/EndSession";
import SessionHistory from "./dashboard/SessionHistory";
import InviteOperator from "./operators/InviteOperator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Login />} />

        {/* Operator onboarding */}
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />
        <Route path="/invite-success" element={<InvitationSuccess />} />
        <Route path="/create-church" element={<CreateChurch />} />

        {/* OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DASHBOARD (NEW STRUCTURE) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          {/* Sessions */}
          <Route path="sessions/start-session" element={<StartSession />} />
          <Route path="sessions/end-session" element={<EndSession />} />
          <Route path="sessions/history" element={<SessionHistory />} />

          {/* Operators */}
          <Route path="operators/invite" element={<InviteOperator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
