import { useState } from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import nextConnect from 'next-connect';
import { usePapaParse } from 'react-papaparse';

const handler = nextConnect();
const MILES = 1000;
const MILLONES = 1000000;

const fixJson = (json) => {
  json.forEach((j) => {
    if (j['Followers'].indexOf('M') !== -1) {
      let val = j['Followers'];

      val = parseFloat(val.split('M')[0]) * MILLONES;

      j['Followers'] = val;
    } else if (j['Followers'].indexOf('K') !== -1) {
      let val = j['Followers'];

      val = parseFloat(val.split('K')[0]) * MILES;

      j['Followers'] = val;
    }

    if (j['Authentic engagement\r\n'].indexOf('M') !== -1) {
      let val = j['Authentic engagement\r\n'];

      val = parseFloat(val.split('M')[0]) * MILLONES;

      j['Authentic engagement\r\n'] = val;
    } else if (j['Authentic engagement\r\n'].indexOf('K') !== -1) {
      let val = j['Authentic engagement\r\n'];

      val = parseFloat(val.split('K')[0]) * MILES;

      j['Authentic engagement\r\n'] = val;
    }

    if (j['Engagement avg\r\n'].indexOf('M') !== -1) {
      let val = j['Engagement avg\r\n'];

      val = parseFloat(val.split('M')[0]) * MILLONES;

      j['Engagement avg\r\n'] = val;
    } else if (j['Engagement avg\r\n'].indexOf('K') !== -1) {
      let val = j['Engagement avg\r\n'];

      val = parseFloat(val.split('K')[0]) * MILES;
      j['Engagement avg\r\n'] = val;
    }
  });
};

handler.get(async (req, res) => {
  try {
    const { readString } = usePapaParse();
    let data;

    const csvDirectory = path.join(process.cwd(), 'csv');
    const fileContents = await fs.readFile(
      csvDirectory + '/instagram_influencers.csv',
      'utf8'
    );

    const handleReadString = (content) => {
      readString(content, {
        worker: true,
        header: true,
        complete: (results) => {
          data = results.data;
        },
      });
    };

    handleReadString(fileContents);

    fixJson(data);

    

    res.json(data);
  } catch (error) {
    console.log('error', error);
    res.status(400).send({ msg: 'error' });
  }
});

export default handler;
