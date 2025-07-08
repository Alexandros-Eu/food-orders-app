import { useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import { AppContext } from '../state/AppContext.jsx';
import { createPortal } from 'react-dom';

/**
 * A Success component modal that flashes information about the success of the checkout
 * Utilizes refs to handle the open and closing of the modal (useRef, forwardRef, useImperativeHandle)
 * Uses createPortal to render the modal in it's own DOM node
 * Uses AppContext to acess the fn and ref required to handle the modal
 */
const Success = forwardRef(function Success()
{
    const { successModal, handleModalClose: onSuccessClose } = useContext(AppContext);
    const modal = useRef(successModal);

    useImperativeHandle(successModal, () => {
        return {
            open() {
                modal.current.showModal();
            },
            close() {
                modal.current.close();
            }
        }
    }, [])

    return (
        createPortal(<dialog className="modal" ref={modal}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully!</p>
            <p>We will get back to you with more details via email within the next few minutes</p>
            <div className="modal-actions">
                <p>
                    <button className="button" onClick={() => onSuccessClose('close-success')}>Okay</button>
                </p>
            </div>
        </dialog>,
        document.getElementById("modal"))
    )
});

export default Success;