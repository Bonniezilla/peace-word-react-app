import Generator from './components/Generator';
import Header from './components/Header';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center mt-16"
    >
      <Header />
      <Generator passwordsNumber="6"/>
    </main>
  )
}
