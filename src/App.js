// import React from 'react';
// import CompanyForm from './components/CompanyForm';
// import CompanyList from './components/CompanyList';
// import CompanyDetails from './components/CompanyDetails';
// import './App.css'; // Custom styles

// function App() {
//   return (
//     <div className="app-container">
//       <CompanyForm />
//       <CompanyList />
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import CompanyForm from './components/CompanyForm';
// import CompanyList from './components/CompanyList';
// import CompanyDetails from './components/CompanyDetails';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css'; // Custom styles

// function App() {
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   // Function to handle company selection
//   const handleCompanySelect = (company) => {
//     setSelectedCompany(company);
//   };

//   // Function to return to the company list (clear selected company)
//   const handleBackToList = () => {
//     setSelectedCompany(null);
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         <CompanyForm />
//         <Routes>
//           <Route path="/" element={<CompanyList onCompanySelect={handleCompanySelect} />} />
//           {selectedCompany && (
//             <Route
//               path={`/companies/${selectedCompany._id}`}
//               element={<CompanyDetails company={selectedCompany} onBack={handleBackToList} />}
//             />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import CompanyForm from './components/CompanyForm';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Custom styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <CompanyForm />
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
