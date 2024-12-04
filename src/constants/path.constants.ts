import { isProduction } from "../utils/helper";

export const PATHS = {
    BASEPATH: isProduction ? '/StarWarsUniverseExplorer' : '/',
    HOME: '/',
    CHARACTER_LIST: '/character',
    CHARACTER_DETAIL: '/character/:id',
    FAVOURITES_LIST: '/favorites',
};