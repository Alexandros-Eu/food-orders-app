import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const Success = forwardRef(function Success(props, ref)
{
    const modal = useRef(null);

    useImperativeHandle(ref, () => {
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
        </dialog>,
        document.getElementById("modal"))
    )
});

export default Success;