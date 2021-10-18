import { createContext, useContext, useReducer } from 'react';

function linkReducer(state, action) {
  switch (action.type) {
    case 'preview':
      return {...state, display:'preview'}
    case 'edit':
      return {...state, display:'edit'}
    case 'add':
      let newurl = encodeURI(action.payload.url)
      let newtext = encodeURI(action.payload.text)
      apiCall('POST',`linktext=${newtext}&linkurl=${newurl}`)
      return state
    case 'save':
      let saveurl = encodeURI(action.payload.url)
      let savetext = encodeURI(action.payload.text)
      apiCall('PUT', `linkrank=${action.payload.rank}&linktext=${savetext}&linkurl=${saveurl}`)
      return state
    case 'rankUP':
      let rankup = action.payload.rank +1;
      if (rankup<=(action.payload.maxrank)) {
        apiCall('PUT', `linkrank=${action.payload.rank}&newrank=${rankup}`)
      }
      return {...state}
    case 'rankDOWN':
      let rankdown = action.payload.rank -1;
      if (rankdown>0) {
        apiCall('PUT', `linkrank=${action.payload.rank}&newrank=${rankdown}`)
      }
      return {...state}
    case 'delete':
      const promiseA = new Promise(
        apiCall('DELETE', `linkrank=${action.payload.rank}`));
      return {...state}
    case 'newLink':
      state = {...state, showNew: 'true'}
      return state
    case 'noNewLink':
      state = {...state, showNew: 'false'}
      return state
  default:
    return state
  }
}
async function apiCall(method, querystring){
   await fetch(`/api/userdata?${querystring}`, {
     method: method,})
}

const LinkContext = createContext({display: 'preview'});

export function LinkProvider({initState, children}) {
  const [state, dispatch] = useReducer(linkReducer, initState);

  return (
    <LinkContext.Provider value={[state, dispatch]}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
