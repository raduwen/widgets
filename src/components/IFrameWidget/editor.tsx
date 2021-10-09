import React, { Component, MouseEvent } from 'react';
import styled from 'styled-components';
import { ref, set } from '@firebase/database';
import { db } from '@/lib/firebase';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';
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
  constructor(props: Props) {
    super(props);
    this.state = this.props.props;
    this.save = this.save.bind(this);
  }

  save(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    set(ref(db, `/widgets/${this.props.id}/props`), this.state);
  }

  render() {
    return (
      <div>
        <>
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
        </>

        <FormGroup>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={this.save}
          >
            Save
          </Button>
        </FormGroup>
      </div>
    );
  }

  public static defaultProps: IFrameWidgetProps = {
    url: "",
    retry_time: 10,
    retry_count: 3,
    width: 640,
    height: 480,
  };
}

export { IFrameWidgetEditor };
