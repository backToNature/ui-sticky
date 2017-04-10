!(function (win, doc) {
    var sticky_id = 0;

    var util = {
        isMobile: function () {
            return false;
        },
        isSupportSticky: function () {
            var doc = document;
            var shadowDom = doc.createElement('div');
            // 解决ie赋值报错的问题
            try {
                shadowDom.style.position = '-webkit-sticky';
            } catch (e) {

            }
            if (shadowDom.style.position === '-webkit-sticky') {
                shadowDom = null;
                return '-webkit-sticky';
            }
            try {
                shadowDom.style.position = 'sticky';
            } catch (e) {

            }
            if (shadowDom.style.position === 'sticky') {
                shadowDom = null;
                return 'sticky';
            }
            shadowDom = null;
            return false
        },
        addEvent: function (element, eType, handle, bol) {
            if (element.addEventListener) {           //如果支持addEventListener
                    element.addEventListener(eType, handle, bol);
            } else if (element.attachEvent){          //如果支持attachEvent
                element.attachEvent('on' + eType, handle);
            } else {                                  //否则使用兼容的onclick绑定
                element['on'+eType] = handle;
            }
        },
        removeEvent: function (element, eType, handle, bol) {
            if (element.addEventListener) {
                element.removeEventListener(eType, handle, bol);
            } else if (element.attachEvent) {
                element.detachEvent('on' + eType, handle);
            } else {
                element['on'+eType] = null;
            }
        },
        scrollTop: function () {
            var supportPageOffset = win.pageXOffset !== undefined;
            var isCSS1Compat = ((doc.compatMode || "") === "CSS1Compat");
            var y = supportPageOffset ? win.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
            return y;
        },
        removeDom: function (dom) {
            dom.parentNode.removeChild(dom);
        }
    };

    var setFixed = function (dom, direction, offset) {
        var style = dom.style;
        style.position = 'fixed';
        style[direction] = offset;
    };

    var returnOrigin = function (dom, originStyle) {
        var style = dom.style, key;
        for (key in originStyle) {
            style[key] = originStyle[key];
        }
    };

    // 添加占位符
    var addPlaceholder = function (dom, id) {
        // 需要添加占位符的情况只有当元素为普通文档流
        var currentPosition = dom.style.position;
        if (currentPosition !== '' || currentPosition !== 'static' || currentPosition !== 'relative') {
            return;
        }
        if (doc.getElementById('sticky-place' + id)) {
            return;
        }
        var width = dom.offsetWidth, height = dom.offsetHeight;
        var $hoder = doc.createElement('div');
        $hoder.style.width = width + 'px';
        $hoder.style.height = height + 'px';
        $hoder.style.visibility = 'hidden';
        $hoder.id = 'sticky-place' + id;
        dom.parentNode.insertBefore($hoder, dom);
    };

    var removePlaceholder = function (id) {
        var dom = doc.getElementById('sticky-place' + id);
        if (dom) {
            util.removeDom(dom);
        }
    };

    var Sticky = function (option) {
        var _this = this;
        _this.sticky_id = sticky_id++;
        _this.el = option.el;
        _this.type = option.bottom ? 'bottom' : 'top';
        _this.offset = option[_this.type] ? option[_this.type] : 0;
        _this.fn = option.fn;
        _this._dom = doc.getElementById(_this.el);
        option.css3 === false ? _this.css3 = false : _this.css3 = true;
        _this.offsetTop = _this._dom.offsetTop;
        _this._isSupport = util.isSupportSticky();
        _this._originStyle = {
            position: _this._dom.style.position,
            top: _this._dom.style.top,
            bottom: _this._dom.style.bottom,
            left: _this._dom.style.left,
            right: _this._dom.style.right
        };

        if (_this._isSupport && _this.css3) {
            _this._dom.style.position = _this._isSupport;
            _this._dom.style[_this.type] = _this.offset;
            return;
        }

        var fnScroll = function (e) {
            if (util.scrollTop() >= _this.offsetTop) {
                addPlaceholder(_this._dom, _this.sticky_id);
                setFixed(_this._dom, _this.type, _this.offset);
            } else {
                returnOrigin(_this._dom, _this._originStyle);
                removePlaceholder(_this.sticky_id);
            }
        };

        _this._fnScroll = fnScroll;
        util.addEvent(win, 'scroll', fnScroll, false);
    };

    Sticky.prototype.destory = function () {
        if (this._isSupport) {
            returnOrigin(this._dom, this._originStyle);
        } else {
            util.removeEvent(win, 'scroll', this._fnScroll, false);
        }
    };

    if (typeof define === 'function') {
        define(function() {
            return Sticky;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = Sticky;
    } else {
        this.Sticky = Sticky;
    }
}(window, document));