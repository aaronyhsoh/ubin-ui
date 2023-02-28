class ViewProjectStore {
  issuedAssets = [];

  clearData() {
    this.issuedAssets = [];
  }

}

export const viewProjectStore = new ViewProjectStore();
