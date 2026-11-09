// Hvězdy, padající sníh, světýlka a odpočet do Štědrého dne.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Řetěz světýlek
  var garland = document.querySelector(".garland");
  if (garland && !garland.children.length) {
    var count = Math.max(10, Math.round(window.innerWidth / 46));
    for (var g = 0; g < count; g++) garland.appendChild(document.createElement("i"));
  }

  // Odpočet
  document.querySelectorAll("[data-countdown]").forEach(function (box) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var year = now.getFullYear();
    if (now.getMonth() === 11 && now.getDate() > 24) year += 1;
    var eve = new Date(year, 11, 24);
    var days = Math.round((eve - today) / 86400000);
    var en = document.documentElement.lang === "en";
    var num = box.querySelector(".num");
    var unit = box.querySelector(".unit");
    if (days === 0) {
      num.textContent = "✨";
      unit.textContent = en ? "It's Christmas Eve!" : "Dnes je Štědrý den!";
    } else {
      num.textContent = days;
      unit.textContent = en ? (days === 1 ? "day" : "days") : (days === 1 ? "den" : days < 5 ? "dny" : "dní");
    }
  });

  // Obloha
  var canvas = document.getElementById("sky");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var w, h, dpr, stars = [], flakes = [];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = [];
    var n = Math.round(w * h / 5200);
    for (var i = 0; i < n; i++) stars.push({ x: rand(0, w), y: rand(0, h * 0.85), r: rand(0.4, 1.5), p: rand(0, 6.28), s: rand(0.6, 2) });
    flakes = [];
    var m = Math.round(w * h / (reduce ? 1e9 : 9000));
    for (var j = 0; j < m; j++) flakes.push(newFlake(true));
  }

  function newFlake(anywhere) {
    var depth = Math.random();
    return { x: rand(0, w), y: anywhere ? rand(0, h) : -10, r: 0.8 + depth * 2.6, v: 0.3 + depth * 1.1, a: 0.35 + depth * 0.55, p: rand(0, 6.28) };
  }

  var last = 0;
  function frame(t) {
    if (t - last < 40) { requestAnimationFrame(frame); return; } // ~24 snímků za sekundu, šetří baterii
    last = t;
    ctx.clearRect(0, 0, w, h);
    var time = t / 1000;
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var o = reduce ? 0.7 : 0.45 + 0.55 * Math.abs(Math.sin(time * s.s * 0.6 + s.p));
      ctx.globalAlpha = o;
      ctx.fillStyle = i % 9 === 0 ? "#fff1b8" : "#ffffff";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    ctx.fillStyle = "#ffffff";
    for (var k = 0; k < flakes.length; k++) {
      var f = flakes[k];
      f.y += f.v;
      f.x += Math.sin(time * 0.8 + f.p) * 0.35;
      if (f.y > h + 10) flakes[k] = f = newFlake(false);
      ctx.globalAlpha = f.a;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", function () { resize(); if (reduce) frame(1e6); });
  requestAnimationFrame(frame);
})();
