import { FlightData } from '../FlightResult';
import { Step, StepIndicator, StepSeparator, Stepper, useSteps, } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
]

export const Flightdetail= ({ flight}: { flight: FlightData;}) => {
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    });
    return (
        <div>
            <div className="grid grid-cols-10">
                <div className="grid grid-rows-10">
                    <p className='row-start-1'>{flight.departureTime}</p>
                    <p className='row-start-9'>{flight.arrivalTime}</p>
                </div>
                <Stepper index={activeStep} orientation='vertical' height='250px' gap='0' className="ml-4">
                    {steps.map((_, index) => (
                        <Step key={index}>
                            <StepIndicator>
                            </StepIndicator>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <div className="grid grid-rows-10 col-span-4">
                    <p>{flight.from}</p>
                    <p className='text-gray-500'>city</p>
                    <p className='row-start-4 row-span-2'>
                        {flight.airline}
                        <img className="w-10" src={flight.airlineIcon} />
                    </p>
                    <p className='row-start-9'>{flight.destination}</p>
                    <p className='row-start-10 text-gray-500'>city</p>
                </div>
                <div className='place-content-center grid ml-7 gap-x-2'>
                    <InfoOutlineIcon color={'gray.500'}/>
                </div>
                <div className='col-span-2 place-content-center text-gray-500'>
                    <div>Boieng 737</div>
                    <div>ผังที่นั่ง 3-3</div>
                </div>
            </div>
        </div>
    )
}
export default Flightdetail