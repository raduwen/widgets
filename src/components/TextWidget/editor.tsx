import React, { Component } from 'react';
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import type { TextWidgetProps } from '@/components/TextWidget/types';

type Props = {
  id: string;
  props: TextWidgetProps;
};

class TextWidgetEditor extends Component<Props, TextWidgetProps> {
  constructor(props) {
    super(props);
    this.state = this.props.props;
  }

  render() {
    return (
      <div>
        <label>
          text:
          <input
            type="text"
            onChange={(e) => {
              this.setState({ ...this.state, text: e.target.value });
            }}
            value={this.state.text}
          />
        </label>

        <FirebaseDatabaseMutation type="set" path={`/widgets/${this.props.id}/props`}>
          {({ runMutation }) => {
            return (
              <button
                onClick={async (e: Event) => {
                  e.preventDefault();
                  await runMutation(this.state);
                }}
              >
                Save
              </button>
            );
          }}
        </FirebaseDatabaseMutation>
      </div>
    );
  }
}

export { TextWidgetEditor };
