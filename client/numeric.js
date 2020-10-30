import React from 'react'
import AutoNumeric from 'autonumeric'

export default class Numeric extends React.Component {
  render () {
    const handleOnChange = this.handleOnChange.bind(this)

    const attributes = [
      'id',
      'className',
      'style',
      'disabled',
      'type',
      'name',
      'tabIndex',
      'unselectable',
      'size',
      'autoFocus',
      'placeholder'
    ]
      .filter(key => this.props.hasOwnProperty(key))
      .reduce((result, key) => {
        result[key] = this.props[key]
        return result
      }, {})

    return (
      <input
        ref={ref => (this.input = ref)}
        {...attributes}
        onChange={handleOnChange}
      />
    )
  }
  componentDidMount () {
    const predefined =
      AutoNumeric.getPredefinedOptions()[this.props.predefined] || {}

    this.autonumeric = new AutoNumeric(this.input, this.props.value, {
      ...predefined,
      ...this.props,
      outputFormat: 'number',
      onChange: undefined,
      onFocus: undefined,
      onBlur: undefined,
      onKeyPress: undefined,
      onKeyUp: undefined,
      onKeyDown: undefined,
      watchExternalChanges: false
    })
  }
  handleOnChange (event) {
    if (!this.props.onChange) return
    this.props.onChange(event, this.autonumeric.getNumber())
  }
  componentWillUnmount () {
    this.autonumeric.remove()
  }
}