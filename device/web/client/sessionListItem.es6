import React from 'react';
import { Link } from 'react-router-dom';

class SessionListItem extends React.Component {
    render(props) {
        return (
            <div>
                <span><Link to="/session/1">{this.props.id}</Link></span>
                <span>{this.props.id}</span>
                <span>{this.props.date}</span>
                <span>{this.props.description}</span>
            </div>
        );
    }
}

export default SessionListItem;