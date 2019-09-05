import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { StoreState } from "../reducers";
import * as actions from "../actions";
import { translations } from "../config/translations";
import "./Login.scss";

interface LoginProps {
  authenticateUser: Function;
  auth: {
    message?: string;
    errorCounter?: number;
  };
}

interface LoginState {
  threeWrongAttempts?: boolean;
}

class _Login extends React.Component<
  InjectedFormProps<{}, LoginProps> & LoginProps,
  LoginState
> {
  constructor(props: InjectedFormProps<{}, LoginProps> & LoginProps) {
    super(props);
    this.state = {
      threeWrongAttempts: false
    };
  }
  onSubmit = (formProps: any): void => {
    const obj =
      !this.state.threeWrongAttempts && this.props.auth.errorCounter! < 3
        ? { ...formProps, errorCounter: this.props.auth.errorCounter }
        : formProps;
    this.props.authenticateUser(obj);
  };

  hasError = (): boolean => !!(this.props.auth && this.props.auth.message);

  showErrorMessage = (): string =>
    !this.state.threeWrongAttempts
      ? this.props.auth.message!
      : translations.en.timeLoginError;

  componentDidUpdate(
    prevProps: InjectedFormProps<{}, LoginProps> & LoginProps
  ): void {
    if (
      this.props.auth.errorCounter! > 2 &&
      this.props.auth.errorCounter !== prevProps.auth.errorCounter
    ) {
      this.setState({ threeWrongAttempts: true });
      setTimeout((): void => {
        this.setState({ threeWrongAttempts: false });
      }, 30000);
    }
  }

  public render() {
    const { handleSubmit } = this.props;
    return (
      <div className="loginform ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            <div className="content">{translations.en.loginContent}</div>
          </h2>
          <form
            className="ui large form"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <Field
                    type="text"
                    name="username"
                    placeholder={translations.en.username}
                    component="input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <Field
                    type="password"
                    name="password"
                    placeholder={translations.en.password}
                    component="input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="ticket icon"></i>
                  <Field
                    type="coupon"
                    name="coupon"
                    placeholder={translations.en.coupon}
                    component="input"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ui fluid large teal submit button"
                disabled={this.state.threeWrongAttempts}
              >
                {translations.en.loginButton}
              </button>
            </div>

            <div className={`ui error message ${this.hasError() && "active"}`}>
              {this.showErrorMessage()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }: StoreState): { auth: actions.AuthResponse } {
  return { auth };
}

const formWrapper = reduxForm<{}, LoginProps>({
  form: "login"
})(_Login);
export const Login = connect(
  mapStateToProps,
  actions
)(formWrapper);
