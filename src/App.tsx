import Header from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coursepage from "./pages/Coursepage";
import Breadcrumb from "./components/common/Breadcrumb";
import NotFoundpage from "./pages/NotFoundpage";
import Footer from "./components/common/Footer";
import FullPageLoading from "./pages/FullPageLoading";
import { useEffect, useState } from "react";

function App() {
  // Full page loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1700);
  }, []);
  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Router>
        <Header />
        <Breadcrumb />
        <Routes>
          <Route index path="/" element={<Homepage />}></Route>
          <Route path="/courses" element={<Coursepage />}></Route>
          <Route path="*" element={<NotFoundpage />}></Route>
        </Routes>

        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
