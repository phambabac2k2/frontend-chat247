import {useChatStore} from '../../stores/useChatStore';
import DirectMessageCard from './DirectMessageCard';
const DirectMessageList = () => {
  const {conversations} = useChatStore();
  if (!conversations) return null;

  const list: any[] = Array.isArray(conversations)
    ? conversations
    : (conversations as any)?.conversations || [];
  const directConversations = list.filter((c: any) => c.type === 'direct');

  return (
    <div className='flex overflow-auto space-y-2 p-2'>
      {
        directConversations.map((conversation) => (
          <DirectMessageCard key={conversation._id} conversation={conversation} />
        ))
      }
    </div>
  )
}

export default DirectMessageList