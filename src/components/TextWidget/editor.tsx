import React, { Component } from 'react';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@material-ui/core';
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import type { TextWidgetProps } from '@/components/TextWidget/types';

type Props = {
  id: string;
  props: TextWidgetProps;
};

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 480px;
  & > label {
    width: 20%;
  }
  & > input {
    flex-grow: 1;
  }
`;

class TextWidgetEditor extends Component<Props, TextWidgetProps> {
  constructor(props) {
    super(props);
    this.state = this.props.props;
  }

  render() {
    return (
      <div>
        <Typography variant="h6">
          TextWidget : {this.props.id}
        </Typography>
        <FormGroup>
          <TextField
            type="text"
            label="text"
            fullWidth
            multiline={true}
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, text: e.target.value });
            }}
            value={this.state.text}
          />
        </FormGroup>

        <FirebaseDatabaseMutation
          type="set"
          path={`/widgets/${this.props.id}/props`}
        >
          {({ runMutation }) => {
            return (
              <FormGroup>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={async (e: Event) => {
                    e.preventDefault();
                    await runMutation(this.state);
                  }}
                >
                  Save
                </Button>
              </FormGroup>
            );
          }}
        </FirebaseDatabaseMutation>
      </div>
    );
  }
}

export { TextWidgetEditor };
