import { NextRequest, NextResponse } from 'next/server';
import axios, { Method } from 'axios';
import { axiosServerInstance } from '@/utils/axios';

async function handler(req: NextRequest, method: Method) {
  const url = `${req.nextUrl.pathname.replace('/api', '')}${req.nextUrl.search}`;
  const body = await req.json().catch(() => ({}));
  const isBodyAllowed = !['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());

  try {
    const response = await axiosServerInstance({
      method,
      url,
      ...(isBodyAllowed && { data: body }),
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return handler(req, 'GET');
}

export async function POST(req: NextRequest) {
  return handler(req, 'POST');
}

export async function PUT(req: NextRequest) {
  return handler(req, 'PUT');
}

export async function PATCH(req: NextRequest) {
  return handler(req, 'PATCH');
}

export async function DELETE(req: NextRequest) {
  return handler(req, 'DELETE');
}
