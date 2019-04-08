import React, { Component } from "react"
import Prism  from 'prismjs'
import marked from 'marked'
import apiStyles from './api.module.css'

export default class EndPoint extends Component {
  constructor(props) {
    super(props)
    this.headlineRef = React.createRef()
    this.onIntersection = this.onIntersection.bind(this)
  }

  componentDidMount() {

    // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    const observer = new IntersectionObserver(this.onIntersection, {
      threshold: 0,
      rootMargin: "0% 0% -90% 0%"
    })
    const target = this.headlineRef.current

    observer.observe(target)
  }

  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log(`EndPoint.entry.intersectionRatio: ${entry.intersectionRatio}`)
        if (entry.intersectionRatio >= 0.1) {
          // console.log(`EndPoint.onIntersection ${this.props.method.id}`)
          this.props.onVisible(this.props.method.id)
        }
      }
    })
  }

  render() {
    const method = this.props.method
    return (
      <React.Fragment>
        <h3 id={method.id} ref={this.headlineRef}>{method.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: marked(method.description) }} />
        <h4>Parameters</h4>
        <div className={apiStyles.table}>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>required</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {method.params.map(param => {
                return <tr key={param.name}>
                  <td>{param.name}</td>
                  <td>{param.required ? 'yes' : 'no'}</td>
                  <td>{param.description}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div className="gatsby-highlight" data-language="js">
          <pre className="language-js"><code className="language-js" dangerouslySetInnerHTML={{ __html: Prism.highlight(method.example, Prism.languages.javascript, 'javascript') }} ></code></pre>
        </div>
      </React.Fragment>
    )
  }
}
