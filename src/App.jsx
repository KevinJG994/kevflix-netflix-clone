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
import SerieDetails from "./pages/SerieDetails/SerieDetails";
import SelectFormPage from "./pages/SelectFormPage/SelectFormPage";

import { AuthContext } from "./context/auth.context";
import { useContext } from "react";

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  const { user } = useContext(AuthContext);

  const isAdmin = (user) => {
    return user && user.email === 'kjimenez@admin.com'
  }

  return (
    <div className="App">
      <Navbar />
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar className="w-1/4" />}

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies" element={<IsPrivate> <MoviePage /> </IsPrivate>} />
          <Route path="/series" element={<IsPrivate> <SeriePage /> </IsPrivate>} />
          <Route path="/favourites" element={<IsPrivate> <FavouritePage /> </IsPrivate>} />
          <Route path="/movieDetails/:movieId" element={<IsPrivate> <MovieDetails /> </IsPrivate>} />
          <Route path="/serieDetails/:serieId" element={<IsPrivate> <SerieDetails /> </IsPrivate>} />
          <Route path="*" element={<NotFoundPage />} />
          
          {isAdmin(user) && (
          <Route path="/adminPanel" element={<IsPrivate> <SelectFormPage /> </IsPrivate>} />
          )}

          <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />

          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/" element={<IsAnon> <LoginPage /> </IsAnon>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
