/**  @jsx React.DOM */

var React = require('react');
var AppStore = require('./../stores/app.store.js');
var RemoveFromCart = require('./remove.from.cart.js');
var DecreaseItem = require('./decrease.item.js');
var IncreaseItem = require('./increase.item.js');

function getCartItems() {
  return {
    items: AppStore.getCart()
  };
}

var Cart = React.createClass({
  getInitialState: function() {
    return getCartItems();
  },
  componentWillMount: function() {
    AppStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getCartItems());
  },
  render: function() {
    var total = 0;
    var items = this.state.items.map(function(item, i) {
      var subtotal = item.cost * item.qty;
      total += subtotal;
      return (
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <IncreaseItem index={i} />
            <DecreaseItem index={i} />
          </td>
          <td>${subtotal}</td>
        </tr>
      )
    })
    return (
      <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Qty</th>
              <th></th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="text-right">Total</td>
              <td>${total}</td>
            </tr>
          </tfoot>
      </table>
    )
  }
});

module.exports = Cart;
