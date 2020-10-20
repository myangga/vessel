import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

const io = sailsIOClient(socketIOClient);

// pre-empt autoconnection on next event loop 
io.sails.autoConnect = false;

// give it a connection URL & export a reference
export const socket = io.sails.connect('http://localhost:1337');

