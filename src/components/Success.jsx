import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

/**
 * A Success component modal that flashes information about the success of the checkout
 * Utilizes refs to handle the open and closing of the modal (useRef, forwardRef, useImperativeHandle)
 * Uses createPortal to render the modal in it's own DOM node
 */
const Success = forwardRef(function Success({onSuccessClose}, ref)
{
    const successDialog = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            open() {
                successDialog.current.showModal();
            },
            close() {
                successDialog.current.close();
            }
        }
    }, [])

    return (
        createPortal(<dialog className="modal" ref={successDialog} onClose={() => onSuccessClose("close-success")}>
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