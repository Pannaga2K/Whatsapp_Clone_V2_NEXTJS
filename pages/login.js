import styled from "styled-components"; 
import Head from "next/head";
import { Button } from "@material-ui/core";
import {auth, provider} from "../firebase";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>LOGIN</title>
            </Head>
            <LoginContainer>
                <Logo src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG16.png" alt="..." />
                <LoginButton onClick={signIn} >SIGN IN WITH GOOGLE</LoginButton>
            </LoginContainer>
        </Container>
    )
}

export default Login;


const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: black;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: #0f0f0f;
    box-shadow: 0px 0px 5px 5px #4f4f4f;
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;

const LoginButton = styled(Button)`
    &&& {
        color: whitesmoke;
        border-radius: 0px;
    }
`;