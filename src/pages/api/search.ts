/**
 * Node.js Runtime
 */
import { searchWithKeyWord } from '@/services/search';
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { q: keyword } = req.query as { q: string; };

  const data = await searchWithKeyWord(keyword);

  console.log(data);


  res.send(data);
};