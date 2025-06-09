import { validatePart } from './validatePart.js';

interface Resolver {
  test: (url: URL) => boolean;
  parse: (url: URL) => string | undefined;
}

const doiOrg: Resolver = {
  test(url) {
    return !!url.hostname.match(/(?:dx\.)?(?:www\.)?doi\.org/);
  },
  parse(url) {
    return url.pathname.replace(/^\//, '');
  },
};

const elife: Resolver = {
  test(url) {
    return (
      url.hostname.endsWith('elifesciences.org') &&
      /^\/(?:articles|reviewed-preprints)\/\d+$/.test(url.pathname)
    );
  },
  parse(url) {
    return `10.7554/eLife.${url.pathname.replace(/^\/(?:articles|reviewed-preprints)\//, '')}`;
  },
};

const zenodo: Resolver = {
  test(url) {
    return (
      url.hostname.endsWith('zenodo.org') &&
      !!url.pathname.match(/^\/(?:record|badge\/latestdoi)\//)
    );
  },
  parse(url) {
    return `10.5281/zenodo.${url.pathname.replace(/^\/(?:record|badge\/latestdoi)\//, '')}`;
  },
};

const biorxiv: Resolver = {
  test(url) {
    return url.hostname.endsWith('biorxiv.org') && !!clumpParts(url).find(validatePart);
  },
  parse(url) {
    return clumpParts(url)
      .find(validatePart)
      ?.replace(/v\d+(\.[a-zA-Z-]+)?$/, '');
  },
};

function clumpParts(url: URL) {
  const parts = url.pathname.split('/').filter((p) => !!p);
  return parts.slice(0, -1).map((a, i) => `${a}/${parts[i + 1]}`);
}

const pathParts: Resolver = {
  test(url) {
    return !!clumpParts(url).find(validatePart);
  },
  parse(url) {
    return clumpParts(url).find(validatePart);
  },
};

const idInQuery: Resolver = {
  test(url) {
    return validatePart(url.searchParams.get('id'));
  },
  parse(url) {
    return url.searchParams.get('id') ?? undefined;
  },
};

export const STRICT_RESOLVERS = [doiOrg];
export const DEFAULT_RESOLVERS = [doiOrg, biorxiv, pathParts, elife, zenodo, idInQuery];
