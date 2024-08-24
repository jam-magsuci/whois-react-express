require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());

const PORT = 8080;
const APIKEY = process.env.WHOIS_API_KEY;

app.post("/lookup", async (req, res) => {
  if (!req.body.domainName) {
    return res.status(400).send({ error: "domainName is required" });
  }

  if (!req.body.requestedData) {
    return res.status(400).send({ error: "requestedData is required" });
  }

  // Prepare the data payload for the API request
  const data = JSON.stringify({
    domainName: req.body.domainName,
    outputFormat: "JSON",
  });

  // Configuration for the axios request
  let config = {
    method: "post",
    url: "https://www.whoisxmlapi.com/whoisserver/WhoisService",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APIKEY}`,
    },
    data: data,
  };

  try {
    // Make the HTTP request using axios
    const response = await axios.request(config);

    // parse response base on requestedData
    if (req.body.requestedData == "domain") {
      const domainInfo = {
        domainName: response.data.domainName,
        registrarName: response.data.WhoisRecord.registrarName,
        createdDate: `${new Date(
          response.data.WhoisRecord.createdDate
        ).toDateString()}`,
        expiresDate: `${new Date(
          response.data.WhoisRecord.expiresDate
        ).toDateString()}`,
        registrarName: response.data.WhoisRecord.registrarName,
        estimatedDomainAge: response.data.WhoisRecord.estimatedDomainAge,
        hostNames: response.data.WhoisRecord.nameServers.hostNames,
      };
      res.send(domainInfo);
    } else if (req.body.requestedData == "contact") {
      const contactInfo = {
        registrant:
          response.data.WhoisRecord.registrant?.name ??
          response.data.WhoisRecord.registrant?.organization,
        technicalContact:
          response.data.WhoisRecord.technicalContact?.name ??
          response.data.WhoisRecord.technicalContact?.organization,
        administrativeContact:
          response.data.WhoisRecord.administrativeContact?.name ??
          response.data.WhoisRecord.administrativeContact?.organization,
        contactEmail: response.data.WhoisRecord.contactEmail,
      };
      res.send(contactInfo);
    } else {
      res.status(500).send({ error: "Error setting up API request." });
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "API responded with an error:",
        error.response.status,
        error.response.data
      );
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error("No response received from API:", error.request);
      res
        .status(503)
        .send({ error: "Service unavailable. No response from API." });
    } else {
      console.error("Error setting up API request:", error.message);
      res.status(500).send({ error: "Error setting up API request." });
    }
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
