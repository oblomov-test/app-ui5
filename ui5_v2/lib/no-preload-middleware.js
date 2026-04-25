export default function () {
	return function noPreloadMiddleware(req, res, next) {
		if (req.method === "GET" && /-preload\.js$/.test(req.path)) {
			res.setHeader("Content-Type", "application/javascript; charset=utf-8");
			res.end("// dev: preload bundle not generated, individual modules load via the standard loader\n");
			return;
		}
		next();
	};
}
