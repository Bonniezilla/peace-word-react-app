import './globals.css';

import NextAuthProvider from './components/NextAuthProvider';

export const metadata = {
  title: 'PeaceWord',
  description: 'Never use weak passwords again.',
}

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="pt-br">
        <body className='bg-slate-900'>{children}</body>
      </html>
    </NextAuthProvider>
  )
}
