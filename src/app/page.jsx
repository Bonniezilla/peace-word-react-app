import Generator from './components/Generator';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center"
    >
      <Generator passwordsNumber="6"/>
    </main>
  )
}
