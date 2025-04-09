import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { fetchMojiMessage } from '@/remotes/chat-direct';

type MojiMessageResponse = string;

const useMojiMessage = (): UseMutationResult<MojiMessageResponse, Error, void, unknown> => {
    const mutationResult = useMutation<MojiMessageResponse, Error, void>({
        mutationFn: fetchMojiMessage,
    });
    return mutationResult;
};

export default useMojiMessage;
