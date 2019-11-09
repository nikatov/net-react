import React, { PureComponent, Fragment } from 'react';
import nanoid from 'nanoid';
import { connect } from 'react-redux';
import { addCommentAction } from '../Store/actions'
import Comments from '../Comments/Comments.jsx';
import './App.css';

class App extends PureComponent {
    static hasError = (errors) => Object.values(errors).some(value => value !== 'no-error');
    
    state = {
        comments: [],
        username: '',
        comment: '',
        errors: {
            username: 'no-error',
            comment: 'no-error'
        }
    };

    // componentDidMount() {
        // TODO
        // 1. Установка соединения с http-сервером
        // 2. Получение стартового набора комментариев -> в state
    // }

    validate = ({ name, value }) => {
        if (name === 'username') {
            const errorLabel = !value ? 'Введите имя пользователя' : 'no-error';
            
            this.setState({
                errors: {
                    ...this.state.errors,
                    [name]: errorLabel
                }
            });

            return;
        }

        const errorLabel = () => {
            if (!value) {
                return 'Введите комментарий';
            }
        
            return value.length > 120
                ? 'Текст комментария слишком длинный (должен быть не более 120 символов)'
                : 'no-error';
        };

        this.setState({
            errors: {
                ...this.state.errors,
                [name]: errorLabel()
            }
        });
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        }, this.validate({ name, value }));
    };

    onAddComment = (event) => {
        event.preventDefault();

        const {
            username,
            comment,
            errors
        } = this.state;

        this.validate({ name: 'username', value: username });
        this.validate({ name: 'comment', value: comment });

        if (App.hasError(errors)) {
            return;
        }

        const newComment = {
            id: nanoid(),
            username,
            comment,
            timestamp: new Date()
        }

        this.props.addCommentDispatch(newComment); // тк мы прокинули ее через пропсы при экспорте 
        this.setState({
            username: '',
            comment: ''
        });
    };

    render() {
        const {
            username,
            comment,
            errors
        } = this.state;

        return (
            <Fragment>
                <header className="main-header">
                    Форма для комментариев
                </header>
                <form id="comment-form" onSubmit={this.onAddComment}>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        name="username"
                        className={errors.username !== 'no-error' ? 'input-error' : ''}
                        value={username}
                        onInput={this.onChange}
                        onChange={this.onChange}
                        onBlur={this.onChange}
                    />
                    <label
                        className={errors.username !== 'no-error'
                            ? 'username-info error'
                            : 'username-info'
                        }
                    >
                        {errors.username}
                    </label>
                    <label>Текст комментария:</label>
                    <textarea
                        type="text"
                        name="comment"
                        rows="3"
                        className={errors.comment !== 'no-error' ? 'input-error' : ''}
                        value={comment}
                        onInput={this.onChange}
                        onChange={this.onChange}
                        onBlur={this.onChange}
                    ></textarea>
                    <label
                        className={errors.comment !== 'no-error'
                            ? 'comment-info error'
                            : 'comment-info'
                        }
                    >
                        {errors.comment}
                    </label>
                    <button
                        className="submit-btn"
                        type="sumbit"
                        disabled={App.hasError(errors)}
                    >
                        Отправить комментарий
                    </button>
                </form>
                <Comments />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addCommentDispatch: comment =>
        dispatch(addCommentAction(comment))
});

export default connect(
    null, // mapStateToProps отображение данных ИЗ Store не нужно тут. Тк рендериться комменты будут в другом месте
    mapDispatchToProps
)(App);
