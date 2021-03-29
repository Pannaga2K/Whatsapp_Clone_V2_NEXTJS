import styled from "styled-components"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import moment from "moment";

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>{message.message}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message;

const Container = styled.div`
    color: whitesmoke;
`;

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: black;
`;

const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    color: black;
    text-align: left;
`;

const Timestamp = styled.span`
    color: grey;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;