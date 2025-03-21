import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import MainPageController from "./controllers/MainPageController";
import HeaderView from "./views/HeaderView";
import DetailPageController from "./controllers/DetailPageController";
import axios from "axios";

axios.defaults.baseURL = 'https://api.coincap.io/v2';

// Api isteklerini yönetmek için Interceptor ekleyelim
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      console.warn("Çok fazla istek atıldı! 3 saniye bekleniyor...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <BrowserRouter>
      <HeaderView />
      <Routes>
        <Route path="/" element={<LoginPage /> } />
        <Route path="/home" element={ <MainPageController /> } />
        <Route path="/coin/:id" element={<DetailPageController />} />
        {/* Yanlış url girildiğinde anasayfaya yönlendirme */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>    
    </BrowserRouter>    
  );
}

export default App;
