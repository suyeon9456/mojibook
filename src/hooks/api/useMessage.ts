import { Message } from '@/models/message';
import { getMessage, insertMessage } from '@/remotes/message';
import { messageQueryKey } from '@/utils/queryKeyFactory';
import {
    queryOptions,
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';

type InsertMessageResult = UseMutationResult<Message, Error, string, unknown>;
type GetMessageResult = UseQueryResult<Message, Error>;

interface UseMessageResult {
    insertMessage: InsertMessageResult['mutateAsync'];
    message: GetMessageResult['data'];
}

const useMessage = ({ messageId }: { messageId?: Message['id'] }): UseMessageResult => {
    const { data: message, ...query } = useQuery(getMessageOptions(messageId));
    const { mutateAsync, ...mutation } = useMutation({
        mutationFn: (message: Message['message']) => insertMessage(message),
    });

    return { insertMessage, message };
};

const getMessageOptions = (messageId?: Message['id']) =>
    queryOptions<Message>({
        queryKey: messageQueryKey.detail(messageId),
        queryFn: () => getMessage(messageId),
        enabled: messageId != null,
    });

export default useMessage;
