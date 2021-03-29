import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components"; 
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import {useRouter} from "next/router";

function Chat({id, users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientSnapshot = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user)));
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    console.log(recipientEmail);

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar style={{color: "black"}} >{recipientEmail[0]?.toUpperCase()}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    background-color: #0f0f0f;
    color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 15px;
    word-break: break-word;
    cursor: pointer;

    :hover {
        background-color: black;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;