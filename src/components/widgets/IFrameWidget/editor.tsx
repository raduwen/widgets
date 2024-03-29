import React, { Component, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { ref, set, onValue } from '@firebase/database';
import { getFirebaseDB } from '@/lib/firebase';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';
import type { IFrameWidgetProps } from './types';
import { IFrameWidget } from './widget';

type Props = {
  profile: string;
  id: string;
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
    this.state = IFrameWidgetEditor.defaultProps;
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  save(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    set(ref(getFirebaseDB(), `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), this.state);
  }

  delete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (confirm('本当に削除してよろしいですか?')) {
      set(ref(getFirebaseDB(), `/profiles/${this.props.profile}/widgets/${this.props.id}`), null);
    }
  }

  componentDidMount() {
    onValue(ref(getFirebaseDB(), `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), (snap) => {
      this.setState(snap.val());
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id == this.props.id)
      return;

    onValue(ref(getFirebaseDB(), `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), (snap) => {
      this.setState(snap.val());
    });
  }

  render() {
    return (
      <div>
        <>
          <Typography variant="h6" id={this.props.id}>
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
          <FormGroup>
            <TextField
              type="number"
              label="z-index"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                this.setState({ ...this.state, zIndex: parseInt(e.target.value) });
              }}
              value={this.state.zIndex}
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
          <Button
            sx={{ ml: 1 }}
            type="button"
            color="error"
            variant="outlined"
            onClick={this.delete}
          >
            Delete
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
    zIndex: 0,
  };
}

export { IFrameWidgetEditor };
