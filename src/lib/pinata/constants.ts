export const PINATA_BASE_URL = 'https://api.pinata.cloud/'; 
export const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOGU4MzIxMy0yOGVmLTRjYzUtYjU3Yy0zNDg4OTRiMjdlZGIiLCJlbWFpbCI6InJ5YW50aW5kZXI1NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDdjZTgzYWY2N2UxOTVkMDdmNGUiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDVlMmNhYWZjYjRjMTJmMmMxMjJmODAyOWNkMTNiZGNkNTU5ZjgzMWQ4MzBkNGQ2ODllODE4MDkzMTFmNmVhIiwiaWF0IjoxNjc2NzQ2MjkwfQ.lfdJnnvzpAthpQ6xOBoLzmt249Tk7ZCrY-5kTZd7WHM'
export interface SingleImageResponse {
    ipfsHash: string,
    pinSize: number,
    timestamp: string
}
export interface SingleJSONResponse {
    IpfsHash: string,
    pinSize: number,
    timestamp: string
}

export interface Project {
    name: string;
    location: string;
    description: string;
    pictures: string[];
};