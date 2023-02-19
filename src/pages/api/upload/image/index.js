import formidable from "formidable";
import fs from "fs";
import FormData from 'form-data';
import path from "path";
import axios from "axios";
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOGU4MzIxMy0yOGVmLTRjYzUtYjU3Yy0zNDg4OTRiMjdlZGIiLCJlbWFpbCI6InJ5YW50aW5kZXI1NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDdjZTgzYWY2N2UxOTVkMDdmNGUiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDVlMmNhYWZjYjRjMTJmMmMxMjJmODAyOWNkMTNiZGNkNTU5ZjgzMWQ4MzBkNGQ2ODllODE4MDkzMTFmNmVhIiwiaWF0IjoxNjc2NzQ2MjkwfQ.lfdJnnvzpAthpQ6xOBoLzmt249Tk7ZCrY-5kTZd7WHM'

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
    console.log("Here")
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
  
        var oldPath = files.file.filepath;
        const ipfs = await uploadFile(oldPath)
        return res.send({ipfsHash: ipfs.IpfsHash})
    })
};

const uploadFile = async (path) => {
    // console.log(_file)
//   const data = fs.readFileSync(_file.path);
//   fs.writeFileSync(`./public/${_file.name}`, data);
//   await fs.unlinkSync(_file.path);

  const formData = new FormData();
  
  const file = fs.createReadStream(path)
  formData.append('file', file)

  const metadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', metadata);
  
  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options);

  try{
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return { ipfsHash: null }
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
