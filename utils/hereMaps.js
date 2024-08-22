const ExpressError = require("./ExpressError");
const baseUrl = 'https://geocode.search.hereapi.com/v1';
// const apiKey = 'zqU7trO5aYKamgXsqm5sQkrNiEnUku6XlRYrbfkXBek';
const apiKey = '1YwqOiX3y6tKX_iOQLjgjjL1PT8Uxd_OsyfmbUGjmn4';



const getLocation = async (address) => {
    const url = `${baseUrl}/geocode?q=${address}&apiKey=${apiKey}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log('respon api: ', data.items[0].position.lat);

        const lat = data.items[0].position.lat;
        const lng = data.items[0].position.lng;
        return { lat, lng};
    } catch (error) {
         new ExpressError(error.message, 500);
    }

}

const geometry = async (address) => {
    try {
        const  position  = await getLocation(address);

        console.log('Generated geometry:', position);
        return {
            type: "Point",
            coordinates: [position.lng, position.lat]
        };
    } catch (error) {
         new ExpressError(`terjadi kesalahan pada pemanggilan lokasi ${address}. ${error.message}`, 500);
    } 
}

module.exports = {
    geometry,
    getLocation
}