import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../Components/ChatScreen";
import Sidebar from "../../Components/Sidebar";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);

    return (
        <Container>
            <Head>
                <title>CHAT </title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    // PREPARE MESSAGES ON THE SERVER
    const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get()

    const messages = messagesRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        // BE --> FE ==> TIMESTAMP'S DATA TYPE CHANGES
        timestamp:  messages.timestamp.toDate().getTime()
    }));

    // PREPARE CHATS
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    // console.log(chat, messages);

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }

}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
`;