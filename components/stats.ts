import {
  groupBy,
  getMaximo,
  fixJsonSalida,
  sortSalida,
  sortSalidaNum,
} from './utiles';
import { dataCSV, Influencer } from './interfaces';
import { NextApiRequest } from 'next';
import { FIELDS_TO_FIX_SALIDA } from './constants';

const getArraySalida = (
  array: Influencer[],
  data: dataCSV,
  cat: string
): Influencer[] => [
  ...array,
  {
    cat,
    influencerName: data['Influencer insta name'],
    followers: data['Followers'],
    engagement: data['Engagement avg\r\n'],
  },
];

export const getInfluencersPerCatByFoll = (data: dataCSV[]): Influencer[] => {
  const groupedByCat1 = groupBy(data, 'category_1');
  const groupedByCat2 = groupBy(data, 'category_2');

  let salida: Influencer[] = [];

  for (let cat in groupedByCat1) {
    salida = getArraySalida(
      salida,
      getMaximo(groupedByCat1[cat], 'Followers'),
      cat
    );
  }

  for (let cat in groupedByCat2) {
    salida = getArraySalida(
      salida,
      getMaximo(groupedByCat2[cat], 'Followers'),
      cat
    );
  }

  return salida;
};

export const getInfluencersPerCountryByEng = (
  data: dataCSV[]
): Influencer[] => {
  try {
    const groupedByCat1 = groupBy(data, 'Audience country(mostly)');

    let salida: Influencer[] = [];

    for (let cat in groupedByCat1) {
      salida = getArraySalida(
        salida,
        getMaximo(groupedByCat1[cat], 'Engagement avg\r\n'),
        cat
      );
    }

    return salida;
  } catch (error) {
    throw error;
  }
};

export const getFinalJson = (req: NextApiRequest, data: dataCSV[]) => {
  const {
    query: { consulta },
  } = req;

  let salida: Influencer[] = [];

  switch (consulta) {
    case 'catfol':
      salida = getInfluencersPerCatByFoll(data);
      sortSalidaNum(salida, 'followers');
      break;
    case 'counteng':
      salida = getInfluencersPerCountryByEng(data);
      sortSalidaNum(salida, 'engagement');
      break;

    default:
      break;
  }

  fixJsonSalida(salida, FIELDS_TO_FIX_SALIDA);

  return salida;
};
