import axios from 'axios'

const AMADEUS_CLIENT_ID = 'EZrRgDdW8GrLA01DwxNu6xh4jvYBG71G';
const AMADEUS_CLIENT_SECRET = 'SujULngaNkfywkUC';

// Function to obtain the access token
async function getAccessToken() {
    try {
        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        throw new Error('Error obtaining access token: ' + error);
    }
}

async function makeAuthenticatedRequest(accessToken,keyword) {
    try {
        const response = await axios.get(
            'https://test.api.amadeus.com/v1/reference-data/locations',
            {
                params: {
                    subType: 'AIRPORT,CITY',
                    keyword: keyword
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error making authenticated GET request: ' + error);
    }
}

export async function getAirportApi( keyword) {
    try {
        const accessToken = await getAccessToken();
        const data = await makeAuthenticatedRequest(accessToken,keyword);
        return data
    } catch (error) {
        console.error(error);
    }
}





async function makeRequestOnFlights(accessToken,from,to,date,adults,infants,children,travelClass) {
    try {
        const response = await axios.get(
            'https://test.api.amadeus.com/v2/shopping/flight-offers',
            {
                params: {
                    originLocationCode: from,
                    destinationLocationCode: to,
                    departureDate: date,
                    adults: adults,
                    infants: infants,
                    children: children,
                    travelClass: travelClass,
                    nonStop:true,
                    currencyCode:"USD",
                    max:15,

                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error making authenticated GET request: ' + error);
    }
}

export async function getFlightApi( from,to,date,adults,infants,children,travelClass) {
    try {
        const accessToken = await getAccessToken();
        const data = await makeRequestOnFlights(accessToken,from,to,date,adults,infants,children,travelClass);
        return data
    } catch (error) {
        console.error(error);
    }
}