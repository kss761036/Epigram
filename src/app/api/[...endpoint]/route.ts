import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { axiosServerInstance } from '@/utils/axios';

async function handler(req: NextRequest, method: string) {
  const apiUrl = `${req.nextUrl.pathname.replace('/api', '')}`;

  try {
    let response;

    switch (method) {
      case 'GET':
        response = await axiosServerInstance.get(apiUrl);
        break;
      case 'POST':
        response = await axiosServerInstance.post(apiUrl, await req.json());
        break;
      case 'PUT':
        response = await axiosServerInstance.put(apiUrl, await req.json());
        break;
      case 'PATCH':
        response = await axiosServerInstance.patch(apiUrl, await req.json());
        break;
      case 'DELETE':
        response = await axiosServerInstance.delete(apiUrl);
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
