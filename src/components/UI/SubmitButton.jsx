import { useFormStatus } from "react-dom";

/**
 * A Submit Button UI component that renders a submit btn
 * Utilizes useFormStatus hook in order to disable the button and provide a processing msg
 */
export default function SubmitButton({msg, ...props})
{
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} {...props}>{pending ? "Processing..." : msg}</button>
    )
}