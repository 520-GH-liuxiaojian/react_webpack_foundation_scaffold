import React from 'react';
import ReactDOM from 'react-dom'

import logo from './assets/images/react.png'
import './index.scss'

class Main extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="main-container-test">测试代码是否正常生成</div>
                <img src={logo}/>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
