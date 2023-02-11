import railsAxios from '../../util/railsAxios';

export const requestResetToken = async (store, {
  onComplete, input, setIsSubmitting, setError,
}) => {
  const { userIdentity } = store.state;
  const endpoint = `/password_resets/${userIdentity}/`;
  const email = JSON.stringify({ email: input });
  try {
    await railsAxios().post(endpoint, email);
    setIsSubmitting(false);
    onComplete();
  } catch (e) {
    setIsSubmitting(false);
    setError(e.response ? e.response.data.message : "We're sorry, but there was an error.  Please try again.");
  }
};

export const submitResetToken = async (store, {
  onComplete, input, setIsSubmitting, setError, setToken,
}) => {
  const { userIdentity } = store.state;
  const endpoint = `/password_resets/${userIdentity}/${input}/`;
  try {
    await railsAxios().get(endpoint);
    setIsSubmitting(false);
    setToken(input);
    onComplete();
  } catch (e) {
    setIsSubmitting(false);
    setError(e.response ? e.response.data.message : "We're sorry, but there was an error.  Please try again.");
  }
};

export const submitNewPassword = async (store, {
  input, token, setIsSubmitting, onComplete, setError,
}) => {
  const { userIdentity } = store.state;
  const password = JSON.stringify({ password: input });
  const endpoint = `/password_resets/${userIdentity}/${token}`;
  try {
    await railsAxios().patch(endpoint, password);
    setIsSubmitting(false);
    onComplete();
  } catch (e) {
    setIsSubmitting(false);
    setError(e.response ? e.response.data.message : "We're sorry, but there was an error.  Please try again.");
  }
};
