import { useState } from 'react'
import { useSigner, useWaitForTransaction } from 'wagmi'
import { uploadImage, uploadProject } from '../lib/pinata/requests'
import { usePrepareProjectFactoryCreateProject, useProjectFactory, useProjectFactoryCreateProject } from '../generated'
import { getBytes32FromIpfsHash } from '../lib/helpers'


function UploadForm() {
    const { data: signerData } = useSigner()
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({ name: '', location: '', description: '' });
    const [project, setProject] = useState({ name: '', location: '', description: '', pictures: [""] });
    const [project_ipfs, setProjectIPFS] = useState("");
    const { config } = usePrepareProjectFactoryCreateProject({
        args: [project_ipfs, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"]
    });
    const {
        data: createData,
        write,
        isLoading,
        isSuccess,
        error
    } = useProjectFactoryCreateProject(config);

    const {
        data: txData,
        isSuccess: txSuccess,
        error: txError,
    } = useWaitForTransaction({
        hash: createData?.hash,
    });

    const ProjectFactory = useProjectFactory({
        signerOrProvider: signerData,
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        console.log(event.target.files);
        const newFiles: File[] = [];
        for (let i = 0; i < event.target.files.length; i++) {
            newFiles.push(event.target.files[i]);
        }
        setSelectedFiles([...selectedFiles, ...newFiles])
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const ipfs_array = await Promise.all(selectedFiles.map(async (file) => {
            const ipfs = await uploadImage(file)
            return ipfs;
        }))
        const ipfs = await uploadProject({
            ...formData,
            pictures: ipfs_array
        })
        console.log(ipfs)
        const b32_ipfs =
            getBytes32FromIpfsHash(
                ipfs
            )
        console.log(b32_ipfs)
        const tx = await ProjectFactory?.createProject(ipfs, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8");
        await tx?.wait();
        // here is where the transaction will go.

        // Reset the form and clear the selected files
        setFormData({ name: '', location: '', description: '' });
        setProject({ name: '', location: '', description: '', pictures: [""] });
    };

    return (

        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700 uppercase tracking-widest">
                    Enter Project Name, Location, and Description
                </h1>
                <form onSubmit={handleSubmit} className="w-74 flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4 py-5">
                        <div className="flex items-center gap-4" id="image-container"></div>

                        <input id="upload" type="file" onChange={handleFileChange} className="inline-block text-left float-right hidden" multiple />
                        <label htmlFor="upload" className="hover:cursor-pointer inline-block text-right float-left bg-blue-500 rounded-lg p-2 text-white font-bold px-6">
                            {selectedFiles.length == 0 ? "Upload" : `${selectedFiles.length} Uploaded`}
                        </label>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-lg font-semibold text-white bg-blue-500 rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>


    );
}

export default UploadForm;
