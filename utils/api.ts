import { Nexios } from 'nexios';

export const api = new Nexios({ baseURL: 'http://localhost:3000', timeout: 10000 });
