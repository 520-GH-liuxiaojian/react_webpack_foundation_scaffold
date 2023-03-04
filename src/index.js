import React from 'react';
import ReactDOM from 'react-dom'
import {kebabCase} from 'lodash-es'

import logo from './assets/images/react.png'
import './index.scss'

class Main extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        }
    }

    loadComponent() {
        // 动态加在text.js，返回一个promise
        import('./component/DynamicImport').then((Text) => {
            console.log(Text);
            this.setState({
                Text: Text.default
            });
        })
    }

    render() {
        const {Text} = this.state
        return (
            <div className="main-container">
                <div className="main-container-test">{kebabCase('__FOO_BAR__')}</div>
                <img src={logo}  onClick={ this.loadComponent.bind(this) }/>
                { Text ? <Text /> : null }
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
