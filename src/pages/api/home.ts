import { getHome } from '@/services/home';
import { NextRequest, NextResponse, NextMiddleware, NextFetchEvent } from 'next/server';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import axios from '@/utils/axios';

export const middleware: NextMiddleware = async (req: NextRequest, ev: NextFetchEvent) => {
  axios.defaults.adapter = fetchAdapter;

  // Get the page from the url params
  const urlParams = new URLSearchParams(req.nextUrl.search);

  const page = urlParams.get("page");

  const data = await getHome(Number(page));

  return NextResponse.json(data);
};

export const config = {
  runtime: 'experimental-edge',
};