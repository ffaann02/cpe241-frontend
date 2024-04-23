interface StepProps {
    currentStep: number;
}

const Steps = ({ currentStep }: StepProps) => {
    return (
        <>
            <div className="flex justify-center mt-14">
                <div className="steps">
                    <li className={currentStep >= 1 ? 'step step-primary' : 'step'}>Select Your Flight</li>
                    <li className={currentStep >= 2 ? 'step step-primary' : 'step'}>Passenger Info</li>
                    <li className={currentStep >= 3 ? 'step step-primary' : 'step'}>Seat Selection</li>
                    <li className={currentStep >= 4 ? 'step step-primary' : 'step'}>Payment</li>
                    <li className={currentStep >= 5 ? 'step step-primary' : 'step'}>Bon voyage!</li>
                </div>
            </div>
        </>
    );
};

export default Steps;
