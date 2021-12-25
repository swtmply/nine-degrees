import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
