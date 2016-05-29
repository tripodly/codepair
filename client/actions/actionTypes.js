// Actions for handling authorization
export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const DEAUTHORIZE_USER = "DEAUTHORIZE_USER";
export const AUTHORIZE_ERROR = "AUTHORIZE_ERROR";
// Actions for handling user
export const CLEAR_USER = "CLEAR_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_CARDS = "GET_CARDS";
// Actions for handling requests to server
export const AWAITING_RESPONSE = "AWAITING_RESPONSE";
export const RESPONSE_RECEIVED = "RESPONSE_RECEIVED";
// Actions for handling card swipes
export const CLEAR_CARDS = "CLEAR_CARDS";
export const LIKE_CARD = "LIKE_CARD";
export const DISLIKE_CARD = "DISLIKE_CARD";
export const NEW_MATCH = "NEW_MATCH";
export const NEW_PENDING = "NEW_PENDING";
export const NEW_PASS = "NEW_PASS";
// Actions for handling chat
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const TYPING = 'TYPING';
export const STOP_TYPING = 'STOP_TYPING';
export const RECEIVE_SOCKET = 'RECEIVE_SOCKET';
// Actions for setting and clearing the current partner
export const SET_PARTNER = "SET_PARTNER";
export const CLEAR_PARTNER = "CLEAR_PARTNER";
export const JOIN_ROOM = "JOIN_ROOM";
export const INVITE_RECEIVED = "INVITE_RECEIVED";
