"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*Footer Component*/

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component.call(this));
  }

  Footer.prototype.render = function render() {
    var classname = 'animated flash footer navbar-fixed-bottom ' + this.props.class;
    return React.createElement(
      "footer",
      { className: classname },
      this.props.content
    );
  };

  return Footer;
}(React.Component);

/*Loader Component*/

var Loader = function (_React$Component2) {
  _inherits(Loader, _React$Component2);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, _React$Component2.call(this));
  }

  Loader.prototype.render = function render() {
    if (this.props.loaderState) {
      return React.createElement(
        "div",
        { className: "spinner" },
        React.createElement("div", { className: "bounce1" }),
        React.createElement("div", { className: "bounce2" }),
        React.createElement("div", { className: "bounce3" })
      );
    } else {
      return React.createElement("div", null);
    }
  };

  return Loader;
}(React.Component);

/* Active Component Part */

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      quote: '',
      author: '',
      category: '',
      loaderstyle: true
    };
    return _this3;
  }

  App.prototype.getQuotes = function getQuotes() {
    var _this4 = this;

    this.serviceRequest = axios.get(this.props.source, {
      headers: {
        'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V'
      }
    }).then(function (result) {
      console.log(result.data.quote);
      _this4.setState({
        quote: result.data.quote,
        author: result.data.author,
        category: result.data.category,
        loaderstyle: false
      });
    });
  };

  App.prototype.componentDidMount = function componentDidMount() {
    setInterval(this.getQuotes.bind(this), 10000);
  };

  App.prototype.componentWillUnmount = function componentWillUnmount() {
    this.serverRequest.abort();
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "Absolute-Center is-Responsive" },
        this.state.loaderstyle ? React.createElement(
          "div",
          null,
          React.createElement(Loader, { loaderState: this.state.loaderstyle }),
          React.createElement(Footer, { content: "Loading....", "class": "infinite" })
        ) : React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "divQuote" },
            '` ' + this.state.quote + ' `',
            React.createElement(
              "div",
              null,
              '-- ' + this.state.author
            )
          ),
          React.createElement(Footer, { content: "---- By Shankar Shastri ----  ", "class": "footerStyle" })
        )
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, { source: "https://andruxnet-random-famous-quotes.p.mashape.com/" }), document.getElementById("app"));