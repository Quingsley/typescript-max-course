import Axios from "axios";
import { GOOGLE_API_KEY } from "../constant";
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

declare var google: any;

type GoogleGeocoding = {
  results: { geometry: { location: { lat: number; long: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

async function adressInputHandler(event: Event) {
  event.preventDefault();
  try {
    const enteredAddress = addressInput.value;
    const response = await Axios.get<GoogleGeocoding>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    );
    if (response.data.status !== "OK") {
      throw new Error("Could not fetch location");
    }
    const coordinates = response.data.results[0].geometry.location;
    console.log(coordinates);
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: coordinates,
        zoom: 8,
      }
    );

    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  } catch (error) {
    alert(error);
  }
}

form.addEventListener("submit", adressInputHandler);
