

import { types } from '../types/types';

const initialState = {
    events: [/* {
        id: 'dfdffffsfd',
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        //bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id: 'dadd546a5d54d6ad4',
            name: 'Thiago Rios'
        }
    } */],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.eventLoaded:
            return {
                ...state,
                events: action.payload
            }
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
    
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.registerID === action.payload.registerID ) ? action.payload : e
                )
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.registerID !== state.activeEvent.registerID )
                ),
                activeEvent: null
            }

        case types.eventLogout:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }


}
