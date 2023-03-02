import logo from './logo.svg';
import './App.css';
import Layout from './components/shared/Layout';
import AllAddresses from './pages/allAddresses';
import AddAddress from './pages/addAddress';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element=<AllAddresses />></Route>
        <Route path="/add-address" element=<AddAddress />></Route>
      </Routes>
    </Layout>
  );
}
export default App;
