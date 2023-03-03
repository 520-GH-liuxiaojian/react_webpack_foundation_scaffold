import React from 'react';
import ReactDOM from 'react-dom'

import './index.css'

class Main extends React.Component {
    render() {
        return <div className="main-container">根组件</div>
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
