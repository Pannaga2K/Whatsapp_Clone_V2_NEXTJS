import {Circle} from "better-react-spinkit";

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG16.png" alt="..." style={{marginBottom: 20}} height={200} />
                <Circle color="#0f0f0f" size={60} />
            </div>
        </center>
    )
}

export default Loading;
