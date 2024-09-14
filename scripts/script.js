(function () {
  const domain = document.currentScript?.getAttribute('data-domain');
  if (!domain) {
    console.warn('data-domain attribute is missing');
    return;
  }
  function trackEvent(event, data = null, extra_data = null) {
    fetch('https://phinxer.com/api/event', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain,
        referrer: document.referrer || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        event,
        data,
        extra_data,
      }),
    });
  }

  let lastPage;

  function trackPageView() {
    if (lastPage === location.pathname) return;
    lastPage = location.pathname;
    trackEvent('pageview', location.href);
  }

  function handleVisibilityChange() {
    if (!lastPage && document.visibilityState === 'visible') {
      trackPageView();
    }
  }

  if (document.visibilityState === 'prerender') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } else {
    trackPageView();
  }

  const history = window.history;
  if (history.pushState) {
    const originalPushState = history['pushState'];
    history.pushState = function () {
      originalPushState.apply(this, arguments);
      trackPageView();
    };
    window.addEventListener('popstate', trackPageView);
  }

  window.trackEvent = trackEvent;
})();
