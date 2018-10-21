import { Modal, Paper, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

interface IModalProps {
    open: boolean;
    paper: any;
    close(): void;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const top = 50 + rand();
const left = 50 + rand();

const styles = (theme:Theme) => withStyles({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        position: 'absolute',
        width: theme.spacing.unit * 50,
        },
    root: {
        left: `${left}%`,
        position: "absolute",
        top: `${top}%`,
        transform: `translate(-${top}%, -${left}%)`
    },
});

class Confirmation extends React.Component<IModalProps,{}> {

  public render() {
    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.handleClose}
        >
          <Paper style={{padding: "10px 10px" , left: "25%", top: "25%", position: 'absolute'}} className={this.props.paper}>
            <Typography variant="h6" id="modal-title">
              Success!
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Thank you for signing up. You should receive an email shortly.
            </Typography>
          </Paper>
        </Modal>
    );
  }

  private handleClose = () => {
    this.props.close();
  };
}

// We need an intermediary variable for handling the recursive nesting.
const ConfirmationWrapped = withStyles(styles)(Confirmation);

export default ConfirmationWrapped;
