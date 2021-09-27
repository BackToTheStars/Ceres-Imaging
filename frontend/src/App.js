import { useEffect, useState } from "react";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const [imagesList, setImagesList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [metadata, setMetadata] = useState({});

  const handleClickGetImages = () => {
    fetch(`${API_URL}/images`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(({ imageNames }) => {
        setImagesList(imageNames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRequestMetadata = () => {
    fetch(`${API_URL}/metadata/${imageUrl}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(({ imageObj }) => {
        setMetadata(imageObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!!imageUrl) {
      handleRequestMetadata();
    }
  }, [imageUrl]);

  return (
    <div className="App container-fluid">
      <div className="text-left">
        <button
          className="btn btn-primary mt-3 mb-3"
          onClick={() => handleClickGetImages()}
        >
          Get list of images
        </button>
      </div>
      <div className="row">
        <div className="col-md-3">
          {imagesList.map((el) => {
            return (
              <p key={el} className="file-name">
                {el}
                <button
                  key={el + "b"}
                  className="btn btn-secondary btn-sm ml-2"
                  onClick={() => setImageUrl(el)}
                >
                  Show
                </button>
              </p>
            );
          })}
        </div>
        {!!imageUrl && (
          <>
            <div className="col-md-5">
              <img
                alt={imageUrl}
                className="mt-3 w-100"
                src={`http://localhost:3000/image/${imageUrl}`}
              />
            </div>

            <div className="col-md-4">
              <table className="table table-striped">
                <tbody>
                  {Object.keys(metadata).map((field) => {
                    return (
                      <tr key={field}>
                        <td>{field}</td>
                        <td>{metadata[field]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
