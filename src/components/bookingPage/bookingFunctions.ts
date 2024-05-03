

const increment = (setPassengerData) => (index: number) => {
    setPassengerData((prevPassengerData) => {
        const updatedPassengerData = [...prevPassengerData];
        updatedPassengerData[index] = {
            ...updatedPassengerData[index],
            count: updatedPassengerData[index].count + 1,
        };
        return updatedPassengerData;
    });
};

const decrement = (setPassengerData) => (index: number) => {
    setPassengerData((prevPassengerData) => {
        const updatedPassengerData = [...prevPassengerData];
        if (updatedPassengerData[index].count > 1) {
            updatedPassengerData[index] = {
                ...updatedPassengerData[index],
                count: updatedPassengerData[index].count - 1,
            };
        }
        return updatedPassengerData;
    });
};

const handleChangePassenger = (setPassengerData, passengerData) => (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index][name] = value;

    if (name === 'dateOfBirth') {
        updatedPassengerData[index][name] = new Date(value);
    }
    setPassengerData(updatedPassengerData);
};

const handleDateOfBirthChange = (setPassengerData, passengerData) => (index: number, value: { startDate: string; endDate: string }) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index].dateOfBirth = value.startDate;
    console.log(updatedPassengerData)
    console.log(updatedPassengerData[index].dateOfBirth)
    setPassengerData(updatedPassengerData);
};

const handleAddPassenger = (setPassengerData, passengerData) => () => {
    setPassengerData([
        ...passengerData,
        {
            firstName: '',
            middleName: '',
            lastName: '',
            suffix: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            count: 1,
        },
    ]);
};

const handleDeletePassenger = (setPassengerData, passengerData) => (index: number) => {
    if (passengerData.length > 1) {
        const updatedPassengerData = [...passengerData];
        updatedPassengerData.splice(index, 1);
        setPassengerData(updatedPassengerData);
    }
};

const handleChangeEmergencyContact = (setEmergencyContactData) => (e: any) => {
    const { name, value } = e.target;
    setEmergencyContactData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleChangeCheckbox = (setUsePassengerDataForEmergencyContact, setEmergencyContactData, passengerData) => (e: any) => {
    const { checked } = e.target;
    setUsePassengerDataForEmergencyContact(checked);

    if (!checked) {
        setEmergencyContactData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        });
    } else {
        const firstPassengerData = passengerData[0];
        setEmergencyContactData({
            firstName: firstPassengerData.firstName,
            lastName: firstPassengerData.lastName,
            email: firstPassengerData.email,
            phoneNumber: firstPassengerData.phoneNumber,
        });
    }
};

const handleSaveAndClose = (passengerData) => () => {
    const isValid = passengerData.every((passenger) => {
        return (
            passenger.firstName.trim() !== '' &&
            passenger.lastName.trim() !== '' &&
            passenger.email.trim() !== '' &&
            passenger.phoneNumber.trim() !== ''
        );
    });

    if (isValid) {
        console.log('Form data saved:', passengerData);
    } else {
        console.log('Please fill in all required fields for each passenger.');
    }
};

const handleSelectSeat = () => {
    console.log('Route to Seat Selection Path');
};

export {
    increment,
    decrement,
    handleChangePassenger,
    handleDateOfBirthChange,
    handleAddPassenger,
    handleDeletePassenger,
    handleChangeEmergencyContact,
    handleChangeCheckbox,
    handleSaveAndClose,
    handleSelectSeat
};