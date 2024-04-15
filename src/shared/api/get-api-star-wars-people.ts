import { STAR_WARS_PEOPLE } from '@shared/constants/endpoints.ts';
import { httpRequest } from '@shared/http/http-request.ts';

const getApiStarWarsPeople = async (
  testError?: boolean,
): Promise<Character[]> => {
  return httpRequest({
    config: {
      method: testError ? 'put' : 'get',
      url: STAR_WARS_PEOPLE,
    },
    responseTransformer: (res): Character[] => {
      return res.results.map((character: any): Character => {
        const {
          name,
          height,
          mass,
          hair_color,
          skin_color,
          eye_color,
          birth_year,
          gender,
          homeworld,
          films,
          species,
          vehicles,
          starships,
          created,
          edited,
          url,
        } = character || {};

        return {
          created,
          edited,
          url,
          films,
          species,
          vehicles,
          starships,
          eyeColor: eye_color,
          name,
          height,
          mass,
          skinColor: skin_color,
          birthYear: birth_year,
          gender,
          homeWorld: homeworld,
          hairColor: hair_color,
        };
      });
    },
  });
};

export { getApiStarWarsPeople };
