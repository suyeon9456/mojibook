import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const supabase = await createClient();
    const { message } = await request.json();

    const { data, error } = await supabase.from('messages').insert({ message }).select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data?.[0], { status: 201 });
};
