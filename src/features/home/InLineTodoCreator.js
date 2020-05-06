import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { TextField } from "mui-rff";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    marginRight: theme.spacing(4),
  },
}));

export default () => {
  const [formState, setFormState] = useState();
  const onSubmit = async (values) => {
    console.log(JSON.stringify(values, 0, 2));
    setFormState(values);
    console.log(formState);
  };
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              fullWidth
              name="title"
              label="What you want to do?"
              type="text"
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
            >
              ADD
            </Button>
          </form>
        )}
      />
    </Paper>
  );
};
