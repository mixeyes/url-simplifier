import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { simplifyAPI } from "./api/instance";

function App() {
  const [fullUrl, setFullUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await simplifyAPI({ fullUrl });
      setShortUrl(() => data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>URL simplifier</h1>
      <div className="card">
        <form onSubmit={onSubmit}>
          <label htmlFor="url">
            Insert full url here
            <input
              name="fullUrl"
              type="text"
              value={fullUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFullUrl(() => e.target.value)
              }
            />
          </label>
          <button>Shorten</button>
          <h3>Short version of your url</h3>
          <a href={shortUrl} target='_blank'>{shortUrl}</a>
        </form>
      </div>
    </>
  );
}

export default App;
