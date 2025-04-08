import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { mojiMessageQueryKey } from '@/utils/queryKeyFactory';
import { getMojiMessage } from '@/remotes/chat-direct';

const useMojiMessage = () => {
    const { data: messages } = useSuspenseQuery(getMojiMessageQueryKeys());
    return { messages };
};

const getMojiMessageQueryKeys = () =>
    queryOptions<string>({
        queryKey: mojiMessageQueryKey.base,
        queryFn: () => getMojiMessage(),
    });

export default useMojiMessage;
