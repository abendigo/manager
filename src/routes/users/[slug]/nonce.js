export function get(request, response) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});

	response.end(JSON.stringify({nonce: 123}));
}
