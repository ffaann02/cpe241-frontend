import {
    Box,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BookingDetailsContext } from '../../context/BookingDetailsProvider';
const steps = [{ title: 'กรอกผู้โดยสาร' }, { title: 'เลือกที่นั่ง' }, { title: 'ชำระเงิน' }, { title: 'ยืนยันการจอง' }];

const BookingNavbar = () => {
    const {step} = useContext(BookingDetailsContext);
    console.log(step);
    const { activeStep } = useSteps({
        index: step,
        count: steps.length,
    });
    return (
        <div className="fixed flex w-full bg-white drop-shadow-md z-[100] -mt-[60px]">
            <div className="m-auto max-w-6xl w-full flex gap-x-12 h-16 px-4">
                <Link to="/">
                    <div className="h-full py-4">
                        <img src={Logo} className="h-full" />
                    </div>
                </Link>
                <Stepper index={step} className="w-full">
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>
    );
};
export default BookingNavbar;
