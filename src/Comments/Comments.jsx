import React, { memo } from 'react';
import { connect } from 'react-redux'
import CommentItem from './CommentItem/CommentItem.jsx';
import './Comments.css';

const Comments = ({
    comments
}) => (
    <div className="comments-container">
        {comments.map(comment => (
            <CommentItem
                key={comment.id}
                comment={comment}
            />
        ))}
    </div>
);

// компонент не влияет на Store (mapDispatchToStore() не нужен)
// но тут нужно достать из Store

//для mapStateToProps приходит comments из Store и мы ее возвращаем
const mapStateToProps = ({comments}) => ({ comments });

export default connect(mapStateToProps)(memo(Comments));

//  Новый рендор может вызываться слишком часто.
//  Пропсы обновляются, но они могут не влиять на отображение.
//  Чтобы каждый раз не рендерить, нужен метод, проверяющий нужен ли перерендор
//  PureComponent - чистый компонент, в котором реакт сам определяет нужен ли перерендор
//  Для стрелочных функций без состояний реализована функция memo, чтобы не рендерить
