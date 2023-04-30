import { useEffect, useRef, useState } from "react";
import Talk from 'talkjs';
import { selectUser } from "../../common/Redux/Slices/userSlice";
import { useSelector } from "react-redux";

export const MessagePage = (props: any = null) => {
    const inboxEl = useRef<HTMLDivElement | null>(null);
    const [talkLoaded, markTalkLoaded] = useState(false);

    const user = useSelector(selectUser);


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
        
              /*
              const otherUser = new Talk.User({
                id: '4',
                name: 'test test',
                email: 'test@o2.pl',
                photoUrl: '../../common/img/avatar.png',
                welcomeMessage: 'Hello!',
                role: 'default',
              });
              */

              const session = new Talk.Session({
                appId: 'tFS6jO4a',
                me: currentUser,
              });
              
              /*
              const conversationId = Talk.oneOnOneId(currentUser, otherUser);
              const conversation = session.getOrCreateConversation(conversationId);
              conversation.setParticipant(currentUser);
              conversation.setParticipant(otherUser);
              */

              const inbox = session.createInbox();
              //inbox.select(conversation);
              inbox.mount(inboxEl.current);
              return () => session.destroy();
        }
    }, [talkLoaded]);

    return (
        <div ref={inboxEl} />
    )
}