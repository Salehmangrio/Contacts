import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Landing from "./pages/Home/LandingPage";

import ProtectedRoutes from "./components/ProtectedRoutes";

import AllContacts from "./pages/contact/AllContacts";
import ViewContact from "./pages/contact/ViewContact";
import CreateContact from "./pages/contact/CreateContact";
import EditContact from "./pages/contact/EditContact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED APP ROUTES */}
      <Route element={<ProtectedRoutes />}>

        <Route path="/contacts" >
          <Route index element={<AllContacts />} />
          <Route path="create" element={<CreateContact />} />
          <Route path="view/:id" element={<ViewContact />} />
          <Route path="edit/:id" element={<EditContact />} />
        </Route>

      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;