import React, {Component} from 'react';
import './App.css';
import META from './util/meta.js'
import TEMPLATE from './util/template.js'
import valueToMsg from './util/maker.js'
import msgToValue from './util/parser.js'
import deepCopy from './util/deepCopy.js'

class App extends Component {

    constructor(props) {
        super(props)
        const origin = {}
        Object.keys(META).forEach(k => {
            const m = META[k]
            const c = m.content
            if (c) {
                if (!origin[k]) {
                    origin[k] = []
                }
                c.forEach(t => {
                    origin[k].push(t.default)
                })
            } else {
                origin[k] = m.default
            }
        })
        this.state = {
            MTI: '0204',
            values: origin,
            hex: ''
        }
    }

    render() {
        return (
            <div className='container'>
                <label className='header'>MTI</label>
                <input
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            MTI: e.target.value
                        })
                    }}
                    value={this.state.MTI}
                />
                <select
                    onChange={(e) => {
                        this.handleTemplate(e)
                    }}
                >
                    {Object.keys(TEMPLATE).map(k => {
                        return (<option key={k} value={k}>{k}</option>)
                    })}
                </select>
                <div>
                    {Object.keys(META).map(k => {
                            const m = META[k]
                            const c = m.content
                            return (
                                <div className='itemo' key={k}>
                                    {c && <button
                                        onClick={() => {
                                            this.handleClear(k)
                                        }}>clear</button>}
                                    <label>{m.name} (bit{k},{m.type}{m.length > 0 && m.length})</label>
                                    {c ?
                                        <div>
                                            {c.map((t, idx) => {
                                                return (
                                                    <div className='itemi' key={idx}>
                                                        <label>{t.name} ({t.type}{t.length > 0 && t.length})</label>
                                                        <input
                                                            onChange={(e) => {
                                                                this.handleChangeI(e, k, idx)
                                                            }}
                                                            value={this.state.values[k][idx] || ''}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        :
                                        <input
                                            onChange={(e) => {
                                                this.handleChangeO(e, k)
                                            }}
                                            value={this.state.values[k] || ''}
                                        />
                                    }
                                </div>
                            )
                        }
                    )}
                </div>
                <button className='btn' onClick={() => {
                    this.handleOut()
                }}>make
                </button>
                <button className='btn' onClick={() => {
                    this.handleIn()
                }}>parse
                </button>
                <textarea
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            hex: e.target.value
                        })
                    }}
                    value={this.state.hex}
                />
            </div>
        );
    }

    handleTemplate(e) {
        const v = e.target.value
        this.setState({
            ...this.state,
            values: deepCopy(TEMPLATE[v])
        })
    }

    handleChangeO(e, k) {
        const v = e.target.value
        const origin = {
            ...this.state.values
        }
        origin[k] = v
        this.setState({
            ...this.state,
            values: origin
        })
    }

    handleChangeI(e, k, idx) {
        const v = e.target.value
        const origin = {
            ...this.state.values
        }
        const l = origin[k]
        l[idx] = v
        origin[k] = l
        this.setState({
            ...this.state,
            values: origin
        })
    }

    handleOut() {
        const origin = {
            ...this.state.values
        }
        const result = valueToMsg(this.state.MTI, origin)
        if (result.error) {
            if (result.idx === 0 || result.idx) {
                alert(`${result.msg} (${META[result.key].content[result.idx].name})`)
            } else {
                alert(`${result.msg} (${META[result.key].name})`)
            }
        } else {
            this.setState({
                ...this.state,
                hex: result
            })
        }
    }

    handleIn() {
        const result = msgToValue(this.state.hex)
        if (result.error) {
            if (result.idx === 0 || result.idx) {
                alert(`${result.msg} (${META[result.key].content[result.idx].name})`)
            } else if (result.key) {
                alert(`${result.msg} (${META[result.key].name})`)
            } else {
                alert(`${result.msg}`)
            }
        } else {
            this.setState({
                ...this.state,
                values: result
            })
        }
    }

    handleClear(k) {
        const origin = {
            ...this.state.values
        }
        const l = origin[k]
        for (let i = 0; i < l.length; i++) {
            l[i] = ''
        }
        origin[k] = l
        this.setState({
            ...this.state,
            values: origin
        })
    }
}

export default App;
