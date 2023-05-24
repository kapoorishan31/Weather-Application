import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import "./Components.css";
import axios from "axios";
import { Input } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
// import SearchBar from "./SearchBar";

function AppForm() {
  const d = new Date();

  const API_KEY = `87a79624edaa6a528d7be1d31ca3b070`;

  const [details, setDetails] = useState({});

  const [place, setPlace] = useState("");

  const getWeatherDetails = (place) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`;
    axios
      .get(URL)
      .then((res) => {
        setDetails(res.data);
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
      <Card className="cardStyling" style={{ width: "18rem" }}>
        <Card.Body className="text-center">
          <Card.Title className="cardTitle">
            {place === "" ? "Enter City" : place}
          </Card.Title>

          <ListGroup className="list-group-flush">
            <ListGroup.Item className="weatherHeading  cardContentStyling">
              Date
              <Card.Text className="weatherData ">{`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item className="weatherHeading  cardContentStyling">
              Temperature
              <Card.Text className="weatherData">
                {place === "" ? "" : details?.main?.temp.toPrecision(2)}°C
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item className="weatherHeading  cardContentStyling">
              Humidity
              <Card.Text className="weatherData">
                {place === "" ? "" : details?.main?.humidity}%
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item className="weatherHeading  cardContentStyling">
              Wind Speed
              <Card.Text className="weatherData ">
                {place === "" ? "" : details?.wind?.speed}km/h
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item className="weatherHeading  cardContentStyling">
              Wind Gusts
              <Card.Text className="weatherData">
                {place === "" ? "" : details?.wind?.gust}km/h
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default AppForm;
