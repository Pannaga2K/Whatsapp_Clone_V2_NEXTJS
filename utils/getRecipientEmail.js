const getRecipientEmail = (users, userLoggedIn) => users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0];             // EXCEPT CURRENT USER

export default getRecipientEmail;
