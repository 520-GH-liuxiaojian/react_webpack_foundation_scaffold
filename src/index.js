import React from 'react';
import ReactDOM from 'react-dom'
import {kebabCase} from 'lodash-es'

import logo from './assets/images/react.png'
import './index.scss'

const array = [1];
const other = _.concat(array, 2, [3], [[4]]);

class Main extends React.Component {

    render() {
        return (
            <div className="main-container">
                <div className="main-container-test">{kebabCase('__FOO_BAR__')}</div>
                <img src={logo}/>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
