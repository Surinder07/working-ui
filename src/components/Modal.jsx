const Modal = (props) => {

    const closeModal = () => {
        props.setShowModal(false)
    }

    const modalClass = props.showModal ? 'flex' : 'hidden';

    return (
        <div className={`${modalClass} h-screen w-screen items-center justify-center text-center bg-black/30 box-border`} 
        onClick={closeModal} style={{position:'fixed', zIndex:'30', top:'0', left:'0'}}>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
                <div className="mt-2">
                    <p>{props.children}</p>
                </div>
                <div className="mt-4">
                    <button type="button"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        Accept and Close
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Modal;