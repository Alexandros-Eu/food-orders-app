import { useFormStatus } from "react-dom";

export default function SubmitButton({msg, ...props})
{
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} {...props}>{pending ? "Processing..." : msg}</button>
    )
}