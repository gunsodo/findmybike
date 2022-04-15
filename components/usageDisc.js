import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'

export default function UsageDisc() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
    );

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
        }
    };

    const data = {
        labels: ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
        datasets: [
            {
                data: [30, 40, 50, 20, 25, 45, 35],
                borderRadius: 8,
                backgroundColor: 'rgb(29 78 216)',
            }
        ]
    };

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <span>Usage History</span>
                        <ChevronUpIcon
                            className={`${open ? 'transform rotate-180' : ''
                                } w-5 h-5 text-gray-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <Bar data={data} options={options} />
                        <p className='mt-2'>Your bike in the past 7 days has traveled {data.datasets[0].data.reduce((a, b) => a + b)} kilometers.</p>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure >
    )
}