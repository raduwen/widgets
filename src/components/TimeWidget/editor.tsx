import React, { Component } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import type { TimeWidgetProps } from './types';

type Props = {
  id: string;
  props: TimeWidgetProps;
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

class TimeWidgetEditor extends Component<Props, TimeWidgetProps> {
  constructor(props) {
    super(props);
    this.state = this.props.props;
  }

  render() {
    return (
      <div>
        <Typography variant="h6">
          TimeWidget : {this.props.id}
        </Typography>
        <FormGroup>
          <TextField
            type="number"
            label="size"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, size: parseFloat(e.target.value) });
            }}
            value={this.state.size}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.hidden}
                onChange={(e) => {
                  this.setState({ ...this.state, hidden: e.target.checked });
                }}
                name="hidden"
                color="primary"
              />
            }
            label="非表示"
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
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={async (e: any) => {
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

export { TimeWidgetEditor };
