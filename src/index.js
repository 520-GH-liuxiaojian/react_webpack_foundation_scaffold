import React from 'react';
import ReactDOM from 'react-dom'

import logo from './assets/images/react.png'
import './index.scss'

class Main extends React.Component {
    render() {
        return (
            <div className="main-container">
                <img src={logo}/>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
