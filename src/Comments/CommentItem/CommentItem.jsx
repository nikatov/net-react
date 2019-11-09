import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    editCommentAction,
    removeCommentAction
} from '../../Store/actions'
import './CommentItem.css';

class CommentItem extends PureComponent {
    constructor() {
        super();

        this.state = {
            editMode: false,
            commentText: ''
        };
    }

    // внести в Store что-то что нужно для показа окошка
    // внести акшн
    // в редьюс внести обработку экшна
    // через мап стейт ту пропс в случае действия чтобы прокидывался экшн

    componentDidMount() {
        this.setState({
            commentText: this.props.comment.comment
        });
    }

    enableEditMode = () => this.setState({ editMode: true });

    disableEditMode = () => this.setState({ editMode: false });

    onEditComment = () => {
        const { commentText } = this.state;

        if (!commentText
            || (commentText && commentText.length > 120)
            || commentText === this.props.comment.comment) {
                return;
            }
        
        const { id } = this.props;
        this.props.editCommentDispatch({ id, commentText, editDate: new Date() });

        this.setState({
            editMode: false
        });
    };

    onChange = ({ target }) => {
        this.setState({
            commentText: target.value
        });
    };
    
    render() {
        const {
            comment: {
                id,
                username,
                timestamp
            },
            removeCommentDispatch
        } = this.props;

        const {
            editMode,
            commentText
        } = this.state;

        return (
            <div className="comment-item">
                <div className="comment-item-header">
                    <div className="comment-item-header-text">
                        <span className="comment-item-username">{username}</span>
                        {` commented ${timestamp.toLocaleDateString('ru')} ${
                            timestamp.toLocaleTimeString('ru')}`}
                    </div>
                    <div className="comment-item-crumbs">
                        <svg
                            x="0px"
                            y="0px" 
                            viewBox="0 0 60 60"
                            style={{
                                enableBackground: 'new 0 0 60 60'
                            }}
                        >
                            <g>
                                <path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z" />
                                <path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z" />
                                <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" />
                            </g>
                        </svg>
                    </div>
                    <div className="comment-item-dropdown">
                        <div
                            className="comment-item-dropdown-element"
                            onClick={this.enableEditMode}
                        >
                            Edit
                        </div>
                        <div
                            className="comment-item-dropdown-element"
                            onClick={() => removeCommentDispatch(id)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
                <div className="comment-item-text">
                    {!editMode
                        ? commentText
                        : (
                            <div className="edit-comment-form">
                                <div className="edit-comment-text">    
                                    <textarea
                                        type="text"
                                        name="comment"
                                        rows="3"
                                        className={
                                            !commentText || (commentText && commentText.length > 120
                                                ? 'input-error'
                                                : ''
                                            )}
                                        value={commentText}
                                        onInput={this.onChange}
                                        onChange={this.onChange}
                                        onBlur={this.onChange}
                                    />
                                    <label class={!commentText || (commentText && commentText.length > 120
                                        ? 'comment-info error'
                                        : 'comment-info'
                                    )}>
                                        Длина комментария должна быть от 1 до 120 символов
                                    </label>
                                </div>
                                <div className="edit-comment-buttons">
                                    <button
                                        class="ok-btn"
                                        type="button"
                                        disabled={!commentText || (commentText && commentText.length > 120)}
                                        onClick={this.onEditComment}
                                    >
                                        OK
                                    </button>
                                    <button
                                        class="cancel-btn"
                                        type="button"
                                        onClick={this.disableEditMode}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editCommentDispatch: ({id, commentText, editDate}) => dispatch(
        editCommentAction({id, commentText, editDate})
    ),
    removeCommentDispatch: id => dispatch(removeCommentAction(id))
});

export  default connect(
    null,
    mapDispatchToProps
)(CommentItem);

