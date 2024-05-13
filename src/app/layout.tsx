import './globals.css';

export const metadata = {
  title: 'PeaceWord',
  description: 'Never use weak passwords again.',
}

export default function RootLayout({ children }) {
  return (
      <html lang="pt-br">
        <body className='bg-slate-900'>{children}</body>
      </html>
  )
}
