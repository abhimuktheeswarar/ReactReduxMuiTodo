import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { Form } from "react-final-form";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
//import { TextField } from "mui-rff";
import { TextField } from "formik-material-ui";
import { addTodo } from "./homeSlice";

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
  //const [formState, setFormState] = useState();
  const dispatch = useDispatch();
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(JSON.stringify(values, 0, 2));
    //setFormState(values);
    //console.log(formState);
    dispatch(addTodo(values));
    setSubmitting(false);
  };
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              className={classes.textField}
              fullWidth
              component={TextField}
              required
              name="title"
              label="What you want to do?"
              type="text"
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
              onClick={submitForm}
              className={classes.button}
            >
              ADD
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
