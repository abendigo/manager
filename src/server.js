import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(json())
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'required'
  }))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
      // Copy everything from request.session (server size) to session (client side)
      session: request => Object.fromEntries(
          Object.entries(request.session).filter(([key]) => key !== 'cookie')
        )
    })
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
