import { IncomingMessage, ServerResponse} from 'http';

// error 404
export const exception = (req: IncomingMessage , res: ServerResponse, status: number, message: string): void => {
    // set the status code and content-type
    res.writeHead(status, { "Content-Type": "application/json" });
    //send data
    res.end(JSON.stringify(message));
}
