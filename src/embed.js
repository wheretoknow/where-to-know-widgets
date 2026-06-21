/**
 * WTK Review Widget — embed.js
 *
 * Clients paste one <script> tag; this file does the rest:
 *   1. Find the <script> tag that loaded us
 *   2. Read data-* attributes (token, style, period, color, lang…)
 *   3. Fetch score data from the WTK API
 *   4. Render an iframe so our CSS never conflicts with the host page
 *   5. Listen for postMessage from the iframe to auto-size the height
 */

(function () {
  'use strict';

  var API_BASE = 'https://api.wheretoknow.com/public/widget/v1';
  var WIDGET_ORIGIN = 'https://widgets.wheretoknow.com';
  var IFRAME_BASE = WIDGET_ORIGIN + '/v1/render';

  // ── 1. Locate the <script> tag that loaded us ────────────────────────────
  var scripts = document.querySelectorAll('script[data-token]');
  var script = scripts[scripts.length - 1]; // last match = this file
  if (!script) return;

  var token      = script.getAttribute('data-token');
  var style      = script.getAttribute('data-style')      || 'card';
  var period     = script.getAttribute('data-period')     || 'all';
  var color      = script.getAttribute('data-color')      || '#6366f1';
  var categories = script.getAttribute('data-categories') || '';
  var otaSources = script.getAttribute('data-ota-sources') || '';
  var lang       = script.getAttribute('data-lang')       || 'auto';

  if (!token) {
    console.warn('[WTK Widget] data-token is required');
    return;
  }

  // ── 2. Create container div after the <script> tag ───────────────────────
  var container = document.createElement('div');
  container.setAttribute('id', 'wtk-widget-' + token.slice(-6));
  container.style.cssText = 'display:inline-block;max-width:100%;line-height:0';
  script.parentNode.insertBefore(container, script.nextSibling);

  // ── 3. Fetch score data ───────────────────────────────────────────────────
  var url = API_BASE + '/' + encodeURIComponent(token);

  fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('WTK Widget: API error ' + res.status);
      return res.json();
    })
    .then(function (data) {
      renderIframe(container, data, { style: style, period: period, color: color, categories: categories, otaSources: otaSources, lang: lang });
    })
    .catch(function (err) {
      console.error('[WTK Widget]', err);
    });

  // ── 4. Render iframe ─────────────────────────────────────────────────────
  function renderIframe(container, data, opts) {
    var params = new URLSearchParams({
      style:      opts.style,
      period:     opts.period,
      color:      opts.color,
      lang:       opts.lang,
      name:       data.entityName || '',
      score:      data.overallScore || 0,
      reviews:    data.totalReviews || 0,
    });
    if (opts.categories) params.set('cats', opts.categories);
    if (data.categories && data.categories.length) {
      params.set('cdata', JSON.stringify(data.categories));
    }
    if (data.otaScores && data.otaScores.length) {
      params.set('odata', JSON.stringify(data.otaScores));
    }

    var iframe = document.createElement('iframe');
    iframe.src = IFRAME_BASE + '?' + params.toString();
    iframe.style.cssText = 'border:0;display:block;width:100%;overflow:hidden';
    iframe.scrolling = 'no';
    iframe.title = 'WTK Review Score — ' + (data.entityName || '');

    // initial size by style
    var sizes = { compact: 210, horizontal: 90, card: 340, dark: 260 };
    iframe.height = (sizes[opts.style] || 240) + 'px';

    container.appendChild(iframe);
  }

  // ── 5. Auto-resize via postMessage ───────────────────────────────────────
  window.addEventListener('message', function (evt) {
    if (evt.origin !== WIDGET_ORIGIN) return;
    if (!evt.data || evt.data.type !== 'wtk-widget-resize') return;
    var target = document.getElementById('wtk-widget-' + token.slice(-6));
    if (!target) return;
    var iframe = target.querySelector('iframe');
    if (iframe) iframe.height = evt.data.height + 'px';
  });

})();
