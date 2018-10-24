import { Modal, Paper, Theme} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

interface IModalProps {
    emailIsInDatabase: boolean;
    open: boolean;
    paper: any;
    close(): void;
}

let WINDOWWIDTH = window.innerWidth || document.body.clientWidth;
if (!WINDOWWIDTH && document.documentElement) { WINDOWWIDTH = document.documentElement.clientWidth }

const styles = (theme:Theme) => {
  return withStyles({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        position: 'absolute',
        width: theme.spacing.unit * 50,
        },
    root: {
        position: "absolute",
    },
  });
}

class Confirmation extends React.Component<IModalProps,{}> {
  
  private modalWidth = 400;

  public render() {
    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.handleClose}
        >
        <div style={{ width: this.modalWidth, position: 'absolute', left: WINDOWWIDTH / 2 - this.modalWidth / 2, top: '25%' }}>
          {(this.props.emailIsInDatabase) ? this.renderFailure() : this.renderSuccess()}
        </div>
      </Modal>
    );
  }

  private renderSuccess() {
    return (
      <Paper style={{padding: "10px 10px"}} className={this.props.paper}>
        <Typography variant="h6" id="modal-title">
          Success!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Thank you for signing up. You should receive an email shortly.
        </Typography>
      </Paper>
    );
  }

  private renderFailure() {
    return (
      <Paper style={{padding: "10px 10px"}} className={this.props.paper}>
        <Typography variant="h6" id="modal-title">
          Oh no!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          You have already signed up with this email address.
        </Typography>
      </Paper>
    );
  }

  private handleClose = () => {
    this.props.close();
  };
}

// We need an intermediary variable for handling the recursive nesting.
const ConfirmationWrapped = withStyles(styles)(Confirmation);

export default ConfirmationWrapped;
