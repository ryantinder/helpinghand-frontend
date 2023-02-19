import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useAccount, useClient, useContract, useContractRead, useSigner, useWaitForTransaction } from 'wagmi';
import { useErc20, useErc20BalanceOf, useIdentityProvider, useIdentityProviderAddPhotos, useIdentityProviderGetPhotos, usePrepareIdentityProviderAddPhotos, usePrepareProjectEndProject, usePrepareProjectEnter, usePrepareProjectExit, usePrepareProjectRemoveParticipants, useProject, useProjectAsset, useProjectEndProject, useProjectEnter, useProjectExit, useProjectGetContributors, useProjectHost, useProjectIpfs, useProjectRemoveParticipants } from '../generated';
import { BigNumberArrayIncludes, getBytes32FromIpfsHash, getIpfsHashFromBytes32, projectAbi } from '../lib/helpers';
import { Project } from '../lib/pinata/constants';
import DonateButton from './Donate';
import JoinButton from './Donate';
import Link from "next/link"
import { uploadImage } from '../lib/pinata/requests';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
type ActualTableProps = {
    address: string,
    id: number,
    zipCode: string
}

const Project: React.FC<ActualTableProps> = ({ address, id, zipCode }) => {
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
    const [ipfsArray, setIpfsArray] = useState<string[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
    const { data: asset } = useProjectAsset({ address: address as `0x${string}` });
    const { data: ipfs } = useProjectIpfs({ address: address as `0x${string}` });
    const { data: contributors } = useProjectGetContributors({ address: address as `0x${string}` });
    const { data: host } = useProjectHost({ address: address as `0x${string}` });
    const { data: photos } = useIdentityProviderGetPhotos({ args: [address as `0x${string}`, id == -1 ? BigNumber.from(10000) : BigNumber.from(id)] })
    const { data: bounty } = useErc20BalanceOf({ address: asset as `0x${string}`, args: [address as `0x${string}`] })
    const { data: balance } = useErc20BalanceOf({ address: asset as `0x${string}`, args: [my_address as `0x${string}`] })

    const project_contract = useProject({ address: address as `0x${string}`, signerOrProvider: signerData });
    const identityProvider = useIdentityProvider({ signerOrProvider: signerData });

    /**
     *  Transaction hooks
     */

    const { data: projectEndConfig } = usePrepareProjectEndProject({ address: address as `0x${string}` })
    const {
        data: endProjectData,
        write: endProject,
        isLoading: isEndingingProject,
        isSuccess: isSuccessEndingProject,
        error: endingProjectError,
    } = useProjectEndProject(projectEndConfig);

    const {
        data: endProjectDataWait,
        isSuccess: endProjectSuccessWait,
        error: endProjectErrorWait,
    } = useWaitForTransaction({
        hash: endProjectData?.hash,
    });

    const { data: projectExitConfig } = usePrepareProjectExit({ address: address as `0x${string}`, args: [id == -1 ? BigNumber.from(10000) : BigNumber.from(id)] })
    const {
        data: exitProjectData,
        write: exitProject,
        isLoading: isExitingProject,
        isSuccess: isSuccessExitingProject,
        error: exitingProjectError,
    } = useProjectExit(projectExitConfig);
    const {
        data: exitProjectDataWait,
        isSuccess: exitProjectSuccessWait,
        error: exitProjectErrorWait,
    } = useWaitForTransaction({
        hash: exitProjectData?.hash,
    });

    const { data: projectEnterConfig } = usePrepareProjectEnter({ address: address as `0x${string}`, args: [id == -1 ? BigNumber.from(10000) : BigNumber.from(id)] })
    const {
        data: enterProjectData,
        write: enterProject,
        isLoading: isEnteringProject,
        isSuccess: isSuccessEnteringProject,
        error: enteringProjectError,
    } = useProjectEnter(projectEnterConfig);
    const {
        data: enterProjectDataWait,
        isSuccess: enterProjectSuccessWait,
        error: enterProjectErrorWait,
    } = useWaitForTransaction({
        hash: enterProjectData?.hash,
    });
    const { data: projectRemoveConfig } = usePrepareProjectRemoveParticipants({ address: address as `0x${string}`, args: [selectedParticipants.map((id) => BigNumber.from(id))] })
    const {
        data: removeParticipantsProjectData,
        write: removeParticipantsProject,
        isLoading: isRemovingProject,
        isSuccess: isSuccessRemovingProject,
        error: removeParticipantsProjectError,
    } = useProjectRemoveParticipants(projectRemoveConfig);
    const {
        data: removeProjectDataWait,
        isSuccess: removeProjectSuccessWait,
        error: removeProjectErrorWait,
    } = useWaitForTransaction({
        hash: removeParticipantsProjectData?.hash,
    });

    const { data: uploadConfig } = usePrepareIdentityProviderAddPhotos({ args: [address as `0x${string}`, id == -1 ? BigNumber.from(10000) : BigNumber.from(id), ipfsArray.map((ipfs) => ipfs as `0x${string}`)] })
    const {
        data: uploadData,
        write: upload,
        isLoading: isUploading,
        isSuccess: successUpload,
        error: uploadError,
    } = useIdentityProviderAddPhotos(uploadConfig);
    const {
        data: uploadDataWait,
        isSuccess: uploadSuccessWait,
        error: uploadErrorWait,
    } = useWaitForTransaction({
        hash: uploadData?.hash,
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

        const _ipfsArray = await Promise.all(newFiles.map(async (file): Promise<string> => {
            const hash = await uploadImage(file);
            return getBytes32FromIpfsHash(hash);
        }))
        setIpfsArray(_ipfsArray);

        const tx = await identityProvider?.addPhotos(address as `0x${string}`, BigNumber.from(0), _ipfsArray.map((ipfs) => ipfs as `0x${string}`));
        await tx?.wait();
    }

    const donateHandler = async () => {
        if (donation > parseFloat(ethers.utils.formatUnits(balance as ethers.BigNumber, 6)) || donation <= 0) {
            return;
        }


        const parsed = ethers.utils.parseUnits(donation.toString(), 6);
        const tx = await ERC20?.transfer(address as `0x${string}`, parsed);
        await tx?.wait();
    }


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
        
        <div>
            {project /*asserting that project is defined*/ &&
                <div className={`${zipCode==='' || project.zipcode===undefined ||project.zipcode.slice(0, zipCode.length) === zipCode ? '' : 'hidden'}`} >
                <div className="border border-solid border-gray rounded-lg p-4 shadow-md bg-white mx-auto mx-4 mb-4">
                    <div className='flex justify-between pb-8'>
                        <div className='flex-col justify-between items-center flex-1'>
                            <div className='flex-col pb-8 items-center'>
                                <div className="">
                                    <p className="text-3xl font-bold">{project.name}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="">Zip Code:</p>
                                    <p className="">{project.zipcode}</p>
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
                            <button className='text-5xl font-bold' onClick={() => setPicIter(picIter == 0 ? 0 : picIter - 1)}>
                                <BiLeftArrow style ={{ color: "gray"}}/>
                            </button>
                            <div className='mx-auto'>
                                <img src={"https://gateway.pinata.cloud/ipfs/" + project.pictures[picIter]} alt="prefix ignore" />
                            </div>
                            <button className='text-5xl font-bold' onClick={() => setPicIter(picIter == project.pictures.length - 1 ? picIter : picIter + 1)}>
                            <BiRightArrow style ={{ color: "gray"}}/>
                            </button>
                        </div>


                    </div>
                    
                    {contributors && BigNumberArrayIncludes(contributors, id) ? (
                        <div>
                            <div className='w-full border-gray border-b-2'>My Submissions</div>
                            <div className='my-4 flex overflow-x-auto gap-3'>
                                {photos?.map((photo, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={`https://gateway.pinata.cloud/ipfs/${getIpfsHashFromBytes32(photo)}`} className='w-32 h-32 object-cover rounded-md shadow-md' alt="prefix ignore" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>) : (<></>)
                    }




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
                                            <label htmlFor="end" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">
                                                {isEndingingProject ? "Release Funds..." : "Release Funds"}
                                            </label>
                                        </div>
                                        <div>
                                            <button id="end" onClick={async () => {
                                                if (selectedParticipants.length > 0) removeParticipantsProject?.();
                                            }} className="inline-block text-left float-right hidden" />
                                            <label htmlFor="end" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">Remove Participants</label>
                                        </div>
                                    </div>
                                ) : (
                                    contributors && BigNumberArrayIncludes(contributors, id) ? (
                                        <div className='flex gap-2'>
                                            <div>
                                                <input id="upload" disabled={isUploading} type="file" onChange={progressHandler} className="inline-block text-left float-right hidden" multiple />
                                                <label htmlFor="upload" className="hover:cursor-pointer inline-block text-right float-left bg-blue-500 rounded-lg p-2 text-white font-bold px-6">
                                                    {newImages.length == 0 ? "Upload" : `${newImages.length} Uploaded`}
                                                </label>
                                            </div>
                                            <div>
                                                <button id="exit" onClick={async () => {
                                                    exitProject?.()
                                                }} className="inline-block text-left float-right hidden" />
                                                <label htmlFor="exit" className="hover:cursor-pointer inline-block text-right float-left bg-red-500 rounded-lg p-2 text-white font-bold px-6">
                                                    {isExitingProject ? "Abandoning..." : "Abandon"}
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            className='hover:cursor-pointer bg-blue-500 rounded-lg p-2 text-white font-bold px-6'
                                            onClick={async () => {
                                                if (id != -1) enterProject?.();
                                            }}>
                                            {isEnteringProject ? "Joining..." : "Join"}
                                        </button>
                                    )
                                )
                        }

                        <div className='flex items-center gap-4'>
                            <img src='https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389' className='rounded-full w-8 h-8 object-cover'></img>
                            <input
                                className={`${donation > parseFloat(ethers.utils.formatUnits(balance as ethers.BigNumber, 6)) ? 'border-red-500' : 'border-gray'} border-2 rounded-lg text-right w-20 p-2`}
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
                </div>
            }
        </div >
        
    );
};

export default Project;
