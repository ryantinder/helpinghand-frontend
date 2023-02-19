import formidable from "formidable";
import fs from "fs";
import FormData from 'form-data';
import path from "path";
import axios from "axios";
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOGU4MzIxMy0yOGVmLTRjYzUtYjU3Yy0zNDg4OTRiMjdlZGIiLCJlbWFpbCI6InJ5YW50aW5kZXI1NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDdjZTgzYWY2N2UxOTVkMDdmNGUiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDVlMmNhYWZjYjRjMTJmMmMxMjJmODAyOWNkMTNiZGNkNTU5ZjgzMWQ4MzBkNGQ2ODllODE4MDkzMTFmNmVhIiwiaWF0IjoxNjc2NzQ2MjkwfQ.lfdJnnvzpAthpQ6xOBoLzmt249Tk7ZCrY-5kTZd7WHM'

const post = async (req, res) => {
    const json = JSON.parse(req.body);

    var data = JSON.stringify({
        "pinataOptions": {
            "cidVersion": 0
        },
        "pinataMetadata": {
            "name": "testing"
        },
        "pinataContent": json
    });

    console.log('data: ', data)

    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JWT}`
        },
        data: data
    };

    const response = await axios(config);
    console.log("api", response.data);
    res.status(200).json(response.data);
};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? console.log("GET")
                    : res.status(404).send("");
};
