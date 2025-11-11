'use strict';
(function () {
  try {
    var ua = navigator.userAgent || '';
    var isAndroid = /Android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var target = null;

    if (isAndroid) {
      target = 'https://play.google.com/store/apps/details?id=com.taogames.myzenplace';
    } else if (isIOS) {
      target = 'https://apps.apple.com/us/app/my-zen-place/id6754265998?ppid=4c768ebc-7441-4025-8a77-820c4027e9b7';
    }

    if (target) {
      // Use replace so back button doesn't return to this intermediary page
      window.location.replace(target);
    }

    window.addEventListener('DOMContentLoaded', function () {
      try {
        var tgt = document.getElementById('target-link');
        if (tgt && target) {
          tgt.href = target;
          tgt.textContent = 'Continue →';
        }
      } catch (e) {
        // no-op
      }
    });
  } catch (e) {
    // Fail safe: swallow errors to avoid breaking the landing page
  }
})();

