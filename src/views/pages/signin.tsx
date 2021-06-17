import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
  FormText,
} from "reactstrap";
import firebase from '../../firebase';

// React.FC(React.FunctionComponentのショートハンド)
const Signin: React.FC = () => {
  const state = {
    loading: false, // spinner制御用
  };
  const history = useHistory();

  const handleOnSubmit = (values: { email: string; password: string }) => {
      firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push('/');
      })
      .catch(error =>{
        alert(error);
      });
  };

  return (
    <div className="container">
      <div
        // mx-auto：要素の中央揃え
        className="mx-auto"
        style={{ width: 400, background: "#eee", padding: 20, marginTop: 60 }}
      >
        <p style={{ textAlign: "center" }}>サインイン</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleOnSubmit(values)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('メールアドレスが不正です').required('メールアドレスは必須です'),
            password: Yup.string().required('パスワードは必須です'),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!(touched.email && errors.email)}
                  placeholder="input email"
                />
                <FormFeedback tooltip>{errors.email}</FormFeedback>
                <FormText>Example help text that remains unchanged.</FormText>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!(touched.password && errors.password)}
                  placeholder="input password"
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <div style={{ textAlign: "center", margin: 15}}>
                <Button color="success" type="submit" disabled={state.loading}>
                  <Spinner
                    size="sm"
                    color="light"
                    style={{ marginRight: 5 }}
                    hidden={!state.loading}
                  />
                  新規登録
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div
        className="mx-auto"
        style={{ width: 400, background: "#fff", padding: 20 }}
       />
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRouter(Signin);