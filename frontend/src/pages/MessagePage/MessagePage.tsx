import { useEffect, useRef, useState } from "react";
import Talk from 'talkjs';
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import CryptoJS from "crypto-js";

export const MessagePage = (props: any = null) => {
    const inboxEl = useRef<HTMLDivElement | null>(null);
    const [talkLoaded, markTalkLoaded] = useState(false);

    const user = useSelector(selectUser);
    const location = useLocation();
    
    useEffect(() => {
        Talk.ready.then(() => markTalkLoaded(true));
        if (talkLoaded) {
            const currentUser = new Talk.User({
                id: user.id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
                photoUrl: '../../common/img/avatar.png',
                welcomeMessage: 'Hello!',
                role: 'default',
              });

              const session = new Talk.Session({
                appId: 'tFS6jO4a',
                me: currentUser,
                // signature: CryptoJS.HmacSHA256(String(user.id), "sk_test_Ll6S8AaOALijGH2NDdHXGnxd6cGPUhQd").toString(CryptoJS.enc.Hex).toUpperCase()
              });
              
              if(location.state && location.state.email !== user.email) {
              
                const otherUser = new Talk.User({
                  id: location.state.id,
                  name: location.state.name,
                  email: location.state.name,
                  photoUrl: '../../common/img/avatar.png',
                  welcomeMessage: 'Hello!',
                  role: 'default',
                });
                
                
                const conversationId = Talk.oneOnOneId(currentUser, otherUser);
                const conversation = session.getOrCreateConversation(conversationId);
                conversation.setParticipant(currentUser);
                conversation.setParticipant(otherUser);
                

                const inbox = session.createInbox();
                inbox.select(conversation);
                inbox.mount(inboxEl.current);
              } else {
                const inbox = session.createInbox();
                inbox.mount(inboxEl.current);
              }

              
              return () => session.destroy();
        }
    }, [talkLoaded]);

    return (
        <div style={{height: "100%"}}ref={inboxEl} />
    )
}