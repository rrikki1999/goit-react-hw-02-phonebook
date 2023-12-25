import { Component } from 'react';
import { nanoid } from 'nanoid';

export class Filter extends Component {
  render() {
    const { value, onChangeFilter } = this.props;
    return (
      <label htmlFor={nanoid()}>
        Find contacts by name
        <input
          value={value}
          type="text"
          placeholder="find contact"
          onChange={onChangeFilter}
        />
      </label>
    );
  }
}