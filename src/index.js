import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Footer from './Footer'
import './styles.css'

export default class App extends React.Component {
  state = {
    todos: [
      { key: 't1', data: { text: 'Board the plane', isDone: false } },
      { key: 't2', data: { text: 'Sleep', isDone: false } },
      { key: 't3', data: { text: 'Try to finish conference slides', isDone: false } },
      { key: 't4', data: { text: 'Eat cheese and drink wine', isDone: false } },
      { key: 't5', data: { text: 'Go around in Uber', isDone: false } },
      { key: 't6', data: { text: 'Talk with conf attendees', isDone: false } },
      { key: 't7', data: { text: 'Show Demo 1', isDone: false } },
      { key: 't8', data: { text: 'Show Demo 2', isDone: false } },
      { key: 't9', data: { text: 'Lament about the state of animation', isDone: false } },
      { key: 't10', data: { text: 'Show Secret Demo', isDone: false } },
      { key: 't11', data: { text: 'Go home', isDone: false } }
    ],
    value: '',
    selected: 'all'
  }

  handleSelect = selected => this.setState({ selected })
  handleClearCompleted = () => this.setState({ todos: this.state.todos.filter(({ data }) => !data.isDone) })
  handleDestroy = date => this.setState({ todos: this.state.todos.filter(({ key }) => key !== date) })
  handleChange = ({ target: { value } }) => this.setState({ value })

  handleSubmit = e =>
    e.preventDefault() ||
    this.setState({
      todos: [
        {
          key: 't' + Date.now(),
          data: { text: this.state.value, isDone: false }
        }
      ].concat(this.state.todos)
    })

  handleDone = doneKey =>
    this.setState({
      todos: this.state.todos.map(todo => {
        const { key, data: { text, isDone } } = todo
        return key === doneKey ? { key: key, data: { text: text, isDone: !isDone } } : todo
      })
    })

  handleToggleAll = () =>
    this.setState({
      todos: this.state.todos.map(({ key, data: { text, isDone } }) => ({
        key: key,
        data: { text: text, isDone: !this.state.todos.every(({ data }) => data.isDone) }
      }))
    })

  getItems = () => {
    const { todos, value, selected } = this.state
    return todos.filter(({ data: { isDone, text } }) => {
      return (
        text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
        ((selected === 'completed' && isDone) || (selected === 'active' && !isDone) || selected === 'all')
      )
    })
  }

  render() {
    const { todos, value, selected } = this.state
    const itemsLeft = todos.filter(({ data: { isDone } }) => !isDone).length
    const items = this.getItems()
    return (
      <section className="todoapp">
        <Header value={value} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            checked={itemsLeft === 0}
            style={{ display: todos.length === 0 ? 'none' : 'inline' }}
            onChange={this.handleToggleAll}
          />
          <ul className="todo-list">
              {items.map(({ key, style, data: { isDone, text } }) => style => (
                <li style={style} className={isDone ? 'completed' : ''}>
                  <div className="view">
                    <input className="toggle" type="checkbox" onChange={() => this.handleDone(key)} checked={isDone} />
                    <label>{text}</label>
                    <button className="destroy" onClick={() => this.handleDestroy(key)} />
                  </div>
                </li>
              ))}
          </ul>
          <Footer
            itemsLeft={itemsLeft}
            selected={selected}
            handleSelect={this.handleSelect}
            handleClearCompleted={this.handleClearCompleted}
          />
        </section>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
