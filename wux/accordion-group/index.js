"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}(0,_baseComponent.default)({relations:{"../accordion/index":{type:"child",observer:function(){this.debounce(this.updated)}}},properties:{prefixCls:{type:String,value:"wux-accordion-group"},cellGroupPrefixCls:{type:String,value:"wux-cell-group"},defaultCurrent:{type:Array,value:[]},current:{type:Array,value:[],observer:function(e){this.data.controlled&&this.updated(e)}},controlled:{type:Boolean,value:!1},accordion:{type:Boolean,value:!1},title:{type:String,value:""},label:{type:String,value:""}},data:{activeKey:"",keys:[]},methods:{updated:function(e){var t=0<arguments.length&&void 0!==e?e:this.data.activeKey;this.data.activeKey!==t&&this.setData({activeKey:t}),this.changeCurrent(t)},changeCurrent:function(n){var o=this,e=this.getRelationNodes("../accordion/index");0<e.length&&e.forEach(function(e,t){var r=e.data.key||String(t),a=o.data.accordion?n[0]===r:-1!==n.indexOf(r);e.changeCurrent(a,r)}),this.data.keys.length!==e.length&&this.setData({keys:e.map(function(e){return e.data})})},emitEvent:function(e){this.triggerEvent("change",{key:e,keys:this.data.keys})},setActiveKey:function(e){this.data.controlled||this.updated(e),this.emitEvent(this.data.accordion?e[0]:e)},onClickItem:function(t){var e=_toConsumableArray(this.data.activeKey),e=this.data.accordion?e[0]===t?[]:[t]:-1!==e.indexOf(t)?e.filter(function(e){return e!==t}):[].concat(_toConsumableArray(e),[t]);this.setActiveKey(e)}},ready:function(){var e=this.data,t=e.defaultCurrent,r=e.current,a=e.controlled?r:t;this.updated(a)}});