import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    const supabase = await createClient();
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('messages').select('*').eq('id', id).single();

    if (error) {
        if (error.code === 'PGRST116') {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
};
