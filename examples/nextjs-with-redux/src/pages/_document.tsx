import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="ja">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="theme-color" content="#ff6600" />
          <meta name="description" content="specter - nextjs-with-redux" />
          <meta name="apple-mobile-web-app-title" content="secter example" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
