import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#002cc0" />
          <meta
            name="description"
            content="It is a dailylife journal and photo gallery app where we can store and share our blogs and photos with our friends and relatives."
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://dailosocial.vercel.app" />
          <meta name="twitter:title" content="DailoSocial" />
          <meta
            name="twitter:description"
            content="It is a dailylife journal and photo gallery app where we can store and share our blogs and photos with our friends and relatives."
          />
          <meta
            name="twitter:image"
            content="https://dailosocial.vercel.app/logo192.png"
          />
          <meta name="twitter:creator" content="@Iamrrk__" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="DailoSocial" />
          <meta
            property="og:description"
            content="It is a dailylife journal and photo gallery app where we can store and share our blogs and photos with our friends and relatives."
          />
          <meta property="og:site_name" content="DailoSocial" />
          <meta property="og:url" content="https://dailosocial.vercel.app" />
          <meta
            property="og:image"
            content="https://dailosocial.vercel.app/logo512.png"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
