import {
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    // ADD_NOTIFICATION,
    // REMOVE_NOTIFICATION
} from './actions';

export default function(state, { type, payload }) {
    switch(type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    payload
                ]
            };
        case EDIT_COMMENT:
            const { id, commentText, editDate } = payload;
            return {
                ...state,
                comments: state.comments.map(commentInfo => ({
                    ...commentInfo,
                    comment: commentInfo.id === id
                        ? commentText
                        : commentInfo.comment,
                    timestamp: commentInfo.id === id
                        ? editDate
                        : commentInfo.timestamp
                }))
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== payload) // payload.id
            };
        // case ADD_NOTIFICATION:
        //     return {
        //         ...state,
        //         notifications: [
        //             ...state.notifications,
        //             payload
        //         ]
        //     };
        // case REMOVE_NOTIFICATION:
        //     return {
        //         ...state,
        //         notifications: state.notifications.filter(notification => notification.id !== payload)
        //     };
        default:
            return state;
    }
}