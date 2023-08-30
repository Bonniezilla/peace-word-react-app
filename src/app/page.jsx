import Generator from './components/Generator'; 
import Header from './components/Header';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center"
    >
      <Header />
      <Generator passwordsNumber="4"/>   
    </main>
  )
}
