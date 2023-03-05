export { serveFile }

import { IncomingMessage, ServerResponse } from 'http';

import { readFile } from 'fs/promises';

async function serveFile(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const { url } = req;
  const path = url?.slice(1) || 'index.html';
  const file = await readFile('public/' + path, 'utf-8');

  res.end(file);
}
