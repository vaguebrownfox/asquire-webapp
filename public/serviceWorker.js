const BASIC_CACHE = "verycachemoneyofyou";
const DYNAMIC_CACHE = "dynamicboi";
const urlsToCache = [
	"index.html",
	"offline.html",
	// "https://i.redd.it/hv48gqvpjd561.jpg",
	// "https://external-preview.redd.it/kgcu2t1ULQFrh3nJO02yDz6kPfxAY7vbiyC_edeajH4.jpg?auto=webp&s=e26433a2b78d37239b195750318ff918cad8ec83",
	// "https://i.redd.it/drg5ulh4xj661.png",
	// "https://external-preview.redd.it/V_Zdztdng29q8g9Hk54TFx3aN0ajD3gO5fMWiHDVW0k.jpg?auto=webp&s=c17943e3a72c1e65396335fded43566cc838ba21",
];
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

// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then((response) => {
// 			if (response) {
// 				return response;
// 			} else {
// 				return fetch(event.request)
// 					.then((res) => {
// 						return caches.open(DYNAMIC_CACHE).then((cache) => {
// 							cache
// 								.put(event.request.url, res.clone())
// 								.catch((err) => {
// 									console.log("nothing really matters");
// 								});
// 							return res;
// 						});
// 					})
// 					.catch((e) => {
// 						console.log("fetch catch: ", e);
// 						return caches.match("offline.html").then((r) => {
// 							return r;
// 						});
// 					});
// 			}
// 		})
// 	);
// });

// Activate SW
self.addEventListener("activate", (event) => {
	console.log("activating SW");
	const cacheWhitelist = [];
	cacheWhitelist.push(BASIC_CACHE);

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
