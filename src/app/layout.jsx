import './globals.css';

export const metadata = {
  title: 'PeaceWord',
  description: 'Never use weak passwords again.',
}

export default function RootLayout({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <Component session={...pageProps}/>
  )
}
