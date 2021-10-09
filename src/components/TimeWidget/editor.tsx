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
