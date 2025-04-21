import apiClient from '@/lib/axios';
import { Message } from '@/models/message';

export const insertMessage = async (message: Message['message']): Promise<Message> => {
    const { data } = await apiClient.post<Message>('/message', {
        message,
    });
    return data;
};

export const getMessage = async (id?: Message['id']): Promise<Message> => {
    if (id == null) throw new Error('Message ID is required');
    const { data } = await apiClient.get<Message>(`/message/${id}`);
    return data;
};
