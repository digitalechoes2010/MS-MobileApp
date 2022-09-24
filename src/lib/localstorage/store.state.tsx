export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tycState', serializedState);
  } catch {
    // ignore write errors
  }
};
