import  { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';

export default function App() {
  return (
    <BrowserRouter>
      <div className="text-[#404040] bg-primary">
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:listingId" element={<ListingDetails />} />
          <Route path="/:userId/trips" element={<TripList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}