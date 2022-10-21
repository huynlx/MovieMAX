import { getHome } from '@/services/home';
import axios from '@/utils/axios';
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('vao day xem');

  const { page } = req.query as { page: string; };

  console.log(page);


  const data = await getHome(Number(page));

  res.send(data);
};