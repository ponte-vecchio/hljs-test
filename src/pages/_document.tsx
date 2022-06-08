import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html
        className="px-12 lg:mr-24 lg:ml-24 md:mr-18 md:ml-18 sm:mr-12 sm:ml-12"
      >
        <Head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@200;600&display=swap');
          </style>
        </Head>
        <div>
          <header className="my-4 sticky fixed">
            <div className="flex grid-rows-1 align-items-center align-content-center justify-content-flex-start">
              <div className="w-25 grid-span-1 justify-content-center">
                <button
                  className="bg-bg rounded hover:text-yellow active:bg-red active:text-white">
                  <a href="/">
                    <img
                      className="w-24 h-24 rounded-full text-center"
                      src="https://cdn.discordapp.com/icons/846677253290983444/37f6d4e00b5439dd11b851b4b253f104.webp?size=1024"
                      alt="avatar" />
                  </a>
                  <p className="font-ibm text-center">
                    hljs-test
                  </p>
                </button>
              </div>

              <div className="w-50"></div>
            </div>
          </header>
          <body className="bg-bg text-fgalt font-ubuntu">
          <Main />
          <NextScript />
          </body>
          <div className="my-40"></div>
        </div>
      </Html>
    );
  }
}

export default MyDocument;
