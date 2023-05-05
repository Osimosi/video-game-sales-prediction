const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Successful preflight call." }),
    };
  } else if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);
    try {
      const response = await axios.post(`https://game-sales-prediction.herokuapp.com/get_prediction`, data);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        headers,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
};
