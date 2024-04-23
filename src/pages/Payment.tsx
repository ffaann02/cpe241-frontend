import { AiFillApple, AiOutlineCreditCard, AiOutlineGoogle } from 'react-icons/ai';
import { BsPaypal } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SiBitcoin } from 'react-icons/si';
import { IoLogoApple } from 'react-icons/io';
import { FaFacebookSquare } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from '../components/paymentPage/modal';
import Steps from '../components/paymentPage/steps';

const Payment = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [ccv, setCcv] = useState('');

    const [selectedPayment, setSelectedPayment] = useState('Credit card');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (showAlert) {
            const modalElement = document.getElementById('paymentModal') as HTMLDialogElement;
            if (modalElement !== null) {
                modalElement.showModal();
            }
        }
    }, [showAlert]);

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

        if (name.trim() !== '' && number.trim() !== '' && ccv.trim() !== '' && date.trim() !== '') {
            console.log('Payment sent successfully');
            navigate('/confirm');
        } else {
            console.log('Please fill the card details');
        }
    };

    return (
        <>
            <Modal
                isOpen={showAlert}
                onClose={() => {
                    setShowAlert(false);
                    setSelectedPayment('Credit card');
                }}
                message={alertMessage}
            />
            <Steps currentStep={4} />
            <div className="relative mb-20">
                <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
                    <div className="w-full lg:w-[686px] flex flex-col items-start gap-12">
                        <div className="flex flex-col items-start gap-2 w-full">
                            <h1 className="titleh1">Payment method</h1>
                            <p className="text-[#7C8DB0] text-base font-normal">
                                Select a payment method below. Agado processes your payment securely with end-to-end
                                encryption.
                            </p>
                        </div>
                        <div className="w-full h-12 md:w-[686px] border-2 border-[#605DEC] flex justify-between items-center rounded">
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
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                />
                                <div className="flex items-center justify-center gap-5">
                                    <input
                                        type="text"
                                        placeholder="Expiration date [MM/YY]"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full sm:w-[240px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="CCV"
                                        value={ccv}
                                        onChange={(e) => setCcv(e.target.value)}
                                        className="w-full sm:w-[216px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="w-full flex flex-col items-start justify-start gap-5">
                            <div className="flex flex-col items-start justify-start gap-2">
                                <h2 className="text-[#6E7491] text-xl">Create an account</h2>
                                <p className="text-[#7C8DB0] text-base font-normal">
                                    Tripma is free to use as a guest, but if you create an account today, you can save
                                    and view flights, manage your trips, earn rewards, and more.
                                </p>
                            </div>
                            <form className="w-full h-full flex flex-col items-start justify-start gap-5 mt-5">
                                <input
                                    type="text"
                                    placeholder="Email address or phone number"
                                    className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full sm:w-[480px] h-full outline-none border-[1px] border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded"
                                />
                            </form>
                            <div className="w-full sm:w-[480px] flex items-center justify-center gap-2 mt-7">
                                <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1 " />
                                <p className="text-[#7C8DB0] text-[18px] leading-6">or</p>
                                <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1" />
                            </div>
                            <div className="w-full sm:w-[480px] flex flex-col items-center justify-center gap-4">
                                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3">
                                    <FcGoogle className="w-[18px] h-[18px]" />
                                    <p className="text-[#605CDE] text-[16px] leading-6">Continue with Google</p>
                                </button>
                                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3">
                                    <IoLogoApple className="w-[18px] h-[18px] text-black" />
                                    <p className="text-[#605CDE] text-[16px] leading-6">Continue with Apple</p>
                                </button>
                                <button className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3">
                                    <FaFacebookSquare className="w-[18px] h-[18px]" />
                                    <p className="text-[#605CDE] text-[16px] leading-6">Continue with Facebook</p>
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-start justify-start gap-5">
                            <div className="flex flex-col items-start justify-start gap-3">
                                <h2 className="text-[#6E7491] text-xl">Cancellation policy</h2>
                                <p className="text-[#7C8DB0] text-base font-normal">
                                    This flight has a flexible cancellation policy. If you cancel or change your flight
                                    up to 30 days before the departure date, you are eligible for a free refund. All
                                    flights booked on Tripma are backed by our satisfaction guarantee, however
                                    cancellation policies vary by airline. See the{' '}
                                    <span className="text-[#605CDE]"> full cancellation policy</span> for this flight.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <Link to="/seat-selection">
                                <button className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                                    Back to seat select
                                </button>
                            </Link>
                            <div>
                                <button
                                    className="hidden lg:block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                                    onClick={submitInputs}
                                >
                                    Confirm and pay
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
                        <div className="mt-5">
                            <button
                                className="py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                                onClick={submitInputs}
                            >
                                Confirm and pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
