import { Component, MouseEvent } from 'react';
import styled from '@emotion/styled';
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ref, set, onValue } from '@firebase/database';
import { db } from '@/lib/firebase';
import type { TimeWidgetProps } from './types';

type Props = {
  profile: string;
  id: string;
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
  constructor(props: Props) {
    super(props);
    this.state = TimeWidgetEditor.defaultProps;
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  save(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    set(ref(db, `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), this.state);
  }

  delete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (confirm('本当に削除してよろしいですか?')) {
      set(ref(db, `/profiles/${this.props.profile}/widgets/${this.props.id}`), null);
    }
  }

  componentDidMount() {
    onValue(ref(db, `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), (snap) => {
      this.setState(snap.val());
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id == this.props.id)
      return;

    onValue(ref(db, `/profiles/${this.props.profile}/widgets/${this.props.id}/props`), (snap) => {
      this.setState(snap.val());
    });
  }

  render() {
    return (
      <div>
        <>
          <Typography variant="h6" id={this.props.id}>
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

  public static defaultProps: TimeWidgetProps = {
    size: 24,
    hidden: false,
    zIndex: 0,
  };
}

export { TimeWidgetEditor };
