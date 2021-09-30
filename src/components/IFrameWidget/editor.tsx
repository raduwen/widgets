import React, { Component } from 'react';
import styled from 'styled-components';
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import type { IFrameWidgetProps } from './types';

type Props = {
  id: string;
  props: IFrameWidgetProps;
};

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  min-width: 480px;
  & > div {
    flex-grow: 1;
    margin-left: 0.25rem;
  }
`
class IFrameWidgetEditor extends Component<Props, IFrameWidgetProps> {
  constructor(props) {
    super(props);
    this.state = this.props.props;
  }

  render() {
    return (
      <div>
        <Typography variant="h6">
          IFrameWidget : {this.props.id}
        </Typography>
        <FormGroup>
          <TextField
            type="text"
            label="url"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, url: e.target.value });
            }}
            value={this.state.url}
          />
          <TextField
            type="number"
            label="retry time(sec)"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, retry_time: parseFloat(e.target.value) });
            }}
          />
          <TextField
            type="number"
            label="retry time(sec)"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, retry_count: parseInt(e.target.value) });
            }}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="number"
            label="width"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, width: parseFloat(e.target.value) });
            }}
            value={this.state.width}
          />
          <TextField
            type="number"
            label="height"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, height: parseFloat(e.target.value) });
            }}
            value={this.state.height}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="number"
            label="position top"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const pos = this.state.position || {};
              if (e.target.value !== "") {
                const v = parseInt(e.target.value);
                if (isNaN(v)) {
                  delete pos.top;
                } else {
                  pos.top = v;
                }
              } else {
                delete pos.top;
              }
              this.setState({ ...this.state, position: pos });
            }}
            value={this.state?.position?.top}
          />
          <TextField
            type="number"
            label="position right"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const pos = this.state.position || {};
              if (e.target.value !== "") {
                const v = parseInt(e.target.value);
                if (isNaN(v)) {
                  delete pos.right;
                } else {
                  pos.right = v;
                }
              } else {
                delete pos.right;
              }
              this.setState({ ...this.state, position: pos });
            }}
            value={this.state.position?.right}
          />
          <TextField
            type="number"
            label="position bottom"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const pos = this.state.position || {};
              if (e.target.value !== "") {
                const v = parseInt(e.target.value);
                if (isNaN(v)) {
                  delete pos.bottom;
                } else {
                  pos.bottom = v;
                }
              } else {
                delete pos.bottom;
              }
              this.setState({ ...this.state, position: pos });
            }}
            value={this.state.position?.bottom}
          />
          <TextField
            type="number"
            label="position left"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const pos = this.state.position || {};
              if (e.target.value !== "") {
                const v = parseInt(e.target.value);
                if (isNaN(v)) {
                  delete pos.left;
                } else {
                  pos.left = v;
                }
              } else {
                delete pos.left;
              }
              this.setState({ ...this.state, position: pos });
            }}
            value={this.state.position?.left}
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

export { IFrameWidgetEditor };
