import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import MoviePage from "./pages/MoviePage/MoviePage";
import FavouritePage from "./pages/FavouritePage/FavouritePage";
import SeriePage from "./pages/SeriePage/SeriePage";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieForm from "./components/MovieForm/MovieForm";
import SerieDetails from "./pages/SerieDetails/SerieDetails";
import SerieForm from "./components/SerieForm/SerieForm";
import SelectFormPage from "./pages/SelectFormPage/SelectFormPage";

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <div className="App">
      <Navbar />
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar className="w-1/4" />}
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/series" element={<SeriePage />} />
            <Route path="/favourites" element={<FavouritePage />} />
            <Route path="/movieDetails/:movieId" element={<MovieDetails />} />
            <Route path="/serieDetails/:serieId" element={<SerieDetails />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/admin/createMovie" element={<MovieForm />} />
            <Route path="/admin/editMovie/:movieId" element={<MovieForm />} />
            <Route path="/admin/createSerie" element={<SerieForm />} />
            <Route path="/admin/editSerie/:serieId" element={<SerieForm />} />
            <Route path="/adminPanel" element={<SelectFormPage />} />
       
             
           
           <Route
              path="/profile"
              element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
            /> 

            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />
            <Route
              path="/"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
