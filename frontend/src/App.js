import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EventDisplay from "./pages/EventDisplay";
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
import ChatWindow from "./pages/chat/ChatWindow";
import AddChats from "./pages/chat/addChats";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Logout from "./pages/Logout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/chat"
            element={
              <ProtectedRoute roles={['Organizer', 'Attendee']}>
                <ChatWindow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-chat"
            element={
              <ProtectedRoute roles={['Organizer']}>
                <AddChats />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event-display" element={<EventDisplay />} />
          <Route path="/signup-attendee" element={<AttendeeRegistration />} />
          <Route path="/signup-organizer" element={<OrganizerRegistration />} />
          <Route path="/registered-organizer/:id" element={<RegistrationSuccessOrganizer />} />
          <Route path="/registered-attendee/:email" element={<RegistrationSuccessAttendee />} />
          <Route path="/email-verification/:email" element={<EmailConfirmation />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login-attendee" element={<LoginFormAttendee />} />
          <Route path="/login-organizer" element={<LoginFormOrganizer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirmation-sent/:email" element={<ConfirmationEmailSent />} />
          <Route path="otp-sent/:email" element={<OTPVerification />} />
          <Route path="/auth/:email/verify/:token" element={<EmailVerifiedPage />} />
          <Route path="/reset-password/:email" element={<PasswordResetForm />} />
          <Route path="/password-recoverd" element={<PasswordRecovered />} />
          <Route path="/recover-id" element={<RecoverOrganizerId />} />
          <Route path="/organizer-recovered" element={<OrganizerRecovered />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
