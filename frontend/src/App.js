import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import EventDisplay from "./pages/EventDisplay";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import ResetPassword from "./pages/ResetPassword";
import EmailConfirmation from "./Components/common/EmailConfirmation";
import LoginFormAttendee from "./pages/LoginFormAttendee";
import LoginFormOrganizer from "./pages/LoginFormOrganizer";
import OrganizerRegistration from "./pages/OrganizerRegistration";
import AttendeeRegistration from "./pages/AttendeeRegistration";
import RegistrationSuccessOrganizer from "./pages/RegistrationSuccessOrganizer";
import RegistrationSuccessAttendee from "./pages/RegistrationSuccessAttendee";
import CreateEvent from "./pages/CreateEvent";
import ConfirmationEmailSent from "./Components/common/ConfirmationEmailSent";
import EmailVerifiedPage from "./Components/common/EmailVerifiedPage";
import Dashboard from "./pages/Dashboard";
import OTPVerification from "./Components/common/OTPVerification";
import PasswordResetForm from "./pages/PasswordResetForm";
import PasswordRecovered from "./Components/common/PasswordRecovered";
import RecoverOrganizerId from "./pages/RecoverOrganizerId";
import OrganizerRecovered from "./Components/common/OrganizerRecovered";
function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("jsonwebtoken") ? true : false;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/attendee-dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/event-display" element={<EventDisplay/>}></Route>
          <Route path="/attendee-dashboard" element={<AttendeeDashboard/>}></Route>
          <Route
            path="/signup-attendee"
            element={<AttendeeRegistration />}
          ></Route>
          <Route path="/signup-organizer" element={<OrganizerRegistration />} />
          <Route
            path="/registered-organizer/:id"
            element={<RegistrationSuccessOrganizer />}
          />
          <Route
            path="/registered-attendee/:email"
            element={<RegistrationSuccessAttendee />}
          />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route
            path="/email-verification/:email"
            element={<EmailConfirmation />}
          ></Route>
          <Route path="/login-attendee" element={<LoginFormAttendee />} />
          <Route path="/login-organizer" element={<LoginFormOrganizer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/confirmation-sent/:email"
            element={<ConfirmationEmailSent />}
          />
          <Route path="otp-sent/:email" element={<OTPVerification />} />
          <Route
            path="/auth/:email/verify/:token"
            element={<EmailVerifiedPage />}
          />
          <Route
            path="/reset-password/:email"
            element={<PasswordResetForm />}
          />
          <Route path="/password-recoverd" element={<PasswordRecovered />} />
          <Route path="/recover-id" element={<RecoverOrganizerId />} />
          <Route path="/organizer-recovered" element={<OrganizerRecovered />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
