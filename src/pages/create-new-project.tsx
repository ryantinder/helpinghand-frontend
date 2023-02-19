import { useState, useEffect } from 'react'
import { useSigner, useWaitForTransaction } from 'wagmi'
import { uploadImage, uploadProject } from '../lib/pinata/requests'
import { usePrepareProjectFactoryCreateProject, useProjectFactory, useProjectFactoryCreateProject } from '../generated'
import { getBytes32FromIpfsHash } from '../lib/helpers'


function UploadForm() {
    const { data: signerData } = useSigner()
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [frozen, setFrozen] = useState(false);
    const [formData, setFormData] = useState({ name: '', zipcode: '', description: '' });
    const [project, setProject] = useState({ name: '', zipcode: '', description: '', pictures: [""] });
    const [project_ipfs, setProjectIPFS] = useState("");
    const { config } = usePrepareProjectFactoryCreateProject({
        args: [project_ipfs, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"]
    });
    const {
        data: createData,
        write,
        isLoading,
        isSuccess,
        status,
        error
    } = useProjectFactoryCreateProject(config);

    const {
        data: txData,
        isSuccess: txSuccess,
        error: txError,
        isLoading: txLoading,
        status: txStatus,
    } = useWaitForTransaction({
        hash: createData?.hash,
    });

    const ProjectFactory = useProjectFactory({
        signerOrProvider: signerData,
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const newFiles: File[] = [];
        for (let i = 0; i < event.target.files.length; i++) {
            newFiles.push(event.target.files[i]);
        }
        setSelectedFiles([...selectedFiles, ...newFiles])
        for (const file of newFiles) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.className = "h-32 w-32 object-cover rounded-sm";
            document.getElementById("image-container")?.appendChild(img);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFrozen(true);

        const ipfs_array = await Promise.all(selectedFiles.map(async (file) => {
            const ipfs = await uploadImage(file)
            return ipfs;
        }))
        const ipfs = await uploadProject({
            ...formData,
            pictures: ipfs_array
        })

        const b32_ipfs = getBytes32FromIpfsHash(ipfs)
        try {
            const tx = await ProjectFactory?.createProject(ipfs, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8");
            await tx?.wait();
        } catch (e) {
            console.log(e)
        }
        setFrozen(false)
        // here is where the transaction will go.

        // Reset the form and clear the selected files
        setFormData({ name: '', zipcode: '', description: '' });
        setProject({ name: '', zipcode: '', description: '', pictures: [""] });
    };
    
    return (

        <div>
            <div className="flex flex-col items-center justify-center py-8">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700 uppercase tracking-widest">
                    Enter Project Name, Zipcode, and Description
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-4 pt-5">
                        <div className="flex items-center gap-4 overflow-x-auto" id="image-container"></div>

                        <input id="upload" type="file" onChange={handleFileChange} className="inline-block text-left float-right hidden" multiple />
                        <label htmlFor="upload" className="hover:cursor-pointer inline-block text-right float-left bg-blue-500 rounded-xl shadow-md p-2 text-white font-bold px-6">
                            {selectedFiles.length == 0 ? "Upload Images" : `${selectedFiles.length} Uploaded`}
                        </label>
                    </div>
                    <div className="mx-32 flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Project Name"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            placeholder="Zipcode"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                        <textarea
                            rows={10}
                            cols={50}
                            name="description"
                            value={formData.description}
                            onChange={handleDescChange}
                            placeholder="Description (be thorough)"
                            className="text-sm font-semibold text-gray-500 border border-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        disabled={frozen}
                        type="submit"
                        className={`text-lg font-semibold text-white bg-blue-500 rounded-lg py-2 px-4 ${!frozen ? 'hover:bg-blue-600' : ''} focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500`}
                    >
                        { frozen ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>


    );
}

export default UploadForm;
