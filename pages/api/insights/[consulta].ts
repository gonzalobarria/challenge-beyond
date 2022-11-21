import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { FIELDS_TO_FIX } from 'components/constants';
import { fixJson, getJSONStructureFromCSV } from 'components/utiles';
import { getFinalJson } from 'components/stats';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await getJSONStructureFromCSV('instagram_influencers.csv');

    fixJson(data, FIELDS_TO_FIX);

    res.json(getFinalJson(req, data));
  } catch (error) {
    res.status(400).send({ msg: 'error' });
  }
});

export default handler;
