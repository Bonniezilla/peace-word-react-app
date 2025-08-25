import React from 'react';
import Generator from '../components/Generator/PasswordGenerator';

const GeneratorPage: React.FC = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center p-12 max-w-full"
    >
      <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                <h1 className="text-5xl animate-text-entry text-white
                "><span className="text-emerald-500">Peace</span> Word</h1>
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
      </span>
      <Generator passwordsNumber={6}/>
    </main>
  )
}

export default GeneratorPage;
