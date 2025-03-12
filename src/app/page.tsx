import React from 'react';
import Navbar from './components/Navbar';
import PasswordViewer from './components/PasswordViewer';

const Home: React.FC = () => {
  return (
    <main className="home-page">
        <Navbar />
        <PasswordViewer />
    </main>
  )
}

export default Home;