import { useState } from "react";
import "../src/fonts/stylesheet.css";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [codes, setCodes] = useState([]);



  const shortenUrl = async () => {
    try {
      const options = {
        method: "POST",
        url: "https://url-shortener-service.p.rapidapi.com/shorten",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            {API_KEY},
          "X-RapidAPI-Host": {HOST},
        },
        data: { url: originalUrl },
      };
      const response = await axios.request(options);
      if (response.data && response.data.result_url) {
        setShortenedUrl(response.data.result_url);
        
        let str = response.data.result_url;
        let s = str.split("/")[3]
        setCodes([...codes, s])


        console.log(codes)

        setError("");
      } else {
        setError("Failed to shorten the URL. Response format invalid.");
      }
    } catch (error) {
      setError("An error occurred while shortening the URL.");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard
        .writeText(shortenedUrl)
        .then(() => {
          alert("Shortened URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
          alert("Failed to copy shortened URL to clipboard.");
        });
    }
  };

  return (
    <div className=" bg-[#323437] h-screen w-screen flex flex-col items-center justify-center">
      <div className="Apercu-Bold text-4xl h-[60%] w-[75%] flex flex-col items-center justify-center mb-40 text-gray-100">
        URL Shortener
        <input
          type="text"
          className="h-[50px] text-gray-900 w-[720px] mt-8 rounded-md px-4 text-xl Apercu-Pro-Mono"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten..."
        />
        <button
          className="bg-green-600 h-[50px] w-[150px] mt-6 text-xl rounded-md Apercu-Pro-Medium"
          onClick={shortenUrl}
        >
          Shorten URL
        </button>
        <div className="h-[50px] w-[720px] flex items-center justify-between mt-8 ">
          <input
            type="text"
            className="bg-[#1e1e1e] text-xl outline-none h-full w-[85%] rounded-md px-4 Apercu-Pro-Mono"
            value={shortenedUrl}
            readOnly
          />
          <button
            className="bg-green-600 h-[50px] w-[90px] text-xl rounded-md Apercu-Pro-Medium"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        {error && <p className="text-xl Apercu-Pro-Mono mt-8">{error}</p>}
      </div>
    </div>
  );
}

export default App;