import Axios from 'axios';
import URL   from '../config.js';

const API = {

  getAllBoards: ( onSuccess, onError ) => {
    return Axios.post( `${ URL }/api/boards` )
      .then(  data  => onSuccess( data.data.filter( board => board !== 'system.indexes' ) ) )
      .catch( error => onError( error.response ) );
  },

  getThreads: ( board, onSuccess ) => {
    return Axios.get( `${ URL }/api/threads/${ board }` )
      .then(  data  => onSuccess( data.data.map( b => b ) ) )
      .catch( error => console.log( error.response ) );
  },

  getFullThread: ( board, thread_id, onSuccess, onError ) => {
    return Axios.get( `${ URL }/api/replies/${ board }?thread_id=${ thread_id }` )
      .then(  data  => onSuccess( data.data ) )
      .catch( error => onError( error.response ) );
  },

  post: ( type, event, board, thread_id, text, delete_password, onSuccess, onError ) => {
    event.preventDefault( );

    const isReply  = type === 'reply';
    const endpoint = isReply ? 'replies' : 'threads';
    const payload  = isReply
                     ? { thread_id, text, delete_password }
                     : { text, delete_password };

    Axios.post( `${ URL }/api/${ endpoint }/${ board }`, payload )
      .then(   data => onSuccess( data ) )
      .catch( error => onError( error ) );
  },

  report: ( board, thread_id, reply_id, onSuccess, onError ) => {
    const isThread = reply_id === false;
    const endpoint = isThread ? 'threads' : 'replies';
    const payload  = isThread ? { thread_id } : { thread_id, reply_id };

    Axios.put( `${ URL }/api/${ endpoint }/${ board }`, payload )
      .then(   data => onSuccess( data ) )
      .catch( error => onError( error.response.data ) );
  },

  delete: ( event, board, thread_id, reply_id, delete_password, onSuccess, onError ) => {
    event.preventDefault( );

    const isThread = reply_id === false;
    const endpoint = isThread ? 'threads' : 'replies';
    const payload  = isThread
                     ? { thread_id, delete_password }
                     : { thread_id, reply_id, delete_password };

    Axios.delete( `${ URL }/api/${ endpoint }/${ board }`, { data: payload } )
      .then(   data => onSuccess( data ) )
      .catch( error => onError( error ) );
  }
}

export default API;