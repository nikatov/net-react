import React, { memo } from 'react';
import { connect } from 'react-redux';
import './Notifications.css';

const Notifications = ({
    notifications
}) => (
    <div className="notifications-container">
        {notifications.map(({ id, text }) => (
            <div className="notification" key={id}>
                {text}
            </div>
        ))}
    </div>
);

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(
    mapStateToProps
)(memo(Notifications));
