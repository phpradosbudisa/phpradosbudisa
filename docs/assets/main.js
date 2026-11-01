(function () {
  var COPY_MS = 2000;

  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy-target");
      var el = document.getElementById(id);
      if (!el) return;
      var text = el.textContent || "";
      navigator.clipboard.writeText(text).then(function () {
        var prev = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = prev;
        }, COPY_MS);
      });
    });
  });

  var slug = document.body.getAttribute("data-episode");
  if (!slug) return;
  var key = "ship-checklist-" + slug;
  var boxes = document.querySelectorAll(".checklist input[type=checkbox]");
  try {
    var saved = JSON.parse(localStorage.getItem(key) || "{}");
    boxes.forEach(function (cb, i) {
      var id = cb.getAttribute("data-item") || String(i);
      if (saved[id]) cb.checked = true;
      cb.addEventListener("change", function () {
        saved[id] = cb.checked;
        localStorage.setItem(key, JSON.stringify(saved));
      });
    });
  } catch (e) {
    boxes.forEach(function (cb) {
      cb.addEventListener("change", function () {});
    });
  }
})();
