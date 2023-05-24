import { Input } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

export const API_KEY = `87a79624edaa6a528d7be1d31ca3b070`;

function SearchBar(props) {
  const API_KEY = `87a79624edaa6a528d7be1d31ca3b070`;

  const [details, setDetails] = useState({});

  const [place, setPlace] = useState("");

  const getWeatherDetails = (place) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`;
    axios
      .get(URL)
      .then((res) => {
        setDetails(res.data);
        props.placeAndDetailCallback(place, details);
      })
      .catch((err) => {
        return [];
      });
  };

  return (
    <>
      <Input
      className="mb-3"
        type={"text"}
        name={"search-input"}
        placeholder={"Search"}
        onChange={(e) => {
          setPlace(e.target.value);
          props.placeAndDetailCallback(place);
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            getWeatherDetails(place);
          }
        }}
      />

      <div className="d-grid gap-2">
        <Button
          className="mb-4"
          variant="outline-dark"
          size="lg"
          type="button"
          onClick={() => {
            getWeatherDetails(place);
          }}
        >
          Search
        </Button>
      </div>

      {/* <Input
        type={"text"}
        name={"search-input"}
        placeholder={"Search"}
        onChange={(e) => {
          setPlace(e.target.value);
          props.placeAndDetailCallback(place);
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            getWeatherDetails(place);
          }
        }}
      />
      <div className="d-grid">
        <Button
          variant="outline-dark"
          type="button"
          className="buttonStyle"
          size="lg"
          onClick={() => {
            getWeatherDetails(place);
          }}
        >
          Search
        </Button>
      </div> */}
    </>
  );
}
export default SearchBar;
