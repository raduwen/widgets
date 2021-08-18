import React, { Component } from 'react';
import { Property } from 'csstype';
import styled from 'styled-components';
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { FirebaseDatabaseMutation } from '@react-firebase/database'
import type { TextWidgetProps } from '@/components/TextWidget/types';

type Props = {
  id: string;
  props: TextWidgetProps;
};

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  min-width: 480px;
  & > div {
    flex-grow: 1;
    margin-left: 0.25rem;
  }
`;

class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  // from #rrggbb
  static fromRGBCode(rgb: string): Color {
    return new Color(
      parseInt(rgb.substr(1,2), 16),
      parseInt(rgb.substr(3,2), 16),
      parseInt(rgb.substr(5,2), 16),
      1,
    );
  }

  // from rgba(r,g,b,a)
  static fromRGBA(rgba: string): Color {
    const match = rgba.match(/rgba\((\d+),(\d+),(\d+),(\d(\.\d+)?)\)/);
    return new Color(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      parseFloat(match[4])
    );
  }

  toRGBA(): string {
    const rgba = [this.r, this.g, this.b, this.a];
    return `rgba(${rgba.join(',')})`;
  }

  toRGBCode(): string {
    function toHex(num): string {
      let res = num.toString(16);
      if (res.length === 1) {
        res = `0${res}`;
      }
      return res;
    }
    const r = toHex(this.r);
    const g = toHex(this.g);
    const b = toHex(this.b);

    return `#${r}${g}${b}`;
  }
}

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
        <FormGroup>
          <TextField
            type="text"
            label="text size"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, fontSize: e.target.value });
            }}
            value={this.state.fontSize}
          />
          <TextField
            type="color"
            label="text color"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, textColor: e.target.value });
            }}
            value={this.state.textColor}
          />
          <TextField
            type="number"
            label="text edge weight"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, edgeWeight: parseFloat(e.target.value) });
            }}
            value={this.state.edgeWeight}
          />
          <TextField
            type="color"
            label="text edge color"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, edgeColor: e.target.value });
            }}
            value={this.state.edgeColor}
          />
          <TextField
            type="text"
            label="text align"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              this.setState({ ...this.state, textAlign: e.target.value as Property.TextAlign });
            }}
            value={this.state.textAlign}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            type="color"
            label="background color"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const color = Color.fromRGBA(this.state.backgroundColor);
              const newColor = Color.fromRGBCode(e.target.value);
              newColor.a = color.a;
              this.setState({ ...this.state, backgroundColor: newColor.toRGBA() });
            }}
            value={Color.fromRGBA(this.state.backgroundColor).toRGBCode()}
          />
          <TextField
            type="number"
            label="background opacity"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              const color = Color.fromRGBA(this.state.backgroundColor)
              color.a = parseFloat(e.target.value);
              this.setState({ ...this.state, backgroundColor: color.toRGBA() });
            }}
            value={Color.fromRGBA(this.state.backgroundColor).a}
          />
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
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.autoHidden}
                onChange={(e) => {
                  this.setState({ ...this.state, autoHidden: e.target.checked });
                }}
                name="auto-hidden"
                color="primary"
              />
            }
            label="自動非表示"
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

export { TextWidgetEditor };
