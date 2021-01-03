const BASIC_CACHE = "verycachemoneyofyou";
const DYNAMIC_CACHE = "dynamicboi";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// Install SW
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(BASIC_CACHE).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for requests
// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then(() => {
// 			return fetch(event.request).catch(() =>
// 				caches.match(event.request).then((response) => {
// 					if (response) {
// 						console.log("offline cache match");
// 						return response;
// 					} else {
// 						return fetch(event.request)
// 							.then((res) => {
// 								return cache.open("dynamic").then((cache) => {
// 									cache.put(event.request.url, res.clone());
// 									return res;
// 								});
// 							})
// 							.catch((e) =>
// 								caches
// 									.match("offline.html")
// 									.then((response) => {
// 										return response;
// 									})
// 							);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			} else {
				return fetch(event.request)
					.then((res) => {
						return caches.open(DYNAMIC_CACHE).then((cache) => {
							cache.put(event.request.url, res.clone());
							return res;
						});
					})
					.catch((e) => {
						console.log("fetch catch: ", e);
						return caches.match("offline.html").then((r) => {
							return r;
						});
					});
			}
		})
	);
});

// Activate SW
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(BASIC_CACHE, DYNAMIC_CACHE);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
