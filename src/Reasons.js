export default function Reasons({weakness}) {

    const style = {
        marginTop: '.5rem',
        color: 'hsl(260, 80%, 80%)'
    }

    console.log(weakness) 

    return(
        <>
            <div style={style}>
               {weakness.message}
            </div>
        </>
    )
}