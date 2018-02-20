// @flow
const noLoading = state =>
  Object.keys(state.modularui).filter(
    key => state.modularui[key].status === "loading"
  ).length === 0;

const loadingCounter = state =>
  Object.keys(state.modularui).filter(
    key => state.modularui[key].status === "loading"
  ).length;

const render = (store: Store, renderApplication: Function): Promise<string> => {
  let loadingCount = loadingCounter(store.getState());
  let html = "<div>Nothing to render</div>";

  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const previousCount = loadingCount;
      loadingCount = loadingCounter(store.getState());

      if (previousCount !== loadingCount && noLoading(store.getState())) {
        try {
          html = renderApplication();
        } catch (e) {
          return reject(e);
        }

        if (noLoading(store.getState())) {
          unsubscribe();
          return resolve(html);
        }
      }

      return false;
    });

    try {
      html = renderApplication();
    } catch (e) {
      return reject(e);
    }

    if (noLoading(store.getState())) {
      unsubscribe();
      return resolve(html);
    }

    return false;
  });
};

export default render;
