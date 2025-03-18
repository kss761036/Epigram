import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { axiosServerInstance } from '@/utils/axios';

async function handler(req: NextRequest, method: string) {
  const url = `${req.nextUrl.pathname.replace('/api', '')}${req.nextUrl.search}`;
  const body = await req.json().catch(() => ({}));

  try {
    let response;

    switch (method) {
      case 'GET':
        response = await axiosServerInstance.get(url);
        break;
      case 'POST':
        response = await axiosServerInstance.post(url, body);
        break;
      case 'PUT':
        response = await axiosServerInstance.put(url, body);
        break;
      case 'PATCH':
        response = await axiosServerInstance.patch(url, body);
        break;
      case 'DELETE':
        response = await axiosServerInstance.delete(url);
        break;
      default:
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

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
