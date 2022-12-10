export const updateAlert = (store, alert) => {
  store.setState({ alert });
};

export const clearAlert = ((store) => {
  store.setState({ alert: undefined });
});
