export default function Logo({ size }) {
    return (
        <div className='fixed top-0 left-0 ml-6 mt-6 z-20 p-0.5 rounded-md border-2 
      border-black bg-white drop-shadow-lg cursor-pointer transition hover:-translate-y-0.5 hover:-translate-x-0.5'>
            <div className='flex flex-row items-center space-x-4 rounded-sm px-2 py-1'>
                <div className={"h-" + size + " w-" + size}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className={"h-8 w-8"}
                        preserveAspectRatio="xMidYMid meet" viewBox={"0 0 24 24"}>
                        <path fill="currentColor" d="m18.18 10l-1.7-4.68A2.008 2.008 0 0 0 14.6 4H12v2h2.6l1.46 
                4h-4.81l-.36-1H12V7H7v2h1.75l1.82 5H9.9c-.44-2.23-2.31-3.88-4.65-3.99C2.45 9.87 0 12.2 0 
                15c0 2.8 2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h4.2c.44 2.23 2.31 3.88 4.65 3.99c2.8.13 5.25-2.19 
                5.25-5c0-2.8-2.2-5-5-5h-.82zM7.82 16c-.4 1.17-1.49 2-2.82 2c-1.68 0-3-1.32-3-3s1.32-3 3-3c1.33 
                0 2.42.83 2.82 2H5v2h2.82zm6.28-2h-1.4l-.73-2H15c-.44.58-.76 1.25-.9 2zm4.9 4c-1.68 
                0-3-1.32-3-3c0-.93.41-1.73 1.05-2.28l.96 2.64l1.88-.68l-.97-2.67c.03 0 .06-.01.09-.01c1.68 
                0 3 1.32 3 3s-1.33 3-3.01 3z" /></svg>
                </div>
                <p className='text-lg font-medium'>Find My Bike</p>
            </div>
        </div>
    )
}