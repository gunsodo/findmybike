import { Dialog } from "@headlessui/react"
import { useState } from "react";


async function AddTracker(name, tid) {
    if(!name || !tid) return 0;
    const body = JSON.stringify({
        tid: tid,
        name: name,
        uid: 0
    })
    const res = await fetch('/api/tracker/create',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: body
    });
    return await res.json();
}

export default function RegisterBike({ isOpen, setIsOpen }) {
    const [name, setName] = useState("")
    const [tid, setTid] = useState("")

    return (
        <div>
            <Dialog
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto h-screen w-screen"
                onClose={() => setIsOpen(false)}
                open={isOpen}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0" />

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <div className="inline-block w-full max-w-md p-6 my-8 space-y-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg border-2 border-black">
                        <Dialog.Title
                            as="h2"
                            className="text-xl font-bold leading-6 text-gray-900"
                        >
                            Register New Vehicle
                        </Dialog.Title>

                        {/* <div className="flex flex-col space-y-2">
                            <p className="text-xs text-gray-500">
                                Vehicle Type
                            </p>
                            <select type='text' className="w-full py-2 px-2 border-[0.1em] rounded-md">
                                <option value="bike">Bike</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="scooter">Scooter</option>
                                <option value="car">Car</option>
                            </select>
                        </div> */}

                        <div className="flex flex-col space-y-2">
                            <p className="text-xs text-gray-500">
                                Tracker ID
                            </p>
                            <input value={tid} onChange={(e) => setTid(e.target.value)}  type='text' className="w-full py-2 px-2 border-[0.1em] rounded-md"></input>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <p className="text-xs text-gray-500">
                                Name Your Bike
                            </p>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' className="w-full py-2 px-2 border-[0.1em] rounded-md"></input>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={async() => {
                                    const res = await AddTracker(name, tid)
                                    if(res) setIsOpen(false)
                                    else 0
                                }}//setIsOpen(false)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}