const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';
// const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
// const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const addCommentAction = comment => ({
    type: ADD_COMMENT,
    payload: comment
});

const editCommentAction = ({
    id,
    commentText,
    editDate
}) => ({
    type: EDIT_COMMENT,
    payload: { id, commentText, editDate }
});

const removeCommentAction = id => ({
    type: REMOVE_COMMENT,
    payload: id
});

// const addNotificationAction = ({ id, text }) => ({
//     type: ADD_NOTIFICATION,
//     payload: {
//         id,
//         text
//     }
// });

// const removeNotificationAction = id => ({
//     type: REMOVE_NOTIFICATION,
//     payload: id
// })

export {
    addCommentAction,
    editCommentAction,
    removeCommentAction,
    // addNotificationAction,
    // removeNotificationAction,
    ADD_COMMENT,
    EDIT_COMMENT,
    REMOVE_COMMENT,
    // ADD_NOTIFICATION,
    // REMOVE_NOTIFICATION
};