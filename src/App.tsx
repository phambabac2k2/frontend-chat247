import { BrowserRouter, Route, Routes } from "react-router";
import { ChatAppPage, SignInPage, SignUpPage } from "./pages";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useThemeStore } from "./stores/useThemStore";
import { useEffect } from "react";

function App() {
  const { isDarkMode, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
