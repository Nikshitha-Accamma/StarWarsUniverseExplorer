import { isProduction } from "../utils/helper";

export const PATHS = {
    HOME: isProduction ? 'https://nikshitha-accamma.github.io/StarWarsUniverseExplorer/':'/',
    CHARACTER_LIST: isProduction? 'https://nikshitha-accamma.github.io/StarWarsUniverseExplorer/character':'/character',
    CHARACTER_DETAIL: isProduction ? 'https://nikshitha-accamma.github.io/StarWarsUniverseExplorer/character/:id':'/character/:id',
    FAVOURITES_LIST: isProduction ? 'https://nikshitha-accamma.github.io/StarWarsUniverseExplorer/favorites':'/favorites',
};