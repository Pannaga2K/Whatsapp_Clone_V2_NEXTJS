import styled from "styled-components"; 
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from '@material-ui/icons/Mic';
import { useRef, useState } from "react";
import firebase from "firebase";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({chat, messages}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");

    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));

    console.log(messagesSnapshot);

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot?.docs.map(message => (
                <Message key={message.id} user={message?.data().user} message={{...message?.data(), timestamp: message?.data().timestamp?.toDate().getTime()}} />
            ))
        } else {
            console.log(JSON.parse(messages));
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();

        // UPDATE LAST SEEN
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true})

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput("");
        scrollToBottom();
    }

    const recipientEmail = getRecipientEmail(chat.users, user);
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(chat.users, user)));
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const endOfMessageRef = useRef(null);
    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    return (
        <Container>
            <Header>
                {recipient? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar style={{color: "black"}} >{recipientEmail[0].toUpperCase()}</Avatar>
                )}
                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>LAST SEEN {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo dateTime={recipient?.lastSeen?.toDate()} />
                        ) : ("UNAVAILABLE")}</p>
                    ) : (
                        <p>LOADING...</p>
                    )}
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon style={{color: "whitesmoke"}} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color: "whitesmoke"}} />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon style={{color: "whitesmoke"}} />
                <Input placeholder="TYPE TO ADD A NEW MESSAGE" value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >SEND</button>
                <MicIcon style={{color: "whitesmoke"}} />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`
    /* display: flex;
    flex-wrap: wrap; */
`;

const Header = styled.div`
    position: sticky;
    top: 0;
    background-color: #0f0f0f;
    z-index: 100;
    height: 80px;
    display: flex;
    padding: 11px;
    align-items: center;
    border-bottom: 2px solid #1f1f1f;
    width: 100%;
`;

const HeaderInfo = styled.div`
    margin-left: 15px;
    color: whitesmoke;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
    }
`;

const HeaderIcons = styled.div`
    
`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #0f0f0f;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #0f0f0f;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    background-color: black;
    align-items: center;
    padding: 10px;
    margin-left: 15px;
    margin-right: 15px;
    position: sticky;
    bottom: 0;
    color: whitesmoke;
    z-index: 100;
    border: none;
    outline: none;
`;