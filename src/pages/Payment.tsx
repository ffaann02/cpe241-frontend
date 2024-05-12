import { AiFillApple, AiOutlineCreditCard, AiOutlineGoogle } from 'react-icons/ai';
import { BsPaypal } from 'react-icons/bs';
import { SiBitcoin } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { BookingDetailsContext } from '../context/BookingDetailsProvider';
import FlightCartCard from '../components/card/FlightCartCard';
import { LoadingSpinner } from '../components/LoadingGroup';

const Payment = () => {
    const { setStep, paymentInfo, setPaymentInfo, selectedFlight } = useContext(BookingDetailsContext);

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

    const submitInputs = (e) => {
        e.preventDefault();
        const { name, number, ccv, date } = paymentInfo;
        if (name.trim() !== '' && number.trim() !== '' && ccv.trim() !== '' && date.trim() !== '') {
            setIsPaying(true);
            setTimeout(() => {
                console.log('Payment sent successfully');
                setIsPaying(false);
                if(!isPaying){
                    navigate('/booking/confirm');
                }
            }, 3000);
        } else {
            console.log('Please fill the card details');
        }
    };
    const onClose = () => {
        setShowAlert(false);
        setSelectedPayment('Credit card');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const isInputComplete =
        paymentInfo.name !== '' && paymentInfo.number !== '' && paymentInfo.date !== '' && paymentInfo.ccv !== '';
    return (
        <>
            <LoadingSpinner loading={isPaying} />
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
                                <Input
                                    type="text"
                                    size="lg"
                                    focusBorderColor="purple.200"
                                    placeholder="Name on card"
                                    value={paymentInfo.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    className="placeholder:text-md text-slate-500 pt-0.5"
                                />
                                <Input
                                    type="text"
                                    size="lg"
                                    focusBorderColor="purple.200"
                                    placeholder="Card Number"
                                    value={paymentInfo.number}
                                    name="number"
                                    onChange={handleInputChange}
                                    className="placeholder:text-md text-slate-500 pt-0.5"
                                />
                                <div className="flex items-center justify-center gap-5">
                                    <Input
                                        type="text"
                                        size="lg"
                                        focusBorderColor="purple.200"
                                        placeholder="Expiration date [MM/YY]"
                                        value={paymentInfo.date}
                                        name="date"
                                        onChange={handleInputChange}
                                        className="placeholder:text-md text-slate-500 pt-0.5"
                                    />
                                    <Input
                                        type="text"
                                        size="lg"
                                        focusBorderColor="purple.200"
                                        placeholder="CCV"
                                        value={paymentInfo.ccv}
                                        name="ccv"
                                        onChange={handleInputChange}
                                        className="placeholder:text-md text-slate-500 pt-0.5"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex flex-col items-start justify-start gap-5">
                            <div className="flex flex-col items-start justify-start gap-3">
                                <h2 className="text-[#6E7491] text-xl">Cancellation policy</h2>
                                <p className="text-[#7C8DB0] text-base font-normal">
                                    This flight has a flexible cancellation policy. If you cancel or change your flight
                                    up to 30 days before the departure date, you are eligible for a free refund. All
                                    flights booked on Adago are backed by our satisfaction guarantee, however
                                    cancellation policies vary by airline. See the{' '}
                                    <span className="text-[#605CDE]"> full cancellation policy</span> for this flight.
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
                                    className="cursor-pointer px-4 py-2 border-[1px] border-royal-blue-500 text-royal-blue-500 
                            rounded hover:bg-royal-blue-500 hover:text-white transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-300 
                            disabled:border-slate-200 disabled:cursor-not-allowed"
                                    onClick={submitInputs}
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
        </>
    );
};

export default Payment;
