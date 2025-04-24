/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setLibs, decorateArea } from './utils.js';

// Add project-wide style path here.
const STYLES = '';

// Use 'https://milo.adobe.com/libs' if you cannot map '/libs' to milo's origin.
const LIBS = '/libs';
// Add any config options.
const CONFIG = {
  // codeRoot: '',
  // contentRoot: '',
  imsClientId: 'newsroom-helix',
  // imsScope: 'AdobeID,openid,gnav',
  // geoRouting: 'off',
  // fallbackRouting: 'off',
  decorateArea,
  live: {
    pdfViewerClientId: 'cbaeef5374204b1c9fce05067674351b',
    edgeConfigId: '72b074a6-76d2-43de-a210-124acc734f1c',
  },
  stage: {
    pdfViewerClientId: '52092f4f87194756a2f344c9849ca34a',
    edgeConfigId: '72b074a6-76d2-43de-a210-124acc734f1c',
  },
  prod: {
    pdfViewerClientId: '2247575709e1419c90edba7caeb215ad',
    edgeConfigId: '913eac4d-900b-45e8-9ee7-306216765cd2',
  },
  prodDomains: ['www.adobe.com', 'news.adobe.com', 'business.adobe.com', 'helpx.adobe.com'],
  page: { pdfViewerClientId: 'a047957d3f3d46c08affb18ac02a1bc9' },
  hlxPage: { pdfViewerClientId: 'df45ae024b7a4a9fbeb7d306075c7749' },
  hlxLive: { pdfViewerClientId: '3a0c922fabdf4178804a3dfa410a254f' },
  stageDomainsMap: {
    'news.stage.adobe.com': {
      'www.adobe.com(?!\\/content\\/dam\\/cc\\/en\\/investor-relations\\/pdfs\\/).*$': 'www.stage.adobe.com',
      'business.adobe.com': 'business.stage.adobe.com',
      'helpx.adobe.com': 'helpx.stage.adobe.com',
      'blog.adobe.com': 'blog.stage.adobe.com',
    },
    '--news--adobecom.(hlx|aem).live': {
      'business.adobe.com': 'business.adobe.com',
      'helpx.adobe.com': 'helpx.adobe.com',
      'blog.adobe.com': 'blog.adobe.com',
      'www.adobe.com': 'www.adobe.com',
    },
    '--news--adobecom.(hlx|aem).page': {
      'www.adobe.com(?!\\/content\\/dam\\/cc\\/en\\/investor-relations\\/pdfs\\/).*$': 'www.stage.adobe.com',
      'business.adobe.com': 'business.stage.adobe.com',
      'helpx.adobe.com': 'helpx.stage.adobe.com',
      'blog.adobe.com': 'blog.stage.adobe.com',
    },
  },
  languages: {
    en: {
      ietf: 'en',
      tk: 'hah7vzn.css',
      rootPath: '',
      regions: [
        { region: 'gb' },
        { region: 'apac', ietf: 'en' },
      ],
    },
    pt: {
      ietf: 'pt',
      tk: 'inq1xob.css',
      regions: [
        { region: 'br', tk: 'inq1xob.css' },
      ],
    },
    de: { ietf: 'de', tk: 'hah7vzn.css' },
    es: { ietf: 'es', tk: 'oln4yqj.css' },
    fr: { ietf: 'fr', tk: 'vrk5vyv.css' },
    it: { ietf: 'it', tk: 'bbf5pok.css' },
    ja: { ietf: 'ja', tk: 'dvg6awq', region: 'jp' },
    ko: { ietf: 'ko', tk: 'qjs5sfm', region: 'kr' },
  },
  locales: { '': { ietf: 'en-US', tk: 'hah7vzn.css' } },
};

// Decorate the page with site specific needs.
decorateArea();

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

const miloLibs = setLibs(LIBS);

(function loadStyles() {
  const paths = [`${miloLibs}/styles/styles.css`];
  if (STYLES) { paths.push(STYLES); }
  paths.forEach((path) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    document.head.appendChild(link);
  });
}());

(async function loadPage() {
  const { loadArea, setConfig, loadLana } = await import(`${miloLibs}/utils/utils.js`);
  // eslint-disable-next-line no-unused-vars
  const config = setConfig({ ...CONFIG, miloLibs });
  loadLana({ clientId: 'news' });
  await loadArea();
}());
