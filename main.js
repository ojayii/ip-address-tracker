const ipAddressForm = document.querySelector("header>form");
const dataElements = document.querySelectorAll(
  ".results-container>.result>.result-main"
);
const API_KEY = "";
let map = L.map("map");

const fetchData = async (apiKey, ipAddress) => {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const displayData = async (ipAddress) => {
  const result = await fetchData(API_KEY, ipAddress);
  console.log(result);
  if (result && API_KEY) {

    dataElements[0].textContent = result.ip;
    dataElements[1].textContent = `${result.location.city} ${result.location.postalCode}`;
    dataElements[2].textContent = `UTC ${result.location.timezone}`;
    dataElements[3].textContent = result.isp;
    map.setView([result.location.lat, result.location.lng], 13);
    let marker = L.marker([result.location.lat, result.location.lng]).addTo(
      map
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      // maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }
};

displayData("");

ipAddressForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ipInput = e.target.querySelector('input[type="text"]');
  if (ipInput.value) displayData(ipInput.value);
});