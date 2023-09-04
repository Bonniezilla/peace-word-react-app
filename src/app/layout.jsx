import './globals.css';

import NextAuthProvider from './components/NextAuthProvider';

export const metadata = {
  title: 'PeaceWord',
  description: 'Never use weak passwords again.',
}

export default function RootLayout({ 
  Component,
  pageProps: { session, ...pageProps }
 }) {
  return (
    <NextAuthProvider session={session}>
      <Component {...pageProps} />
    </NextAuthProvider>
    )
}
