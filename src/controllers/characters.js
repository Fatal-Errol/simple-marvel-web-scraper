import {
  fetchCharacterIds,
  fetchCharacterInfoById,
  errorParser,
} from '../services/marvel_scraper';
import { setCacheData, getCacheData } from '../services/cache';

export const charactersGetAll = async (req, res) => {
  try {
    let output = await getCacheData('characters');

    if (!output) {
      const promise = fetchCharacterIds();

      output = await setCacheData('characters', promise);
    }

    res.status(200).json(output);
  } catch (err) {
    const parsedError = errorParser(err);

    res.status(parsedError.code).json(parsedError);
  }
};

export const charactersGetOne = async (req, res) => {
  const { id: charId } = req.params;

  try {
    const { id, name, description } = await fetchCharacterInfoById(charId);
    res.status(200).json({
      id,
      name,
      description,
    });
  } catch (err) {
    const parsedError = errorParser(err);

    res.status(parsedError.code).json(parsedError);
  }
};
