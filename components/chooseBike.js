import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

<<<<<<< HEAD
export default function ChooseBike({ trackers, setter }) {
=======
export default function ChooseBike({ bikes }) {
    let buttonClassName = "flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 rounded-lg"
>>>>>>> ff59048f14d399bf7b708b93ea1c4d3899e30174
    return (
        <Disclosure as="div" className="flex-row w-full relative inline-block text-left">
            {({ open }) => (
                <>
                    <Disclosure.Button className={open ? buttonClassName : buttonClassName + " hover:bg-gray-200"}>
                        <span>View another bike</span>
                        <ChevronUpIcon
                            className={`${open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-4 text-sm text-gray-500">
                        {trackers && trackers.map(tracker =>
                            <div key={tracker.name}>
                                <div 
                                    className='text-gray-700 block px-4 py-2 text-sm rounded-md hover:bg-gray-100 hover:text-gray-900'
                                    onClick={() => setter(tracker)}
                                >
                                    {tracker.name}
                                </div>
                            </div>)}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure >
    )
}
