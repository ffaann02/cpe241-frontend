interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    const modalElement = document.getElementById('paymentModal') as HTMLDialogElement;
    if (modalElement !== null) {
        modalElement.showModal();
    }
    return (
        <dialog id="paymentModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Alert!</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
