import path from 'path';
import { parse } from 'papaparse';
import { readFileSync } from 'fs';
import { CSV_FOLDER, MILES, MILLONES } from './constants';
import { dataCSV, Influencer } from './interfaces';

export const fixJson = (json: dataCSV[], fieldsToFix: string[]) => {
  try {
    fieldsToFix.map((field: string) => {
      json.forEach((j: any) => {
        if (typeof j[field] !== 'string') return;

        if (j[field].indexOf('M') !== -1)
          j[field] = parseFloat(j[field].split('M')[0]) * MILLONES + '';
        else if (j[field].indexOf('K') !== -1)
          j[field] = parseFloat(j[field].split('K')[0]) * MILES + '';
      });
    });
  } catch (error) {
    throw error;
  }
};

export const fixJsonSalida = (json: Influencer[], fieldsToFix: string[]) => {
  try {
    fieldsToFix.map((field: string) => {
      json.forEach((j: any) => {
        if (typeof j[field] !== 'string') return;

        const numMiles = parseFloat(j[field]) / MILES;
        const numMillones = parseFloat(j[field]) / MILLONES;
        j[field] = numMiles < MILES ? `${numMiles}K` : `${numMillones}M`;
      });
    });
  } catch (error) {
    throw error;
  }
};

export const groupBy = (xs: dataCSV[], key: string) =>
  xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

export const getMaximo = (arr: any[], prop: string) => {
  try {
    let max: any;

    arr.map((a) => {
      if (max == null || parseInt(a[prop]) > parseInt(max[prop])) max = a;
    });

    return max;
  } catch (error) {
    throw error;
  }
};

const parseCSV2JSON = (file: string) => {
  try {
    return new Promise<any[]>((resolve) => {
      parse(file, {
        worker: true,
        header: true,
        complete: (result) => resolve(result.data),
      });
    });
  } catch (error) {
    throw error;
  }
};

const getCSVFileToString = (fileName: string) => {
  try {
    const csvDirectory = path.join(process.cwd(), CSV_FOLDER);
    return readFileSync(`${csvDirectory}/${fileName}`, 'utf8');
  } catch (error) {
    throw error;
  }
};

export const getJSONStructureFromCSV = async (fileName: string) => {
  try {
    const file = getCSVFileToString(fileName);
    return await parseCSV2JSON(file);
  } catch (error) {
    throw error;
  }
};

export const sortSalidaNum = (arr: Influencer[], type: string) =>
  arr.sort((a: any, b: any) => parseFloat(b[type]) - parseFloat(a[type]));

export const sortSalida = (arr: Influencer[]) =>
  arr.sort((a: Influencer, b: Influencer) => ('' + a.cat).localeCompare(b.cat));
