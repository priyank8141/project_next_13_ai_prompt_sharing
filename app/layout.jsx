import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ToastProvider from "@components/ToasterProvider";

export const metadata = {
  title: "Creative Prompts",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head></head>
    <body>
      <ToastProvider>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </ToastProvider>
    </body>
  </html>
);

export default RootLayout;
