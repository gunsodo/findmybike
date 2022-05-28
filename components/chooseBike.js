import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

export default function ChooseBike({ bikes }) {
    return (
        <Disclosure as="div" className="flex-row w-full relative inline-block text-left">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 rounded-lg hover:bg-gray-200">
                        <span>View another bike</span>
                        <ChevronUpIcon
                            className={`${open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-4 text-sm text-gray-500">
                        {bikes && bikes.map(bike =>
                            <div key={bike}>
                                <div className='text-gray-700 block px-4 py-2 text-sm rounded-md hover:bg-gray-100 hover:text-gray-900'>
                                    {bike}
                                </div>
                            </div>)}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure >
    )
}
