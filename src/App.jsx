import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingRoute from "./Routes/BookingRoute";

function App() {
  return (
    <div className="App">
  < Router>
        <Routes>
          <Route path="/*" element={<BookingRoute/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
