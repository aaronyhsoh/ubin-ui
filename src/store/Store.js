class Store {
  previousURL = '';

  setPreviousURL() {
    return this.previousURL = window.location.href;
  }
}

export const store = new Store();
