import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        const {uid, name} = getState().authReducer;
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            
            if (body.ok) {
                event.id = body.eventoGuardado.registerID
                event.user = {
                    _id: uid,
                    name
                }
                console.log(event)
                dispatch(eventAddNew(event));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const startEventUpdated = (event) => {
    return async (dispatch) => {
        try {
            const {registerID} = event;
            const resp = await fetchWithToken(`events/${registerID}`, event, 'PUT');
            const body = await resp.json();
            const {ok} = body;
            //console.log(body);
            (ok) ? dispatch(eventUpdated(event)) : Swal.fire('Error',body.msg,'error')
            
        } catch (error) {
            console.error(error);
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        
        try {
            const {registerID} = getState().calendar.activeEvent;
            const resp = await fetchWithToken(`events/${registerID}`, {}, 'DELETE');
            const body = await resp.json();
            const {ok} = body;

            (ok) ? dispatch(eventDeleted()) : Swal.fire('Error',body.msg,'error')
            
        } catch (error) {
            console.error(error);
        }
      
    }
}


const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            //console.log(body)
            if (body.ok) {
                dispatch(eventLoaded(body.eventos))
            }
        } catch (error) {
            console.error(error);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventResent = () => ({
    type: types.eventLogout
})
