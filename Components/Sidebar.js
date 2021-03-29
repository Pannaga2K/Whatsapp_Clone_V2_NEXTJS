import styled from "styled-components"; 
import {Avatar, Button, IconButton} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
    const [chatSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt("ENTER AN EMAIL ADDRESS");
        if(!input) return null;

        if(EmailValidator.validate(input) && input != user.email && !chatAlreadyExists(input)) {
            // ADD CHAT
            db.collection("chats").add({
                users: [user.email, input],
            })
        }
    }

    const chatAlreadyExists = (recipientEmail) => {
        return !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail?.length > 0))
    }

    chatSnapshot?.docs.map(chat => {
        console.log(chat.data().users);
    })

    return (
        <Container className="sidebar" >
            <Header>
                <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon style={{color: "whitesmoke"}} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{color: "whitesmoke"}} />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon style={{color: "whitesmoke"}} />
                <SearchInput placeholder="SEARCH IN CHAT" ></SearchInput>
            </Search>
            <SidebarButton onClick={createChat} >NEW CHAT</SidebarButton>

            {chatSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid #1f1f1f;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    background-color: #0f0f0f;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: #0f0f0f;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 2px solid #1f1f1f;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`

`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-around;
    background-color:#0f0f0f;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    background-color: black;
    color: whitesmoke;
    margin-left: 10px;
    padding-left: 10px;
    flex: 1;
    height: 45px;
`;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-radius: 0px;
        color: whitesmoke;
        background-color: #0f0f0f;
        border-top: 1px solid #1f1f1f;
        border-bottom: 1px solid #1f1f1f;
    }
`;

// .MuiSvgIcon-root