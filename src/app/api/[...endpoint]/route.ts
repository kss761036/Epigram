import { NextRequest, NextResponse } from 'next/server';
import axios, { Method } from 'axios';
import { axiosServerInstance } from '@/utils/axios';

const METHODS_WITHOUT_BODY = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];
const NO_BODY_STATUS = [204, 205];

async function handler(req: NextRequest, method: Method) {
  const url = `${req.nextUrl.pathname.replace('/api', '')}${req.nextUrl.search}`;
  const isBodyAllowed = !METHODS_WITHOUT_BODY.includes(method.toUpperCase());
  const body = await parseRequestBody(req);

  try {
    const response = await axiosServerInstance({
      method,
      url,
      ...(isBodyAllowed && { data: body }),
    });

    const status = response.status;
    const shouldReturnEmptyBody = NO_BODY_STATUS.includes(status);

    if (shouldReturnEmptyBody) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json(response.data, {
      status,
    });
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

export async function parseRequestBody(req: NextRequest): Promise<unknown> {
  const contentType = req.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      return await req.json();
    }

    if (
      contentType.includes('multipart/form-data') ||
      contentType.includes('application/x-www-form-urlencoded')
    ) {
      return await req.formData();
    }

    return await req.text();
  } catch {
    return undefined;
  }
}
