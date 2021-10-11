import { Component, MouseEvent } from 'react';
import styled from 'styled-components';
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { ref, set } from '@firebase/database';
import { db } from '@/lib/firebase';
import type { TimeWidgetProps } from './types';

type Props = {
  profile: string;
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
  constructor(props: Props) {
    super(props);
    this.state = this.props.props;
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

  render() {
    return (
      <div>
        <>
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
  };
}

export { TimeWidgetEditor };
