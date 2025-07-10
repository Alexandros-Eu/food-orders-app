export default function SubmitButton({msg, ...props})
{
    return (
        <button {...props}>{msg}</button>
    )
}