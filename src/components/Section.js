export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  };
  
  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item)
    })
  };

  addItem(item) {
    this._containerSelector.prepend(item)
  };
}