import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
