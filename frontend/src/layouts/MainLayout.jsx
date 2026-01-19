import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="app-container">
        {children}
      </div>
    </>
  );
};

export default MainLayout;