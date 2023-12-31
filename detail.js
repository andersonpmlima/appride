const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async()=>{

    
const firstPosition = ride.data[0]
const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)

const dataElement = document.createElement("div")
dataElement.className = "flex-fill d-flex flex-column"

const cityDiv = document.createElement("div")
cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
cityDiv.className = "text-primary mb-2"

const maxSpeedDiv = document.createElement("div") 
maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
maxSpeedDiv.className = "h5"

const distanceDiv = document.createElement("div") 
distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

const durationDiv = document.createElement("div")
durationDiv.innerText = `Duration: ${getDuration(ride)} min`


const dateDiv = document.createElement("div")
dateDiv.innerText = getStartDate(ride)
dateDiv.className = " text-secondary mt-2"


dataElement.appendChild(cityDiv)
dataElement.appendChild(maxSpeedDiv)
dataElement.appendChild(distanceDiv)
dataElement.appendChild(durationDiv)
dataElement.appendChild(dateDiv)

document.querySelector("#data").appendChild(dataElement)

const deleteButton = document.querySelector("#deleteBtn")
deleteButton.addEventListener("click", ()=>{

    deleteRide(rideID)
    window.location.href = "./"
})

const map = L.map("mapDetail", {

    attributionControl: false,
})
map.setView([firstPosition.latitude, firstPosition.longitude],14)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map)


const positionsArray = ride.data.map((position=>{

    return [position.latitude, position.longitude]
}))

const polyline = L.polyline(positionsArray, {color: "#F00"}).addTo(map)

map.fitBounds(polyline.getBounds())

})
