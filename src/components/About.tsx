import Head from 'next/head'

export default function About() {
    return (
        <div>
            <div className="relative flex min-h-screen flex-col justify-center gap-12 overflow-hidden bg-gray-50 py-6 px-5 sm:py-12">
                <img src="/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
                <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="animate-fadeIn max-w-4xl mx-auto flex justify-center items-center scroll-smooth rounded-lg bg-white px-5 py-0 shadow-xl ring-1 ring-gray-900/5 ">
                    <div className="animate-fadeIn max-w-4xl px-8 py-16 text-center">
                        <h1 className="text-5xl text-right pr-16 mb-8">
                            We aim to leverage <strong>Web3</strong> to empower people to <strong>impact</strong> their local <strong>communities</strong> like never before. Individuals post community service projects, donors <strong>support</strong> projects, and helpers complete projects to <strong>earn rewards</strong>.         </h1>
                    </div>
                </div>
            </div>

        </div>
    )
}