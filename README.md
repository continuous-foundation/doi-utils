# `doi-utils`

[![doi-utils on npm](https://img.shields.io/npm/v/doi-utils.svg)](https://www.npmjs.com/package/doi-utils)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/continuous-foundation/doi-utils/blob/master/LICENSE)
![CI](https://github.com/continuous-foundation/doi-utils/actions/workflows/ci.yml/badge.svg)

A small utility for validating, normalizing, and extracting DOIs from text strings.
This repository follows the advice of [CrossRef](https://www.crossref.org/blog/dois-and-matching-regular-expressions/) for regular expression patterns.

> For the 74.9M DOIs we have seen this matches 74.4M of them. If you need to use only one pattern then use this one.

The utility also recognizes URLs that are likely DOIs, and has specific handling for some repositories (e.g. eLife, Zenodo).

## Install

```bash
npm install doi-utils
```

## Overview & Usage

```ts
import { doi } from 'doi-utils';

const isValid = doi.validate('http://doi.org/10.1016/j.cageo.2015.09.015');

doi.buildUrl('http://dx.doi.org/10.1016/j.cageo.2015.09.015');
doi.buildUrl('http://www.doi.org/10.1016/j.cageo.2015.09.015');
doi.buildUrl('http://doi.org/10.1016/j.cageo.2015.09.015');
doi.buildUrl('doi:10.1016/j.cageo.2015.09.015');
// All of these produce a normalized, secure DOI url:
// https://doi.org/10.1016/j.cageo.2015.09.015
```

## Included Utilities

- `validate` - Validates if a single DOI string is valid, is tolerant of leading link or `doi:` strings.
- `validatePart` - Validate the "10.1016/j.cageo.2015.09.015" part of a DOI.
- `normalize` - Normalizes a DOI url or string into a DOI of the form `10.1000/xyz000`
- `buildUrl` - Builds a URL to https://doi.org, includes normalization
- `isOpenFunderRegistry` - Returns true if the DOI is in the [Open Funder Registry](https://www.crossref.org/documentation/funder-registry/)

## Options

- `strict`: only accept doi.org URLs and `doi:` prefixes

---

As of v2.0.0 this package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

---

<p style="text-align: center; color: #aaa; padding-top: 50px">
  Made with love by
  <a href="https://continuous.foundation" target="_blank" style="color: #aaa">
    Continuous Science Foundation <img src="https://cdn.curvenote.com/static/site/csf/icon.svg" style="height: 1em" />
  </a>
</p>
