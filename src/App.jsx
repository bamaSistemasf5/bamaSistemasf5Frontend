import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateClient from './components/CreateClient/CreateClient';
// import Loading from './components/Loading/Loading';

function App() {


  return (
    <>
      <Header />
      {/* <Loading /> */}
      <CreateClient />
      <Footer />
    </>
  )
}

export default App
