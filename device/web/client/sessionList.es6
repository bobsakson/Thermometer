import React from 'react';
import SessionListItem from './sessionListItem.es6';
import { Link } from 'react-router-dom';

class SessionList extends React.Component {
    render(props) {
        const sli = [
                        {id: 1, date: '4/1/2017', description: 'Pulled Pork'},
                        {id: 2, date: '4/2/2017', description: 'Brisket'},
                        {id: 3, date: '4/3/2017', description: 'Ribs'}
                    ];

        let sessionListItems = sli.map((item) =>
            <SessionListItem key={item.id.toString()} id={item.id} date={item.date} description={item.description} />
        );

        return (
            <div>
                This is the session list.
                {sessionListItems}
            </div>
        );
    }
}

export default SessionList;