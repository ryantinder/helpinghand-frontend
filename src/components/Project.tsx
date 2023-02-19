import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAccount, useClient, useContract, useContractRead, useSigner, useWaitForTransaction } from 'wagmi';
import { useErc20, useErc20BalanceOf, usePrepareProjectEndProject, useProject, useProjectAsset, useProjectEndProject, useProjectGetContributors, useProjectHost, useProjectIpfs } from '../generated';
import { BigNumberArrayIncludes, getBytes32FromIpfsHash, projectAbi } from '../lib/helpers';
import { Project } from '../lib/pinata/constants';
import DonateButton from './Donate';
import JoinButton from './Donate';
import Link from "next/link"
import { uploadImage } from '../lib/pinata/requests';
type ActualTableProps = {
    address: string,
    id: number
}

const Project: React.FC<ActualTableProps> = ({ address, id }) => {
    const { provider } = useClient()
    const { data: signerData } = useSigner();
    const { address: my_address } = useAccount();
    async function donate() {
        console.log("Going to donate some money");
    }

    async function admin() {
        console.log("going to manage the project");
    }
    const [picIter, setPicIter] = useState<number>(0);
    const [project, setProject] = useState<Project>();
    const [donation, setDonation] = useState<number>(0);
    const [warning, setWarning] = useState<string>("");
    const { data: asset } = useProjectAsset({ address: address as `0x${string}` });
    const { data: ipfs } = useProjectIpfs({ address: address as `0x${string}` });
    const { data: contributors } = useProjectGetContributors({ address: address as `0x${string}` });
    const { data: host } = useProjectHost({ address: address as `0x${string}` });

    const { data: bounty } = useErc20BalanceOf({ address: asset as `0x${string}`, args: [address as `0x${string}`] })
    const { data: balance } = useErc20BalanceOf({ address: asset as `0x${string}`, args: [my_address as `0x${string}`] })

    const project_contract = useProject({ address: address as `0x${string}`, signerOrProvider: signerData });
    
    const { config } = usePrepareProjectEndProject({ address: address as `0x${string}`})
    const {
        data: endProjectData,
        write: endProject,
        isLoading: isEndingingProject,
        isSuccess: isSuccessEndingProject,
        error: endingProjectError,
    } = useProjectEndProject(config);

    const {
        data: endProjectDataWait,
        isSuccess: endProjectSuccessWait,
        error: endProjectErrorWait,
    } = useWaitForTransaction({
        hash: endProjectData?.hash,
    });

    const ERC20 = useErc20({ address: asset as `0x${string}`, signerOrProvider: signerData });

    const [newImages, setNewImages] = useState<File[]>([]);
    const progressHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        console.log(event.target.files);
        const newFiles: File[] = [];
        for (let i = 0; i < event.target.files.length; i++) {
            newFiles.push(event.target.files[i]);
        }
        setNewImages([...newImages, ...newFiles])

        const ipfsArray = await Promise.all(newFiles.map(async (file): Promise<string> => {
            const hash = await uploadImage(file);
            return getBytes32FromIpfsHash(hash);
        }))

        const tx = project_contract?.addPhotos(address, id, ipfsArray);
        await tx?.wait();
    }
    const exitHandler = async () => {

    }
    const endHandler = async () => {
        console.log("end handler")
        endProject?.()
    }
    const removeParticipants = async () => {

    }
    const donateHandler = async () => {
        if (donation > parseFloat(ethers.utils.formatUnits(balance as ethers.BigNumber, 6)) || donation <= 0) {
            return;
        }


        const parsed = ethers.utils.parseUnits(donation.toString(), 6);
        const tx = await ERC20?.transfer(address as `0x${string}`, parsed);
        await tx?.wait();
    }
    const joinHandler = async () => {
        console.log("Going to join");
        if (id == -1) return;
        const tx = await project_contract?.enter(ethers.BigNumber.from(id));
        await tx?.wait();
    }

    // const doConfirm = async (options: any) => {
    //     const result = await confirm("Are you sure?", { ...options, closeOnOverlayClick: true });
    //     if (result) {
    //         console.log("You click yes!");
    //         return true;
    //     }
    //     return false;
    //     console.log("You click No!");
    // };

    const customRender = (message: string) => {
        return {
            render: (msg: any, onConfirm: any, onCancel: any) => {
                return (
                    <div className='justify-center bg-white rounded-lg shadow-md p-5 flex-col'>
                        <h1 className='p-10'> {message} </h1>
                        <div className='flex mx-auto'>
                            <button className='bg-red-500 text-white p-2 rounded-md mx-auto px-6 item-center' onClick={onConfirm}> Yes </button>
                        </div>
                    </div>
                );
            }
        };
    }

    useEffect(() => {
        const fetchProject = async () => {
            if (!project_contract) return;
            const ipfs_gateway = `https://gateway.pinata.cloud/ipfs/${ipfs}`
            const response = await fetch(ipfs_gateway);
            const data = await response.json() as Project;
            setProject(data);
        }
        fetchProject().then().catch(console.error);
    }, [])

    return (
        <div className="border border-solid border-gray-400 rounded-lg p-4 shadow-md bg-white mx-auto mx-4 mb-4">
            {project /*asserting that project is defined*/ &&
                <div>
                    <div className='flex justify-between pb-8'>
                        <div className='flex-col justify-between items-center flex-1'>
                            <div className='flex-col pb-8 items-center'>
                                <div className="">
                                    <p className="text-3xl font-bold">{project.name}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="">Location: </p>
                                    <p className="">{project.location}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <p>Bounty:</p>
                                    <p>{bounty && ethers.utils.formatUnits(bounty, 6)} USDC</p>
                                </div>
                                <div className='flex gap-2'>
                                    <p>Participants:</p>
                                    <p>{contributors?.length}</p>
                                </div>
                            </div>
                            <div className="snap-center">
                                <p className=''>Directions</p>
                                <p className="">{project.description}</p>
                            </div>

                        </div>
                        <div className="flex flex-1 items-center">
                            <button className='text-5xl font-bold' onClick={() => setPicIter(picIter == 0 ? 0 : picIter - 1)}>{'<'}</button>
                            <div className='mx-auto'>
                                <img src={"https://gateway.pinata.cloud/ipfs/" + project.pictures[picIter]} alt="prefix ignore" />
                            </div>
                            <button className='text-5xl font-bold' onClick={() => setPicIter(picIter == project.pictures.length - 1 ? picIter : picIter + 1)}>{'>'}</button>
                        </div>


                    </div>
                    <div className='flex justify-between'>
                        {
                            (id === -1) ? (
                                <Link
                                    href="/get-worker-nft"
                                    passHref
                                    className='bg-blue-500 rounded-lg p-2 text-white font-bold px-6'
                                >
                                    Mint NFT
                                </Link>
                            ) :
                                (host === my_address) ? (
                                    <div className='flex gap-2'>
                                        <div>
                                            <button id="end" onClick={async () => {
                                                 endProject?.();
                                            }} className="inline-block text-left float-right hidden" />
                                            <label htmlFor="end" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">Release Funds</label>
                                        </div>
                                        <div>
                                            <button id="end" onClick={removeParticipants} className="inline-block text-left float-right hidden" />
                                            <label htmlFor="end" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">Remove Participants</label>
                                        </div>
                                    </div>
                                ) : (
                                    contributors && BigNumberArrayIncludes(contributors, id) ? (
                                        <div className='flex gap-2'>
                                            <div>
                                                <input id="upload" type="file" onChange={progressHandler} className="inline-block text-left float-right hidden" multiple />
                                                <label htmlFor="upload" className="hover:cursor-pointer inline-block text-right float-left bg-blue-500 rounded-lg p-2 text-white font-bold px-6">
                                                    {newImages.length == 0 ? "Upload" : `${newImages.length} Uploaded`}
                                                </label>
                                            </div>
                                            <div>
                                                <button id="exit" onClick={async () => {
                                                    exitHandler();
                                                }} className="inline-block text-left float-right hidden" />
                                                <label htmlFor="exit" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">Abandon</label>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            className='hover:cursor-pointer bg-blue-500 rounded-lg p-2 text-white font-bold px-6'
                                            onClick={joinHandler}>
                                            Join
                                        </button>
                                    )
                                )
                        }

                        <div className='flex gap-4'>
                            <input
                                className={`${donation > parseFloat(ethers.utils.formatUnits(balance as ethers.BigNumber, 6)) ? 'border-red-500' : 'border-gray'} border-2 rounded-md text-right w-20 p-2`}
                                placeholder={"0"}
                                type="number"
                                value={donation}
                                onChange={(e) => { setDonation(parseFloat(e.target.value)) }}>
                            </input>
                            <button className='bg-green-500 rounded-lg p-2 text-white px-6' onClick={donateHandler}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};

export default Project;
