const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOGU4MzIxMy0yOGVmLTRjYzUtYjU3Yy0zNDg4OTRiMjdlZGIiLCJlbWFpbCI6InJ5YW50aW5kZXI1NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDdjZTgzYWY2N2UxOTVkMDdmNGUiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDVlMmNhYWZjYjRjMTJmMmMxMjJmODAyOWNkMTNiZGNkNTU5ZjgzMWQ4MzBkNGQ2ODllODE4MDkzMTFmNmVhIiwiaWF0IjoxNjc2NzQ2MjkwfQ.lfdJnnvzpAthpQ6xOBoLzmt249Tk7ZCrY-5kTZd7WHM'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "./panda.jpg";

    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    // console.log(formData)
    // return;
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
// pinFileToIPFS().then()
