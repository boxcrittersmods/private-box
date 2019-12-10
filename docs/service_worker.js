self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open("private-box").then(function (cache) {
			return cache.addAll([
				".",
				"./logo.png",
				"./css/bootstrap.min.css",
				"./css/style.css",
				"./scripts/error.js"
			]);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return fetch(event.request) || response;
		})
	);
});
