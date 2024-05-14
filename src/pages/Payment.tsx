import { AiFillApple, AiOutlineCreditCard, AiOutlineGoogle } from 'react-icons/ai';
import { BsPaypal } from 'react-icons/bs';
import { SiBitcoin } from 'react-icons/si';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react';
import { BookingDetailsContext } from '../context/BookingDetailsProvider';
import FlightCartCard from '../components/card/FlightCartCard';
import { LoadingSpinner } from '../components/LoadingGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosPrivate from '../api/axios';

const paymentSchema = z
    .object({
        holderName: z.string().min(1, { message: 'Name is required' }),
        cardNumber: z
            .number()
            .min(1, { message: 'Number is required' })
            .int()
            .positive({ message: 'Card number must be a positive integer' }),
        ccv: z
            .number()
            .int()
            .min(100, { message: 'CCV must be at least 3 digits' })
            .max(999, { message: 'CCV must be at most 3 digits' }),
        expiryDate: z
            .string()
            .min(1, { message: 'Date is required' })
            .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, { message: 'Date must be in MM/YY format' }),
    })
    .required();

type PaymentPageProps = z.infer<typeof paymentSchema>;

const Payment = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PaymentPageProps>({ mode: 'onSubmit', reValidateMode: 'onBlur', resolver: zodResolver(paymentSchema) });

    const {
        setStep,
        paymentInfo,
        setPaymentInfo,
        selectedFlight,
        passengerData,
        emergencyContactData,
        selectedPackage,
        travelInsurance,
    } = useContext(BookingDetailsContext);

    const navigate = useNavigate();

    const [selectedPayment, setSelectedPayment] = useState('Credit card');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isPaying, setIsPaying] = useState<boolean>(false);
    useEffect(() => {
        setStep(2);
    }, []);

    const handlePaymentSelection = (payment: string) => {
        setSelectedPayment(payment);
        console.log(payment);
        if (payment === 'Google pay' || payment === 'Apple pay' || payment === 'Paypal' || payment === 'Crypto') {
            setAlertMessage(
                `${payment} payment method is not available at the moment. Please select another payment method.`
            );
            setShowAlert(true);
        }
    };

    const onSubmit = async (data: PaymentPageProps) => {
        setPaymentInfo({
            holderName: data.holderName,
            cardNumber: data.cardNumber,
            ccv: data.ccv,
            expiryDate: data.expiryDate,
        });
        // navigate('/booking/confirm');
        console.log(paymentInfo);
        console.log(selectedFlight);
        console.log(passengerData);
        console.log(emergencyContactData);
        console.log(selectedPackage);
        console.log(travelInsurance);
        // try {
        //     const res = await axiosPrivate.post('/booking', {
        //         flight: selectedFlight,
        //         passengers: passengerData,
        //         emergencyContact: emergencyContactData,
        //         package: selectedPackage,
        //         travelInsurance: travelInsurance,
        //         payment: paymentInfo,
        //     });
        //     console.log(res.data);
        //     navigate('/booking/confirm');
        // } catch (error) {
        //     console.error(error);
        // }
    };

    // const submitInputs = (e) => {
    //     e.preventDefault();
    //     const { name, number, ccv, date } = paymentInfo;
    //     if (name.trim() !== '' && number.trim() !== '' && ccv.trim() !== '' && date.trim() !== '') {
    //         setIsPaying(true);
    //         setTimeout(() => {
    //             console.log('Payment sent successfully');
    //             setIsPaying(false);
    //             if (!isPaying) {
    //                 navigate('/booking/confirm');
    //             }
    //         }, 3000);
    //     } else {
    //         console.log('Please fill the card details');
    //     }
    // };

    const onClose = () => {
        setShowAlert(false);
        setSelectedPayment('Credit card');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const isInputComplete =
        paymentInfo.holderName !== '' &&
        paymentInfo.cardNumber != 0 &&
        paymentInfo.expiryDate !== '' &&
        paymentInfo.ccv != 0;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal isOpen={showAlert} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Sorry for inconvenience</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>{alertMessage}</ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <div className="relative max-w-6xl mx-auto">
                    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-x-10">
                        <div className="w-full lg:w-[686px] flex flex-col items-start gap-12 pr-4">
                            <div className="flex flex-col items-start gap-2 w-full">
                                <h1 className="text-2xl font-semibold  text-[#605DEC]">Payment method</h1>
                                <p className="text-[#7C8DB0] text-base font-normal">
                                    Select a payment method below. Agado processes your payment securely with end-to-end
                                    encryption.
                                </p>
                            </div>
                            <div className="w-full cursor-pointer h-12 border-2 border-royal-blue-500 flex justify-between items-center rounded">
                                <p
                                    onClick={() => handlePaymentSelection('Credit card')}
                                    className={`w-full h-full flex items-center justify-center gap-1 text-sm sm:text-base ${selectedPayment === 'Credit card' ? 'bg-[#605DEC] text-[#FAFAFA]' : 'text-[#605DEC] hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200'}`}
                                >
                                    <AiOutlineCreditCard />
                                    <span>Credit card</span>
                                </p>
                                <p
                                    onClick={() => handlePaymentSelection('Google pay')}
                                    className={`text-sm sm:text-base w-full h-full flex items-center justify-center gap-1 ${selectedPayment === 'Google pay' ? 'bg-[#605DEC] text-[#FAFAFA]' : 'text-[#605DEC] hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200'}`}
                                >
                                    <AiOutlineGoogle />
                                    <span>Google pay</span>
                                </p>
                                <p
                                    onClick={() => handlePaymentSelection('Apple pay')}
                                    className={`text-sm sm:text-base w-full h-full flex items-center justify-center gap-1 ${selectedPayment === 'Apple pay' ? 'bg-[#605DEC] text-[#FAFAFA]' : 'text-[#605DEC] hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200'}`}
                                >
                                    <AiFillApple />
                                    <span>Apple pay</span>
                                </p>
                                <p
                                    onClick={() => handlePaymentSelection('Paypal')}
                                    className={`text-sm sm:text-base w-full h-full flex items-center justify-center gap-1 ${selectedPayment === 'Paypal' ? 'bg-[#605DEC] text-[#FAFAFA]' : 'text-[#605DEC] hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200'}`}
                                >
                                    <BsPaypal />
                                    <span>Paypal</span>
                                </p>
                                <p
                                    onClick={() => handlePaymentSelection('Crypto')}
                                    className={`text-sm sm:text-base w-full h-full flex items-center justify-center gap-1 ${selectedPayment === 'Crypto' ? 'bg-[#605DEC] text-[#FAFAFA]' : 'text-[#605DEC] hover:bg-[#605DEC] hover:text-[#FAFAFA] focus:bg-[#605DEC] focus:text-[#FAFAFA] transition-all duration-200'}`}
                                >
                                    <SiBitcoin />
                                    <span>Crypto</span>
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-start justify-start gap-5">
                                <h2 className="text-[#6E7491] text-xl">Credit card details</h2>
                                <form className="w-full h-full flex flex-col items-start justify-start gap-5">
                                    <FormControl isInvalid={!!errors.holderName}>
                                        <Input
                                            {...register('holderName')}
                                            type="text"
                                            size="lg"
                                            focusBorderColor="purple.200"
                                            placeholder="Name on card"
                                            value={paymentInfo.holderName}
                                            name="holderName"
                                            onChange={handleInputChange}
                                            className="placeholder:text-md text-slate-500 pt-0.5"
                                        />
                                        <FormErrorMessage>{errors.holderName?.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errors.cardNumber}>
                                        <Input
                                            {...register('cardNumber', { valueAsNumber: true })}
                                            type="number"
                                            size="lg"
                                            focusBorderColor="purple.200"
                                            placeholder="Card Number"
                                            value={paymentInfo.cardNumber}
                                            name="cardNumber"
                                            onChange={handleInputChange}
                                            className="placeholder:text-md text-slate-500 pt-0.5"
                                        />
                                        <FormErrorMessage>{errors.cardNumber?.message}</FormErrorMessage>
                                    </FormControl>
                                    <div className="flex items-center justify-center gap-5">
                                        <FormControl isInvalid={!!errors.expiryDate}>
                                            <Input
                                                {...register('expiryDate')}
                                                type="text"
                                                size="lg"
                                                focusBorderColor="purple.200"
                                                placeholder="Expiration date [MM/YY]"
                                                value={paymentInfo.expiryDate}
                                                name="expiryDate"
                                                onChange={handleInputChange}
                                                className="placeholder:text-md text-slate-500 pt-0.5"
                                            />
                                            <FormErrorMessage>{errors.expiryDate?.message}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={!!errors.ccv}>
                                            <Input
                                                {...register('ccv', { valueAsNumber: true })}
                                                type="number"
                                                size="lg"
                                                focusBorderColor="purple.200"
                                                placeholder="CCV"
                                                value={paymentInfo.ccv}
                                                name="ccv"
                                                onChange={handleInputChange}
                                                className="placeholder:text-md text-slate-500 pt-0.5"
                                            />
                                            <FormErrorMessage>{errors.ccv?.message}</FormErrorMessage>
                                        </FormControl>
                                    </div>
                                </form>
                            </div>
                            <div className="w-full flex flex-col items-start justify-start gap-5">
                                <div className="flex flex-col items-start justify-start gap-3">
                                    <h2 className="text-[#6E7491] text-xl">Cancellation policy</h2>
                                    <p className="text-[#7C8DB0] text-base font-normal">
                                        This flight has a flexible cancellation policy. If you cancel or change your
                                        flight up to 30 days before the departure date, you are eligible for a free
                                        refund. All flights booked on Adago are backed by our satisfaction guarantee,
                                        however cancellation policies vary by airline. See the{' '}
                                        <span className="text-[#605CDE]"> full cancellation policy</span> for this
                                        flight.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <button
                                    className="cursor-pointer px-4 py-2 border-[1px] bg-slate-50 border-slate-500 
                    text-slate-500 rounded hover:bg-slate-500 hover:text-white transition-all duration-200"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    ย้อนกลับ
                                </button>
                                <div>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-4 py-2 border-[1px] border-royal-blue-500 text-royal-blue-500 
                            rounded hover:bg-royal-blue-500 hover:text-white transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-300 
                            disabled:border-slate-200 disabled:cursor-not-allowed"
                                        disabled={!isInputComplete}
                                    >
                                        ยืนยันการชำระเงิน
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col justify-end items-start lg:items-end">
                            {/* <div className="mt-5">
                            <button
                                className={`py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200 ${!isInputComplete && 'pointer-events-none opacity-50'}`}
                                onClick={submitInputs}
                                disabled={!isInputComplete}
                            >
                                Confirm and pay
                            </button>
                        </div> */}
                            <FlightCartCard flight={selectedFlight} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Payment;
