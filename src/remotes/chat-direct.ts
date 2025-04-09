import { OpenAPI } from '@/models/chat-direct';
import apiClient from '@/lib/axios';

export const fetchMojiMessage = async (): Promise<string> => {
    const { data } = await apiClient.post<OpenAPI>('/chat-direct', {
        prompt: '모지 응답!',
    });
    const message = data.choices?.[0]?.message?.content || JSON.stringify(data);
    return message;
};
