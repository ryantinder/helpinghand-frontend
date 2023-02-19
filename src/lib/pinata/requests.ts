import { JWT, PINATA_BASE_URL, SingleIPFSResponse } from "./constants"
import axios from "axios";
import { Project } from "./constants";


export const uploadImage = async (file: File): Promise<string> => {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload/image", {
        method: "POST",
        body
    });
    const data = await response.json() as SingleIPFSResponse;
    return data.IpfsHash;
}

export const uploadProject = async (project: Project): Promise<string> => {
    const response = await fetch("/api/upload/json", {
        method: "POST",
        body: JSON.stringify(project)
    });
    const data = await response.json() as SingleIPFSResponse;
    return data.IpfsHash;
}

