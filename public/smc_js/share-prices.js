(function () {
	/*

  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
 */
	'use strict';
	var l;
	function aa(a) {
		var b = 0;
		return function () {
			return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
		};
	}
	function n(a) {
		var b =
			'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
		return b ? b.call(a) : { next: aa(a) };
	}
	function ba(a) {
		if (!(a instanceof Array)) {
			a = n(a);
			for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
			a = c;
		}
		return a;
	}
	function ca(a, b, c) {
		a instanceof String && (a = String(a));
		for (var d = a.length, e = 0; e < d; e++) {
			var g = a[e];
			if (b.call(c, g, e, a)) return { U: e, Z: g };
		}
		return { U: -1, Z: void 0 };
	}
	var da =
		'function' == typeof Object.defineProperties
			? Object.defineProperty
			: function (a, b, c) {
					if (a == Array.prototype || a == Object.prototype) return a;
					a[b] = c.value;
					return a;
			  };
	function ea(a) {
		a = [
			'object' == typeof globalThis && globalThis,
			a,
			'object' == typeof window && window,
			'object' == typeof self && self,
			'object' == typeof global && global,
		];
		for (var b = 0; b < a.length; ++b) {
			var c = a[b];
			if (c && c.Math == Math) return c;
		}
		throw Error('Cannot find global object');
	}
	var q = ea(this);
	function r(a, b) {
		if (b)
			a: {
				var c = q;
				a = a.split('.');
				for (var d = 0; d < a.length - 1; d++) {
					var e = a[d];
					if (!(e in c)) break a;
					c = c[e];
				}
				a = a[a.length - 1];
				d = c[a];
				b = b(d);
				b != d &&
					null != b &&
					da(c, a, { configurable: !0, writable: !0, value: b });
			}
	}
	r('Array.prototype.find', function (a) {
		return a
			? a
			: function (b, c) {
					return ca(this, b, c).Z;
			  };
	});
	function t(a, b, c) {
		if (null == a)
			throw new TypeError(
				"The 'this' value for String.prototype." +
					c +
					' must not be null or undefined'
			);
		if (b instanceof RegExp)
			throw new TypeError(
				'First argument to String.prototype.' +
					c +
					' must not be a regular expression'
			);
		return a + '';
	}
	r('String.prototype.endsWith', function (a) {
		return a
			? a
			: function (b, c) {
					var d = t(this, b, 'endsWith');
					void 0 === c && (c = d.length);
					c = Math.max(0, Math.min(c | 0, d.length));
					for (var e = b.length; 0 < e && 0 < c; )
						if (d[--c] != b[--e]) return !1;
					return 0 >= e;
			  };
	});
	r('String.prototype.startsWith', function (a) {
		return a
			? a
			: function (b, c) {
					var d = t(this, b, 'startsWith'),
						e = d.length,
						g = b.length;
					c = Math.max(0, Math.min(c | 0, d.length));
					for (var f = 0; f < g && c < e; ) if (d[c++] != b[f++]) return !1;
					return f >= g;
			  };
	});
	r('String.prototype.repeat', function (a) {
		return a
			? a
			: function (b) {
					var c = t(this, null, 'repeat');
					if (0 > b || 1342177279 < b)
						throw new RangeError('Invalid count value');
					b |= 0;
					for (var d = ''; b; ) if ((b & 1 && (d += c), (b >>>= 1))) c += c;
					return d;
			  };
	});
	r('String.prototype.trimLeft', function (a) {
		function b() {
			return this.replace(/^[\s\xa0]+/, '');
		}
		return a || b;
	});
	r('String.prototype.trimStart', function (a) {
		return a || String.prototype.trimLeft;
	});
	r('Promise', function (a) {
		function b(f) {
			this.g = 0;
			this.i = void 0;
			this.h = [];
			this.s = !1;
			var h = this.l();
			try {
				f(h.resolve, h.reject);
			} catch (k) {
				h.reject(k);
			}
		}
		function c() {
			this.g = null;
		}
		function d(f) {
			return f instanceof b
				? f
				: new b(function (h) {
						h(f);
				  });
		}
		if (a) return a;
		c.prototype.h = function (f) {
			if (null == this.g) {
				this.g = [];
				var h = this;
				this.i(function () {
					h.m();
				});
			}
			this.g.push(f);
		};
		var e = q.setTimeout;
		c.prototype.i = function (f) {
			e(f, 0);
		};
		c.prototype.m = function () {
			for (; this.g && this.g.length; ) {
				var f = this.g;
				this.g = [];
				for (var h = 0; h < f.length; ++h) {
					var k = f[h];
					f[h] = null;
					try {
						k();
					} catch (m) {
						this.l(m);
					}
				}
			}
			this.g = null;
		};
		c.prototype.l = function (f) {
			this.i(function () {
				throw f;
			});
		};
		b.prototype.l = function () {
			function f(m) {
				return function (p) {
					k || ((k = !0), m.call(h, p));
				};
			}
			var h = this,
				k = !1;
			return { resolve: f(this.K), reject: f(this.m) };
		};
		b.prototype.K = function (f) {
			if (f === this)
				this.m(new TypeError('A Promise cannot resolve to itself'));
			else if (f instanceof b) this.$(f);
			else {
				a: switch (typeof f) {
					case 'object':
						var h = null != f;
						break a;
					case 'function':
						h = !0;
						break a;
					default:
						h = !1;
				}
				h ? this.J(f) : this.o(f);
			}
		};
		b.prototype.J = function (f) {
			var h = void 0;
			try {
				h = f.then;
			} catch (k) {
				this.m(k);
				return;
			}
			'function' == typeof h ? this.aa(h, f) : this.o(f);
		};
		b.prototype.m = function (f) {
			this.v(2, f);
		};
		b.prototype.o = function (f) {
			this.v(1, f);
		};
		b.prototype.v = function (f, h) {
			if (0 != this.g)
				throw Error(
					'Cannot settle(' +
						f +
						', ' +
						h +
						'): Promise already settled in state' +
						this.g
				);
			this.g = f;
			this.i = h;
			2 === this.g && this.M();
			this.F();
		};
		b.prototype.M = function () {
			var f = this;
			e(function () {
				if (f.G()) {
					var h = q.console;
					'undefined' !== typeof h && h.error(f.i);
				}
			}, 1);
		};
		b.prototype.G = function () {
			if (this.s) return !1;
			var f = q.CustomEvent,
				h = q.Event,
				k = q.dispatchEvent;
			if ('undefined' === typeof k) return !0;
			'function' === typeof f
				? (f = new f('unhandledrejection', { cancelable: !0 }))
				: 'function' === typeof h
				? (f = new h('unhandledrejection', { cancelable: !0 }))
				: ((f = q.document.createEvent('CustomEvent')),
				  f.initCustomEvent('unhandledrejection', !1, !0, f));
			f.promise = this;
			f.reason = this.i;
			return k(f);
		};
		b.prototype.F = function () {
			if (null != this.h) {
				for (var f = 0; f < this.h.length; ++f) g.h(this.h[f]);
				this.h = null;
			}
		};
		var g = new c();
		b.prototype.$ = function (f) {
			var h = this.l();
			f.L(h.resolve, h.reject);
		};
		b.prototype.aa = function (f, h) {
			var k = this.l();
			try {
				f.call(h, k.resolve, k.reject);
			} catch (m) {
				k.reject(m);
			}
		};
		b.prototype.then = function (f, h) {
			function k(B, J) {
				return 'function' == typeof B
					? function (va) {
							try {
								m(B(va));
							} catch (wa) {
								p(wa);
							}
					  }
					: J;
			}
			var m,
				p,
				x = new b(function (B, J) {
					m = B;
					p = J;
				});
			this.L(k(f, m), k(h, p));
			return x;
		};
		b.prototype.catch = function (f) {
			return this.then(void 0, f);
		};
		b.prototype.L = function (f, h) {
			function k() {
				switch (m.g) {
					case 1:
						f(m.i);
						break;
					case 2:
						h(m.i);
						break;
					default:
						throw Error('Unexpected state: ' + m.g);
				}
			}
			var m = this;
			null == this.h ? g.h(k) : this.h.push(k);
			this.s = !0;
		};
		b.resolve = d;
		b.reject = function (f) {
			return new b(function (h, k) {
				k(f);
			});
		};
		b.race = function (f) {
			return new b(function (h, k) {
				for (var m = n(f), p = m.next(); !p.done; p = m.next())
					d(p.value).L(h, k);
			});
		};
		b.all = function (f) {
			var h = n(f),
				k = h.next();
			return k.done
				? d([])
				: new b(function (m, p) {
						function x(va) {
							return function (wa) {
								B[va] = wa;
								J--;
								0 == J && m(B);
							};
						}
						var B = [],
							J = 0;
						do
							B.push(void 0),
								J++,
								d(k.value).L(x(B.length - 1), p),
								(k = h.next());
						while (!k.done);
				  });
		};
		return b;
	});
	r('Object.is', function (a) {
		return a
			? a
			: function (b, c) {
					return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
			  };
	});
	r('Array.prototype.includes', function (a) {
		return a
			? a
			: function (b, c) {
					var d = this;
					d instanceof String && (d = String(d));
					var e = d.length;
					c = c || 0;
					for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
						var g = d[c];
						if (g === b || Object.is(g, b)) return !0;
					}
					return !1;
			  };
	});
	r('String.prototype.includes', function (a) {
		return a
			? a
			: function (b, c) {
					return -1 !== t(this, b, 'includes').indexOf(b, c || 0);
			  };
	});
	r('Array.prototype.copyWithin', function (a) {
		function b(c) {
			c = Number(c);
			return Infinity === c || -Infinity === c ? c : c | 0;
		}
		return a
			? a
			: function (c, d, e) {
					var g = this.length;
					c = b(c);
					d = b(d);
					e = void 0 === e ? g : b(e);
					c = 0 > c ? Math.max(g + c, 0) : Math.min(c, g);
					d = 0 > d ? Math.max(g + d, 0) : Math.min(d, g);
					e = 0 > e ? Math.max(g + e, 0) : Math.min(e, g);
					if (c < d)
						for (; d < e; )
							d in this ? (this[c++] = this[d++]) : (delete this[c++], d++);
					else
						for (e = Math.min(e, g + d - c), c += e - d; e > d; )
							--e in this ? (this[--c] = this[e]) : delete this[--c];
					return this;
			  };
	});
	r('Symbol', function (a) {
		function b(e) {
			if (this instanceof b) throw new TypeError('Symbol is not a constructor');
			return new c('jscomp_symbol_' + (e || '') + '_' + d++, e);
		}
		function c(e, g) {
			this.g = e;
			da(this, 'description', { configurable: !0, writable: !0, value: g });
		}
		if (a) return a;
		c.prototype.toString = function () {
			return this.g;
		};
		var d = 0;
		return b;
	});
	r('Symbol.iterator', function (a) {
		if (a) return a;
		a = Symbol('Symbol.iterator');
		for (
			var b =
					'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
						' '
					),
				c = 0;
			c < b.length;
			c++
		) {
			var d = q[b[c]];
			'function' === typeof d &&
				'function' != typeof d.prototype[a] &&
				da(d.prototype, a, {
					configurable: !0,
					writable: !0,
					value: function () {
						return fa(aa(this));
					},
				});
		}
		return a;
	});
	r('Symbol.asyncIterator', function (a) {
		return a ? a : Symbol('Symbol.asyncIterator');
	});
	function fa(a) {
		a = { next: a };
		a[Symbol.iterator] = function () {
			return this;
		};
		return a;
	}
	function ha(a, b) {
		a instanceof String && (a += '');
		var c = 0,
			d = !1,
			e = {
				next: function () {
					if (!d && c < a.length) {
						var g = c++;
						return { value: b(g, a[g]), done: !1 };
					}
					d = !0;
					return { done: !0, value: void 0 };
				},
			};
		e[Symbol.iterator] = function () {
			return e;
		};
		return e;
	}
	r('Array.prototype.entries', function (a) {
		return a
			? a
			: function () {
					return ha(this, function (b, c) {
						return [b, c];
					});
			  };
	});
	r('Array.prototype.fill', function (a) {
		return a
			? a
			: function (b, c, d) {
					var e = this.length || 0;
					0 > c && (c = Math.max(0, e + c));
					if (null == d || d > e) d = e;
					d = Number(d);
					0 > d && (d = Math.max(0, e + d));
					for (c = Number(c || 0); c < d; c++) this[c] = b;
					return this;
			  };
	});
	r('Array.prototype.findIndex', function (a) {
		return a
			? a
			: function (b, c) {
					return ca(this, b, c).U;
			  };
	});
	r('Array.prototype.flat', function (a) {
		return a
			? a
			: function (b) {
					b = void 0 === b ? 1 : b;
					for (var c = [], d = 0; d < this.length; d++) {
						var e = this[d];
						Array.isArray(e) && 0 < b
							? ((e = Array.prototype.flat.call(e, b - 1)), c.push.apply(c, e))
							: c.push(e);
					}
					return c;
			  };
	});
	r('Array.prototype.flatMap', function (a) {
		return a
			? a
			: function (b, c) {
					for (var d = [], e = 0; e < this.length; e++) {
						var g = b.call(c, this[e], e, this);
						Array.isArray(g) ? d.push.apply(d, g) : d.push(g);
					}
					return d;
			  };
	});
	r('Array.from', function (a) {
		return a
			? a
			: function (b, c, d) {
					c =
						null != c
							? c
							: function (h) {
									return h;
							  };
					var e = [],
						g =
							'undefined' != typeof Symbol &&
							Symbol.iterator &&
							b[Symbol.iterator];
					if ('function' == typeof g) {
						b = g.call(b);
						for (var f = 0; !(g = b.next()).done; )
							e.push(c.call(d, g.value, f++));
					} else
						for (g = b.length, f = 0; f < g; f++) e.push(c.call(d, b[f], f));
					return e;
			  };
	});
	r('Array.prototype.keys', function (a) {
		return a
			? a
			: function () {
					return ha(this, function (b) {
						return b;
					});
			  };
	});
	r('Array.of', function (a) {
		return a
			? a
			: function (b) {
					return Array.from(arguments);
			  };
	});
	r('Array.prototype.values', function (a) {
		return a
			? a
			: function () {
					return ha(this, function (b, c) {
						return c;
					});
			  };
	});
	var ia;
	if ('function' == typeof Object.setPrototypeOf) ia = Object.setPrototypeOf;
	else {
		var ja;
		a: {
			var ka = { a: !0 },
				la = {};
			try {
				la.__proto__ = ka;
				ja = la.a;
				break a;
			} catch (a) {}
			ja = !1;
		}
		ia = ja
			? function (a, b) {
					a.__proto__ = b;
					if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
					return a;
			  }
			: null;
	}
	var ma = ia;
	r('globalThis', function (a) {
		return a || q;
	});
	function u(a, b) {
		return Object.prototype.hasOwnProperty.call(a, b);
	}
	r('WeakMap', function (a) {
		function b(k) {
			this.g = (h += Math.random() + 1).toString();
			if (k) {
				k = n(k);
				for (var m; !(m = k.next()).done; ) (m = m.value), this.set(m[0], m[1]);
			}
		}
		function c() {}
		function d(k) {
			var m = typeof k;
			return ('object' === m && null !== k) || 'function' === m;
		}
		function e(k) {
			if (!u(k, f)) {
				var m = new c();
				da(k, f, { value: m });
			}
		}
		function g(k) {
			var m = Object[k];
			m &&
				(Object[k] = function (p) {
					if (p instanceof c) return p;
					Object.isExtensible(p) && e(p);
					return m(p);
				});
		}
		if (
			(function () {
				if (!a || !Object.seal) return !1;
				try {
					var k = Object.seal({}),
						m = Object.seal({}),
						p = new a([
							[k, 2],
							[m, 3],
						]);
					if (2 != p.get(k) || 3 != p.get(m)) return !1;
					p.delete(k);
					p.set(m, 4);
					return !p.has(k) && 4 == p.get(m);
				} catch (x) {
					return !1;
				}
			})()
		)
			return a;
		var f = '$jscomp_hidden_' + Math.random();
		g('freeze');
		g('preventExtensions');
		g('seal');
		var h = 0;
		b.prototype.set = function (k, m) {
			if (!d(k)) throw Error('Invalid WeakMap key');
			e(k);
			if (!u(k, f)) throw Error('WeakMap key fail: ' + k);
			k[f][this.g] = m;
			return this;
		};
		b.prototype.get = function (k) {
			return d(k) && u(k, f) ? k[f][this.g] : void 0;
		};
		b.prototype.has = function (k) {
			return d(k) && u(k, f) && u(k[f], this.g);
		};
		b.prototype.delete = function (k) {
			return d(k) && u(k, f) && u(k[f], this.g) ? delete k[f][this.g] : !1;
		};
		return b;
	});
	r('Map', function (a) {
		function b() {
			var h = {};
			return (h.B = h.next = h.head = h);
		}
		function c(h, k) {
			var m = h.g;
			return fa(function () {
				if (m) {
					for (; m.head != h.g; ) m = m.B;
					for (; m.next != m.head; )
						return (m = m.next), { done: !1, value: k(m) };
					m = null;
				}
				return { done: !0, value: void 0 };
			});
		}
		function d(h, k) {
			var m = k && typeof k;
			'object' == m || 'function' == m
				? g.has(k)
					? (m = g.get(k))
					: ((m = '' + ++f), g.set(k, m))
				: (m = 'p_' + k);
			var p = h.h[m];
			if (p && u(h.h, m))
				for (h = 0; h < p.length; h++) {
					var x = p[h];
					if ((k !== k && x.key !== x.key) || k === x.key)
						return { id: m, list: p, index: h, u: x };
				}
			return {
				id: m,
				list: p,
				index: -1,
				u: void 0,
			};
		}
		function e(h) {
			this.h = {};
			this.g = b();
			this.size = 0;
			if (h) {
				h = n(h);
				for (var k; !(k = h.next()).done; ) (k = k.value), this.set(k[0], k[1]);
			}
		}
		if (
			(function () {
				if (
					!a ||
					'function' != typeof a ||
					!a.prototype.entries ||
					'function' != typeof Object.seal
				)
					return !1;
				try {
					var h = Object.seal({ x: 4 }),
						k = new a(n([[h, 's']]));
					if (
						's' != k.get(h) ||
						1 != k.size ||
						k.get({ x: 4 }) ||
						k.set({ x: 4 }, 't') != k ||
						2 != k.size
					)
						return !1;
					var m = k.entries(),
						p = m.next();
					if (p.done || p.value[0] != h || 's' != p.value[1]) return !1;
					p = m.next();
					return p.done ||
						4 != p.value[0].x ||
						't' != p.value[1] ||
						!m.next().done
						? !1
						: !0;
				} catch (x) {
					return !1;
				}
			})()
		)
			return a;
		var g = new WeakMap();
		e.prototype.set = function (h, k) {
			h = 0 === h ? 0 : h;
			var m = d(this, h);
			m.list || (m.list = this.h[m.id] = []);
			m.u
				? (m.u.value = k)
				: ((m.u = {
						next: this.g,
						B: this.g.B,
						head: this.g,
						key: h,
						value: k,
				  }),
				  m.list.push(m.u),
				  (this.g.B.next = m.u),
				  (this.g.B = m.u),
				  this.size++);
			return this;
		};
		e.prototype.delete = function (h) {
			h = d(this, h);
			return h.u && h.list
				? (h.list.splice(h.index, 1),
				  h.list.length || delete this.h[h.id],
				  (h.u.B.next = h.u.next),
				  (h.u.next.B = h.u.B),
				  (h.u.head = null),
				  this.size--,
				  !0)
				: !1;
		};
		e.prototype.clear = function () {
			this.h = {};
			this.g = this.g.B = b();
			this.size = 0;
		};
		e.prototype.has = function (h) {
			return !!d(this, h).u;
		};
		e.prototype.get = function (h) {
			return (h = d(this, h).u) && h.value;
		};
		e.prototype.entries = function () {
			return c(this, function (h) {
				return [h.key, h.value];
			});
		};
		e.prototype.keys = function () {
			return c(this, function (h) {
				return h.key;
			});
		};
		e.prototype.values = function () {
			return c(this, function (h) {
				return h.value;
			});
		};
		e.prototype.forEach = function (h, k) {
			for (var m = this.entries(), p; !(p = m.next()).done; )
				(p = p.value), h.call(k, p[1], p[0], this);
		};
		e.prototype[Symbol.iterator] = e.prototype.entries;
		var f = 0;
		return e;
	});
	r('Math.acosh', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					return Math.log(b + Math.sqrt(b * b - 1));
			  };
	});
	r('Math.asinh', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					if (0 === b) return b;
					var c = Math.log(Math.abs(b) + Math.sqrt(b * b + 1));
					return 0 > b ? -c : c;
			  };
	});
	r('Math.log1p', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					if (0.25 > b && -0.25 < b) {
						for (var c = b, d = 1, e = b, g = 0, f = 1; g != e; )
							(c *= b), (f *= -1), (e = (g = e) + (f * c) / ++d);
						return e;
					}
					return Math.log(1 + b);
			  };
	});
	r('Math.atanh', function (a) {
		if (a) return a;
		var b = Math.log1p;
		return function (c) {
			c = Number(c);
			return (b(c) - b(-c)) / 2;
		};
	});
	r('Math.cbrt', function (a) {
		return a
			? a
			: function (b) {
					if (0 === b) return b;
					b = Number(b);
					var c = Math.pow(Math.abs(b), 1 / 3);
					return 0 > b ? -c : c;
			  };
	});
	r('Math.clz32', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b) >>> 0;
					if (0 === b) return 32;
					var c = 0;
					0 === (b & 4294901760) && ((b <<= 16), (c += 16));
					0 === (b & 4278190080) && ((b <<= 8), (c += 8));
					0 === (b & 4026531840) && ((b <<= 4), (c += 4));
					0 === (b & 3221225472) && ((b <<= 2), (c += 2));
					0 === (b & 2147483648) && c++;
					return c;
			  };
	});
	r('Math.cosh', function (a) {
		if (a) return a;
		var b = Math.exp;
		return function (c) {
			c = Number(c);
			return (b(c) + b(-c)) / 2;
		};
	});
	r('Math.expm1', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					if (0.25 > b && -0.25 < b) {
						for (var c = b, d = 1, e = b, g = 0; g != e; )
							(c *= b / ++d), (e = (g = e) + c);
						return e;
					}
					return Math.exp(b) - 1;
			  };
	});
	r('Math.fround', function (a) {
		if (a) return a;
		if ('function' !== typeof Float32Array)
			return function (c) {
				return c;
			};
		var b = new Float32Array(1);
		return function (c) {
			b[0] = c;
			return b[0];
		};
	});
	r('Math.hypot', function (a) {
		return a
			? a
			: function (b) {
					if (2 > arguments.length)
						return arguments.length ? Math.abs(arguments[0]) : 0;
					var c, d, e;
					for (c = e = 0; c < arguments.length; c++)
						e = Math.max(e, Math.abs(arguments[c]));
					if (1e100 < e || 1e-100 > e) {
						if (!e) return e;
						for (c = d = 0; c < arguments.length; c++) {
							var g = Number(arguments[c]) / e;
							d += g * g;
						}
						return Math.sqrt(d) * e;
					}
					for (c = d = 0; c < arguments.length; c++)
						(g = Number(arguments[c])), (d += g * g);
					return Math.sqrt(d);
			  };
	});
	r('Math.imul', function (a) {
		return a
			? a
			: function (b, c) {
					b = Number(b);
					c = Number(c);
					var d = b & 65535,
						e = c & 65535;
					return (
						(d * e +
							(((((b >>> 16) & 65535) * e + d * ((c >>> 16) & 65535)) << 16) >>>
								0)) |
						0
					);
			  };
	});
	r('Math.log10', function (a) {
		return a
			? a
			: function (b) {
					return Math.log(b) / Math.LN10;
			  };
	});
	r('Math.log2', function (a) {
		return a
			? a
			: function (b) {
					return Math.log(b) / Math.LN2;
			  };
	});
	r('Math.sign', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					return 0 === b || isNaN(b) ? b : 0 < b ? 1 : -1;
			  };
	});
	r('Math.sinh', function (a) {
		if (a) return a;
		var b = Math.exp;
		return function (c) {
			c = Number(c);
			return 0 === c ? c : (b(c) - b(-c)) / 2;
		};
	});
	r('Math.tanh', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					if (0 === b) return b;
					var c = Math.exp(-2 * Math.abs(b));
					c = (1 - c) / (1 + c);
					return 0 > b ? -c : c;
			  };
	});
	r('Math.trunc', function (a) {
		return a
			? a
			: function (b) {
					b = Number(b);
					if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b)
						return b;
					var c = Math.floor(Math.abs(b));
					return 0 > b ? -c : c;
			  };
	});
	r('Number.EPSILON', function () {
		return Math.pow(2, -52);
	});
	r('Number.MAX_SAFE_INTEGER', function () {
		return 9007199254740991;
	});
	r('Number.MIN_SAFE_INTEGER', function () {
		return -9007199254740991;
	});
	r('Number.isFinite', function (a) {
		return a
			? a
			: function (b) {
					return 'number' !== typeof b
						? !1
						: !isNaN(b) && Infinity !== b && -Infinity !== b;
			  };
	});
	r('Number.isInteger', function (a) {
		return a
			? a
			: function (b) {
					return Number.isFinite(b) ? b === Math.floor(b) : !1;
			  };
	});
	r('Number.isNaN', function (a) {
		return a
			? a
			: function (b) {
					return 'number' === typeof b && isNaN(b);
			  };
	});
	r('Number.isSafeInteger', function (a) {
		return a
			? a
			: function (b) {
					return Number.isInteger(b) && Math.abs(b) <= Number.MAX_SAFE_INTEGER;
			  };
	});
	r('Number.parseFloat', function (a) {
		return a || parseFloat;
	});
	r('Number.parseInt', function (a) {
		return a || parseInt;
	});
	var na =
		'function' == typeof Object.assign
			? Object.assign
			: function (a, b) {
					for (var c = 1; c < arguments.length; c++) {
						var d = arguments[c];
						if (d) for (var e in d) u(d, e) && (a[e] = d[e]);
					}
					return a;
			  };
	r('Object.assign', function (a) {
		return a || na;
	});
	r('Object.entries', function (a) {
		return a
			? a
			: function (b) {
					var c = [],
						d;
					for (d in b) u(b, d) && c.push([d, b[d]]);
					return c;
			  };
	});
	r('Object.fromEntries', function (a) {
		return a
			? a
			: function (b) {
					var c = {};
					if (!(Symbol.iterator in b))
						throw new TypeError('' + b + ' is not iterable');
					b = b[Symbol.iterator].call(b);
					for (var d = b.next(); !d.done; d = b.next()) {
						d = d.value;
						if (Object(d) !== d)
							throw new TypeError(
								'iterable for fromEntries should yield objects'
							);
						c[d[0]] = d[1];
					}
					return c;
			  };
	});
	r('Reflect', function (a) {
		return a ? a : {};
	});
	r('Object.getOwnPropertySymbols', function (a) {
		return a
			? a
			: function () {
					return [];
			  };
	});
	r('Reflect.ownKeys', function (a) {
		return a
			? a
			: function (b) {
					var c = [],
						d = Object.getOwnPropertyNames(b);
					b = Object.getOwnPropertySymbols(b);
					for (var e = 0; e < d.length; e++)
						('jscomp_symbol_' == d[e].substring(0, 14) ? b : c).push(d[e]);
					return c.concat(b);
			  };
	});
	r('Object.getOwnPropertyDescriptors', function (a) {
		return a
			? a
			: function (b) {
					for (var c = {}, d = Reflect.ownKeys(b), e = 0; e < d.length; e++)
						c[d[e]] = Object.getOwnPropertyDescriptor(b, d[e]);
					return c;
			  };
	});
	r('Object.setPrototypeOf', function (a) {
		return a || ma;
	});
	r('Object.values', function (a) {
		return a
			? a
			: function (b) {
					var c = [],
						d;
					for (d in b) u(b, d) && c.push(b[d]);
					return c;
			  };
	});
	r('Promise.allSettled', function (a) {
		function b(d) {
			return { status: 'fulfilled', value: d };
		}
		function c(d) {
			return { status: 'rejected', reason: d };
		}
		return a
			? a
			: function (d) {
					var e = this;
					d = Array.from(d, function (g) {
						return e.resolve(g).then(b, c);
					});
					return e.all(d);
			  };
	});
	r('Promise.prototype.finally', function (a) {
		return a
			? a
			: function (b) {
					return this.then(
						function (c) {
							return Promise.resolve(b()).then(function () {
								return c;
							});
						},
						function (c) {
							return Promise.resolve(b()).then(function () {
								throw c;
							});
						}
					);
			  };
	});
	r('Reflect.apply', function (a) {
		if (a) return a;
		var b = Function.prototype.apply;
		return function (c, d, e) {
			return b.call(c, d, e);
		};
	});
	var oa =
			'function' == typeof Object.create
				? Object.create
				: function (a) {
						function b() {}
						b.prototype = a;
						return new b();
				  },
		pa = (function () {
			function a() {
				function c() {}
				new c();
				Reflect.construct(c, [], function () {});
				return new c() instanceof c;
			}
			if ('undefined' != typeof Reflect && Reflect.construct) {
				if (a()) return Reflect.construct;
				var b = Reflect.construct;
				return function (c, d, e) {
					c = b(c, d);
					e && Reflect.setPrototypeOf(c, e.prototype);
					return c;
				};
			}
			return function (c, d, e) {
				void 0 === e && (e = c);
				e = oa(e.prototype || Object.prototype);
				return Function.prototype.apply.call(c, e, d) || e;
			};
		})();
	r('Reflect.construct', function () {
		return pa;
	});
	r('Reflect.defineProperty', function (a) {
		return a
			? a
			: function (b, c, d) {
					try {
						Object.defineProperty(b, c, d);
						var e = Object.getOwnPropertyDescriptor(b, c);
						return e
							? e.configurable === (d.configurable || !1) &&
									e.enumerable === (d.enumerable || !1) &&
									('value' in e
										? e.value === d.value && e.writable === (d.writable || !1)
										: e.get === d.get && e.set === d.set)
							: !1;
					} catch (g) {
						return !1;
					}
			  };
	});
	r('Reflect.deleteProperty', function (a) {
		return a
			? a
			: function (b, c) {
					if (!u(b, c)) return !0;
					try {
						return delete b[c];
					} catch (d) {
						return !1;
					}
			  };
	});
	r('Reflect.getOwnPropertyDescriptor', function (a) {
		return a || Object.getOwnPropertyDescriptor;
	});
	r('Reflect.getPrototypeOf', function (a) {
		return a || Object.getPrototypeOf;
	});
	function qa(a, b) {
		for (; a; ) {
			var c = Reflect.getOwnPropertyDescriptor(a, b);
			if (c) return c;
			a = Reflect.getPrototypeOf(a);
		}
	}
	r('Reflect.get', function (a) {
		return a
			? a
			: function (b, c, d) {
					if (2 >= arguments.length) return b[c];
					var e = qa(b, c);
					if (e) return e.get ? e.get.call(d) : e.value;
			  };
	});
	r('Reflect.has', function (a) {
		return a
			? a
			: function (b, c) {
					return c in b;
			  };
	});
	r('Reflect.isExtensible', function (a) {
		return a
			? a
			: 'function' == typeof Object.isExtensible
			? Object.isExtensible
			: function () {
					return !0;
			  };
	});
	r('Reflect.preventExtensions', function (a) {
		return a
			? a
			: 'function' != typeof Object.preventExtensions
			? function () {
					return !1;
			  }
			: function (b) {
					Object.preventExtensions(b);
					return !Object.isExtensible(b);
			  };
	});
	r('Reflect.set', function (a) {
		return a
			? a
			: function (b, c, d, e) {
					var g = qa(b, c);
					return g
						? g.set
							? (g.set.call(3 < arguments.length ? e : b, d), !0)
							: g.writable && !Object.isFrozen(b)
							? ((b[c] = d), !0)
							: !1
						: Reflect.isExtensible(b)
						? ((b[c] = d), !0)
						: !1;
			  };
	});
	r('Reflect.setPrototypeOf', function (a) {
		return a
			? a
			: ma
			? function (b, c) {
					try {
						return ma(b, c), !0;
					} catch (d) {
						return !1;
					}
			  }
			: null;
	});
	r('Set', function (a) {
		function b(c) {
			this.g = new Map();
			if (c) {
				c = n(c);
				for (var d; !(d = c.next()).done; ) this.add(d.value);
			}
			this.size = this.g.size;
		}
		if (
			(function () {
				if (
					!a ||
					'function' != typeof a ||
					!a.prototype.entries ||
					'function' != typeof Object.seal
				)
					return !1;
				try {
					var c = Object.seal({ x: 4 }),
						d = new a(n([c]));
					if (
						!d.has(c) ||
						1 != d.size ||
						d.add(c) != d ||
						1 != d.size ||
						d.add({ x: 4 }) != d ||
						2 != d.size
					)
						return !1;
					var e = d.entries(),
						g = e.next();
					if (g.done || g.value[0] != c || g.value[1] != c) return !1;
					g = e.next();
					return g.done ||
						g.value[0] == c ||
						4 != g.value[0].x ||
						g.value[1] != g.value[0]
						? !1
						: e.next().done;
				} catch (f) {
					return !1;
				}
			})()
		)
			return a;
		b.prototype.add = function (c) {
			c = 0 === c ? 0 : c;
			this.g.set(c, c);
			this.size = this.g.size;
			return this;
		};
		b.prototype.delete = function (c) {
			c = this.g.delete(c);
			this.size = this.g.size;
			return c;
		};
		b.prototype.clear = function () {
			this.g.clear();
			this.size = 0;
		};
		b.prototype.has = function (c) {
			return this.g.has(c);
		};
		b.prototype.entries = function () {
			return this.g.entries();
		};
		b.prototype.values = function () {
			return this.g.values();
		};
		b.prototype.keys = b.prototype.values;
		b.prototype[Symbol.iterator] = b.prototype.values;
		b.prototype.forEach = function (c, d) {
			var e = this;
			this.g.forEach(function (g) {
				return c.call(d, g, g, e);
			});
		};
		return b;
	});
	r('String.prototype.codePointAt', function (a) {
		return a
			? a
			: function (b) {
					var c = t(this, null, 'codePointAt'),
						d = c.length;
					b = Number(b) || 0;
					if (0 <= b && b < d) {
						b |= 0;
						var e = c.charCodeAt(b);
						if (55296 > e || 56319 < e || b + 1 === d) return e;
						b = c.charCodeAt(b + 1);
						return 56320 > b || 57343 < b ? e : 1024 * (e - 55296) + b + 9216;
					}
			  };
	});
	r('String.fromCodePoint', function (a) {
		return a
			? a
			: function (b) {
					for (var c = '', d = 0; d < arguments.length; d++) {
						var e = Number(arguments[d]);
						if (0 > e || 1114111 < e || e !== Math.floor(e))
							throw new RangeError('invalid_code_point ' + e);
						65535 >= e
							? (c += String.fromCharCode(e))
							: ((e -= 65536),
							  (c += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
							  (c += String.fromCharCode((e & 1023) | 56320)));
					}
					return c;
			  };
	});
	r('String.prototype.matchAll', function (a) {
		return a
			? a
			: function (b) {
					if (b instanceof RegExp && !b.global)
						throw new TypeError(
							'RegExp passed into String.prototype.matchAll() must have global tag.'
						);
					var c = new RegExp(b, b instanceof RegExp ? void 0 : 'g'),
						d = this,
						e = !1,
						g = {
							next: function () {
								if (e) return { value: void 0, done: !0 };
								var f = c.exec(d);
								if (!f) return (e = !0), { value: void 0, done: !0 };
								'' === f[0] && (c.lastIndex += 1);
								return { value: f, done: !1 };
							},
						};
					g[Symbol.iterator] = function () {
						return g;
					};
					return g;
			  };
	});
	function ra(a, b) {
		a = void 0 !== a ? String(a) : ' ';
		return 0 < b && a ? a.repeat(Math.ceil(b / a.length)).substring(0, b) : '';
	}
	r('String.prototype.padEnd', function (a) {
		return a
			? a
			: function (b, c) {
					var d = t(this, null, 'padStart');
					return d + ra(c, b - d.length);
			  };
	});
	r('String.prototype.padStart', function (a) {
		return a
			? a
			: function (b, c) {
					var d = t(this, null, 'padStart');
					return ra(c, b - d.length) + d;
			  };
	});
	r('String.prototype.trimRight', function (a) {
		function b() {
			return this.replace(/[\s\xa0]+$/, '');
		}
		return a || b;
	});
	r('String.prototype.trimEnd', function (a) {
		return a || String.prototype.trimRight;
	});
	function v(a) {
		return a ? a : Array.prototype.copyWithin;
	}
	r('Int8Array.prototype.copyWithin', v);
	r('Uint8Array.prototype.copyWithin', v);
	r('Uint8ClampedArray.prototype.copyWithin', v);
	r('Int16Array.prototype.copyWithin', v);
	r('Uint16Array.prototype.copyWithin', v);
	r('Int32Array.prototype.copyWithin', v);
	r('Uint32Array.prototype.copyWithin', v);
	r('Float32Array.prototype.copyWithin', v);
	r('Float64Array.prototype.copyWithin', v);
	function w(a) {
		return a ? a : Array.prototype.fill;
	}
	r('Int8Array.prototype.fill', w);
	r('Uint8Array.prototype.fill', w);
	r('Uint8ClampedArray.prototype.fill', w);
	r('Int16Array.prototype.fill', w);
	r('Uint16Array.prototype.fill', w);
	r('Int32Array.prototype.fill', w);
	r('Uint32Array.prototype.fill', w);
	r('Float32Array.prototype.fill', w);
	r('Float64Array.prototype.fill', w);
	r('WeakSet', function (a) {
		function b(c) {
			this.g = new WeakMap();
			if (c) {
				c = n(c);
				for (var d; !(d = c.next()).done; ) this.add(d.value);
			}
		}
		if (
			(function () {
				if (!a || !Object.seal) return !1;
				try {
					var c = Object.seal({}),
						d = Object.seal({}),
						e = new a([c]);
					if (!e.has(c) || e.has(d)) return !1;
					e.delete(c);
					e.add(d);
					return !e.has(c) && e.has(d);
				} catch (g) {
					return !1;
				}
			})()
		)
			return a;
		b.prototype.add = function (c) {
			this.g.set(c, !0);
			return this;
		};
		b.prototype.has = function (c) {
			return this.g.has(c);
		};
		b.prototype.delete = function (c) {
			return this.g.delete(c);
		};
		return b;
	});
	var y = this || self,
		sa = /^[\w+/_-]+[=]{0,2}$/,
		ta = null;
	function ua(a) {
		return (a = a.querySelector && a.querySelector('script[nonce]')) &&
			(a = a.nonce || a.getAttribute('nonce')) &&
			sa.test(a)
			? a
			: '';
	}
	function z(a) {
		a = a.split('.');
		for (var b = y, c = 0; c < a.length; c++)
			if (((b = b[a[c]]), null == b)) return null;
		return b;
	}
	function A() {}
	function xa(a) {
		var b = typeof a;
		return ('object' == b && null != a) || 'function' == b;
	}
	function ya(a, b, c) {
		return a.call.apply(a.bind, arguments);
	}
	function za(a, b, c) {
		if (!a) throw Error();
		if (2 < arguments.length) {
			var d = Array.prototype.slice.call(arguments, 2);
			return function () {
				var e = Array.prototype.slice.call(arguments);
				Array.prototype.unshift.apply(e, d);
				return a.apply(b, e);
			};
		}
		return function () {
			return a.apply(b, arguments);
		};
	}
	function C(a, b, c) {
		Function.prototype.bind &&
		-1 != Function.prototype.bind.toString().indexOf('native code')
			? (C = ya)
			: (C = za);
		return C.apply(null, arguments);
	}
	function D(a, b) {
		a = a.split('.');
		var c = y;
		a[0] in c ||
			'undefined' == typeof c.execScript ||
			c.execScript('var ' + a[0]);
		for (var d; a.length && (d = a.shift()); )
			a.length || void 0 === b
				? c[d] && c[d] !== Object.prototype[d]
					? (c = c[d])
					: (c = c[d] = {})
				: (c[d] = b);
	}
	function E(a, b) {
		function c() {}
		c.prototype = b.prototype;
		a.Ma = b.prototype;
		a.prototype = new c();
		a.prototype.constructor = a;
		a.qa = function (d, e, g) {
			for (
				var f = Array(arguments.length - 2), h = 2;
				h < arguments.length;
				h++
			)
				f[h - 2] = arguments[h];
			return b.prototype[e].apply(d, f);
		};
	}
	function Aa(a) {
		return a;
	}
	function F(a) {
		if (Error.captureStackTrace) Error.captureStackTrace(this, F);
		else {
			var b = Error().stack;
			b && (this.stack = b);
		}
		a && (this.message = String(a));
	}
	E(F, Error);
	F.prototype.name = 'CustomError';
	function G(a, b) {
		this.g = (a === Ba && b) || '';
		this.h = Ca;
	}
	G.prototype.V = !0;
	G.prototype.T = function () {
		return this.g;
	};
	function Da(a) {
		return a instanceof G && a.constructor === G && a.h === Ca
			? a.g
			: 'type_error:Const';
	}
	function H(a) {
		return new G(Ba, a);
	}
	var Ca = {},
		Ba = {};
	var I = { j: {} };
	I.j.O = {
		oa: {
			'gstatic.com': {
				loader: H('https://www.gstatic.com/charts/%{version}/loader.js'),
				debug: H(
					'https://www.gstatic.com/charts/debug/%{version}/js/jsapi_debug_%{package}_module.js'
				),
				debug_i18n: H(
					'https://www.gstatic.com/charts/debug/%{version}/i18n/jsapi_debug_i18n_%{package}_module__%{language}.js'
				),
				compiled: H(
					'https://www.gstatic.com/charts/%{version}/js/jsapi_compiled_%{package}_module.js'
				),
				compiled_i18n: H(
					'https://www.gstatic.com/charts/%{version}/i18n/jsapi_compiled_i18n_%{package}_module__%{language}.js'
				),
				css: H(
					'https://www.gstatic.com/charts/%{version}/css/%{subdir}/%{filename}'
				),
				css2: H(
					'https://www.gstatic.com/charts/%{version}/css/%{subdir1}/%{subdir2}/%{filename}'
				),
				third_party: H(
					'https://www.gstatic.com/charts/%{version}/third_party/%{subdir}/%{filename}'
				),
				third_party2: H(
					'https://www.gstatic.com/charts/%{version}/third_party/%{subdir1}/%{subdir2}/%{filename}'
				),
				third_party_gen: H(
					'https://www.gstatic.com/charts/%{version}/third_party/%{subdir}/%{filename}'
				),
			},
			'gstatic.cn': {
				loader: H('https://www.gstatic.cn/charts/%{version}/loader.js'),
				debug: H(
					'https://www.gstatic.cn/charts/debug/%{version}/js/jsapi_debug_%{package}_module.js'
				),
				debug_i18n: H(
					'https://www.gstatic.cn/charts/debug/%{version}/i18n/jsapi_debug_i18n_%{package}_module__%{language}.js'
				),
				compiled: H(
					'https://www.gstatic.cn/charts/%{version}/js/jsapi_compiled_%{package}_module.js'
				),
				compiled_i18n: H(
					'https://www.gstatic.cn/charts/%{version}/i18n/jsapi_compiled_i18n_%{package}_module__%{language}.js'
				),
				css: H(
					'https://www.gstatic.cn/charts/%{version}/css/%{subdir}/%{filename}'
				),
				css2: H(
					'https://www.gstatic.cn/charts/%{version}/css/%{subdir1}/%{subdir2}/%{filename}'
				),
				third_party: H(
					'https://www.gstatic.cn/charts/%{version}/third_party/%{subdir}/%{filename}'
				),
				third_party2: H(
					'https://www.gstatic.cn/charts/%{version}/third_party/%{subdir1}/%{subdir2}/%{filename}'
				),
				third_party_gen: H(
					'https://www.gstatic.cn/charts/%{version}/third_party/%{subdir}/%{filename}'
				),
			},
		},
		ga: ['default'],
		ua: {
			default: [],
			graphics: ['default'],
			ui: ['graphics'],
			ui_base: ['graphics'],
			flashui: ['ui'],
			fw: ['ui'],
			geo: ['ui'],
			annotatedtimeline: ['annotationchart'],
			annotationchart: ['ui', 'controls', 'corechart', 'table'],
			areachart: 'browserchart',
			bar: ['fw', 'dygraph', 'webfontloader'],
			barchart: 'browserchart',
			browserchart: ['ui'],
			bubbles: ['fw', 'd3'],
			calendar: ['fw'],
			charteditor:
				'ui corechart imagechart annotatedtimeline gauge geochart motionchart orgchart table'.split(
					' '
				),
			charteditor_base:
				'ui_base corechart imagechart annotatedtimeline gauge geochart motionchart orgchart table_base'.split(
					' '
				),
			circles: ['fw', 'd3'],
			clusterchart: ['corechart', 'd3'],
			columnchart: 'browserchart',
			controls: ['ui'],
			controls_base: ['ui_base'],
			corechart: ['ui'],
			gantt: ['fw', 'dygraph'],
			gauge: ['ui'],
			geochart: ['geo'],
			geomap: ['flashui', 'geo'],
			geomap_base: ['ui_base'],
			helloworld: ['fw'],
			imagechart: ['ui'],
			imageareachart: 'imagechart',
			imagebarchart: 'imagechart',
			imagelinechart: 'imagechart',
			imagepiechart: 'imagechart',
			imagesparkline: 'imagechart',
			line: ['fw', 'dygraph', 'webfontloader'],
			linechart: 'browserchart',
			map: ['geo'],
			matrix: ['vegachart'],
			motionchart: ['flashui'],
			orgchart: ['ui'],
			overtimecharts: ['ui', 'corechart'],
			piechart: 'browserchart',
			sankey: ['fw', 'd3', 'd3.sankey'],
			scatter: ['fw', 'dygraph', 'webfontloader'],
			scatterchart: 'browserchart',
			sunburst: ['fw', 'd3'],
			streamgraph: ['fw', 'd3'],
			table: ['ui'],
			table_base: ['ui_base'],
			timeline: ['fw', 'ui', 'dygraph'],
			treemap: ['ui'],
			vegachart: ['graphics'],
			wordtree: ['ui'],
		},
		Oa: {
			d3: { subdir1: 'd3', subdir2: 'v5', filename: 'd3.js' },
			'd3.sankey': {
				subdir1: 'd3_sankey',
				subdir2: 'v4',
				filename: 'd3.sankey.js',
			},
			webfontloader: { subdir: 'webfontloader', filename: 'webfont.js' },
		},
		Na: {
			dygraph: { subdir: 'dygraphs', filename: 'dygraph-tickers-combined.js' },
		},
		sa: {
			default: [{ subdir: 'core', filename: 'tooltip.css' }],
			annotationchart: [
				{
					subdir: 'annotationchart',
					filename: 'annotationchart.css',
				},
			],
			charteditor: [{ subdir: 'charteditor', filename: 'charteditor.css' }],
			charteditor_base: [
				{ subdir: 'charteditor_base', filename: 'charteditor_base.css' },
			],
			controls: [{ subdir: 'controls', filename: 'controls.css' }],
			imagesparkline: [
				{ subdir: 'imagechart', filename: 'imagesparkline.css' },
			],
			orgchart: [{ subdir: 'orgchart', filename: 'orgchart.css' }],
			table: [
				{ subdir: 'table', filename: 'table.css' },
				{ subdir: 'util', filename: 'format.css' },
			],
			table_base: [
				{ subdir: 'util', filename: 'format.css' },
				{
					subdir: 'table',
					filename: 'table_base.css',
				},
			],
			ui: [{ subdir: 'util', filename: 'util.css' }],
			ui_base: [{ subdir: 'util', filename: 'util_base.css' }],
		},
	};
	I.j.ba = {
		ia: {
			'chrome-frame': {
				versions: {
					'1.0.0': {
						uncompressed: 'CFInstall.js',
						compressed: 'CFInstall.min.js',
					},
					'1.0.1': {
						uncompressed: 'CFInstall.js',
						compressed: 'CFInstall.min.js',
					},
					'1.0.2': {
						uncompressed: 'CFInstall.js',
						compressed: 'CFInstall.min.js',
					},
				},
				aliases: { 1: '1.0.2', '1.0': '1.0.2' },
			},
			swfobject: {
				versions: {
					2.1: { uncompressed: 'swfobject_src.js', compressed: 'swfobject.js' },
					2.2: { uncompressed: 'swfobject_src.js', compressed: 'swfobject.js' },
				},
				aliases: { 2: '2.2' },
			},
			'ext-core': {
				versions: {
					'3.1.0': {
						uncompressed: 'ext-core-debug.js',
						compressed: 'ext-core.js',
					},
					'3.0.0': {
						uncompressed: 'ext-core-debug.js',
						compressed: 'ext-core.js',
					},
				},
				aliases: { 3: '3.1.0', '3.0': '3.0.0', 3.1: '3.1.0' },
			},
			scriptaculous: {
				versions: {
					'1.8.3': {
						uncompressed: 'scriptaculous.js',
						compressed: 'scriptaculous.js',
					},
					'1.9.0': {
						uncompressed: 'scriptaculous.js',
						compressed: 'scriptaculous.js',
					},
					'1.8.1': {
						uncompressed: 'scriptaculous.js',
						compressed: 'scriptaculous.js',
					},
					'1.8.2': {
						uncompressed: 'scriptaculous.js',
						compressed: 'scriptaculous.js',
					},
				},
				aliases: { 1: '1.9.0', 1.8: '1.8.3', 1.9: '1.9.0' },
			},
			webfont: {
				versions: {
					'1.0.12': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.13': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.14': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.15': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.10': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.11': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.27': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.28': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.29': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.23': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.24': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.25': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.26': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.21': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.22': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.3': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.4': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.5': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.6': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.9': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.16': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.17': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.0': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.18': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.1': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.19': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
					'1.0.2': {
						uncompressed: 'webfont_debug.js',
						compressed: 'webfont.js',
					},
				},
				aliases: { 1: '1.0.29', '1.0': '1.0.29' },
			},
			jqueryui: {
				versions: {
					'1.8.17': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.16': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.15': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.14': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.4': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.13': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.5': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.12': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.6': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.11': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.7': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.10': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.8': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.9': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.6.0': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.7.0': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.5.2': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.0': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.7.1': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.5.3': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.1': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.7.2': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.8.2': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
					'1.7.3': {
						uncompressed: 'jquery-ui.js',
						compressed: 'jquery-ui.min.js',
					},
				},
				aliases: {
					1: '1.8.17',
					1.5: '1.5.3',
					1.6: '1.6.0',
					1.7: '1.7.3',
					1.8: '1.8.17',
					'1.8.3': '1.8.4',
				},
			},
			mootools: {
				versions: {
					'1.3.0': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.2.1': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.1.2': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.4.0': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.3.1': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.2.2': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.4.1': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.3.2': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.2.3': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.4.2': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.2.4': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.2.5': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
					'1.1.1': {
						uncompressed: 'mootools.js',
						compressed: 'mootools-yui-compressed.js',
					},
				},
				aliases: {
					1: '1.1.2',
					1.1: '1.1.2',
					1.2: '1.2.5',
					1.3: '1.3.2',
					1.4: '1.4.2',
					1.11: '1.1.1',
				},
			},
			yui: {
				versions: {
					'2.8.0r4': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
					'2.9.0': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
					'2.8.1': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
					'2.6.0': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
					'2.7.0': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
					'3.3.0': {
						uncompressed: 'build/yui/yui.js',
						compressed: 'build/yui/yui-min.js',
					},
					'2.8.2r1': {
						uncompressed: 'build/yuiloader/yuiloader.js',
						compressed: 'build/yuiloader/yuiloader-min.js',
					},
				},
				aliases: {
					2: '2.9.0',
					2.6: '2.6.0',
					2.7: '2.7.0',
					2.8: '2.8.2r1',
					'2.8.0': '2.8.0r4',
					'2.8.2': '2.8.2r1',
					2.9: '2.9.0',
					3: '3.3.0',
					3.3: '3.3.0',
				},
			},
			prototype: {
				versions: {
					'1.6.1.0': {
						uncompressed: 'prototype.js',
						compressed: 'prototype.js',
					},
					'1.6.0.2': {
						uncompressed: 'prototype.js',
						compressed: 'prototype.js',
					},
					'1.7.0.0': {
						uncompressed: 'prototype.js',
						compressed: 'prototype.js',
					},
					'1.6.0.3': {
						uncompressed: 'prototype.js',
						compressed: 'prototype.js',
					},
				},
				aliases: {
					1: '1.7.0.0',
					1.6: '1.6.1.0',
					'1.6.0': '1.6.0.3',
					'1.6.1': '1.6.1.0',
					1.7: '1.7.0.0',
					'1.7.0': '1.7.0.0',
				},
			},
			jquery: {
				versions: {
					'1.2.3': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.2.6': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.3.0': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.3.1': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.3.2': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.4.0': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.4.1': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.4.2': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.4.3': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.4.4': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.5.0': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.5.1': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.5.2': {
						uncompressed: 'jquery.js',
						compressed: 'jquery.min.js',
					},
					'1.6.0': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.6.1': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.6.2': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.6.3': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.6.4': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.7.0': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
					'1.7.1': { uncompressed: 'jquery.js', compressed: 'jquery.min.js' },
				},
				aliases: {
					1: '1.7.1',
					1.2: '1.2.6',
					1.3: '1.3.2',
					1.4: '1.4.4',
					1.5: '1.5.2',
					1.6: '1.6.4',
					1.7: '1.7.1',
				},
			},
			dojo: {
				versions: {
					'1.3.0': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.4.0': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.3.1': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.5.0': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.4.1': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.3.2': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.2.3': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.6.0': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.5.1': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.7.0': {
						uncompressed: 'dojo/dojo.js.uncompressed.js',
						compressed: 'dojo/dojo.js',
					},
					'1.6.1': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.4.3': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.7.1': {
						uncompressed: 'dojo/dojo.js.uncompressed.js',
						compressed: 'dojo/dojo.js',
					},
					'1.7.2': {
						uncompressed: 'dojo/dojo.js.uncompressed.js',
						compressed: 'dojo/dojo.js',
					},
					'1.2.0': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
					'1.1.1': {
						uncompressed: 'dojo/dojo.xd.js.uncompressed.js',
						compressed: 'dojo/dojo.xd.js',
					},
				},
				aliases: {
					1: '1.6.1',
					1.1: '1.1.1',
					1.2: '1.2.3',
					1.3: '1.3.2',
					1.4: '1.4.3',
					1.5: '1.5.1',
					1.6: '1.6.1',
					1.7: '1.7.2',
				},
			},
		},
	};
	I.j.ea = {
		af: !0,
		am: !0,
		az: !0,
		ar: !0,
		arb: 'ar',
		bg: !0,
		bn: !0,
		ca: !0,
		cs: !0,
		cmn: 'zh',
		da: !0,
		de: !0,
		el: !0,
		en: !0,
		en_gb: !0,
		es: !0,
		es_419: !0,
		et: !0,
		eu: !0,
		fa: !0,
		fi: !0,
		fil: !0,
		fr: !0,
		fr_ca: !0,
		gl: !0,
		ka: !0,
		gu: !0,
		he: 'iw',
		hi: !0,
		hr: !0,
		hu: !0,
		hy: !0,
		id: !0,
		in: 'id',
		is: !0,
		it: !0,
		iw: !0,
		ja: !0,
		ji: 'yi',
		jv: !1,
		jw: 'jv',
		km: !0,
		kn: !0,
		ko: !0,
		lo: !0,
		lt: !0,
		lv: !0,
		ml: !0,
		mn: !0,
		mo: 'ro',
		mr: !0,
		ms: !0,
		nb: 'no',
		ne: !0,
		nl: !0,
		no: !0,
		pl: !0,
		pt: 'pt_br',
		pt_br: !0,
		pt_pt: !0,
		ro: !0,
		ru: !0,
		si: !0,
		sk: !0,
		sl: !0,
		sr: !0,
		sv: !0,
		sw: !0,
		swh: 'sw',
		ta: !0,
		te: !0,
		th: !0,
		tl: 'fil',
		tr: !0,
		uk: !0,
		ur: !0,
		vi: !0,
		yi: !1,
		zh: 'zh_cn',
		zh_cn: !0,
		zh_hk: !0,
		zh_tw: !0,
		zsm: 'ms',
		zu: !0,
	};
	var Ea = Array.prototype.forEach
			? function (a, b, c) {
					Array.prototype.forEach.call(a, b, c);
			  }
			: function (a, b, c) {
					for (
						var d = a.length,
							e = 'string' === typeof a ? a.split('') : a,
							g = 0;
						g < d;
						g++
					)
						g in e && b.call(c, e[g], g, a);
			  },
		Fa = Array.prototype.map
			? function (a, b) {
					return Array.prototype.map.call(a, b, void 0);
			  }
			: function (a, b) {
					for (
						var c = a.length,
							d = Array(c),
							e = 'string' === typeof a ? a.split('') : a,
							g = 0;
						g < c;
						g++
					)
						g in e && (d[g] = b.call(void 0, e[g], g, a));
					return d;
			  },
		Ga = Array.prototype.some
			? function (a, b) {
					return Array.prototype.some.call(a, b, void 0);
			  }
			: function (a, b) {
					for (
						var c = a.length,
							d = 'string' === typeof a ? a.split('') : a,
							e = 0;
						e < c;
						e++
					)
						if (e in d && b.call(void 0, d[e], e, a)) return !0;
					return !1;
			  };
	function Ha(a) {
		return Array.prototype.concat.apply([], arguments);
	}
	function Ia(a, b) {
		for (var c = 1; c < arguments.length; c++) {
			var d = arguments[c];
			var e = typeof d;
			e = 'object' != e ? e : d ? (Array.isArray(d) ? 'array' : e) : 'null';
			if ('array' == e || ('object' == e && 'number' == typeof d.length)) {
				e = a.length || 0;
				var g = d.length || 0;
				a.length = e + g;
				for (var f = 0; f < g; f++) a[e + f] = d[f];
			} else a.push(d);
		}
	}
	var Ja;
	function K(a, b) {
		this.g = b === Ka ? a : '';
	}
	K.prototype.V = !0;
	K.prototype.T = function () {
		return this.g.toString();
	};
	K.prototype.toString = function () {
		return this.g + '';
	};
	function La(a) {
		return a instanceof K && a.constructor === K
			? a.g
			: 'type_error:TrustedResourceUrl';
	}
	function Ma(a, b) {
		var c = Da(a);
		if (!Na.test(c)) throw Error('Invalid TrustedResourceUrl format: ' + c);
		a = c.replace(Oa, function (d, e) {
			if (!Object.prototype.hasOwnProperty.call(b, e))
				throw Error(
					'Found marker, "' +
						e +
						'", in format string, "' +
						c +
						'", but no valid label mapping found in args: ' +
						JSON.stringify(b)
				);
			d = b[e];
			return d instanceof G ? Da(d) : encodeURIComponent(String(d));
		});
		return Pa(a);
	}
	var Oa = /%{(\w+)}/g,
		Na =
			/^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
		Qa = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
	function Ra(a, b, c) {
		a = Ma(a, b);
		a = Qa.exec(La(a).toString());
		b = a[3] || '';
		return Pa(a[1] + Sa('?', a[2] || '', c) + Sa('#', b, void 0));
	}
	var Ka = {};
	function Pa(a) {
		if (void 0 === Ja) {
			var b = null;
			var c = y.trustedTypes;
			if (c && c.createPolicy) {
				try {
					b = c.createPolicy('goog#html', {
						createHTML: Aa,
						createScript: Aa,
						createScriptURL: Aa,
					});
				} catch (d) {
					y.console && y.console.error(d.message);
				}
				Ja = b;
			} else Ja = b;
		}
		a = (b = Ja) ? b.createScriptURL(a) : a;
		return new K(a, Ka);
	}
	function Sa(a, b, c) {
		if (null == c) return b;
		if ('string' === typeof c) return c ? a + encodeURIComponent(c) : '';
		for (var d in c)
			if (Object.prototype.hasOwnProperty.call(c, d)) {
				var e = c[d];
				e = Array.isArray(e) ? e : [e];
				for (var g = 0; g < e.length; g++) {
					var f = e[g];
					null != f &&
						(b || (b = a),
						(b +=
							(b.length > a.length ? '&' : '') +
							encodeURIComponent(d) +
							'=' +
							encodeURIComponent(String(f))));
				}
			}
		return b;
	}
	var Ta = String.prototype.trim
		? function (a) {
				return a.trim();
		  }
		: function (a) {
				return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
		  };
	function Ua(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}
	var L;
	a: {
		var Va = y.navigator;
		if (Va) {
			var Wa = Va.userAgent;
			if (Wa) {
				L = Wa;
				break a;
			}
		}
		L = '';
	}
	function M(a) {
		return -1 != L.indexOf(a);
	}
	function Xa(a, b) {
		for (var c in a) b.call(void 0, a[c], c, a);
	}
	var Ya =
		'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
			' '
		);
	function Za(a, b) {
		for (var c, d, e = 1; e < arguments.length; e++) {
			d = arguments[e];
			for (c in d) a[c] = d[c];
			for (var g = 0; g < Ya.length; g++)
				(c = Ya[g]),
					Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
		}
	}
	function $a(a) {
		var b;
		(b = a.ownerDocument && a.ownerDocument.defaultView) && b != y
			? (b = ua(b.document))
			: (null === ta && (ta = ua(y.document)), (b = ta));
		b && a.setAttribute('nonce', b);
	}
	function ab(a) {
		var b = bb;
		return Object.prototype.hasOwnProperty.call(b, 11)
			? b[11]
			: (b[11] = a(11));
	}
	var cb = M('Opera'),
		db = M('Trident') || M('MSIE'),
		eb = M('Edge'),
		fb =
			M('Gecko') &&
			!(-1 != L.toLowerCase().indexOf('webkit') && !M('Edge')) &&
			!(M('Trident') || M('MSIE')) &&
			!M('Edge'),
		gb = -1 != L.toLowerCase().indexOf('webkit') && !M('Edge'),
		hb;
	a: {
		var ib = '',
			jb = (function () {
				var a = L;
				if (fb) return /rv:([^\);]+)(\)|;)/.exec(a);
				if (eb) return /Edge\/([\d\.]+)/.exec(a);
				if (db) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
				if (gb) return /WebKit\/(\S+)/.exec(a);
				if (cb) return /(?:Version)[ \/]?(\S+)/.exec(a);
			})();
		jb && (ib = jb ? jb[1] : '');
		if (db) {
			var kb,
				lb = y.document;
			kb = lb ? lb.documentMode : void 0;
			if (null != kb && kb > parseFloat(ib)) {
				hb = String(kb);
				break a;
			}
		}
		hb = ib;
	}
	var mb = hb,
		bb = {};
	function nb() {
		return ab(function () {
			for (
				var a = 0,
					b = Ta(String(mb)).split('.'),
					c = Ta('11').split('.'),
					d = Math.max(b.length, c.length),
					e = 0;
				0 == a && e < d;
				e++
			) {
				var g = b[e] || '',
					f = c[e] || '';
				do {
					g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
					f = /(\d*)(\D*)(.*)/.exec(f) || ['', '', '', ''];
					if (0 == g[0].length && 0 == f[0].length) break;
					a =
						Ua(
							0 == g[1].length ? 0 : parseInt(g[1], 10),
							0 == f[1].length ? 0 : parseInt(f[1], 10)
						) ||
						Ua(0 == g[2].length, 0 == f[2].length) ||
						Ua(g[2], f[2]);
					g = g[3];
					f = f[3];
				} while (0 == a);
			}
			return 0 <= a;
		});
	}
	function ob(a, b) {
		Xa(b, function (c, d) {
			c && 'object' == typeof c && c.V && (c = c.T());
			'style' == d
				? (a.style.cssText = c)
				: 'class' == d
				? (a.className = c)
				: 'for' == d
				? (a.htmlFor = c)
				: pb.hasOwnProperty(d)
				? a.setAttribute(pb[d], c)
				: 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
				? a.setAttribute(d, c)
				: (a[d] = c);
		});
	}
	var pb = {
		cellpadding: 'cellPadding',
		cellspacing: 'cellSpacing',
		colspan: 'colSpan',
		frameborder: 'frameBorder',
		height: 'height',
		maxlength: 'maxLength',
		nonce: 'nonce',
		role: 'role',
		rowspan: 'rowSpan',
		type: 'type',
		usemap: 'useMap',
		valign: 'vAlign',
		width: 'width',
	};
	function qb(a) {
		var b = document;
		a = String(a);
		'application/xhtml+xml' === b.contentType && (a = a.toLowerCase());
		return b.createElement(a);
	}
	function rb(a, b) {
		this.i = a;
		this.l = b;
		this.h = 0;
		this.g = null;
	}
	rb.prototype.get = function () {
		if (0 < this.h) {
			this.h--;
			var a = this.g;
			this.g = a.next;
			a.next = null;
		} else a = this.i();
		return a;
	};
	function sb(a, b) {
		a.l(b);
		100 > a.h && (a.h++, (b.next = a.g), (a.g = b));
	}
	var tb;
	function ub() {
		var a = y.MessageChannel;
		'undefined' === typeof a &&
			'undefined' !== typeof window &&
			window.postMessage &&
			window.addEventListener &&
			!M('Presto') &&
			(a = function () {
				var e = qb('IFRAME');
				e.style.display = 'none';
				document.documentElement.appendChild(e);
				var g = e.contentWindow;
				e = g.document;
				e.open();
				e.close();
				var f = 'callImmediate' + Math.random(),
					h =
						'file:' == g.location.protocol
							? '*'
							: g.location.protocol + '//' + g.location.host;
				e = C(function (k) {
					if (('*' == h || k.origin == h) && k.data == f)
						this.port1.onmessage();
				}, this);
				g.addEventListener('message', e, !1);
				this.port1 = {};
				this.port2 = {
					postMessage: function () {
						g.postMessage(f, h);
					},
				};
			});
		if ('undefined' !== typeof a && !M('Trident') && !M('MSIE')) {
			var b = new a(),
				c = {},
				d = c;
			b.port1.onmessage = function () {
				if (void 0 !== c.next) {
					c = c.next;
					var e = c.S;
					c.S = null;
					e();
				}
			};
			return function (e) {
				d.next = { S: e };
				d = d.next;
				b.port2.postMessage(0);
			};
		}
		return function (e) {
			y.setTimeout(e, 0);
		};
	}
	function vb(a) {
		y.setTimeout(function () {
			throw a;
		}, 0);
	}
	function wb() {
		this.h = this.g = null;
	}
	wb.prototype.add = function (a, b) {
		var c = xb.get();
		c.set(a, b);
		this.h ? (this.h.next = c) : (this.g = c);
		this.h = c;
	};
	function yb() {
		var a = zb,
			b = null;
		a.g && ((b = a.g), (a.g = a.g.next), a.g || (a.h = null), (b.next = null));
		return b;
	}
	var xb = new rb(
		function () {
			return new Ab();
		},
		function (a) {
			return a.reset();
		}
	);
	function Ab() {
		this.next = this.g = this.h = null;
	}
	Ab.prototype.set = function (a, b) {
		this.h = a;
		this.g = b;
		this.next = null;
	};
	Ab.prototype.reset = function () {
		this.next = this.g = this.h = null;
	};
	function Bb(a, b) {
		Cb || Db();
		Eb || (Cb(), (Eb = !0));
		zb.add(a, b);
	}
	var Cb;
	function Db() {
		if (y.Promise && y.Promise.resolve) {
			var a = y.Promise.resolve(void 0);
			Cb = function () {
				a.then(Fb);
			};
		} else
			Cb = function () {
				var b = Fb;
				'function' !== typeof y.setImmediate ||
				(y.Window &&
					y.Window.prototype &&
					!M('Edge') &&
					y.Window.prototype.setImmediate == y.setImmediate)
					? (tb || (tb = ub()), tb(b))
					: y.setImmediate(b);
			};
	}
	var Eb = !1,
		zb = new wb();
	function Fb() {
		for (var a; (a = yb()); ) {
			try {
				a.h.call(a.g);
			} catch (b) {
				vb(b);
			}
			sb(xb, a);
		}
		Eb = !1;
	}
	function Gb(a) {
		if (!a) return !1;
		try {
			return !!a.$goog_Thenable;
		} catch (b) {
			return !1;
		}
	}
	function N(a) {
		this.g = 0;
		this.s = void 0;
		this.l = this.h = this.i = null;
		this.m = this.o = !1;
		if (a != A)
			try {
				var b = this;
				a.call(
					void 0,
					function (c) {
						O(b, 2, c);
					},
					function (c) {
						O(b, 3, c);
					}
				);
			} catch (c) {
				O(this, 3, c);
			}
	}
	function Hb() {
		this.next = this.i = this.h = this.l = this.g = null;
		this.m = !1;
	}
	Hb.prototype.reset = function () {
		this.i = this.h = this.l = this.g = null;
		this.m = !1;
	};
	var Ib = new rb(
		function () {
			return new Hb();
		},
		function (a) {
			a.reset();
		}
	);
	function Jb(a, b, c) {
		var d = Ib.get();
		d.l = a;
		d.h = b;
		d.i = c;
		return d;
	}
	N.prototype.then = function (a, b, c) {
		return Kb(
			this,
			'function' === typeof a ? a : null,
			'function' === typeof b ? b : null,
			c
		);
	};
	N.prototype.$goog_Thenable = !0;
	N.prototype.cancel = function (a) {
		if (0 == this.g) {
			var b = new P(a);
			Bb(function () {
				Lb(this, b);
			}, this);
		}
	};
	function Lb(a, b) {
		if (0 == a.g)
			if (a.i) {
				var c = a.i;
				if (c.h) {
					for (
						var d = 0, e = null, g = null, f = c.h;
						f && (f.m || (d++, f.g == a && (e = f), !(e && 1 < d)));
						f = f.next
					)
						e || (g = f);
					e &&
						(0 == c.g && 1 == d
							? Lb(c, b)
							: (g
									? ((d = g),
									  d.next == c.l && (c.l = d),
									  (d.next = d.next.next))
									: Mb(c),
							  Nb(c, e, 3, b)));
				}
				a.i = null;
			} else O(a, 3, b);
	}
	function Ob(a, b) {
		a.h || (2 != a.g && 3 != a.g) || Pb(a);
		a.l ? (a.l.next = b) : (a.h = b);
		a.l = b;
	}
	function Kb(a, b, c, d) {
		var e = Jb(null, null, null);
		e.g = new N(function (g, f) {
			e.l = b
				? function (h) {
						try {
							var k = b.call(d, h);
							g(k);
						} catch (m) {
							f(m);
						}
				  }
				: g;
			e.h = c
				? function (h) {
						try {
							var k = c.call(d, h);
							void 0 === k && h instanceof P ? f(h) : g(k);
						} catch (m) {
							f(m);
						}
				  }
				: f;
		});
		e.g.i = a;
		Ob(a, e);
		return e.g;
	}
	N.prototype.F = function (a) {
		this.g = 0;
		O(this, 2, a);
	};
	N.prototype.G = function (a) {
		this.g = 0;
		O(this, 3, a);
	};
	function O(a, b, c) {
		if (0 == a.g) {
			a === c &&
				((b = 3), (c = new TypeError('Promise cannot resolve to itself')));
			a.g = 1;
			a: {
				var d = c,
					e = a.F,
					g = a.G;
				if (d instanceof N) {
					Ob(d, Jb(e || A, g || null, a));
					var f = !0;
				} else if (Gb(d)) d.then(e, g, a), (f = !0);
				else {
					if (xa(d))
						try {
							var h = d.then;
							if ('function' === typeof h) {
								Qb(d, h, e, g, a);
								f = !0;
								break a;
							}
						} catch (k) {
							g.call(a, k);
							f = !0;
							break a;
						}
					f = !1;
				}
			}
			f ||
				((a.s = c),
				(a.g = b),
				(a.i = null),
				Pb(a),
				3 != b || c instanceof P || Rb(a, c));
		}
	}
	function Qb(a, b, c, d, e) {
		function g(k) {
			h || ((h = !0), d.call(e, k));
		}
		function f(k) {
			h || ((h = !0), c.call(e, k));
		}
		var h = !1;
		try {
			b.call(a, f, g);
		} catch (k) {
			g(k);
		}
	}
	function Pb(a) {
		a.o || ((a.o = !0), Bb(a.v, a));
	}
	function Mb(a) {
		var b = null;
		a.h && ((b = a.h), (a.h = b.next), (b.next = null));
		a.h || (a.l = null);
		return b;
	}
	N.prototype.v = function () {
		for (var a; (a = Mb(this)); ) Nb(this, a, this.g, this.s);
		this.o = !1;
	};
	function Nb(a, b, c, d) {
		if (3 == c && b.h && !b.m) for (; a && a.m; a = a.i) a.m = !1;
		if (b.g) (b.g.i = null), Sb(b, c, d);
		else
			try {
				b.m ? b.l.call(b.i) : Sb(b, c, d);
			} catch (e) {
				Tb.call(null, e);
			}
		sb(Ib, b);
	}
	function Sb(a, b, c) {
		2 == b ? a.l.call(a.i, c) : a.h && a.h.call(a.i, c);
	}
	function Rb(a, b) {
		a.m = !0;
		Bb(function () {
			a.m && Tb.call(null, b);
		});
	}
	var Tb = vb;
	function P(a) {
		F.call(this, a);
	}
	E(P, F);
	P.prototype.name = 'cancel'; /*
  Portions of this code are from MochiKit, received by
  The Closure Authors under the MIT license. All other code is Copyright
  2005-2009 The Closure Authors. All Rights Reserved.
 */
	function Q(a, b) {
		this.m = [];
		this.K = a;
		this.J = b || null;
		this.l = this.i = !1;
		this.h = void 0;
		this.F = this.M = this.s = !1;
		this.o = 0;
		this.g = null;
		this.v = 0;
	}
	Q.prototype.cancel = function (a) {
		if (this.i) this.h instanceof Q && this.h.cancel();
		else {
			if (this.g) {
				var b = this.g;
				delete this.g;
				a ? b.cancel(a) : (b.v--, 0 >= b.v && b.cancel());
			}
			this.K ? this.K.call(this.J, this) : (this.F = !0);
			this.i || ((a = new Ub(this)), Vb(this), R(this, !1, a));
		}
	};
	Q.prototype.G = function (a, b) {
		this.s = !1;
		R(this, a, b);
	};
	function R(a, b, c) {
		a.i = !0;
		a.h = c;
		a.l = !b;
		Wb(a);
	}
	function Vb(a) {
		if (a.i) {
			if (!a.F) throw new Xb(a);
			a.F = !1;
		}
	}
	function Yb(a, b, c, d) {
		a.m.push([b, c, d]);
		a.i && Wb(a);
		return a;
	}
	Q.prototype.then = function (a, b, c) {
		var d,
			e,
			g = new N(function (f, h) {
				e = f;
				d = h;
			});
		Yb(this, e, function (f) {
			f instanceof Ub ? g.cancel() : d(f);
		});
		return g.then(a, b, c);
	};
	Q.prototype.$goog_Thenable = !0;
	function Zb(a) {
		return Ga(a.m, function (b) {
			return 'function' === typeof b[1];
		});
	}
	function Wb(a) {
		if (a.o && a.i && Zb(a)) {
			var b = a.o,
				c = $b[b];
			c && (y.clearTimeout(c.g), delete $b[b]);
			a.o = 0;
		}
		a.g && (a.g.v--, delete a.g);
		b = a.h;
		for (var d = (c = !1); a.m.length && !a.s; ) {
			var e = a.m.shift(),
				g = e[0],
				f = e[1];
			e = e[2];
			if ((g = a.l ? f : g))
				try {
					var h = g.call(e || a.J, b);
					void 0 !== h &&
						((a.l = a.l && (h == b || h instanceof Error)), (a.h = b = h));
					if (
						Gb(b) ||
						('function' === typeof y.Promise && b instanceof y.Promise)
					)
						(d = !0), (a.s = !0);
				} catch (k) {
					(b = k), (a.l = !0), Zb(a) || (c = !0);
				}
		}
		a.h = b;
		d &&
			((h = C(a.G, a, !0)),
			(d = C(a.G, a, !1)),
			b instanceof Q ? (Yb(b, h, d), (b.M = !0)) : b.then(h, d));
		c && ((b = new ac(b)), ($b[b.g] = b), (a.o = b.g));
	}
	function bc() {
		var a = new Q();
		Vb(a);
		R(a, !0, null);
		return a;
	}
	function Xb() {
		F.call(this);
	}
	E(Xb, F);
	Xb.prototype.message = 'Deferred has already fired';
	Xb.prototype.name = 'AlreadyCalledError';
	function Ub() {
		F.call(this);
	}
	E(Ub, F);
	Ub.prototype.message = 'Deferred was canceled';
	Ub.prototype.name = 'CanceledError';
	function ac(a) {
		this.g = y.setTimeout(C(this.i, this), 0);
		this.h = a;
	}
	ac.prototype.i = function () {
		delete $b[this.g];
		throw this.h;
	};
	var $b = {};
	var cc,
		dc = [];
	function ec(a, b) {
		function c() {
			var e = a.shift();
			e = fc(e, b);
			a.length && Yb(e, c, c, void 0);
			return e;
		}
		if (!a.length) return bc();
		var d = dc.length;
		Ia(dc, a);
		if (d) return cc;
		a = dc;
		return (cc = c());
	}
	function fc(a, b) {
		var c = b || {};
		b = c.document || document;
		var d = La(a).toString(),
			e = qb('SCRIPT'),
			g = { W: e, Y: void 0 },
			f = new Q(gc, g),
			h = null,
			k = null != c.timeout ? c.timeout : 5e3;
		0 < k &&
			((h = window.setTimeout(function () {
				hc(e, !0);
				var m = new ic(1, 'Timeout reached for loading script ' + d);
				Vb(f);
				R(f, !1, m);
			}, k)),
			(g.Y = h));
		e.onload = e.onreadystatechange = function () {
			(e.readyState &&
				'loaded' != e.readyState &&
				'complete' != e.readyState) ||
				(hc(e, c.ra || !1, h), Vb(f), R(f, !0, null));
		};
		e.onerror = function () {
			hc(e, !0, h);
			var m = new ic(0, 'Error while loading script ' + d);
			Vb(f);
			R(f, !1, m);
		};
		g = c.attributes || {};
		Za(g, { type: 'text/javascript', charset: 'UTF-8' });
		ob(e, g);
		e.src = La(a);
		$a(e);
		jc(b).appendChild(e);
		return f;
	}
	function jc(a) {
		var b;
		return (b = (a || document).getElementsByTagName('HEAD')) && 0 != b.length
			? b[0]
			: a.documentElement;
	}
	function gc() {
		if (this && this.W) {
			var a = this.W;
			a && 'SCRIPT' == a.tagName && hc(a, !0, this.Y);
		}
	}
	function hc(a, b, c) {
		null != c && y.clearTimeout(c);
		a.onload = A;
		a.onerror = A;
		a.onreadystatechange = A;
		b &&
			window.setTimeout(function () {
				a && a.parentNode && a.parentNode.removeChild(a);
			}, 0);
	}
	function ic(a, b) {
		var c = 'Jsloader error (code #' + a + ')';
		b && (c += ': ' + b);
		F.call(this, c);
		this.code = a;
	}
	E(ic, F);
	I.j.A = {};
	var kc = fc,
		mc = lc;
	function nc(a) {
		return Ra(a.format, a.R, a.na || {});
	}
	function lc(a, b, c) {
		c = c || {};
		a = Ra(a, b, c);
		var d = kc(a, { timeout: 3e4, attributes: { async: !1, defer: !1 } });
		return new Promise(function (e) {
			Yb(d, e, null, void 0);
		});
	}
	I.j.A.Ia = function (a) {
		lc = a;
	};
	I.j.A.La = function (a) {
		kc = a;
	};
	I.j.A.ha = nc;
	I.j.A.load = mc;
	I.j.A.Aa = function (a) {
		a = Fa(a, nc);
		if (0 == a.length) return Promise.resolve();
		var b = { timeout: 3e4, attributes: { async: !1, defer: !1 } },
			c = [];
		!db || nb()
			? Ea(a, function (d) {
					c.push(kc(d, b));
			  })
			: c.push(ec(a, b));
		return Promise.all(
			Fa(c, function (d) {
				return new Promise(function (e) {
					return Yb(d, e, null, void 0);
				});
			})
		);
	};
	I.j.A.Ca = function (a, b, c) {
		return { format: a, R: b, na: c };
	};
	I.j.D = {};
	var S = {};
	I.j.D.va = function (a) {
		return S[a] && S[a].loaded;
	};
	I.j.D.wa = function (a) {
		return S[a] && S[a].promise;
	};
	I.j.D.la = function () {
		return new Promise(function (a) {
			'undefined' == typeof window || 'complete' === document.readyState
				? a()
				: window.addEventListener
				? (document.addEventListener('DOMContentLoaded', a, !0),
				  window.addEventListener('load', a, !0))
				: window.attachEvent
				? window.attachEvent('onload', a)
				: 'function' !== typeof window.onload
				? (window.onload = a)
				: (window.onload = function (b) {
						window.onload(b);
						a();
				  });
		});
	};
	I.j.D.Ba = S;
	I.j.D.Ha = function () {
		S = {};
	};
	I.j.D.Ja = function (a) {
		S[a] || (S[a] = { loaded: !1 });
		S[a].loaded = !0;
	};
	I.j.D.Ka = function (a, b) {
		S[a] = { promise: b, loaded: !1 };
	};
	I.j.N = {};
	I.j.N.P = {
		1: '1.0',
		'1.0': 'current',
		1.1: 'upcoming',
		1.2: 'testing',
		41: 'pre-45',
		42: 'pre-45',
		43: 'pre-45',
		44: 'pre-45',
		46: '46.1',
		46.1: '46.2',
		48: '48.1',
		current: '50',
		upcoming: '50',
		testing: '50',
	};
	function oc(a, b) {
		this.h = {};
		this.g = [];
		this.i = 0;
		var c = arguments.length;
		if (1 < c) {
			if (c % 2) throw Error('Uneven number of arguments');
			for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
		} else if (a)
			if (a instanceof oc)
				for (c = a.H(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
			else for (d in a) this.set(d, a[d]);
	}
	l = oc.prototype;
	l.I = function () {
		pc(this);
		for (var a = [], b = 0; b < this.g.length; b++) a.push(this.h[this.g[b]]);
		return a;
	};
	l.H = function () {
		pc(this);
		return this.g.concat();
	};
	function pc(a) {
		if (a.i != a.g.length) {
			for (var b = 0, c = 0; b < a.g.length; ) {
				var d = a.g[b];
				T(a.h, d) && (a.g[c++] = d);
				b++;
			}
			a.g.length = c;
		}
		if (a.i != a.g.length) {
			var e = {};
			for (c = b = 0; b < a.g.length; )
				(d = a.g[b]), T(e, d) || ((a.g[c++] = d), (e[d] = 1)), b++;
			a.g.length = c;
		}
	}
	l.get = function (a, b) {
		return T(this.h, a) ? this.h[a] : b;
	};
	l.set = function (a, b) {
		T(this.h, a) || (this.i++, this.g.push(a));
		this.h[a] = b;
	};
	l.forEach = function (a, b) {
		for (var c = this.H(), d = 0; d < c.length; d++) {
			var e = c[d],
				g = this.get(e);
			a.call(b, g, e, this);
		}
	};
	function T(a, b) {
		return Object.prototype.hasOwnProperty.call(a, b);
	}
	var qc =
		/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
	function rc(a, b) {
		if (a) {
			a = a.split('&');
			for (var c = 0; c < a.length; c++) {
				var d = a[c].indexOf('='),
					e = null;
				if (0 <= d) {
					var g = a[c].substring(0, d);
					e = a[c].substring(d + 1);
				} else g = a[c];
				b(g, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '');
			}
		}
	}
	function sc(a) {
		this.g = this.s = this.l = '';
		this.v = null;
		this.o = this.h = '';
		this.m = !1;
		var b;
		a instanceof sc
			? ((this.m = a.m),
			  tc(this, a.l),
			  (this.s = a.s),
			  (this.g = a.g),
			  uc(this, a.v),
			  (this.h = a.h),
			  vc(this, wc(a.i)),
			  (this.o = a.o))
			: a && (b = String(a).match(qc))
			? ((this.m = !1),
			  tc(this, b[1] || '', !0),
			  (this.s = xc(b[2] || '')),
			  (this.g = xc(b[3] || '', !0)),
			  uc(this, b[4]),
			  (this.h = xc(b[5] || '', !0)),
			  vc(this, b[6] || '', !0),
			  (this.o = xc(b[7] || '')))
			: ((this.m = !1), (this.i = new U(null, this.m)));
	}
	sc.prototype.toString = function () {
		var a = [],
			b = this.l;
		b && a.push(yc(b, zc, !0), ':');
		var c = this.g;
		if (c || 'file' == b)
			a.push('//'),
				(b = this.s) && a.push(yc(b, zc, !0), '@'),
				a.push(
					encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')
				),
				(c = this.v),
				null != c && a.push(':', String(c));
		if ((c = this.h))
			this.g && '/' != c.charAt(0) && a.push('/'),
				a.push(yc(c, '/' == c.charAt(0) ? Ac : Bc, !0));
		(c = this.i.toString()) && a.push('?', c);
		(c = this.o) && a.push('#', yc(c, Cc));
		return a.join('');
	};
	sc.prototype.resolve = function (a) {
		var b = new sc(this),
			c = !!a.l;
		c ? tc(b, a.l) : (c = !!a.s);
		c ? (b.s = a.s) : (c = !!a.g);
		c ? (b.g = a.g) : (c = null != a.v);
		var d = a.h;
		if (c) uc(b, a.v);
		else if ((c = !!a.h)) {
			if ('/' != d.charAt(0))
				if (this.g && !this.h) d = '/' + d;
				else {
					var e = b.h.lastIndexOf('/');
					-1 != e && (d = b.h.substr(0, e + 1) + d);
				}
			e = d;
			if ('..' == e || '.' == e) d = '';
			else if (-1 != e.indexOf('./') || -1 != e.indexOf('/.')) {
				d = 0 == e.lastIndexOf('/', 0);
				e = e.split('/');
				for (var g = [], f = 0; f < e.length; ) {
					var h = e[f++];
					'.' == h
						? d && f == e.length && g.push('')
						: '..' == h
						? ((1 < g.length || (1 == g.length && '' != g[0])) && g.pop(),
						  d && f == e.length && g.push(''))
						: (g.push(h), (d = !0));
				}
				d = g.join('/');
			} else d = e;
		}
		c ? (b.h = d) : (c = '' !== a.i.toString());
		c ? vc(b, wc(a.i)) : (c = !!a.o);
		c && (b.o = a.o);
		return b;
	};
	function tc(a, b, c) {
		a.l = c ? xc(b, !0) : b;
		a.l && (a.l = a.l.replace(/:$/, ''));
	}
	function uc(a, b) {
		if (b) {
			b = Number(b);
			if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b);
			a.v = b;
		} else a.v = null;
	}
	function vc(a, b, c) {
		b instanceof U
			? ((a.i = b), Dc(a.i, a.m))
			: (c || (b = yc(b, Ec)), (a.i = new U(b, a.m)));
	}
	function xc(a, b) {
		return a
			? b
				? decodeURI(a.replace(/%25/g, '%2525'))
				: decodeURIComponent(a)
			: '';
	}
	function yc(a, b, c) {
		return 'string' === typeof a
			? ((a = encodeURI(a).replace(b, Fc)),
			  c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
			  a)
			: null;
	}
	function Fc(a) {
		a = a.charCodeAt(0);
		return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
	}
	var zc = /[#\/\?@]/g,
		Bc = /[#\?:]/g,
		Ac = /[#\?]/g,
		Ec = /[#\?@]/g,
		Cc = /#/g;
	function U(a, b) {
		this.h = this.g = null;
		this.i = a || null;
		this.l = !!b;
	}
	function V(a) {
		a.g ||
			((a.g = new oc()),
			(a.h = 0),
			a.i &&
				rc(a.i, function (b, c) {
					a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c);
				}));
	}
	l = U.prototype;
	l.add = function (a, b) {
		V(this);
		this.i = null;
		a = W(this, a);
		var c = this.g.get(a);
		c || this.g.set(a, (c = []));
		c.push(b);
		this.h += 1;
		return this;
	};
	function Gc(a, b) {
		V(a);
		b = W(a, b);
		T(a.g.h, b) &&
			((a.i = null),
			(a.h -= a.g.get(b).length),
			(a = a.g),
			T(a.h, b) && (delete a.h[b], a.i--, a.g.length > 2 * a.i && pc(a)));
	}
	function Hc(a, b) {
		V(a);
		b = W(a, b);
		return T(a.g.h, b);
	}
	l.forEach = function (a, b) {
		V(this);
		this.g.forEach(function (c, d) {
			Ea(
				c,
				function (e) {
					a.call(b, e, d, this);
				},
				this
			);
		}, this);
	};
	l.H = function () {
		V(this);
		for (var a = this.g.I(), b = this.g.H(), c = [], d = 0; d < b.length; d++)
			for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]);
		return c;
	};
	l.I = function (a) {
		V(this);
		var b = [];
		if ('string' === typeof a)
			Hc(this, a) && (b = Ha(b, this.g.get(W(this, a))));
		else {
			a = this.g.I();
			for (var c = 0; c < a.length; c++) b = Ha(b, a[c]);
		}
		return b;
	};
	l.set = function (a, b) {
		V(this);
		this.i = null;
		a = W(this, a);
		Hc(this, a) && (this.h -= this.g.get(a).length);
		this.g.set(a, [b]);
		this.h += 1;
		return this;
	};
	l.get = function (a, b) {
		if (!a) return b;
		a = this.I(a);
		return 0 < a.length ? String(a[0]) : b;
	};
	l.toString = function () {
		if (this.i) return this.i;
		if (!this.g) return '';
		for (var a = [], b = this.g.H(), c = 0; c < b.length; c++) {
			var d = b[c],
				e = encodeURIComponent(String(d));
			d = this.I(d);
			for (var g = 0; g < d.length; g++) {
				var f = e;
				'' !== d[g] && (f += '=' + encodeURIComponent(String(d[g])));
				a.push(f);
			}
		}
		return (this.i = a.join('&'));
	};
	function wc(a) {
		var b = new U();
		b.i = a.i;
		a.g && ((b.g = new oc(a.g)), (b.h = a.h));
		return b;
	}
	function W(a, b) {
		b = String(b);
		a.l && (b = b.toLowerCase());
		return b;
	}
	function Dc(a, b) {
		b &&
			!a.l &&
			(V(a),
			(a.i = null),
			a.g.forEach(function (c, d) {
				var e = d.toLowerCase();
				if (d != e && (Gc(this, d), Gc(this, e), 0 < c.length)) {
					this.i = null;
					d = this.g;
					var g = d.set;
					e = W(this, e);
					var f = c.length;
					if (0 < f) {
						for (var h = Array(f), k = 0; k < f; k++) h[k] = c[k];
						f = h;
					} else f = [];
					g.call(d, e, f);
					this.h += c.length;
				}
			}, a));
		a.l = b;
	}
	I.j.C = {};
	var X = '',
		Y = '',
		Ic,
		Z,
		Jc = null,
		Kc;
	function Lc() {
		Y = X = '';
		Jc = Z = Ic = null;
		z('google.load') ||
			(D('google.load', Mc), D('google.setOnLoadCallback', I.X));
		var a = document.getElementsByTagName('script');
		a = (document.currentScript || a[a.length - 1]).getAttribute('src');
		a = new sc(a);
		var b = a.g;
		Kc = b = b.match(/^www\.gstatic\.cn/) ? 'gstatic.cn' : 'gstatic.com';
		Nc(a);
	}
	function Nc(a) {
		a = new U(a.i.toString());
		var b = a.get('callback');
		'string' === typeof b && ((b = Oc(b)), I.j.D.la().then(b));
		a = a.get('autoload');
		if ('string' === typeof a)
			try {
				if ('' !== a) {
					var c = JSON.parse(a).modules;
					for (a = 0; a < c.length; a++) {
						var d = c[a];
						Mc(d.name, d.version, d);
					}
				}
			} catch (e) {
				throw Error('Autoload failed with: ' + e);
			}
	}
	function Pc(a) {
		var b = a,
			c,
			d = a.match(/^testing-/);
		d && (b = b.replace(/^testing-/, ''));
		a = b;
		do {
			if (b === I.j.N.P[b])
				throw Error('Infinite loop in version mapping: ' + b);
			(c = I.j.N.P[b]) && (b = c);
		} while (c);
		c = (d ? 'testing-' : '') + b;
		return { version: 'pre-45' == b ? a : c, ma: c };
	}
	function Qc(a) {
		var b = I.j.O.oa[Kc].loader,
			c = Pc(a);
		return I.j.A.load(b, { version: c.ma }).then(function () {
			var d =
				z('google.charts.loader.VersionSpecific.load') ||
				z('google.charts.loader.publicLoad') ||
				z('google.charts.versionSpecific.load');
			if (!d) throw Error('Bad version: ' + a);
			Jc = function (e) {
				e = d(c.version, e);
				if (null == e || null == e.then) {
					var g =
						z('google.charts.loader.publicSetOnLoadCallback') ||
						z('google.charts.versionSpecific.setOnLoadCallback');
					e = new Promise(function (f) {
						g(f);
					});
					e.then = g;
				}
				return e;
			};
		});
	}
	function Rc(a) {
		'string' === typeof a && (a = [a]);
		(Array.isArray(a) && 0 !== a.length) || (a = I.j.O.ga);
		var b = [];
		a.forEach(function (c) {
			c = c.toLowerCase();
			b = b.concat(c.split(/[\s,]+\s*/));
		});
		return b;
	}
	function Sc(a) {
		a = a || '';
		for (var b = a.replace(/-/g, '_').toLowerCase(); 'string' === typeof b; )
			(a = b), (b = I.j.ea[b]), b === a && (b = !1);
		b ||
			(a.match(/_[^_]+$/)
				? ((a = a.replace(/_[^_]+$/, '')), (a = Sc(a)))
				: (a = 'en'));
		return a;
	}
	function Tc(a) {
		a = a || '';
		'' !== X &&
			X !== a &&
			(console.warn(
				" Attempting to load version '" +
					a +
					"' of Google Charts, but the previously loaded '" +
					(X + "' will be used instead.")
			),
			(a = X));
		return (X = a || '');
	}
	function Uc(a) {
		a = a || '';
		'' !== Y &&
			Y !== a &&
			(console.warn(
				" Attempting to load Google Charts for language '" +
					a +
					"', but the previously loaded '" +
					(Y + "' will be used instead.")
			),
			(a = Y));
		'en' === a && (a = '');
		return (Y = a || '');
	}
	function Vc(a) {
		var b = {},
			c;
		for (c in a) b[c] = a[c];
		return b;
	}
	function Wc(a, b) {
		b = Vc(b);
		b.domain = Kc;
		b.callback = Oc(b.callback);
		a = Tc(a);
		var c = b.language;
		c = Uc(Sc(c));
		b.language = c;
		if (!Ic) {
			if (b.enableUrlSettings && window.URLSearchParams)
				try {
					a =
						new URLSearchParams(top.location.search).get('charts-version') || a;
				} catch (d) {
					console.info('Failed to get charts-version from top URL', d);
				}
			Ic = Qc(a);
		}
		b.packages = Rc(b.packages);
		return (Z = Ic.then(function () {
			return Jc(b);
		}));
	}
	I.pa = function (a) {
		return I.load(Object.assign({}, a, { safeMode: !0 }));
	};
	D('google.charts.safeLoad', I.pa);
	I.load = function (a) {
		for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
		c = 0;
		'visualization' === b[c] && c++;
		var d = 'current';
		if ('string' === typeof b[c] || 'number' === typeof b[c])
			(d = String(b[c])), c++;
		var e = {};
		xa(b[c]) && (e = b[c]);
		return Wc(d, e);
	};
	D('google.charts.load', I.load);
	I.X = function (a) {
		if (!Z)
			throw Error(
				'Must call google.charts.load before google.charts.setOnLoadCallback'
			);
		return a ? Z.then(a) : Z;
	};
	D('google.charts.setOnLoadCallback', I.X);
	var Xc = H('https://maps.googleapis.com/maps/api/js?jsapiRedirect=true'),
		Yc = H(
			'https://maps-api-ssl.google.com/maps?jsapiRedirect=true&file=googleapi'
		);
	function Zc(a, b, c) {
		console.warn('Loading Maps API with the jsapi loader is deprecated.');
		c = c || {};
		a = c.key || c.client;
		var d = c.libraries,
			e = (function (h) {
				for (var k = {}, m = 0; m < h.length; m++) {
					var p = h[m];
					k[p[0]] = p[1];
				}
				return k;
			})(
				c.other_params
					? c.other_params.split('&').map(function (h) {
							return h.split('=');
					  })
					: []
			),
			g = Object.assign({}, { key: a, za: d }, e),
			f = '2' === b ? Yc : Xc;
		Z = new Promise(function (h) {
			var k = Oc(c && c.callback);
			I.j.A.load(f, {}, g).then(k).then(h);
		});
	}
	var $c = H('https://www.gstatic.com/inputtools/js/ita/inputtools_3.js');
	function ad(a, b, c) {
		xa(c) && c.packages
			? (Array.isArray(c.packages) ? c.packages : [c.packages]).includes(
					'inputtools'
			  )
				? (console.warn(
						'Loading "elements" with the jsapi loader is deprecated.\nPlease load ' +
							($c + ' directly.')
				  ),
				  (Z = new Promise(function (d) {
						var e = Oc(c && c.callback);
						I.j.A.load($c, {}, {}).then(e).then(d);
				  })))
				: console.error(
						'Loading "elements" other than "inputtools" is unsupported.'
				  )
			: console.error(
					'google.load of elements was invoked without specifying packages'
			  );
	}
	var bd = H(
		'https://ajax.googleapis.com/ajax/libs/%{module}/%{version}/%{file}'
	);
	function cd(a, b) {
		var c;
		do {
			if (a === b[a])
				throw Error('Infinite loop in version mapping for version ' + a);
			(c = b[a]) && (a = c);
		} while (c);
		return a;
	}
	function dd(a, b, c) {
		var d = I.j.ba.ia[a];
		if (d) {
			b = cd(b, d.aliases);
			d = d.versions[b];
			if (!d) throw Error('Unknown version, ' + b + ', of ' + a + '.');
			var e = { module: a, version: b || '', file: d.compressed };
			b = La(I.j.A.ha({ format: bd, R: e })).toString();
			console.warn(
				'Loading modules with the jsapi loader is deprecated.\nPlease load ' +
					(a + ' directly from ' + b + '.')
			);
			Z = new Promise(function (g) {
				var f = Oc(c && c.callback);
				I.j.A.load(bd, e).then(f).then(g);
			});
		} else
			setTimeout(function () {
				throw Error('Module "' + a + '" is not supported.');
			}, 0);
	}
	function Oc(a) {
		return function () {
			if ('function' === typeof a) a();
			else if ('string' === typeof a && '' !== a)
				try {
					var b = z(a);
					if ('function' !== typeof b)
						throw Error("Type of '" + a + "' is " + typeof b + '.');
					b();
				} catch (c) {
					throw Error('Callback of ' + a + ' failed with: ' + c);
				}
		};
	}
	function Mc(a) {
		for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
		switch (b[0]) {
			case 'maps':
				Zc.apply(null, ba(b));
				break;
			case 'elements':
				ad.apply(null, ba(b));
				break;
			case 'visualization':
				I.load.apply(I, ba(b));
				break;
			default:
				dd.apply(null, ba(b));
		}
	}
	D('google.loader.LoadFailure', !1);
	Kc
		? console.warn('Google Charts loader.js should only be loaded once.')
		: Lc();
	I.j.C.ya = Lc;
	I.j.C.Da = Pc;
	I.j.C.Ea = Sc;
	I.j.C.Fa = Rc;
	I.j.C.Qa = Tc;
	I.j.C.Pa = Uc;
	I.j.C.Ga = Nc;
	I.j.C.xa = function () {
		return Jc;
	};
}).call(this);

/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!(function (e, t) {
	'use strict';
	'object' == typeof module && 'object' == typeof module.exports
		? (module.exports = e.document
				? t(e, !0)
				: function (e) {
						if (!e.document)
							throw new Error('jQuery requires a window with a document');
						return t(e);
				  })
		: t(e);
})('undefined' != typeof window ? window : this, function (C, e) {
	'use strict';
	var t = [],
		r = Object.getPrototypeOf,
		s = t.slice,
		g = t.flat
			? function (e) {
					return t.flat.call(e);
			  }
			: function (e) {
					return t.concat.apply([], e);
			  },
		u = t.push,
		i = t.indexOf,
		n = {},
		o = n.toString,
		v = n.hasOwnProperty,
		a = v.toString,
		l = a.call(Object),
		y = {},
		m = function (e) {
			return (
				'function' == typeof e &&
				'number' != typeof e.nodeType &&
				'function' != typeof e.item
			);
		},
		x = function (e) {
			return null != e && e === e.window;
		},
		E = C.document,
		c = { type: !0, src: !0, nonce: !0, noModule: !0 };
	function b(e, t, n) {
		var r,
			i,
			o = (n = n || E).createElement('script');
		if (((o.text = e), t))
			for (r in c)
				(i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
					o.setAttribute(r, i);
		n.head.appendChild(o).parentNode.removeChild(o);
	}
	function w(e) {
		return null == e
			? e + ''
			: 'object' == typeof e || 'function' == typeof e
			? n[o.call(e)] || 'object'
			: typeof e;
	}
	var f = '3.6.0',
		S = function (e, t) {
			return new S.fn.init(e, t);
		};
	function p(e) {
		var t = !!e && 'length' in e && e.length,
			n = w(e);
		return (
			!m(e) &&
			!x(e) &&
			('array' === n ||
				0 === t ||
				('number' == typeof t && 0 < t && t - 1 in e))
		);
	}
	(S.fn = S.prototype =
		{
			jquery: f,
			constructor: S,
			length: 0,
			toArray: function () {
				return s.call(this);
			},
			get: function (e) {
				return null == e
					? s.call(this)
					: e < 0
					? this[e + this.length]
					: this[e];
			},
			pushStack: function (e) {
				var t = S.merge(this.constructor(), e);
				return (t.prevObject = this), t;
			},
			each: function (e) {
				return S.each(this, e);
			},
			map: function (n) {
				return this.pushStack(
					S.map(this, function (e, t) {
						return n.call(e, t, e);
					})
				);
			},
			slice: function () {
				return this.pushStack(s.apply(this, arguments));
			},
			first: function () {
				return this.eq(0);
			},
			last: function () {
				return this.eq(-1);
			},
			even: function () {
				return this.pushStack(
					S.grep(this, function (e, t) {
						return (t + 1) % 2;
					})
				);
			},
			odd: function () {
				return this.pushStack(
					S.grep(this, function (e, t) {
						return t % 2;
					})
				);
			},
			eq: function (e) {
				var t = this.length,
					n = +e + (e < 0 ? t : 0);
				return this.pushStack(0 <= n && n < t ? [this[n]] : []);
			},
			end: function () {
				return this.prevObject || this.constructor();
			},
			push: u,
			sort: t.sort,
			splice: t.splice,
		}),
		(S.extend = S.fn.extend =
			function () {
				var e,
					t,
					n,
					r,
					i,
					o,
					a = arguments[0] || {},
					s = 1,
					u = arguments.length,
					l = !1;
				for (
					'boolean' == typeof a && ((l = a), (a = arguments[s] || {}), s++),
						'object' == typeof a || m(a) || (a = {}),
						s === u && ((a = this), s--);
					s < u;
					s++
				)
					if (null != (e = arguments[s]))
						for (t in e)
							(r = e[t]),
								'__proto__' !== t &&
									a !== r &&
									(l && r && (S.isPlainObject(r) || (i = Array.isArray(r)))
										? ((n = a[t]),
										  (o =
												i && !Array.isArray(n)
													? []
													: i || S.isPlainObject(n)
													? n
													: {}),
										  (i = !1),
										  (a[t] = S.extend(l, o, r)))
										: void 0 !== r && (a[t] = r));
				return a;
			}),
		S.extend({
			expando: 'jQuery' + (f + Math.random()).replace(/\D/g, ''),
			isReady: !0,
			error: function (e) {
				throw new Error(e);
			},
			noop: function () {},
			isPlainObject: function (e) {
				var t, n;
				return (
					!(!e || '[object Object]' !== o.call(e)) &&
					(!(t = r(e)) ||
						('function' ==
							typeof (n = v.call(t, 'constructor') && t.constructor) &&
							a.call(n) === l))
				);
			},
			isEmptyObject: function (e) {
				var t;
				for (t in e) return !1;
				return !0;
			},
			globalEval: function (e, t, n) {
				b(e, { nonce: t && t.nonce }, n);
			},
			each: function (e, t) {
				var n,
					r = 0;
				if (p(e)) {
					for (n = e.length; r < n; r++)
						if (!1 === t.call(e[r], r, e[r])) break;
				} else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
				return e;
			},
			makeArray: function (e, t) {
				var n = t || [];
				return (
					null != e &&
						(p(Object(e))
							? S.merge(n, 'string' == typeof e ? [e] : e)
							: u.call(n, e)),
					n
				);
			},
			inArray: function (e, t, n) {
				return null == t ? -1 : i.call(t, e, n);
			},
			merge: function (e, t) {
				for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
				return (e.length = i), e;
			},
			grep: function (e, t, n) {
				for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
					!t(e[i], i) !== a && r.push(e[i]);
				return r;
			},
			map: function (e, t, n) {
				var r,
					i,
					o = 0,
					a = [];
				if (p(e))
					for (r = e.length; o < r; o++)
						null != (i = t(e[o], o, n)) && a.push(i);
				else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
				return g(a);
			},
			guid: 1,
			support: y,
		}),
		'function' == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]),
		S.each(
			'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
				' '
			),
			function (e, t) {
				n['[object ' + t + ']'] = t.toLowerCase();
			}
		);
	var d = (function (n) {
		var e,
			d,
			b,
			o,
			i,
			h,
			f,
			g,
			w,
			u,
			l,
			T,
			C,
			a,
			E,
			v,
			s,
			c,
			y,
			S = 'sizzle' + 1 * new Date(),
			p = n.document,
			k = 0,
			r = 0,
			m = ue(),
			x = ue(),
			A = ue(),
			N = ue(),
			j = function (e, t) {
				return e === t && (l = !0), 0;
			},
			D = {}.hasOwnProperty,
			t = [],
			q = t.pop,
			L = t.push,
			H = t.push,
			O = t.slice,
			P = function (e, t) {
				for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
				return -1;
			},
			R =
				'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
			M = '[\\x20\\t\\r\\n\\f]',
			I =
				'(?:\\\\[\\da-fA-F]{1,6}' +
				M +
				'?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
			W =
				'\\[' +
				M +
				'*(' +
				I +
				')(?:' +
				M +
				'*([*^$|!~]?=)' +
				M +
				'*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
				I +
				'))|)' +
				M +
				'*\\]',
			F =
				':(' +
				I +
				')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
				W +
				')*)|.*)\\)|)',
			B = new RegExp(M + '+', 'g'),
			$ = new RegExp('^' + M + '+|((?:^|[^\\\\])(?:\\\\.)*)' + M + '+$', 'g'),
			_ = new RegExp('^' + M + '*,' + M + '*'),
			z = new RegExp('^' + M + '*([>+~]|' + M + ')' + M + '*'),
			U = new RegExp(M + '|>'),
			X = new RegExp(F),
			V = new RegExp('^' + I + '$'),
			G = {
				ID: new RegExp('^#(' + I + ')'),
				CLASS: new RegExp('^\\.(' + I + ')'),
				TAG: new RegExp('^(' + I + '|[*])'),
				ATTR: new RegExp('^' + W),
				PSEUDO: new RegExp('^' + F),
				CHILD: new RegExp(
					'^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
						M +
						'*(even|odd|(([+-]|)(\\d*)n|)' +
						M +
						'*(?:([+-]|)' +
						M +
						'*(\\d+)|))' +
						M +
						'*\\)|)',
					'i'
				),
				bool: new RegExp('^(?:' + R + ')$', 'i'),
				needsContext: new RegExp(
					'^' +
						M +
						'*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
						M +
						'*((?:-\\d)?\\d*)' +
						M +
						'*\\)|)(?=[^-]|$)',
					'i'
				),
			},
			Y = /HTML$/i,
			Q = /^(?:input|select|textarea|button)$/i,
			J = /^h\d$/i,
			K = /^[^{]+\{\s*\[native \w/,
			Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ee = /[+~]/,
			te = new RegExp('\\\\[\\da-fA-F]{1,6}' + M + '?|\\\\([^\\r\\n\\f])', 'g'),
			ne = function (e, t) {
				var n = '0x' + e.slice(1) - 65536;
				return (
					t ||
					(n < 0
						? String.fromCharCode(n + 65536)
						: String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
				);
			},
			re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			ie = function (e, t) {
				return t
					? '\0' === e
						? '\ufffd'
						: e.slice(0, -1) +
						  '\\' +
						  e.charCodeAt(e.length - 1).toString(16) +
						  ' '
					: '\\' + e;
			},
			oe = function () {
				T();
			},
			ae = be(
				function (e) {
					return !0 === e.disabled && 'fieldset' === e.nodeName.toLowerCase();
				},
				{ dir: 'parentNode', next: 'legend' }
			);
		try {
			H.apply((t = O.call(p.childNodes)), p.childNodes),
				t[p.childNodes.length].nodeType;
		} catch (e) {
			H = {
				apply: t.length
					? function (e, t) {
							L.apply(e, O.call(t));
					  }
					: function (e, t) {
							var n = e.length,
								r = 0;
							while ((e[n++] = t[r++]));
							e.length = n - 1;
					  },
			};
		}
		function se(t, e, n, r) {
			var i,
				o,
				a,
				s,
				u,
				l,
				c,
				f = e && e.ownerDocument,
				p = e ? e.nodeType : 9;
			if (
				((n = n || []),
				'string' != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))
			)
				return n;
			if (!r && (T(e), (e = e || C), E)) {
				if (11 !== p && (u = Z.exec(t)))
					if ((i = u[1])) {
						if (9 === p) {
							if (!(a = e.getElementById(i))) return n;
							if (a.id === i) return n.push(a), n;
						} else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
							return n.push(a), n;
					} else {
						if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
						if (
							(i = u[3]) &&
							d.getElementsByClassName &&
							e.getElementsByClassName
						)
							return H.apply(n, e.getElementsByClassName(i)), n;
					}
				if (
					d.qsa &&
					!N[t + ' '] &&
					(!v || !v.test(t)) &&
					(1 !== p || 'object' !== e.nodeName.toLowerCase())
				) {
					if (((c = t), (f = e), 1 === p && (U.test(t) || z.test(t)))) {
						((f = (ee.test(t) && ye(e.parentNode)) || e) === e && d.scope) ||
							((s = e.getAttribute('id'))
								? (s = s.replace(re, ie))
								: e.setAttribute('id', (s = S))),
							(o = (l = h(t)).length);
						while (o--) l[o] = (s ? '#' + s : ':scope') + ' ' + xe(l[o]);
						c = l.join(',');
					}
					try {
						return H.apply(n, f.querySelectorAll(c)), n;
					} catch (e) {
						N(t, !0);
					} finally {
						s === S && e.removeAttribute('id');
					}
				}
			}
			return g(t.replace($, '$1'), e, n, r);
		}
		function ue() {
			var r = [];
			return function e(t, n) {
				return (
					r.push(t + ' ') > b.cacheLength && delete e[r.shift()],
					(e[t + ' '] = n)
				);
			};
		}
		function le(e) {
			return (e[S] = !0), e;
		}
		function ce(e) {
			var t = C.createElement('fieldset');
			try {
				return !!e(t);
			} catch (e) {
				return !1;
			} finally {
				t.parentNode && t.parentNode.removeChild(t), (t = null);
			}
		}
		function fe(e, t) {
			var n = e.split('|'),
				r = n.length;
			while (r--) b.attrHandle[n[r]] = t;
		}
		function pe(e, t) {
			var n = t && e,
				r =
					n &&
					1 === e.nodeType &&
					1 === t.nodeType &&
					e.sourceIndex - t.sourceIndex;
			if (r) return r;
			if (n) while ((n = n.nextSibling)) if (n === t) return -1;
			return e ? 1 : -1;
		}
		function de(t) {
			return function (e) {
				return 'input' === e.nodeName.toLowerCase() && e.type === t;
			};
		}
		function he(n) {
			return function (e) {
				var t = e.nodeName.toLowerCase();
				return ('input' === t || 'button' === t) && e.type === n;
			};
		}
		function ge(t) {
			return function (e) {
				return 'form' in e
					? e.parentNode && !1 === e.disabled
						? 'label' in e
							? 'label' in e.parentNode
								? e.parentNode.disabled === t
								: e.disabled === t
							: e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
						: e.disabled === t
					: 'label' in e && e.disabled === t;
			};
		}
		function ve(a) {
			return le(function (o) {
				return (
					(o = +o),
					le(function (e, t) {
						var n,
							r = a([], e.length, o),
							i = r.length;
						while (i--) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
					})
				);
			});
		}
		function ye(e) {
			return e && 'undefined' != typeof e.getElementsByTagName && e;
		}
		for (e in ((d = se.support = {}),
		(i = se.isXML =
			function (e) {
				var t = e && e.namespaceURI,
					n = e && (e.ownerDocument || e).documentElement;
				return !Y.test(t || (n && n.nodeName) || 'HTML');
			}),
		(T = se.setDocument =
			function (e) {
				var t,
					n,
					r = e ? e.ownerDocument || e : p;
				return (
					r != C &&
						9 === r.nodeType &&
						r.documentElement &&
						((a = (C = r).documentElement),
						(E = !i(C)),
						p != C &&
							(n = C.defaultView) &&
							n.top !== n &&
							(n.addEventListener
								? n.addEventListener('unload', oe, !1)
								: n.attachEvent && n.attachEvent('onunload', oe)),
						(d.scope = ce(function (e) {
							return (
								a.appendChild(e).appendChild(C.createElement('div')),
								'undefined' != typeof e.querySelectorAll &&
									!e.querySelectorAll(':scope fieldset div').length
							);
						})),
						(d.attributes = ce(function (e) {
							return (e.className = 'i'), !e.getAttribute('className');
						})),
						(d.getElementsByTagName = ce(function (e) {
							return (
								e.appendChild(C.createComment('')),
								!e.getElementsByTagName('*').length
							);
						})),
						(d.getElementsByClassName = K.test(C.getElementsByClassName)),
						(d.getById = ce(function (e) {
							return (
								(a.appendChild(e).id = S),
								!C.getElementsByName || !C.getElementsByName(S).length
							);
						})),
						d.getById
							? ((b.filter.ID = function (e) {
									var t = e.replace(te, ne);
									return function (e) {
										return e.getAttribute('id') === t;
									};
							  }),
							  (b.find.ID = function (e, t) {
									if ('undefined' != typeof t.getElementById && E) {
										var n = t.getElementById(e);
										return n ? [n] : [];
									}
							  }))
							: ((b.filter.ID = function (e) {
									var n = e.replace(te, ne);
									return function (e) {
										var t =
											'undefined' != typeof e.getAttributeNode &&
											e.getAttributeNode('id');
										return t && t.value === n;
									};
							  }),
							  (b.find.ID = function (e, t) {
									if ('undefined' != typeof t.getElementById && E) {
										var n,
											r,
											i,
											o = t.getElementById(e);
										if (o) {
											if ((n = o.getAttributeNode('id')) && n.value === e)
												return [o];
											(i = t.getElementsByName(e)), (r = 0);
											while ((o = i[r++]))
												if ((n = o.getAttributeNode('id')) && n.value === e)
													return [o];
										}
										return [];
									}
							  })),
						(b.find.TAG = d.getElementsByTagName
							? function (e, t) {
									return 'undefined' != typeof t.getElementsByTagName
										? t.getElementsByTagName(e)
										: d.qsa
										? t.querySelectorAll(e)
										: void 0;
							  }
							: function (e, t) {
									var n,
										r = [],
										i = 0,
										o = t.getElementsByTagName(e);
									if ('*' === e) {
										while ((n = o[i++])) 1 === n.nodeType && r.push(n);
										return r;
									}
									return o;
							  }),
						(b.find.CLASS =
							d.getElementsByClassName &&
							function (e, t) {
								if ('undefined' != typeof t.getElementsByClassName && E)
									return t.getElementsByClassName(e);
							}),
						(s = []),
						(v = []),
						(d.qsa = K.test(C.querySelectorAll)) &&
							(ce(function (e) {
								var t;
								(a.appendChild(e).innerHTML =
									"<a id='" +
									S +
									"'></a><select id='" +
									S +
									"-\r\\' msallowcapture=''><option selected=''></option></select>"),
									e.querySelectorAll("[msallowcapture^='']").length &&
										v.push('[*^$]=' + M + '*(?:\'\'|"")'),
									e.querySelectorAll('[selected]').length ||
										v.push('\\[' + M + '*(?:value|' + R + ')'),
									e.querySelectorAll('[id~=' + S + '-]').length || v.push('~='),
									(t = C.createElement('input')).setAttribute('name', ''),
									e.appendChild(t),
									e.querySelectorAll("[name='']").length ||
										v.push('\\[' + M + '*name' + M + '*=' + M + '*(?:\'\'|"")'),
									e.querySelectorAll(':checked').length || v.push(':checked'),
									e.querySelectorAll('a#' + S + '+*').length ||
										v.push('.#.+[+~]'),
									e.querySelectorAll('\\\f'),
									v.push('[\\r\\n\\f]');
							}),
							ce(function (e) {
								e.innerHTML =
									"<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
								var t = C.createElement('input');
								t.setAttribute('type', 'hidden'),
									e.appendChild(t).setAttribute('name', 'D'),
									e.querySelectorAll('[name=d]').length &&
										v.push('name' + M + '*[*^$|!~]?='),
									2 !== e.querySelectorAll(':enabled').length &&
										v.push(':enabled', ':disabled'),
									(a.appendChild(e).disabled = !0),
									2 !== e.querySelectorAll(':disabled').length &&
										v.push(':enabled', ':disabled'),
									e.querySelectorAll('*,:x'),
									v.push(',.*:');
							})),
						(d.matchesSelector = K.test(
							(c =
								a.matches ||
								a.webkitMatchesSelector ||
								a.mozMatchesSelector ||
								a.oMatchesSelector ||
								a.msMatchesSelector)
						)) &&
							ce(function (e) {
								(d.disconnectedMatch = c.call(e, '*')),
									c.call(e, "[s!='']:x"),
									s.push('!=', F);
							}),
						(v = v.length && new RegExp(v.join('|'))),
						(s = s.length && new RegExp(s.join('|'))),
						(t = K.test(a.compareDocumentPosition)),
						(y =
							t || K.test(a.contains)
								? function (e, t) {
										var n = 9 === e.nodeType ? e.documentElement : e,
											r = t && t.parentNode;
										return (
											e === r ||
											!(
												!r ||
												1 !== r.nodeType ||
												!(n.contains
													? n.contains(r)
													: e.compareDocumentPosition &&
													  16 & e.compareDocumentPosition(r))
											)
										);
								  }
								: function (e, t) {
										if (t) while ((t = t.parentNode)) if (t === e) return !0;
										return !1;
								  }),
						(j = t
							? function (e, t) {
									if (e === t) return (l = !0), 0;
									var n =
										!e.compareDocumentPosition - !t.compareDocumentPosition;
									return (
										n ||
										(1 &
											(n =
												(e.ownerDocument || e) == (t.ownerDocument || t)
													? e.compareDocumentPosition(t)
													: 1) ||
										(!d.sortDetached && t.compareDocumentPosition(e) === n)
											? e == C || (e.ownerDocument == p && y(p, e))
												? -1
												: t == C || (t.ownerDocument == p && y(p, t))
												? 1
												: u
												? P(u, e) - P(u, t)
												: 0
											: 4 & n
											? -1
											: 1)
									);
							  }
							: function (e, t) {
									if (e === t) return (l = !0), 0;
									var n,
										r = 0,
										i = e.parentNode,
										o = t.parentNode,
										a = [e],
										s = [t];
									if (!i || !o)
										return e == C
											? -1
											: t == C
											? 1
											: i
											? -1
											: o
											? 1
											: u
											? P(u, e) - P(u, t)
											: 0;
									if (i === o) return pe(e, t);
									n = e;
									while ((n = n.parentNode)) a.unshift(n);
									n = t;
									while ((n = n.parentNode)) s.unshift(n);
									while (a[r] === s[r]) r++;
									return r
										? pe(a[r], s[r])
										: a[r] == p
										? -1
										: s[r] == p
										? 1
										: 0;
							  })),
					C
				);
			}),
		(se.matches = function (e, t) {
			return se(e, null, null, t);
		}),
		(se.matchesSelector = function (e, t) {
			if (
				(T(e),
				d.matchesSelector &&
					E &&
					!N[t + ' '] &&
					(!s || !s.test(t)) &&
					(!v || !v.test(t)))
			)
				try {
					var n = c.call(e, t);
					if (
						n ||
						d.disconnectedMatch ||
						(e.document && 11 !== e.document.nodeType)
					)
						return n;
				} catch (e) {
					N(t, !0);
				}
			return 0 < se(t, C, null, [e]).length;
		}),
		(se.contains = function (e, t) {
			return (e.ownerDocument || e) != C && T(e), y(e, t);
		}),
		(se.attr = function (e, t) {
			(e.ownerDocument || e) != C && T(e);
			var n = b.attrHandle[t.toLowerCase()],
				r = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
			return void 0 !== r
				? r
				: d.attributes || !E
				? e.getAttribute(t)
				: (r = e.getAttributeNode(t)) && r.specified
				? r.value
				: null;
		}),
		(se.escape = function (e) {
			return (e + '').replace(re, ie);
		}),
		(se.error = function (e) {
			throw new Error('Syntax error, unrecognized expression: ' + e);
		}),
		(se.uniqueSort = function (e) {
			var t,
				n = [],
				r = 0,
				i = 0;
			if (
				((l = !d.detectDuplicates),
				(u = !d.sortStable && e.slice(0)),
				e.sort(j),
				l)
			) {
				while ((t = e[i++])) t === e[i] && (r = n.push(i));
				while (r--) e.splice(n[r], 1);
			}
			return (u = null), e;
		}),
		(o = se.getText =
			function (e) {
				var t,
					n = '',
					r = 0,
					i = e.nodeType;
				if (i) {
					if (1 === i || 9 === i || 11 === i) {
						if ('string' == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
					} else if (3 === i || 4 === i) return e.nodeValue;
				} else while ((t = e[r++])) n += o(t);
				return n;
			}),
		((b = se.selectors =
			{
				cacheLength: 50,
				createPseudo: le,
				match: G,
				attrHandle: {},
				find: {},
				relative: {
					'>': { dir: 'parentNode', first: !0 },
					' ': { dir: 'parentNode' },
					'+': { dir: 'previousSibling', first: !0 },
					'~': { dir: 'previousSibling' },
				},
				preFilter: {
					ATTR: function (e) {
						return (
							(e[1] = e[1].replace(te, ne)),
							(e[3] = (e[3] || e[4] || e[5] || '').replace(te, ne)),
							'~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
							e.slice(0, 4)
						);
					},
					CHILD: function (e) {
						return (
							(e[1] = e[1].toLowerCase()),
							'nth' === e[1].slice(0, 3)
								? (e[3] || se.error(e[0]),
								  (e[4] = +(e[4]
										? e[5] + (e[6] || 1)
										: 2 * ('even' === e[3] || 'odd' === e[3]))),
								  (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
								: e[3] && se.error(e[0]),
							e
						);
					},
					PSEUDO: function (e) {
						var t,
							n = !e[6] && e[2];
						return G.CHILD.test(e[0])
							? null
							: (e[3]
									? (e[2] = e[4] || e[5] || '')
									: n &&
									  X.test(n) &&
									  (t = h(n, !0)) &&
									  (t = n.indexOf(')', n.length - t) - n.length) &&
									  ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
							  e.slice(0, 3));
					},
				},
				filter: {
					TAG: function (e) {
						var t = e.replace(te, ne).toLowerCase();
						return '*' === e
							? function () {
									return !0;
							  }
							: function (e) {
									return e.nodeName && e.nodeName.toLowerCase() === t;
							  };
					},
					CLASS: function (e) {
						var t = m[e + ' '];
						return (
							t ||
							((t = new RegExp('(^|' + M + ')' + e + '(' + M + '|$)')) &&
								m(e, function (e) {
									return t.test(
										('string' == typeof e.className && e.className) ||
											('undefined' != typeof e.getAttribute &&
												e.getAttribute('class')) ||
											''
									);
								}))
						);
					},
					ATTR: function (n, r, i) {
						return function (e) {
							var t = se.attr(e, n);
							return null == t
								? '!=' === r
								: !r ||
										((t += ''),
										'=' === r
											? t === i
											: '!=' === r
											? t !== i
											: '^=' === r
											? i && 0 === t.indexOf(i)
											: '*=' === r
											? i && -1 < t.indexOf(i)
											: '$=' === r
											? i && t.slice(-i.length) === i
											: '~=' === r
											? -1 < (' ' + t.replace(B, ' ') + ' ').indexOf(i)
											: '|=' === r &&
											  (t === i || t.slice(0, i.length + 1) === i + '-'));
						};
					},
					CHILD: function (h, e, t, g, v) {
						var y = 'nth' !== h.slice(0, 3),
							m = 'last' !== h.slice(-4),
							x = 'of-type' === e;
						return 1 === g && 0 === v
							? function (e) {
									return !!e.parentNode;
							  }
							: function (e, t, n) {
									var r,
										i,
										o,
										a,
										s,
										u,
										l = y !== m ? 'nextSibling' : 'previousSibling',
										c = e.parentNode,
										f = x && e.nodeName.toLowerCase(),
										p = !n && !x,
										d = !1;
									if (c) {
										if (y) {
											while (l) {
												a = e;
												while ((a = a[l]))
													if (
														x
															? a.nodeName.toLowerCase() === f
															: 1 === a.nodeType
													)
														return !1;
												u = l = 'only' === h && !u && 'nextSibling';
											}
											return !0;
										}
										if (((u = [m ? c.firstChild : c.lastChild]), m && p)) {
											(d =
												(s =
													(r =
														(i =
															(o = (a = c)[S] || (a[S] = {}))[a.uniqueID] ||
															(o[a.uniqueID] = {}))[h] || [])[0] === k &&
													r[1]) && r[2]),
												(a = s && c.childNodes[s]);
											while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
												if (1 === a.nodeType && ++d && a === e) {
													i[h] = [k, s, d];
													break;
												}
										} else if (
											(p &&
												(d = s =
													(r =
														(i =
															(o = (a = e)[S] || (a[S] = {}))[a.uniqueID] ||
															(o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]),
											!1 === d)
										)
											while ((a = (++s && a && a[l]) || (d = s = 0) || u.pop()))
												if (
													(x
														? a.nodeName.toLowerCase() === f
														: 1 === a.nodeType) &&
													++d &&
													(p &&
														((i =
															(o = a[S] || (a[S] = {}))[a.uniqueID] ||
															(o[a.uniqueID] = {}))[h] = [k, d]),
													a === e)
												)
													break;
										return (d -= v) === g || (d % g == 0 && 0 <= d / g);
									}
							  };
					},
					PSEUDO: function (e, o) {
						var t,
							a =
								b.pseudos[e] ||
								b.setFilters[e.toLowerCase()] ||
								se.error('unsupported pseudo: ' + e);
						return a[S]
							? a(o)
							: 1 < a.length
							? ((t = [e, e, '', o]),
							  b.setFilters.hasOwnProperty(e.toLowerCase())
									? le(function (e, t) {
											var n,
												r = a(e, o),
												i = r.length;
											while (i--) e[(n = P(e, r[i]))] = !(t[n] = r[i]);
									  })
									: function (e) {
											return a(e, 0, t);
									  })
							: a;
					},
				},
				pseudos: {
					not: le(function (e) {
						var r = [],
							i = [],
							s = f(e.replace($, '$1'));
						return s[S]
							? le(function (e, t, n, r) {
									var i,
										o = s(e, null, r, []),
										a = e.length;
									while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
							  })
							: function (e, t, n) {
									return (r[0] = e), s(r, null, n, i), (r[0] = null), !i.pop();
							  };
					}),
					has: le(function (t) {
						return function (e) {
							return 0 < se(t, e).length;
						};
					}),
					contains: le(function (t) {
						return (
							(t = t.replace(te, ne)),
							function (e) {
								return -1 < (e.textContent || o(e)).indexOf(t);
							}
						);
					}),
					lang: le(function (n) {
						return (
							V.test(n || '') || se.error('unsupported lang: ' + n),
							(n = n.replace(te, ne).toLowerCase()),
							function (e) {
								var t;
								do {
									if (
										(t = E
											? e.lang
											: e.getAttribute('xml:lang') || e.getAttribute('lang'))
									)
										return (
											(t = t.toLowerCase()) === n || 0 === t.indexOf(n + '-')
										);
								} while ((e = e.parentNode) && 1 === e.nodeType);
								return !1;
							}
						);
					}),
					target: function (e) {
						var t = n.location && n.location.hash;
						return t && t.slice(1) === e.id;
					},
					root: function (e) {
						return e === a;
					},
					focus: function (e) {
						return (
							e === C.activeElement &&
							(!C.hasFocus || C.hasFocus()) &&
							!!(e.type || e.href || ~e.tabIndex)
						);
					},
					enabled: ge(!1),
					disabled: ge(!0),
					checked: function (e) {
						var t = e.nodeName.toLowerCase();
						return (
							('input' === t && !!e.checked) || ('option' === t && !!e.selected)
						);
					},
					selected: function (e) {
						return (
							e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
						);
					},
					empty: function (e) {
						for (e = e.firstChild; e; e = e.nextSibling)
							if (e.nodeType < 6) return !1;
						return !0;
					},
					parent: function (e) {
						return !b.pseudos.empty(e);
					},
					header: function (e) {
						return J.test(e.nodeName);
					},
					input: function (e) {
						return Q.test(e.nodeName);
					},
					button: function (e) {
						var t = e.nodeName.toLowerCase();
						return ('input' === t && 'button' === e.type) || 'button' === t;
					},
					text: function (e) {
						var t;
						return (
							'input' === e.nodeName.toLowerCase() &&
							'text' === e.type &&
							(null == (t = e.getAttribute('type')) ||
								'text' === t.toLowerCase())
						);
					},
					first: ve(function () {
						return [0];
					}),
					last: ve(function (e, t) {
						return [t - 1];
					}),
					eq: ve(function (e, t, n) {
						return [n < 0 ? n + t : n];
					}),
					even: ve(function (e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e;
					}),
					odd: ve(function (e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e;
					}),
					lt: ve(function (e, t, n) {
						for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
						return e;
					}),
					gt: ve(function (e, t, n) {
						for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
						return e;
					}),
				},
			}).pseudos.nth = b.pseudos.eq),
		{ radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
			b.pseudos[e] = de(e);
		for (e in { submit: !0, reset: !0 }) b.pseudos[e] = he(e);
		function me() {}
		function xe(e) {
			for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
			return r;
		}
		function be(s, e, t) {
			var u = e.dir,
				l = e.next,
				c = l || u,
				f = t && 'parentNode' === c,
				p = r++;
			return e.first
				? function (e, t, n) {
						while ((e = e[u])) if (1 === e.nodeType || f) return s(e, t, n);
						return !1;
				  }
				: function (e, t, n) {
						var r,
							i,
							o,
							a = [k, p];
						if (n) {
							while ((e = e[u]))
								if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
						} else
							while ((e = e[u]))
								if (1 === e.nodeType || f)
									if (
										((i =
											(o = e[S] || (e[S] = {}))[e.uniqueID] ||
											(o[e.uniqueID] = {})),
										l && l === e.nodeName.toLowerCase())
									)
										e = e[u] || e;
									else {
										if ((r = i[c]) && r[0] === k && r[1] === p)
											return (a[2] = r[2]);
										if (((i[c] = a)[2] = s(e, t, n))) return !0;
									}
						return !1;
				  };
		}
		function we(i) {
			return 1 < i.length
				? function (e, t, n) {
						var r = i.length;
						while (r--) if (!i[r](e, t, n)) return !1;
						return !0;
				  }
				: i[0];
		}
		function Te(e, t, n, r, i) {
			for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
				(o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
			return a;
		}
		function Ce(d, h, g, v, y, e) {
			return (
				v && !v[S] && (v = Ce(v)),
				y && !y[S] && (y = Ce(y, e)),
				le(function (e, t, n, r) {
					var i,
						o,
						a,
						s = [],
						u = [],
						l = t.length,
						c =
							e ||
							(function (e, t, n) {
								for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
								return n;
							})(h || '*', n.nodeType ? [n] : n, []),
						f = !d || (!e && h) ? c : Te(c, s, d, n, r),
						p = g ? (y || (e ? d : l || v) ? [] : t) : f;
					if ((g && g(f, p, n, r), v)) {
						(i = Te(p, u)), v(i, [], n, r), (o = i.length);
						while (o--) (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
					}
					if (e) {
						if (y || d) {
							if (y) {
								(i = []), (o = p.length);
								while (o--) (a = p[o]) && i.push((f[o] = a));
								y(null, (p = []), i, r);
							}
							o = p.length;
							while (o--)
								(a = p[o]) &&
									-1 < (i = y ? P(e, a) : s[o]) &&
									(e[i] = !(t[i] = a));
						}
					} else (p = Te(p === t ? p.splice(l, p.length) : p)), y ? y(null, t, p, r) : H.apply(t, p);
				})
			);
		}
		function Ee(e) {
			for (
				var i,
					t,
					n,
					r = e.length,
					o = b.relative[e[0].type],
					a = o || b.relative[' '],
					s = o ? 1 : 0,
					u = be(
						function (e) {
							return e === i;
						},
						a,
						!0
					),
					l = be(
						function (e) {
							return -1 < P(i, e);
						},
						a,
						!0
					),
					c = [
						function (e, t, n) {
							var r =
								(!o && (n || t !== w)) ||
								((i = t).nodeType ? u(e, t, n) : l(e, t, n));
							return (i = null), r;
						},
					];
				s < r;
				s++
			)
				if ((t = b.relative[e[s].type])) c = [be(we(c), t)];
				else {
					if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
						for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
						return Ce(
							1 < s && we(c),
							1 < s &&
								xe(
									e
										.slice(0, s - 1)
										.concat({ value: ' ' === e[s - 2].type ? '*' : '' })
								).replace($, '$1'),
							t,
							s < n && Ee(e.slice(s, n)),
							n < r && Ee((e = e.slice(n))),
							n < r && xe(e)
						);
					}
					c.push(t);
				}
			return we(c);
		}
		return (
			(me.prototype = b.filters = b.pseudos),
			(b.setFilters = new me()),
			(h = se.tokenize =
				function (e, t) {
					var n,
						r,
						i,
						o,
						a,
						s,
						u,
						l = x[e + ' '];
					if (l) return t ? 0 : l.slice(0);
					(a = e), (s = []), (u = b.preFilter);
					while (a) {
						for (o in ((n && !(r = _.exec(a))) ||
							(r && (a = a.slice(r[0].length) || a), s.push((i = []))),
						(n = !1),
						(r = z.exec(a)) &&
							((n = r.shift()),
							i.push({ value: n, type: r[0].replace($, ' ') }),
							(a = a.slice(n.length))),
						b.filter))
							!(r = G[o].exec(a)) ||
								(u[o] && !(r = u[o](r))) ||
								((n = r.shift()),
								i.push({ value: n, type: o, matches: r }),
								(a = a.slice(n.length)));
						if (!n) break;
					}
					return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
				}),
			(f = se.compile =
				function (e, t) {
					var n,
						v,
						y,
						m,
						x,
						r,
						i = [],
						o = [],
						a = A[e + ' '];
					if (!a) {
						t || (t = h(e)), (n = t.length);
						while (n--) (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
						(a = A(
							e,
							((v = o),
							(m = 0 < (y = i).length),
							(x = 0 < v.length),
							(r = function (e, t, n, r, i) {
								var o,
									a,
									s,
									u = 0,
									l = '0',
									c = e && [],
									f = [],
									p = w,
									d = e || (x && b.find.TAG('*', i)),
									h = (k += null == p ? 1 : Math.random() || 0.1),
									g = d.length;
								for (
									i && (w = t == C || t || i);
									l !== g && null != (o = d[l]);
									l++
								) {
									if (x && o) {
										(a = 0), t || o.ownerDocument == C || (T(o), (n = !E));
										while ((s = v[a++]))
											if (s(o, t || C, n)) {
												r.push(o);
												break;
											}
										i && (k = h);
									}
									m && ((o = !s && o) && u--, e && c.push(o));
								}
								if (((u += l), m && l !== u)) {
									a = 0;
									while ((s = y[a++])) s(c, f, t, n);
									if (e) {
										if (0 < u) while (l--) c[l] || f[l] || (f[l] = q.call(r));
										f = Te(f);
									}
									H.apply(r, f),
										i &&
											!e &&
											0 < f.length &&
											1 < u + y.length &&
											se.uniqueSort(r);
								}
								return i && ((k = h), (w = p)), c;
							}),
							m ? le(r) : r)
						)).selector = e;
					}
					return a;
				}),
			(g = se.select =
				function (e, t, n, r) {
					var i,
						o,
						a,
						s,
						u,
						l = 'function' == typeof e && e,
						c = !r && h((e = l.selector || e));
					if (((n = n || []), 1 === c.length)) {
						if (
							2 < (o = c[0] = c[0].slice(0)).length &&
							'ID' === (a = o[0]).type &&
							9 === t.nodeType &&
							E &&
							b.relative[o[1].type]
						) {
							if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
								return n;
							l && (t = t.parentNode), (e = e.slice(o.shift().value.length));
						}
						i = G.needsContext.test(e) ? 0 : o.length;
						while (i--) {
							if (((a = o[i]), b.relative[(s = a.type)])) break;
							if (
								(u = b.find[s]) &&
								(r = u(
									a.matches[0].replace(te, ne),
									(ee.test(o[0].type) && ye(t.parentNode)) || t
								))
							) {
								if ((o.splice(i, 1), !(e = r.length && xe(o))))
									return H.apply(n, r), n;
								break;
							}
						}
					}
					return (
						(l || f(e, c))(
							r,
							t,
							!E,
							n,
							!t || (ee.test(e) && ye(t.parentNode)) || t
						),
						n
					);
				}),
			(d.sortStable = S.split('').sort(j).join('') === S),
			(d.detectDuplicates = !!l),
			T(),
			(d.sortDetached = ce(function (e) {
				return 1 & e.compareDocumentPosition(C.createElement('fieldset'));
			})),
			ce(function (e) {
				return (
					(e.innerHTML = "<a href='#'></a>"),
					'#' === e.firstChild.getAttribute('href')
				);
			}) ||
				fe('type|href|height|width', function (e, t, n) {
					if (!n) return e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
				}),
			(d.attributes &&
				ce(function (e) {
					return (
						(e.innerHTML = '<input/>'),
						e.firstChild.setAttribute('value', ''),
						'' === e.firstChild.getAttribute('value')
					);
				})) ||
				fe('value', function (e, t, n) {
					if (!n && 'input' === e.nodeName.toLowerCase()) return e.defaultValue;
				}),
			ce(function (e) {
				return null == e.getAttribute('disabled');
			}) ||
				fe(R, function (e, t, n) {
					var r;
					if (!n)
						return !0 === e[t]
							? t.toLowerCase()
							: (r = e.getAttributeNode(t)) && r.specified
							? r.value
							: null;
				}),
			se
		);
	})(C);
	(S.find = d),
		(S.expr = d.selectors),
		(S.expr[':'] = S.expr.pseudos),
		(S.uniqueSort = S.unique = d.uniqueSort),
		(S.text = d.getText),
		(S.isXMLDoc = d.isXML),
		(S.contains = d.contains),
		(S.escapeSelector = d.escape);
	var h = function (e, t, n) {
			var r = [],
				i = void 0 !== n;
			while ((e = e[t]) && 9 !== e.nodeType)
				if (1 === e.nodeType) {
					if (i && S(e).is(n)) break;
					r.push(e);
				}
			return r;
		},
		T = function (e, t) {
			for (var n = []; e; e = e.nextSibling)
				1 === e.nodeType && e !== t && n.push(e);
			return n;
		},
		k = S.expr.match.needsContext;
	function A(e, t) {
		return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
	}
	var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	function j(e, n, r) {
		return m(n)
			? S.grep(e, function (e, t) {
					return !!n.call(e, t, e) !== r;
			  })
			: n.nodeType
			? S.grep(e, function (e) {
					return (e === n) !== r;
			  })
			: 'string' != typeof n
			? S.grep(e, function (e) {
					return -1 < i.call(n, e) !== r;
			  })
			: S.filter(n, e, r);
	}
	(S.filter = function (e, t, n) {
		var r = t[0];
		return (
			n && (e = ':not(' + e + ')'),
			1 === t.length && 1 === r.nodeType
				? S.find.matchesSelector(r, e)
					? [r]
					: []
				: S.find.matches(
						e,
						S.grep(t, function (e) {
							return 1 === e.nodeType;
						})
				  )
		);
	}),
		S.fn.extend({
			find: function (e) {
				var t,
					n,
					r = this.length,
					i = this;
				if ('string' != typeof e)
					return this.pushStack(
						S(e).filter(function () {
							for (t = 0; t < r; t++) if (S.contains(i[t], this)) return !0;
						})
					);
				for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
				return 1 < r ? S.uniqueSort(n) : n;
			},
			filter: function (e) {
				return this.pushStack(j(this, e || [], !1));
			},
			not: function (e) {
				return this.pushStack(j(this, e || [], !0));
			},
			is: function (e) {
				return !!j(this, 'string' == typeof e && k.test(e) ? S(e) : e || [], !1)
					.length;
			},
		});
	var D,
		q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	((S.fn.init = function (e, t, n) {
		var r, i;
		if (!e) return this;
		if (((n = n || D), 'string' == typeof e)) {
			if (
				!(r =
					'<' === e[0] && '>' === e[e.length - 1] && 3 <= e.length
						? [null, e, null]
						: q.exec(e)) ||
				(!r[1] && t)
			)
				return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
			if (r[1]) {
				if (
					((t = t instanceof S ? t[0] : t),
					S.merge(
						this,
						S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)
					),
					N.test(r[1]) && S.isPlainObject(t))
				)
					for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
				return this;
			}
			return (
				(i = E.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
			);
		}
		return e.nodeType
			? ((this[0] = e), (this.length = 1), this)
			: m(e)
			? void 0 !== n.ready
				? n.ready(e)
				: e(S)
			: S.makeArray(e, this);
	}).prototype = S.fn),
		(D = S(E));
	var L = /^(?:parents|prev(?:Until|All))/,
		H = { children: !0, contents: !0, next: !0, prev: !0 };
	function O(e, t) {
		while ((e = e[t]) && 1 !== e.nodeType);
		return e;
	}
	S.fn.extend({
		has: function (e) {
			var t = S(e, this),
				n = t.length;
			return this.filter(function () {
				for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
			});
		},
		closest: function (e, t) {
			var n,
				r = 0,
				i = this.length,
				o = [],
				a = 'string' != typeof e && S(e);
			if (!k.test(e))
				for (; r < i; r++)
					for (n = this[r]; n && n !== t; n = n.parentNode)
						if (
							n.nodeType < 11 &&
							(a
								? -1 < a.index(n)
								: 1 === n.nodeType && S.find.matchesSelector(n, e))
						) {
							o.push(n);
							break;
						}
			return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
		},
		index: function (e) {
			return e
				? 'string' == typeof e
					? i.call(S(e), this[0])
					: i.call(this, e.jquery ? e[0] : e)
				: this[0] && this[0].parentNode
				? this.first().prevAll().length
				: -1;
		},
		add: function (e, t) {
			return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
		},
		addBack: function (e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
		},
	}),
		S.each(
			{
				parent: function (e) {
					var t = e.parentNode;
					return t && 11 !== t.nodeType ? t : null;
				},
				parents: function (e) {
					return h(e, 'parentNode');
				},
				parentsUntil: function (e, t, n) {
					return h(e, 'parentNode', n);
				},
				next: function (e) {
					return O(e, 'nextSibling');
				},
				prev: function (e) {
					return O(e, 'previousSibling');
				},
				nextAll: function (e) {
					return h(e, 'nextSibling');
				},
				prevAll: function (e) {
					return h(e, 'previousSibling');
				},
				nextUntil: function (e, t, n) {
					return h(e, 'nextSibling', n);
				},
				prevUntil: function (e, t, n) {
					return h(e, 'previousSibling', n);
				},
				siblings: function (e) {
					return T((e.parentNode || {}).firstChild, e);
				},
				children: function (e) {
					return T(e.firstChild);
				},
				contents: function (e) {
					return null != e.contentDocument && r(e.contentDocument)
						? e.contentDocument
						: (A(e, 'template') && (e = e.content || e),
						  S.merge([], e.childNodes));
				},
			},
			function (r, i) {
				S.fn[r] = function (e, t) {
					var n = S.map(this, i, e);
					return (
						'Until' !== r.slice(-5) && (t = e),
						t && 'string' == typeof t && (n = S.filter(t, n)),
						1 < this.length &&
							(H[r] || S.uniqueSort(n), L.test(r) && n.reverse()),
						this.pushStack(n)
					);
				};
			}
		);
	var P = /[^\x20\t\r\n\f]+/g;
	function R(e) {
		return e;
	}
	function M(e) {
		throw e;
	}
	function I(e, t, n, r) {
		var i;
		try {
			e && m((i = e.promise))
				? i.call(e).done(t).fail(n)
				: e && m((i = e.then))
				? i.call(e, t, n)
				: t.apply(void 0, [e].slice(r));
		} catch (e) {
			n.apply(void 0, [e]);
		}
	}
	(S.Callbacks = function (r) {
		var e, n;
		r =
			'string' == typeof r
				? ((e = r),
				  (n = {}),
				  S.each(e.match(P) || [], function (e, t) {
						n[t] = !0;
				  }),
				  n)
				: S.extend({}, r);
		var i,
			t,
			o,
			a,
			s = [],
			u = [],
			l = -1,
			c = function () {
				for (a = a || r.once, o = i = !0; u.length; l = -1) {
					t = u.shift();
					while (++l < s.length)
						!1 === s[l].apply(t[0], t[1]) &&
							r.stopOnFalse &&
							((l = s.length), (t = !1));
				}
				r.memory || (t = !1), (i = !1), a && (s = t ? [] : '');
			},
			f = {
				add: function () {
					return (
						s &&
							(t && !i && ((l = s.length - 1), u.push(t)),
							(function n(e) {
								S.each(e, function (e, t) {
									m(t)
										? (r.unique && f.has(t)) || s.push(t)
										: t && t.length && 'string' !== w(t) && n(t);
								});
							})(arguments),
							t && !i && c()),
						this
					);
				},
				remove: function () {
					return (
						S.each(arguments, function (e, t) {
							var n;
							while (-1 < (n = S.inArray(t, s, n)))
								s.splice(n, 1), n <= l && l--;
						}),
						this
					);
				},
				has: function (e) {
					return e ? -1 < S.inArray(e, s) : 0 < s.length;
				},
				empty: function () {
					return s && (s = []), this;
				},
				disable: function () {
					return (a = u = []), (s = t = ''), this;
				},
				disabled: function () {
					return !s;
				},
				lock: function () {
					return (a = u = []), t || i || (s = t = ''), this;
				},
				locked: function () {
					return !!a;
				},
				fireWith: function (e, t) {
					return (
						a ||
							((t = [e, (t = t || []).slice ? t.slice() : t]),
							u.push(t),
							i || c()),
						this
					);
				},
				fire: function () {
					return f.fireWith(this, arguments), this;
				},
				fired: function () {
					return !!o;
				},
			};
		return f;
	}),
		S.extend({
			Deferred: function (e) {
				var o = [
						[
							'notify',
							'progress',
							S.Callbacks('memory'),
							S.Callbacks('memory'),
							2,
						],
						[
							'resolve',
							'done',
							S.Callbacks('once memory'),
							S.Callbacks('once memory'),
							0,
							'resolved',
						],
						[
							'reject',
							'fail',
							S.Callbacks('once memory'),
							S.Callbacks('once memory'),
							1,
							'rejected',
						],
					],
					i = 'pending',
					a = {
						state: function () {
							return i;
						},
						always: function () {
							return s.done(arguments).fail(arguments), this;
						},
						catch: function (e) {
							return a.then(null, e);
						},
						pipe: function () {
							var i = arguments;
							return S.Deferred(function (r) {
								S.each(o, function (e, t) {
									var n = m(i[t[4]]) && i[t[4]];
									s[t[1]](function () {
										var e = n && n.apply(this, arguments);
										e && m(e.promise)
											? e
													.promise()
													.progress(r.notify)
													.done(r.resolve)
													.fail(r.reject)
											: r[t[0] + 'With'](this, n ? [e] : arguments);
									});
								}),
									(i = null);
							}).promise();
						},
						then: function (t, n, r) {
							var u = 0;
							function l(i, o, a, s) {
								return function () {
									var n = this,
										r = arguments,
										e = function () {
											var e, t;
											if (!(i < u)) {
												if ((e = a.apply(n, r)) === o.promise())
													throw new TypeError('Thenable self-resolution');
												(t =
													e &&
													('object' == typeof e || 'function' == typeof e) &&
													e.then),
													m(t)
														? s
															? t.call(e, l(u, o, R, s), l(u, o, M, s))
															: (u++,
															  t.call(
																	e,
																	l(u, o, R, s),
																	l(u, o, M, s),
																	l(u, o, R, o.notifyWith)
															  ))
														: (a !== R && ((n = void 0), (r = [e])),
														  (s || o.resolveWith)(n, r));
											}
										},
										t = s
											? e
											: function () {
													try {
														e();
													} catch (e) {
														S.Deferred.exceptionHook &&
															S.Deferred.exceptionHook(e, t.stackTrace),
															u <= i + 1 &&
																(a !== M && ((n = void 0), (r = [e])),
																o.rejectWith(n, r));
													}
											  };
									i
										? t()
										: (S.Deferred.getStackHook &&
												(t.stackTrace = S.Deferred.getStackHook()),
										  C.setTimeout(t));
								};
							}
							return S.Deferred(function (e) {
								o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)),
									o[1][3].add(l(0, e, m(t) ? t : R)),
									o[2][3].add(l(0, e, m(n) ? n : M));
							}).promise();
						},
						promise: function (e) {
							return null != e ? S.extend(e, a) : a;
						},
					},
					s = {};
				return (
					S.each(o, function (e, t) {
						var n = t[2],
							r = t[5];
						(a[t[1]] = n.add),
							r &&
								n.add(
									function () {
										i = r;
									},
									o[3 - e][2].disable,
									o[3 - e][3].disable,
									o[0][2].lock,
									o[0][3].lock
								),
							n.add(t[3].fire),
							(s[t[0]] = function () {
								return (
									s[t[0] + 'With'](this === s ? void 0 : this, arguments), this
								);
							}),
							(s[t[0] + 'With'] = n.fireWith);
					}),
					a.promise(s),
					e && e.call(s, s),
					s
				);
			},
			when: function (e) {
				var n = arguments.length,
					t = n,
					r = Array(t),
					i = s.call(arguments),
					o = S.Deferred(),
					a = function (t) {
						return function (e) {
							(r[t] = this),
								(i[t] = 1 < arguments.length ? s.call(arguments) : e),
								--n || o.resolveWith(r, i);
						};
					};
				if (
					n <= 1 &&
					(I(e, o.done(a(t)).resolve, o.reject, !n),
					'pending' === o.state() || m(i[t] && i[t].then))
				)
					return o.then();
				while (t--) I(i[t], a(t), o.reject);
				return o.promise();
			},
		});
	var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	(S.Deferred.exceptionHook = function (e, t) {
		C.console &&
			C.console.warn &&
			e &&
			W.test(e.name) &&
			C.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, t);
	}),
		(S.readyException = function (e) {
			C.setTimeout(function () {
				throw e;
			});
		});
	var F = S.Deferred();
	function B() {
		E.removeEventListener('DOMContentLoaded', B),
			C.removeEventListener('load', B),
			S.ready();
	}
	(S.fn.ready = function (e) {
		return (
			F.then(e)['catch'](function (e) {
				S.readyException(e);
			}),
			this
		);
	}),
		S.extend({
			isReady: !1,
			readyWait: 1,
			ready: function (e) {
				(!0 === e ? --S.readyWait : S.isReady) ||
					((S.isReady = !0) !== e && 0 < --S.readyWait) ||
					F.resolveWith(E, [S]);
			},
		}),
		(S.ready.then = F.then),
		'complete' === E.readyState ||
		('loading' !== E.readyState && !E.documentElement.doScroll)
			? C.setTimeout(S.ready)
			: (E.addEventListener('DOMContentLoaded', B),
			  C.addEventListener('load', B));
	var $ = function (e, t, n, r, i, o, a) {
			var s = 0,
				u = e.length,
				l = null == n;
			if ('object' === w(n))
				for (s in ((i = !0), n)) $(e, t, s, n[s], !0, o, a);
			else if (
				void 0 !== r &&
				((i = !0),
				m(r) || (a = !0),
				l &&
					(a
						? (t.call(e, r), (t = null))
						: ((l = t),
						  (t = function (e, t, n) {
								return l.call(S(e), n);
						  }))),
				t)
			)
				for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
			return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
		},
		_ = /^-ms-/,
		z = /-([a-z])/g;
	function U(e, t) {
		return t.toUpperCase();
	}
	function X(e) {
		return e.replace(_, 'ms-').replace(z, U);
	}
	var V = function (e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
	};
	function G() {
		this.expando = S.expando + G.uid++;
	}
	(G.uid = 1),
		(G.prototype = {
			cache: function (e) {
				var t = e[this.expando];
				return (
					t ||
						((t = {}),
						V(e) &&
							(e.nodeType
								? (e[this.expando] = t)
								: Object.defineProperty(e, this.expando, {
										value: t,
										configurable: !0,
								  }))),
					t
				);
			},
			set: function (e, t, n) {
				var r,
					i = this.cache(e);
				if ('string' == typeof t) i[X(t)] = n;
				else for (r in t) i[X(r)] = t[r];
				return i;
			},
			get: function (e, t) {
				return void 0 === t
					? this.cache(e)
					: e[this.expando] && e[this.expando][X(t)];
			},
			access: function (e, t, n) {
				return void 0 === t || (t && 'string' == typeof t && void 0 === n)
					? this.get(e, t)
					: (this.set(e, t, n), void 0 !== n ? n : t);
			},
			remove: function (e, t) {
				var n,
					r = e[this.expando];
				if (void 0 !== r) {
					if (void 0 !== t) {
						n = (t = Array.isArray(t)
							? t.map(X)
							: (t = X(t)) in r
							? [t]
							: t.match(P) || []).length;
						while (n--) delete r[t[n]];
					}
					(void 0 === t || S.isEmptyObject(r)) &&
						(e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
				}
			},
			hasData: function (e) {
				var t = e[this.expando];
				return void 0 !== t && !S.isEmptyObject(t);
			},
		});
	var Y = new G(),
		Q = new G(),
		J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		K = /[A-Z]/g;
	function Z(e, t, n) {
		var r, i;
		if (void 0 === n && 1 === e.nodeType)
			if (
				((r = 'data-' + t.replace(K, '-$&').toLowerCase()),
				'string' == typeof (n = e.getAttribute(r)))
			) {
				try {
					n =
						'true' === (i = n) ||
						('false' !== i &&
							('null' === i
								? null
								: i === +i + ''
								? +i
								: J.test(i)
								? JSON.parse(i)
								: i));
				} catch (e) {}
				Q.set(e, t, n);
			} else n = void 0;
		return n;
	}
	S.extend({
		hasData: function (e) {
			return Q.hasData(e) || Y.hasData(e);
		},
		data: function (e, t, n) {
			return Q.access(e, t, n);
		},
		removeData: function (e, t) {
			Q.remove(e, t);
		},
		_data: function (e, t, n) {
			return Y.access(e, t, n);
		},
		_removeData: function (e, t) {
			Y.remove(e, t);
		},
	}),
		S.fn.extend({
			data: function (n, e) {
				var t,
					r,
					i,
					o = this[0],
					a = o && o.attributes;
				if (void 0 === n) {
					if (
						this.length &&
						((i = Q.get(o)), 1 === o.nodeType && !Y.get(o, 'hasDataAttrs'))
					) {
						t = a.length;
						while (t--)
							a[t] &&
								0 === (r = a[t].name).indexOf('data-') &&
								((r = X(r.slice(5))), Z(o, r, i[r]));
						Y.set(o, 'hasDataAttrs', !0);
					}
					return i;
				}
				return 'object' == typeof n
					? this.each(function () {
							Q.set(this, n);
					  })
					: $(
							this,
							function (e) {
								var t;
								if (o && void 0 === e)
									return void 0 !== (t = Q.get(o, n))
										? t
										: void 0 !== (t = Z(o, n))
										? t
										: void 0;
								this.each(function () {
									Q.set(this, n, e);
								});
							},
							null,
							e,
							1 < arguments.length,
							null,
							!0
					  );
			},
			removeData: function (e) {
				return this.each(function () {
					Q.remove(this, e);
				});
			},
		}),
		S.extend({
			queue: function (e, t, n) {
				var r;
				if (e)
					return (
						(t = (t || 'fx') + 'queue'),
						(r = Y.get(e, t)),
						n &&
							(!r || Array.isArray(n)
								? (r = Y.access(e, t, S.makeArray(n)))
								: r.push(n)),
						r || []
					);
			},
			dequeue: function (e, t) {
				t = t || 'fx';
				var n = S.queue(e, t),
					r = n.length,
					i = n.shift(),
					o = S._queueHooks(e, t);
				'inprogress' === i && ((i = n.shift()), r--),
					i &&
						('fx' === t && n.unshift('inprogress'),
						delete o.stop,
						i.call(
							e,
							function () {
								S.dequeue(e, t);
							},
							o
						)),
					!r && o && o.empty.fire();
			},
			_queueHooks: function (e, t) {
				var n = t + 'queueHooks';
				return (
					Y.get(e, n) ||
					Y.access(e, n, {
						empty: S.Callbacks('once memory').add(function () {
							Y.remove(e, [t + 'queue', n]);
						}),
					})
				);
			},
		}),
		S.fn.extend({
			queue: function (t, n) {
				var e = 2;
				return (
					'string' != typeof t && ((n = t), (t = 'fx'), e--),
					arguments.length < e
						? S.queue(this[0], t)
						: void 0 === n
						? this
						: this.each(function () {
								var e = S.queue(this, t, n);
								S._queueHooks(this, t),
									'fx' === t && 'inprogress' !== e[0] && S.dequeue(this, t);
						  })
				);
			},
			dequeue: function (e) {
				return this.each(function () {
					S.dequeue(this, e);
				});
			},
			clearQueue: function (e) {
				return this.queue(e || 'fx', []);
			},
			promise: function (e, t) {
				var n,
					r = 1,
					i = S.Deferred(),
					o = this,
					a = this.length,
					s = function () {
						--r || i.resolveWith(o, [o]);
					};
				'string' != typeof e && ((t = e), (e = void 0)), (e = e || 'fx');
				while (a--)
					(n = Y.get(o[a], e + 'queueHooks')) &&
						n.empty &&
						(r++, n.empty.add(s));
				return s(), i.promise(t);
			},
		});
	var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		te = new RegExp('^(?:([+-])=|)(' + ee + ')([a-z%]*)$', 'i'),
		ne = ['Top', 'Right', 'Bottom', 'Left'],
		re = E.documentElement,
		ie = function (e) {
			return S.contains(e.ownerDocument, e);
		},
		oe = { composed: !0 };
	re.getRootNode &&
		(ie = function (e) {
			return (
				S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
			);
		});
	var ae = function (e, t) {
		return (
			'none' === (e = t || e).style.display ||
			('' === e.style.display && ie(e) && 'none' === S.css(e, 'display'))
		);
	};
	function se(e, t, n, r) {
		var i,
			o,
			a = 20,
			s = r
				? function () {
						return r.cur();
				  }
				: function () {
						return S.css(e, t, '');
				  },
			u = s(),
			l = (n && n[3]) || (S.cssNumber[t] ? '' : 'px'),
			c =
				e.nodeType &&
				(S.cssNumber[t] || ('px' !== l && +u)) &&
				te.exec(S.css(e, t));
		if (c && c[3] !== l) {
			(u /= 2), (l = l || c[3]), (c = +u || 1);
			while (a--)
				S.style(e, t, c + l),
					(1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
					(c /= o);
			(c *= 2), S.style(e, t, c + l), (n = n || []);
		}
		return (
			n &&
				((c = +c || +u || 0),
				(i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
				r && ((r.unit = l), (r.start = c), (r.end = i))),
			i
		);
	}
	var ue = {};
	function le(e, t) {
		for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
			(r = e[c]).style &&
				((n = r.style.display),
				t
					? ('none' === n &&
							((l[c] = Y.get(r, 'display') || null),
							l[c] || (r.style.display = '')),
					  '' === r.style.display &&
							ae(r) &&
							(l[c] =
								((u = a = o = void 0),
								(a = (i = r).ownerDocument),
								(s = i.nodeName),
								(u = ue[s]) ||
									((o = a.body.appendChild(a.createElement(s))),
									(u = S.css(o, 'display')),
									o.parentNode.removeChild(o),
									'none' === u && (u = 'block'),
									(ue[s] = u)))))
					: 'none' !== n && ((l[c] = 'none'), Y.set(r, 'display', n)));
		for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
		return e;
	}
	S.fn.extend({
		show: function () {
			return le(this, !0);
		},
		hide: function () {
			return le(this);
		},
		toggle: function (e) {
			return 'boolean' == typeof e
				? e
					? this.show()
					: this.hide()
				: this.each(function () {
						ae(this) ? S(this).show() : S(this).hide();
				  });
		},
	});
	var ce,
		fe,
		pe = /^(?:checkbox|radio)$/i,
		de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
		he = /^$|^module$|\/(?:java|ecma)script/i;
	(ce = E.createDocumentFragment().appendChild(E.createElement('div'))),
		(fe = E.createElement('input')).setAttribute('type', 'radio'),
		fe.setAttribute('checked', 'checked'),
		fe.setAttribute('name', 't'),
		ce.appendChild(fe),
		(y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked),
		(ce.innerHTML = '<textarea>x</textarea>'),
		(y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue),
		(ce.innerHTML = '<option></option>'),
		(y.option = !!ce.lastChild);
	var ge = {
		thead: [1, '<table>', '</table>'],
		col: [2, '<table><colgroup>', '</colgroup></table>'],
		tr: [2, '<table><tbody>', '</tbody></table>'],
		td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
		_default: [0, '', ''],
	};
	function ve(e, t) {
		var n;
		return (
			(n =
				'undefined' != typeof e.getElementsByTagName
					? e.getElementsByTagName(t || '*')
					: 'undefined' != typeof e.querySelectorAll
					? e.querySelectorAll(t || '*')
					: []),
			void 0 === t || (t && A(e, t)) ? S.merge([e], n) : n
		);
	}
	function ye(e, t) {
		for (var n = 0, r = e.length; n < r; n++)
			Y.set(e[n], 'globalEval', !t || Y.get(t[n], 'globalEval'));
	}
	(ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead),
		(ge.th = ge.td),
		y.option ||
			(ge.optgroup = ge.option =
				[1, "<select multiple='multiple'>", '</select>']);
	var me = /<|&#?\w+;/;
	function xe(e, t, n, r, i) {
		for (
			var o,
				a,
				s,
				u,
				l,
				c,
				f = t.createDocumentFragment(),
				p = [],
				d = 0,
				h = e.length;
			d < h;
			d++
		)
			if ((o = e[d]) || 0 === o)
				if ('object' === w(o)) S.merge(p, o.nodeType ? [o] : o);
				else if (me.test(o)) {
					(a = a || f.appendChild(t.createElement('div'))),
						(s = (de.exec(o) || ['', ''])[1].toLowerCase()),
						(u = ge[s] || ge._default),
						(a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2]),
						(c = u[0]);
					while (c--) a = a.lastChild;
					S.merge(p, a.childNodes), ((a = f.firstChild).textContent = '');
				} else p.push(t.createTextNode(o));
		(f.textContent = ''), (d = 0);
		while ((o = p[d++]))
			if (r && -1 < S.inArray(o, r)) i && i.push(o);
			else if (
				((l = ie(o)), (a = ve(f.appendChild(o), 'script')), l && ye(a), n)
			) {
				c = 0;
				while ((o = a[c++])) he.test(o.type || '') && n.push(o);
			}
		return f;
	}
	var be = /^([^.]*)(?:\.(.+)|)/;
	function we() {
		return !0;
	}
	function Te() {
		return !1;
	}
	function Ce(e, t) {
		return (
			(e ===
				(function () {
					try {
						return E.activeElement;
					} catch (e) {}
				})()) ==
			('focus' === t)
		);
	}
	function Ee(e, t, n, r, i, o) {
		var a, s;
		if ('object' == typeof t) {
			for (s in ('string' != typeof n && ((r = r || n), (n = void 0)), t))
				Ee(e, s, n, r, t[s], o);
			return e;
		}
		if (
			(null == r && null == i
				? ((i = n), (r = n = void 0))
				: null == i &&
				  ('string' == typeof n
						? ((i = r), (r = void 0))
						: ((i = r), (r = n), (n = void 0))),
			!1 === i)
		)
			i = Te;
		else if (!i) return e;
		return (
			1 === o &&
				((a = i),
				((i = function (e) {
					return S().off(e), a.apply(this, arguments);
				}).guid = a.guid || (a.guid = S.guid++))),
			e.each(function () {
				S.event.add(this, t, i, r, n);
			})
		);
	}
	function Se(e, i, o) {
		o
			? (Y.set(e, i, !1),
			  S.event.add(e, i, {
					namespace: !1,
					handler: function (e) {
						var t,
							n,
							r = Y.get(this, i);
						if (1 & e.isTrigger && this[i]) {
							if (r.length)
								(S.event.special[i] || {}).delegateType && e.stopPropagation();
							else if (
								((r = s.call(arguments)),
								Y.set(this, i, r),
								(t = o(this, i)),
								this[i](),
								r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : (n = {}),
								r !== n)
							)
								return (
									e.stopImmediatePropagation(), e.preventDefault(), n && n.value
								);
						} else
							r.length &&
								(Y.set(this, i, {
									value: S.event.trigger(
										S.extend(r[0], S.Event.prototype),
										r.slice(1),
										this
									),
								}),
								e.stopImmediatePropagation());
					},
			  }))
			: void 0 === Y.get(e, i) && S.event.add(e, i, we);
	}
	(S.event = {
		global: {},
		add: function (t, e, n, r, i) {
			var o,
				a,
				s,
				u,
				l,
				c,
				f,
				p,
				d,
				h,
				g,
				v = Y.get(t);
			if (V(t)) {
				n.handler && ((n = (o = n).handler), (i = o.selector)),
					i && S.find.matchesSelector(re, i),
					n.guid || (n.guid = S.guid++),
					(u = v.events) || (u = v.events = Object.create(null)),
					(a = v.handle) ||
						(a = v.handle =
							function (e) {
								return 'undefined' != typeof S && S.event.triggered !== e.type
									? S.event.dispatch.apply(t, arguments)
									: void 0;
							}),
					(l = (e = (e || '').match(P) || ['']).length);
				while (l--)
					(d = g = (s = be.exec(e[l]) || [])[1]),
						(h = (s[2] || '').split('.').sort()),
						d &&
							((f = S.event.special[d] || {}),
							(d = (i ? f.delegateType : f.bindType) || d),
							(f = S.event.special[d] || {}),
							(c = S.extend(
								{
									type: d,
									origType: g,
									data: r,
									handler: n,
									guid: n.guid,
									selector: i,
									needsContext: i && S.expr.match.needsContext.test(i),
									namespace: h.join('.'),
								},
								o
							)),
							(p = u[d]) ||
								(((p = u[d] = []).delegateCount = 0),
								(f.setup && !1 !== f.setup.call(t, r, h, a)) ||
									(t.addEventListener && t.addEventListener(d, a))),
							f.add &&
								(f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
							i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
							(S.event.global[d] = !0));
			}
		},
		remove: function (e, t, n, r, i) {
			var o,
				a,
				s,
				u,
				l,
				c,
				f,
				p,
				d,
				h,
				g,
				v = Y.hasData(e) && Y.get(e);
			if (v && (u = v.events)) {
				l = (t = (t || '').match(P) || ['']).length;
				while (l--)
					if (
						((d = g = (s = be.exec(t[l]) || [])[1]),
						(h = (s[2] || '').split('.').sort()),
						d)
					) {
						(f = S.event.special[d] || {}),
							(p = u[(d = (r ? f.delegateType : f.bindType) || d)] || []),
							(s =
								s[2] &&
								new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')),
							(a = o = p.length);
						while (o--)
							(c = p[o]),
								(!i && g !== c.origType) ||
									(n && n.guid !== c.guid) ||
									(s && !s.test(c.namespace)) ||
									(r && r !== c.selector && ('**' !== r || !c.selector)) ||
									(p.splice(o, 1),
									c.selector && p.delegateCount--,
									f.remove && f.remove.call(e, c));
						a &&
							!p.length &&
							((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
								S.removeEvent(e, d, v.handle),
							delete u[d]);
					} else for (d in u) S.event.remove(e, d + t[l], n, r, !0);
				S.isEmptyObject(u) && Y.remove(e, 'handle events');
			}
		},
		dispatch: function (e) {
			var t,
				n,
				r,
				i,
				o,
				a,
				s = new Array(arguments.length),
				u = S.event.fix(e),
				l = (Y.get(this, 'events') || Object.create(null))[u.type] || [],
				c = S.event.special[u.type] || {};
			for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
			if (
				((u.delegateTarget = this),
				!c.preDispatch || !1 !== c.preDispatch.call(this, u))
			) {
				(a = S.event.handlers.call(this, u, l)), (t = 0);
				while ((i = a[t++]) && !u.isPropagationStopped()) {
					(u.currentTarget = i.elem), (n = 0);
					while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
						(u.rnamespace &&
							!1 !== o.namespace &&
							!u.rnamespace.test(o.namespace)) ||
							((u.handleObj = o),
							(u.data = o.data),
							void 0 !==
								(r = (
									(S.event.special[o.origType] || {}).handle || o.handler
								).apply(i.elem, s)) &&
								!1 === (u.result = r) &&
								(u.preventDefault(), u.stopPropagation()));
				}
				return c.postDispatch && c.postDispatch.call(this, u), u.result;
			}
		},
		handlers: function (e, t) {
			var n,
				r,
				i,
				o,
				a,
				s = [],
				u = t.delegateCount,
				l = e.target;
			if (u && l.nodeType && !('click' === e.type && 1 <= e.button))
				for (; l !== this; l = l.parentNode || this)
					if (1 === l.nodeType && ('click' !== e.type || !0 !== l.disabled)) {
						for (o = [], a = {}, n = 0; n < u; n++)
							void 0 === a[(i = (r = t[n]).selector + ' ')] &&
								(a[i] = r.needsContext
									? -1 < S(i, this).index(l)
									: S.find(i, this, null, [l]).length),
								a[i] && o.push(r);
						o.length && s.push({ elem: l, handlers: o });
					}
			return (
				(l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s
			);
		},
		addProp: function (t, e) {
			Object.defineProperty(S.Event.prototype, t, {
				enumerable: !0,
				configurable: !0,
				get: m(e)
					? function () {
							if (this.originalEvent) return e(this.originalEvent);
					  }
					: function () {
							if (this.originalEvent) return this.originalEvent[t];
					  },
				set: function (e) {
					Object.defineProperty(this, t, {
						enumerable: !0,
						configurable: !0,
						writable: !0,
						value: e,
					});
				},
			});
		},
		fix: function (e) {
			return e[S.expando] ? e : new S.Event(e);
		},
		special: {
			load: { noBubble: !0 },
			click: {
				setup: function (e) {
					var t = this || e;
					return (
						pe.test(t.type) && t.click && A(t, 'input') && Se(t, 'click', we),
						!1
					);
				},
				trigger: function (e) {
					var t = this || e;
					return (
						pe.test(t.type) && t.click && A(t, 'input') && Se(t, 'click'), !0
					);
				},
				_default: function (e) {
					var t = e.target;
					return (
						(pe.test(t.type) &&
							t.click &&
							A(t, 'input') &&
							Y.get(t, 'click')) ||
						A(t, 'a')
					);
				},
			},
			beforeunload: {
				postDispatch: function (e) {
					void 0 !== e.result &&
						e.originalEvent &&
						(e.originalEvent.returnValue = e.result);
				},
			},
		},
	}),
		(S.removeEvent = function (e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n);
		}),
		(S.Event = function (e, t) {
			if (!(this instanceof S.Event)) return new S.Event(e, t);
			e && e.type
				? ((this.originalEvent = e),
				  (this.type = e.type),
				  (this.isDefaultPrevented =
						e.defaultPrevented ||
						(void 0 === e.defaultPrevented && !1 === e.returnValue)
							? we
							: Te),
				  (this.target =
						e.target && 3 === e.target.nodeType
							? e.target.parentNode
							: e.target),
				  (this.currentTarget = e.currentTarget),
				  (this.relatedTarget = e.relatedTarget))
				: (this.type = e),
				t && S.extend(this, t),
				(this.timeStamp = (e && e.timeStamp) || Date.now()),
				(this[S.expando] = !0);
		}),
		(S.Event.prototype = {
			constructor: S.Event,
			isDefaultPrevented: Te,
			isPropagationStopped: Te,
			isImmediatePropagationStopped: Te,
			isSimulated: !1,
			preventDefault: function () {
				var e = this.originalEvent;
				(this.isDefaultPrevented = we),
					e && !this.isSimulated && e.preventDefault();
			},
			stopPropagation: function () {
				var e = this.originalEvent;
				(this.isPropagationStopped = we),
					e && !this.isSimulated && e.stopPropagation();
			},
			stopImmediatePropagation: function () {
				var e = this.originalEvent;
				(this.isImmediatePropagationStopped = we),
					e && !this.isSimulated && e.stopImmediatePropagation(),
					this.stopPropagation();
			},
		}),
		S.each(
			{
				altKey: !0,
				bubbles: !0,
				cancelable: !0,
				changedTouches: !0,
				ctrlKey: !0,
				detail: !0,
				eventPhase: !0,
				metaKey: !0,
				pageX: !0,
				pageY: !0,
				shiftKey: !0,
				view: !0,
				char: !0,
				code: !0,
				charCode: !0,
				key: !0,
				keyCode: !0,
				button: !0,
				buttons: !0,
				clientX: !0,
				clientY: !0,
				offsetX: !0,
				offsetY: !0,
				pointerId: !0,
				pointerType: !0,
				screenX: !0,
				screenY: !0,
				targetTouches: !0,
				toElement: !0,
				touches: !0,
				which: !0,
			},
			S.event.addProp
		),
		S.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
			S.event.special[e] = {
				setup: function () {
					return Se(this, e, Ce), !1;
				},
				trigger: function () {
					return Se(this, e), !0;
				},
				_default: function () {
					return !0;
				},
				delegateType: t,
			};
		}),
		S.each(
			{
				mouseenter: 'mouseover',
				mouseleave: 'mouseout',
				pointerenter: 'pointerover',
				pointerleave: 'pointerout',
			},
			function (e, i) {
				S.event.special[e] = {
					delegateType: i,
					bindType: i,
					handle: function (e) {
						var t,
							n = e.relatedTarget,
							r = e.handleObj;
						return (
							(n && (n === this || S.contains(this, n))) ||
								((e.type = r.origType),
								(t = r.handler.apply(this, arguments)),
								(e.type = i)),
							t
						);
					},
				};
			}
		),
		S.fn.extend({
			on: function (e, t, n, r) {
				return Ee(this, e, t, n, r);
			},
			one: function (e, t, n, r) {
				return Ee(this, e, t, n, r, 1);
			},
			off: function (e, t, n) {
				var r, i;
				if (e && e.preventDefault && e.handleObj)
					return (
						(r = e.handleObj),
						S(e.delegateTarget).off(
							r.namespace ? r.origType + '.' + r.namespace : r.origType,
							r.selector,
							r.handler
						),
						this
					);
				if ('object' == typeof e) {
					for (i in e) this.off(i, t, e[i]);
					return this;
				}
				return (
					(!1 !== t && 'function' != typeof t) || ((n = t), (t = void 0)),
					!1 === n && (n = Te),
					this.each(function () {
						S.event.remove(this, e, n, t);
					})
				);
			},
		});
	var ke = /<script|<style|<link/i,
		Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	function je(e, t) {
		return (
			(A(e, 'table') &&
				A(11 !== t.nodeType ? t : t.firstChild, 'tr') &&
				S(e).children('tbody')[0]) ||
			e
		);
	}
	function De(e) {
		return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
	}
	function qe(e) {
		return (
			'true/' === (e.type || '').slice(0, 5)
				? (e.type = e.type.slice(5))
				: e.removeAttribute('type'),
			e
		);
	}
	function Le(e, t) {
		var n, r, i, o, a, s;
		if (1 === t.nodeType) {
			if (Y.hasData(e) && (s = Y.get(e).events))
				for (i in (Y.remove(t, 'handle events'), s))
					for (n = 0, r = s[i].length; n < r; n++) S.event.add(t, i, s[i][n]);
			Q.hasData(e) && ((o = Q.access(e)), (a = S.extend({}, o)), Q.set(t, a));
		}
	}
	function He(n, r, i, o) {
		r = g(r);
		var e,
			t,
			a,
			s,
			u,
			l,
			c = 0,
			f = n.length,
			p = f - 1,
			d = r[0],
			h = m(d);
		if (h || (1 < f && 'string' == typeof d && !y.checkClone && Ae.test(d)))
			return n.each(function (e) {
				var t = n.eq(e);
				h && (r[0] = d.call(this, e, t.html())), He(t, r, i, o);
			});
		if (
			f &&
			((t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild),
			1 === e.childNodes.length && (e = t),
			t || o)
		) {
			for (s = (a = S.map(ve(e, 'script'), De)).length; c < f; c++)
				(u = e),
					c !== p &&
						((u = S.clone(u, !0, !0)), s && S.merge(a, ve(u, 'script'))),
					i.call(n[c], u, c);
			if (s)
				for (l = a[a.length - 1].ownerDocument, S.map(a, qe), c = 0; c < s; c++)
					(u = a[c]),
						he.test(u.type || '') &&
							!Y.access(u, 'globalEval') &&
							S.contains(l, u) &&
							(u.src && 'module' !== (u.type || '').toLowerCase()
								? S._evalUrl &&
								  !u.noModule &&
								  S._evalUrl(
										u.src,
										{ nonce: u.nonce || u.getAttribute('nonce') },
										l
								  )
								: b(u.textContent.replace(Ne, ''), u, l));
		}
		return n;
	}
	function Oe(e, t, n) {
		for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
			n || 1 !== r.nodeType || S.cleanData(ve(r)),
				r.parentNode &&
					(n && ie(r) && ye(ve(r, 'script')), r.parentNode.removeChild(r));
		return e;
	}
	S.extend({
		htmlPrefilter: function (e) {
			return e;
		},
		clone: function (e, t, n) {
			var r,
				i,
				o,
				a,
				s,
				u,
				l,
				c = e.cloneNode(!0),
				f = ie(e);
			if (
				!(
					y.noCloneChecked ||
					(1 !== e.nodeType && 11 !== e.nodeType) ||
					S.isXMLDoc(e)
				)
			)
				for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++)
					(s = o[r]),
						(u = a[r]),
						void 0,
						'input' === (l = u.nodeName.toLowerCase()) && pe.test(s.type)
							? (u.checked = s.checked)
							: ('input' !== l && 'textarea' !== l) ||
							  (u.defaultValue = s.defaultValue);
			if (t)
				if (n)
					for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++)
						Le(o[r], a[r]);
				else Le(e, c);
			return (
				0 < (a = ve(c, 'script')).length && ye(a, !f && ve(e, 'script')), c
			);
		},
		cleanData: function (e) {
			for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
				if (V(n)) {
					if ((t = n[Y.expando])) {
						if (t.events)
							for (r in t.events)
								i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
						n[Y.expando] = void 0;
					}
					n[Q.expando] && (n[Q.expando] = void 0);
				}
		},
	}),
		S.fn.extend({
			detach: function (e) {
				return Oe(this, e, !0);
			},
			remove: function (e) {
				return Oe(this, e);
			},
			text: function (e) {
				return $(
					this,
					function (e) {
						return void 0 === e
							? S.text(this)
							: this.empty().each(function () {
									(1 !== this.nodeType &&
										11 !== this.nodeType &&
										9 !== this.nodeType) ||
										(this.textContent = e);
							  });
					},
					null,
					e,
					arguments.length
				);
			},
			append: function () {
				return He(this, arguments, function (e) {
					(1 !== this.nodeType &&
						11 !== this.nodeType &&
						9 !== this.nodeType) ||
						je(this, e).appendChild(e);
				});
			},
			prepend: function () {
				return He(this, arguments, function (e) {
					if (
						1 === this.nodeType ||
						11 === this.nodeType ||
						9 === this.nodeType
					) {
						var t = je(this, e);
						t.insertBefore(e, t.firstChild);
					}
				});
			},
			before: function () {
				return He(this, arguments, function (e) {
					this.parentNode && this.parentNode.insertBefore(e, this);
				});
			},
			after: function () {
				return He(this, arguments, function (e) {
					this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
				});
			},
			empty: function () {
				for (var e, t = 0; null != (e = this[t]); t++)
					1 === e.nodeType && (S.cleanData(ve(e, !1)), (e.textContent = ''));
				return this;
			},
			clone: function (e, t) {
				return (
					(e = null != e && e),
					(t = null == t ? e : t),
					this.map(function () {
						return S.clone(this, e, t);
					})
				);
			},
			html: function (e) {
				return $(
					this,
					function (e) {
						var t = this[0] || {},
							n = 0,
							r = this.length;
						if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
						if (
							'string' == typeof e &&
							!ke.test(e) &&
							!ge[(de.exec(e) || ['', ''])[1].toLowerCase()]
						) {
							e = S.htmlPrefilter(e);
							try {
								for (; n < r; n++)
									1 === (t = this[n] || {}).nodeType &&
										(S.cleanData(ve(t, !1)), (t.innerHTML = e));
								t = 0;
							} catch (e) {}
						}
						t && this.empty().append(e);
					},
					null,
					e,
					arguments.length
				);
			},
			replaceWith: function () {
				var n = [];
				return He(
					this,
					arguments,
					function (e) {
						var t = this.parentNode;
						S.inArray(this, n) < 0 &&
							(S.cleanData(ve(this)), t && t.replaceChild(e, this));
					},
					n
				);
			},
		}),
		S.each(
			{
				appendTo: 'append',
				prependTo: 'prepend',
				insertBefore: 'before',
				insertAfter: 'after',
				replaceAll: 'replaceWith',
			},
			function (e, a) {
				S.fn[e] = function (e) {
					for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++)
						(t = o === i ? this : this.clone(!0)),
							S(r[o])[a](t),
							u.apply(n, t.get());
					return this.pushStack(n);
				};
			}
		);
	var Pe = new RegExp('^(' + ee + ')(?!px)[a-z%]+$', 'i'),
		Re = function (e) {
			var t = e.ownerDocument.defaultView;
			return (t && t.opener) || (t = C), t.getComputedStyle(e);
		},
		Me = function (e, t, n) {
			var r,
				i,
				o = {};
			for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
			for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
			return r;
		},
		Ie = new RegExp(ne.join('|'), 'i');
	function We(e, t, n) {
		var r,
			i,
			o,
			a,
			s = e.style;
		return (
			(n = n || Re(e)) &&
				('' !== (a = n.getPropertyValue(t) || n[t]) ||
					ie(e) ||
					(a = S.style(e, t)),
				!y.pixelBoxStyles() &&
					Pe.test(a) &&
					Ie.test(t) &&
					((r = s.width),
					(i = s.minWidth),
					(o = s.maxWidth),
					(s.minWidth = s.maxWidth = s.width = a),
					(a = n.width),
					(s.width = r),
					(s.minWidth = i),
					(s.maxWidth = o))),
			void 0 !== a ? a + '' : a
		);
	}
	function Fe(e, t) {
		return {
			get: function () {
				if (!e()) return (this.get = t).apply(this, arguments);
				delete this.get;
			},
		};
	}
	!(function () {
		function e() {
			if (l) {
				(u.style.cssText =
					'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
					(l.style.cssText =
						'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
					re.appendChild(u).appendChild(l);
				var e = C.getComputedStyle(l);
				(n = '1%' !== e.top),
					(s = 12 === t(e.marginLeft)),
					(l.style.right = '60%'),
					(o = 36 === t(e.right)),
					(r = 36 === t(e.width)),
					(l.style.position = 'absolute'),
					(i = 12 === t(l.offsetWidth / 3)),
					re.removeChild(u),
					(l = null);
			}
		}
		function t(e) {
			return Math.round(parseFloat(e));
		}
		var n,
			r,
			i,
			o,
			a,
			s,
			u = E.createElement('div'),
			l = E.createElement('div');
		l.style &&
			((l.style.backgroundClip = 'content-box'),
			(l.cloneNode(!0).style.backgroundClip = ''),
			(y.clearCloneStyle = 'content-box' === l.style.backgroundClip),
			S.extend(y, {
				boxSizingReliable: function () {
					return e(), r;
				},
				pixelBoxStyles: function () {
					return e(), o;
				},
				pixelPosition: function () {
					return e(), n;
				},
				reliableMarginLeft: function () {
					return e(), s;
				},
				scrollboxSize: function () {
					return e(), i;
				},
				reliableTrDimensions: function () {
					var e, t, n, r;
					return (
						null == a &&
							((e = E.createElement('table')),
							(t = E.createElement('tr')),
							(n = E.createElement('div')),
							(e.style.cssText =
								'position:absolute;left:-11111px;border-collapse:separate'),
							(t.style.cssText = 'border:1px solid'),
							(t.style.height = '1px'),
							(n.style.height = '9px'),
							(n.style.display = 'block'),
							re.appendChild(e).appendChild(t).appendChild(n),
							(r = C.getComputedStyle(t)),
							(a =
								parseInt(r.height, 10) +
									parseInt(r.borderTopWidth, 10) +
									parseInt(r.borderBottomWidth, 10) ===
								t.offsetHeight),
							re.removeChild(e)),
						a
					);
				},
			}));
	})();
	var Be = ['Webkit', 'Moz', 'ms'],
		$e = E.createElement('div').style,
		_e = {};
	function ze(e) {
		var t = S.cssProps[e] || _e[e];
		return (
			t ||
			(e in $e
				? e
				: (_e[e] =
						(function (e) {
							var t = e[0].toUpperCase() + e.slice(1),
								n = Be.length;
							while (n--) if ((e = Be[n] + t) in $e) return e;
						})(e) || e))
		);
	}
	var Ue = /^(none|table(?!-c[ea]).+)/,
		Xe = /^--/,
		Ve = { position: 'absolute', visibility: 'hidden', display: 'block' },
		Ge = { letterSpacing: '0', fontWeight: '400' };
	function Ye(e, t, n) {
		var r = te.exec(t);
		return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
	}
	function Qe(e, t, n, r, i, o) {
		var a = 'width' === t ? 1 : 0,
			s = 0,
			u = 0;
		if (n === (r ? 'border' : 'content')) return 0;
		for (; a < 4; a += 2)
			'margin' === n && (u += S.css(e, n + ne[a], !0, i)),
				r
					? ('content' === n && (u -= S.css(e, 'padding' + ne[a], !0, i)),
					  'margin' !== n &&
							(u -= S.css(e, 'border' + ne[a] + 'Width', !0, i)))
					: ((u += S.css(e, 'padding' + ne[a], !0, i)),
					  'padding' !== n
							? (u += S.css(e, 'border' + ne[a] + 'Width', !0, i))
							: (s += S.css(e, 'border' + ne[a] + 'Width', !0, i)));
		return (
			!r &&
				0 <= o &&
				(u +=
					Math.max(
						0,
						Math.ceil(
							e['offset' + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5
						)
					) || 0),
			u
		);
	}
	function Je(e, t, n) {
		var r = Re(e),
			i =
				(!y.boxSizingReliable() || n) &&
				'border-box' === S.css(e, 'boxSizing', !1, r),
			o = i,
			a = We(e, t, r),
			s = 'offset' + t[0].toUpperCase() + t.slice(1);
		if (Pe.test(a)) {
			if (!n) return a;
			a = 'auto';
		}
		return (
			((!y.boxSizingReliable() && i) ||
				(!y.reliableTrDimensions() && A(e, 'tr')) ||
				'auto' === a ||
				(!parseFloat(a) && 'inline' === S.css(e, 'display', !1, r))) &&
				e.getClientRects().length &&
				((i = 'border-box' === S.css(e, 'boxSizing', !1, r)),
				(o = s in e) && (a = e[s])),
			(a = parseFloat(a) || 0) +
				Qe(e, t, n || (i ? 'border' : 'content'), o, r, a) +
				'px'
		);
	}
	function Ke(e, t, n, r, i) {
		return new Ke.prototype.init(e, t, n, r, i);
	}
	S.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = We(e, 'opacity');
						return '' === n ? '1' : n;
					}
				},
			},
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			gridArea: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnStart: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowStart: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0,
		},
		cssProps: {},
		style: function (e, t, n, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var i,
					o,
					a,
					s = X(t),
					u = Xe.test(t),
					l = e.style;
				if (
					(u || (t = ze(s)), (a = S.cssHooks[t] || S.cssHooks[s]), void 0 === n)
				)
					return a && 'get' in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
				'string' === (o = typeof n) &&
					(i = te.exec(n)) &&
					i[1] &&
					((n = se(e, t, i)), (o = 'number')),
					null != n &&
						n == n &&
						('number' !== o ||
							u ||
							(n += (i && i[3]) || (S.cssNumber[s] ? '' : 'px')),
						y.clearCloneStyle ||
							'' !== n ||
							0 !== t.indexOf('background') ||
							(l[t] = 'inherit'),
						(a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
							(u ? l.setProperty(t, n) : (l[t] = n)));
			}
		},
		css: function (e, t, n, r) {
			var i,
				o,
				a,
				s = X(t);
			return (
				Xe.test(t) || (t = ze(s)),
				(a = S.cssHooks[t] || S.cssHooks[s]) &&
					'get' in a &&
					(i = a.get(e, !0, n)),
				void 0 === i && (i = We(e, t, r)),
				'normal' === i && t in Ge && (i = Ge[t]),
				'' === n || n
					? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
					: i
			);
		},
	}),
		S.each(['height', 'width'], function (e, u) {
			S.cssHooks[u] = {
				get: function (e, t, n) {
					if (t)
						return !Ue.test(S.css(e, 'display')) ||
							(e.getClientRects().length && e.getBoundingClientRect().width)
							? Je(e, u, n)
							: Me(e, Ve, function () {
									return Je(e, u, n);
							  });
				},
				set: function (e, t, n) {
					var r,
						i = Re(e),
						o = !y.scrollboxSize() && 'absolute' === i.position,
						a = (o || n) && 'border-box' === S.css(e, 'boxSizing', !1, i),
						s = n ? Qe(e, u, n, a, i) : 0;
					return (
						a &&
							o &&
							(s -= Math.ceil(
								e['offset' + u[0].toUpperCase() + u.slice(1)] -
									parseFloat(i[u]) -
									Qe(e, u, 'border', !1, i) -
									0.5
							)),
						s &&
							(r = te.exec(t)) &&
							'px' !== (r[3] || 'px') &&
							((e.style[u] = t), (t = S.css(e, u))),
						Ye(0, t, s)
					);
				},
			};
		}),
		(S.cssHooks.marginLeft = Fe(y.reliableMarginLeft, function (e, t) {
			if (t)
				return (
					(parseFloat(We(e, 'marginLeft')) ||
						e.getBoundingClientRect().left -
							Me(e, { marginLeft: 0 }, function () {
								return e.getBoundingClientRect().left;
							})) + 'px'
				);
		})),
		S.each({ margin: '', padding: '', border: 'Width' }, function (i, o) {
			(S.cssHooks[i + o] = {
				expand: function (e) {
					for (
						var t = 0, n = {}, r = 'string' == typeof e ? e.split(' ') : [e];
						t < 4;
						t++
					)
						n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
					return n;
				},
			}),
				'margin' !== i && (S.cssHooks[i + o].set = Ye);
		}),
		S.fn.extend({
			css: function (e, t) {
				return $(
					this,
					function (e, t, n) {
						var r,
							i,
							o = {},
							a = 0;
						if (Array.isArray(t)) {
							for (r = Re(e), i = t.length; a < i; a++)
								o[t[a]] = S.css(e, t[a], !1, r);
							return o;
						}
						return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
					},
					e,
					t,
					1 < arguments.length
				);
			},
		}),
		(((S.Tween = Ke).prototype = {
			constructor: Ke,
			init: function (e, t, n, r, i, o) {
				(this.elem = e),
					(this.prop = n),
					(this.easing = i || S.easing._default),
					(this.options = t),
					(this.start = this.now = this.cur()),
					(this.end = r),
					(this.unit = o || (S.cssNumber[n] ? '' : 'px'));
			},
			cur: function () {
				var e = Ke.propHooks[this.prop];
				return e && e.get ? e.get(this) : Ke.propHooks._default.get(this);
			},
			run: function (e) {
				var t,
					n = Ke.propHooks[this.prop];
				return (
					this.options.duration
						? (this.pos = t =
								S.easing[this.easing](
									e,
									this.options.duration * e,
									0,
									1,
									this.options.duration
								))
						: (this.pos = t = e),
					(this.now = (this.end - this.start) * t + this.start),
					this.options.step &&
						this.options.step.call(this.elem, this.now, this),
					n && n.set ? n.set(this) : Ke.propHooks._default.set(this),
					this
				);
			},
		}).init.prototype = Ke.prototype),
		((Ke.propHooks = {
			_default: {
				get: function (e) {
					var t;
					return 1 !== e.elem.nodeType ||
						(null != e.elem[e.prop] && null == e.elem.style[e.prop])
						? e.elem[e.prop]
						: (t = S.css(e.elem, e.prop, '')) && 'auto' !== t
						? t
						: 0;
				},
				set: function (e) {
					S.fx.step[e.prop]
						? S.fx.step[e.prop](e)
						: 1 !== e.elem.nodeType ||
						  (!S.cssHooks[e.prop] && null == e.elem.style[ze(e.prop)])
						? (e.elem[e.prop] = e.now)
						: S.style(e.elem, e.prop, e.now + e.unit);
				},
			},
		}).scrollTop = Ke.propHooks.scrollLeft =
			{
				set: function (e) {
					e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
				},
			}),
		(S.easing = {
			linear: function (e) {
				return e;
			},
			swing: function (e) {
				return 0.5 - Math.cos(e * Math.PI) / 2;
			},
			_default: 'swing',
		}),
		(S.fx = Ke.prototype.init),
		(S.fx.step = {});
	var Ze,
		et,
		tt,
		nt,
		rt = /^(?:toggle|show|hide)$/,
		it = /queueHooks$/;
	function ot() {
		et &&
			(!1 === E.hidden && C.requestAnimationFrame
				? C.requestAnimationFrame(ot)
				: C.setTimeout(ot, S.fx.interval),
			S.fx.tick());
	}
	function at() {
		return (
			C.setTimeout(function () {
				Ze = void 0;
			}),
			(Ze = Date.now())
		);
	}
	function st(e, t) {
		var n,
			r = 0,
			i = { height: e };
		for (t = t ? 1 : 0; r < 4; r += 2 - t)
			i['margin' + (n = ne[r])] = i['padding' + n] = e;
		return t && (i.opacity = i.width = e), i;
	}
	function ut(e, t, n) {
		for (
			var r,
				i = (lt.tweeners[t] || []).concat(lt.tweeners['*']),
				o = 0,
				a = i.length;
			o < a;
			o++
		)
			if ((r = i[o].call(n, t, e))) return r;
	}
	function lt(o, e, t) {
		var n,
			a,
			r = 0,
			i = lt.prefilters.length,
			s = S.Deferred().always(function () {
				delete u.elem;
			}),
			u = function () {
				if (a) return !1;
				for (
					var e = Ze || at(),
						t = Math.max(0, l.startTime + l.duration - e),
						n = 1 - (t / l.duration || 0),
						r = 0,
						i = l.tweens.length;
					r < i;
					r++
				)
					l.tweens[r].run(n);
				return (
					s.notifyWith(o, [l, n, t]),
					n < 1 && i
						? t
						: (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
				);
			},
			l = s.promise({
				elem: o,
				props: S.extend({}, e),
				opts: S.extend(!0, { specialEasing: {}, easing: S.easing._default }, t),
				originalProperties: e,
				originalOptions: t,
				startTime: Ze || at(),
				duration: t.duration,
				tweens: [],
				createTween: function (e, t) {
					var n = S.Tween(
						o,
						l.opts,
						e,
						t,
						l.opts.specialEasing[e] || l.opts.easing
					);
					return l.tweens.push(n), n;
				},
				stop: function (e) {
					var t = 0,
						n = e ? l.tweens.length : 0;
					if (a) return this;
					for (a = !0; t < n; t++) l.tweens[t].run(1);
					return (
						e
							? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e]))
							: s.rejectWith(o, [l, e]),
						this
					);
				},
			}),
			c = l.props;
		for (
			!(function (e, t) {
				var n, r, i, o, a;
				for (n in e)
					if (
						((i = t[(r = X(n))]),
						(o = e[n]),
						Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
						n !== r && ((e[r] = o), delete e[n]),
						(a = S.cssHooks[r]) && ('expand' in a))
					)
						for (n in ((o = a.expand(o)), delete e[r], o))
							(n in e) || ((e[n] = o[n]), (t[n] = i));
					else t[r] = i;
			})(c, l.opts.specialEasing);
			r < i;
			r++
		)
			if ((n = lt.prefilters[r].call(l, o, c, l.opts)))
				return (
					m(n.stop) &&
						(S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
					n
				);
		return (
			S.map(c, ut, l),
			m(l.opts.start) && l.opts.start.call(o, l),
			l
				.progress(l.opts.progress)
				.done(l.opts.done, l.opts.complete)
				.fail(l.opts.fail)
				.always(l.opts.always),
			S.fx.timer(S.extend(u, { elem: o, anim: l, queue: l.opts.queue })),
			l
		);
	}
	(S.Animation = S.extend(lt, {
		tweeners: {
			'*': [
				function (e, t) {
					var n = this.createTween(e, t);
					return se(n.elem, e, te.exec(t), n), n;
				},
			],
		},
		tweener: function (e, t) {
			m(e) ? ((t = e), (e = ['*'])) : (e = e.match(P));
			for (var n, r = 0, i = e.length; r < i; r++)
				(n = e[r]),
					(lt.tweeners[n] = lt.tweeners[n] || []),
					lt.tweeners[n].unshift(t);
		},
		prefilters: [
			function (e, t, n) {
				var r,
					i,
					o,
					a,
					s,
					u,
					l,
					c,
					f = 'width' in t || 'height' in t,
					p = this,
					d = {},
					h = e.style,
					g = e.nodeType && ae(e),
					v = Y.get(e, 'fxshow');
				for (r in (n.queue ||
					(null == (a = S._queueHooks(e, 'fx')).unqueued &&
						((a.unqueued = 0),
						(s = a.empty.fire),
						(a.empty.fire = function () {
							a.unqueued || s();
						})),
					a.unqueued++,
					p.always(function () {
						p.always(function () {
							a.unqueued--, S.queue(e, 'fx').length || a.empty.fire();
						});
					})),
				t))
					if (((i = t[r]), rt.test(i))) {
						if (
							(delete t[r],
							(o = o || 'toggle' === i),
							i === (g ? 'hide' : 'show'))
						) {
							if ('show' !== i || !v || void 0 === v[r]) continue;
							g = !0;
						}
						d[r] = (v && v[r]) || S.style(e, r);
					}
				if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
					for (r in (f &&
						1 === e.nodeType &&
						((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
						null == (l = v && v.display) && (l = Y.get(e, 'display')),
						'none' === (c = S.css(e, 'display')) &&
							(l
								? (c = l)
								: (le([e], !0),
								  (l = e.style.display || l),
								  (c = S.css(e, 'display')),
								  le([e]))),
						('inline' === c || ('inline-block' === c && null != l)) &&
							'none' === S.css(e, 'float') &&
							(u ||
								(p.done(function () {
									h.display = l;
								}),
								null == l && ((c = h.display), (l = 'none' === c ? '' : c))),
							(h.display = 'inline-block'))),
					n.overflow &&
						((h.overflow = 'hidden'),
						p.always(function () {
							(h.overflow = n.overflow[0]),
								(h.overflowX = n.overflow[1]),
								(h.overflowY = n.overflow[2]);
						})),
					(u = !1),
					d))
						u ||
							(v
								? 'hidden' in v && (g = v.hidden)
								: (v = Y.access(e, 'fxshow', { display: l })),
							o && (v.hidden = !g),
							g && le([e], !0),
							p.done(function () {
								for (r in (g || le([e]), Y.remove(e, 'fxshow'), d))
									S.style(e, r, d[r]);
							})),
							(u = ut(g ? v[r] : 0, r, p)),
							r in v ||
								((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
			},
		],
		prefilter: function (e, t) {
			t ? lt.prefilters.unshift(e) : lt.prefilters.push(e);
		},
	})),
		(S.speed = function (e, t, n) {
			var r =
				e && 'object' == typeof e
					? S.extend({}, e)
					: {
							complete: n || (!n && t) || (m(e) && e),
							duration: e,
							easing: (n && t) || (t && !m(t) && t),
					  };
			return (
				S.fx.off
					? (r.duration = 0)
					: 'number' != typeof r.duration &&
					  (r.duration in S.fx.speeds
							? (r.duration = S.fx.speeds[r.duration])
							: (r.duration = S.fx.speeds._default)),
				(null != r.queue && !0 !== r.queue) || (r.queue = 'fx'),
				(r.old = r.complete),
				(r.complete = function () {
					m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
				}),
				r
			);
		}),
		S.fn.extend({
			fadeTo: function (e, t, n, r) {
				return this.filter(ae)
					.css('opacity', 0)
					.show()
					.end()
					.animate({ opacity: t }, e, n, r);
			},
			animate: function (t, e, n, r) {
				var i = S.isEmptyObject(t),
					o = S.speed(e, n, r),
					a = function () {
						var e = lt(this, S.extend({}, t), o);
						(i || Y.get(this, 'finish')) && e.stop(!0);
					};
				return (
					(a.finish = a),
					i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
				);
			},
			stop: function (i, e, o) {
				var a = function (e) {
					var t = e.stop;
					delete e.stop, t(o);
				};
				return (
					'string' != typeof i && ((o = e), (e = i), (i = void 0)),
					e && this.queue(i || 'fx', []),
					this.each(function () {
						var e = !0,
							t = null != i && i + 'queueHooks',
							n = S.timers,
							r = Y.get(this);
						if (t) r[t] && r[t].stop && a(r[t]);
						else for (t in r) r[t] && r[t].stop && it.test(t) && a(r[t]);
						for (t = n.length; t--; )
							n[t].elem !== this ||
								(null != i && n[t].queue !== i) ||
								(n[t].anim.stop(o), (e = !1), n.splice(t, 1));
						(!e && o) || S.dequeue(this, i);
					})
				);
			},
			finish: function (a) {
				return (
					!1 !== a && (a = a || 'fx'),
					this.each(function () {
						var e,
							t = Y.get(this),
							n = t[a + 'queue'],
							r = t[a + 'queueHooks'],
							i = S.timers,
							o = n ? n.length : 0;
						for (
							t.finish = !0,
								S.queue(this, a, []),
								r && r.stop && r.stop.call(this, !0),
								e = i.length;
							e--;

						)
							i[e].elem === this &&
								i[e].queue === a &&
								(i[e].anim.stop(!0), i.splice(e, 1));
						for (e = 0; e < o; e++)
							n[e] && n[e].finish && n[e].finish.call(this);
						delete t.finish;
					})
				);
			},
		}),
		S.each(['toggle', 'show', 'hide'], function (e, r) {
			var i = S.fn[r];
			S.fn[r] = function (e, t, n) {
				return null == e || 'boolean' == typeof e
					? i.apply(this, arguments)
					: this.animate(st(r, !0), e, t, n);
			};
		}),
		S.each(
			{
				slideDown: st('show'),
				slideUp: st('hide'),
				slideToggle: st('toggle'),
				fadeIn: { opacity: 'show' },
				fadeOut: { opacity: 'hide' },
				fadeToggle: { opacity: 'toggle' },
			},
			function (e, r) {
				S.fn[e] = function (e, t, n) {
					return this.animate(r, e, t, n);
				};
			}
		),
		(S.timers = []),
		(S.fx.tick = function () {
			var e,
				t = 0,
				n = S.timers;
			for (Ze = Date.now(); t < n.length; t++)
				(e = n[t])() || n[t] !== e || n.splice(t--, 1);
			n.length || S.fx.stop(), (Ze = void 0);
		}),
		(S.fx.timer = function (e) {
			S.timers.push(e), S.fx.start();
		}),
		(S.fx.interval = 13),
		(S.fx.start = function () {
			et || ((et = !0), ot());
		}),
		(S.fx.stop = function () {
			et = null;
		}),
		(S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
		(S.fn.delay = function (r, e) {
			return (
				(r = (S.fx && S.fx.speeds[r]) || r),
				(e = e || 'fx'),
				this.queue(e, function (e, t) {
					var n = C.setTimeout(e, r);
					t.stop = function () {
						C.clearTimeout(n);
					};
				})
			);
		}),
		(tt = E.createElement('input')),
		(nt = E.createElement('select').appendChild(E.createElement('option'))),
		(tt.type = 'checkbox'),
		(y.checkOn = '' !== tt.value),
		(y.optSelected = nt.selected),
		((tt = E.createElement('input')).value = 't'),
		(tt.type = 'radio'),
		(y.radioValue = 't' === tt.value);
	var ct,
		ft = S.expr.attrHandle;
	S.fn.extend({
		attr: function (e, t) {
			return $(this, S.attr, e, t, 1 < arguments.length);
		},
		removeAttr: function (e) {
			return this.each(function () {
				S.removeAttr(this, e);
			});
		},
	}),
		S.extend({
			attr: function (e, t, n) {
				var r,
					i,
					o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return 'undefined' == typeof e.getAttribute
						? S.prop(e, t, n)
						: ((1 === o && S.isXMLDoc(e)) ||
								(i =
									S.attrHooks[t.toLowerCase()] ||
									(S.expr.match.bool.test(t) ? ct : void 0)),
						  void 0 !== n
								? null === n
									? void S.removeAttr(e, t)
									: i && 'set' in i && void 0 !== (r = i.set(e, n, t))
									? r
									: (e.setAttribute(t, n + ''), n)
								: i && 'get' in i && null !== (r = i.get(e, t))
								? r
								: null == (r = S.find.attr(e, t))
								? void 0
								: r);
			},
			attrHooks: {
				type: {
					set: function (e, t) {
						if (!y.radioValue && 'radio' === t && A(e, 'input')) {
							var n = e.value;
							return e.setAttribute('type', t), n && (e.value = n), t;
						}
					},
				},
			},
			removeAttr: function (e, t) {
				var n,
					r = 0,
					i = t && t.match(P);
				if (i && 1 === e.nodeType) while ((n = i[r++])) e.removeAttribute(n);
			},
		}),
		(ct = {
			set: function (e, t, n) {
				return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
			},
		}),
		S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
			var a = ft[t] || S.find.attr;
			ft[t] = function (e, t, n) {
				var r,
					i,
					o = t.toLowerCase();
				return (
					n ||
						((i = ft[o]),
						(ft[o] = r),
						(r = null != a(e, t, n) ? o : null),
						(ft[o] = i)),
					r
				);
			};
		});
	var pt = /^(?:input|select|textarea|button)$/i,
		dt = /^(?:a|area)$/i;
	function ht(e) {
		return (e.match(P) || []).join(' ');
	}
	function gt(e) {
		return (e.getAttribute && e.getAttribute('class')) || '';
	}
	function vt(e) {
		return Array.isArray(e) ? e : ('string' == typeof e && e.match(P)) || [];
	}
	S.fn.extend({
		prop: function (e, t) {
			return $(this, S.prop, e, t, 1 < arguments.length);
		},
		removeProp: function (e) {
			return this.each(function () {
				delete this[S.propFix[e] || e];
			});
		},
	}),
		S.extend({
			prop: function (e, t, n) {
				var r,
					i,
					o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return (
						(1 === o && S.isXMLDoc(e)) ||
							((t = S.propFix[t] || t), (i = S.propHooks[t])),
						void 0 !== n
							? i && 'set' in i && void 0 !== (r = i.set(e, n, t))
								? r
								: (e[t] = n)
							: i && 'get' in i && null !== (r = i.get(e, t))
							? r
							: e[t]
					);
			},
			propHooks: {
				tabIndex: {
					get: function (e) {
						var t = S.find.attr(e, 'tabindex');
						return t
							? parseInt(t, 10)
							: pt.test(e.nodeName) || (dt.test(e.nodeName) && e.href)
							? 0
							: -1;
					},
				},
			},
			propFix: { for: 'htmlFor', class: 'className' },
		}),
		y.optSelected ||
			(S.propHooks.selected = {
				get: function (e) {
					var t = e.parentNode;
					return t && t.parentNode && t.parentNode.selectedIndex, null;
				},
				set: function (e) {
					var t = e.parentNode;
					t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
				},
			}),
		S.each(
			[
				'tabIndex',
				'readOnly',
				'maxLength',
				'cellSpacing',
				'cellPadding',
				'rowSpan',
				'colSpan',
				'useMap',
				'frameBorder',
				'contentEditable',
			],
			function () {
				S.propFix[this.toLowerCase()] = this;
			}
		),
		S.fn.extend({
			addClass: function (t) {
				var e,
					n,
					r,
					i,
					o,
					a,
					s,
					u = 0;
				if (m(t))
					return this.each(function (e) {
						S(this).addClass(t.call(this, e, gt(this)));
					});
				if ((e = vt(t)).length)
					while ((n = this[u++]))
						if (((i = gt(n)), (r = 1 === n.nodeType && ' ' + ht(i) + ' '))) {
							a = 0;
							while ((o = e[a++]))
								r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
							i !== (s = ht(r)) && n.setAttribute('class', s);
						}
				return this;
			},
			removeClass: function (t) {
				var e,
					n,
					r,
					i,
					o,
					a,
					s,
					u = 0;
				if (m(t))
					return this.each(function (e) {
						S(this).removeClass(t.call(this, e, gt(this)));
					});
				if (!arguments.length) return this.attr('class', '');
				if ((e = vt(t)).length)
					while ((n = this[u++]))
						if (((i = gt(n)), (r = 1 === n.nodeType && ' ' + ht(i) + ' '))) {
							a = 0;
							while ((o = e[a++]))
								while (-1 < r.indexOf(' ' + o + ' '))
									r = r.replace(' ' + o + ' ', ' ');
							i !== (s = ht(r)) && n.setAttribute('class', s);
						}
				return this;
			},
			toggleClass: function (i, t) {
				var o = typeof i,
					a = 'string' === o || Array.isArray(i);
				return 'boolean' == typeof t && a
					? t
						? this.addClass(i)
						: this.removeClass(i)
					: m(i)
					? this.each(function (e) {
							S(this).toggleClass(i.call(this, e, gt(this), t), t);
					  })
					: this.each(function () {
							var e, t, n, r;
							if (a) {
								(t = 0), (n = S(this)), (r = vt(i));
								while ((e = r[t++]))
									n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
							} else (void 0 !== i && 'boolean' !== o) || ((e = gt(this)) && Y.set(this, '__className__', e), this.setAttribute && this.setAttribute('class', e || !1 === i ? '' : Y.get(this, '__className__') || ''));
					  });
			},
			hasClass: function (e) {
				var t,
					n,
					r = 0;
				t = ' ' + e + ' ';
				while ((n = this[r++]))
					if (1 === n.nodeType && -1 < (' ' + ht(gt(n)) + ' ').indexOf(t))
						return !0;
				return !1;
			},
		});
	var yt = /\r/g;
	S.fn.extend({
		val: function (n) {
			var r,
				e,
				i,
				t = this[0];
			return arguments.length
				? ((i = m(n)),
				  this.each(function (e) {
						var t;
						1 === this.nodeType &&
							(null == (t = i ? n.call(this, e, S(this).val()) : n)
								? (t = '')
								: 'number' == typeof t
								? (t += '')
								: Array.isArray(t) &&
								  (t = S.map(t, function (e) {
										return null == e ? '' : e + '';
								  })),
							((r =
								S.valHooks[this.type] ||
								S.valHooks[this.nodeName.toLowerCase()]) &&
								'set' in r &&
								void 0 !== r.set(this, t, 'value')) ||
								(this.value = t));
				  }))
				: t
				? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) &&
				  'get' in r &&
				  void 0 !== (e = r.get(t, 'value'))
					? e
					: 'string' == typeof (e = t.value)
					? e.replace(yt, '')
					: null == e
					? ''
					: e
				: void 0;
		},
	}),
		S.extend({
			valHooks: {
				option: {
					get: function (e) {
						var t = S.find.attr(e, 'value');
						return null != t ? t : ht(S.text(e));
					},
				},
				select: {
					get: function (e) {
						var t,
							n,
							r,
							i = e.options,
							o = e.selectedIndex,
							a = 'select-one' === e.type,
							s = a ? null : [],
							u = a ? o + 1 : i.length;
						for (r = o < 0 ? u : a ? o : 0; r < u; r++)
							if (
								((n = i[r]).selected || r === o) &&
								!n.disabled &&
								(!n.parentNode.disabled || !A(n.parentNode, 'optgroup'))
							) {
								if (((t = S(n).val()), a)) return t;
								s.push(t);
							}
						return s;
					},
					set: function (e, t) {
						var n,
							r,
							i = e.options,
							o = S.makeArray(t),
							a = i.length;
						while (a--)
							((r = i[a]).selected =
								-1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
						return n || (e.selectedIndex = -1), o;
					},
				},
			},
		}),
		S.each(['radio', 'checkbox'], function () {
			(S.valHooks[this] = {
				set: function (e, t) {
					if (Array.isArray(t))
						return (e.checked = -1 < S.inArray(S(e).val(), t));
				},
			}),
				y.checkOn ||
					(S.valHooks[this].get = function (e) {
						return null === e.getAttribute('value') ? 'on' : e.value;
					});
		}),
		(y.focusin = 'onfocusin' in C);
	var mt = /^(?:focusinfocus|focusoutblur)$/,
		xt = function (e) {
			e.stopPropagation();
		};
	S.extend(S.event, {
		trigger: function (e, t, n, r) {
			var i,
				o,
				a,
				s,
				u,
				l,
				c,
				f,
				p = [n || E],
				d = v.call(e, 'type') ? e.type : e,
				h = v.call(e, 'namespace') ? e.namespace.split('.') : [];
			if (
				((o = f = a = n = n || E),
				3 !== n.nodeType &&
					8 !== n.nodeType &&
					!mt.test(d + S.event.triggered) &&
					(-1 < d.indexOf('.') && ((d = (h = d.split('.')).shift()), h.sort()),
					(u = d.indexOf(':') < 0 && 'on' + d),
					((e = e[S.expando]
						? e
						: new S.Event(d, 'object' == typeof e && e)).isTrigger = r ? 2 : 3),
					(e.namespace = h.join('.')),
					(e.rnamespace = e.namespace
						? new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')
						: null),
					(e.result = void 0),
					e.target || (e.target = n),
					(t = null == t ? [e] : S.makeArray(t, [e])),
					(c = S.event.special[d] || {}),
					r || !c.trigger || !1 !== c.trigger.apply(n, t)))
			) {
				if (!r && !c.noBubble && !x(n)) {
					for (
						s = c.delegateType || d, mt.test(s + d) || (o = o.parentNode);
						o;
						o = o.parentNode
					)
						p.push(o), (a = o);
					a === (n.ownerDocument || E) &&
						p.push(a.defaultView || a.parentWindow || C);
				}
				i = 0;
				while ((o = p[i++]) && !e.isPropagationStopped())
					(f = o),
						(e.type = 1 < i ? s : c.bindType || d),
						(l =
							(Y.get(o, 'events') || Object.create(null))[e.type] &&
							Y.get(o, 'handle')) && l.apply(o, t),
						(l = u && o[u]) &&
							l.apply &&
							V(o) &&
							((e.result = l.apply(o, t)),
							!1 === e.result && e.preventDefault());
				return (
					(e.type = d),
					r ||
						e.isDefaultPrevented() ||
						(c._default && !1 !== c._default.apply(p.pop(), t)) ||
						!V(n) ||
						(u &&
							m(n[d]) &&
							!x(n) &&
							((a = n[u]) && (n[u] = null),
							(S.event.triggered = d),
							e.isPropagationStopped() && f.addEventListener(d, xt),
							n[d](),
							e.isPropagationStopped() && f.removeEventListener(d, xt),
							(S.event.triggered = void 0),
							a && (n[u] = a))),
					e.result
				);
			}
		},
		simulate: function (e, t, n) {
			var r = S.extend(new S.Event(), n, { type: e, isSimulated: !0 });
			S.event.trigger(r, null, t);
		},
	}),
		S.fn.extend({
			trigger: function (e, t) {
				return this.each(function () {
					S.event.trigger(e, t, this);
				});
			},
			triggerHandler: function (e, t) {
				var n = this[0];
				if (n) return S.event.trigger(e, t, n, !0);
			},
		}),
		y.focusin ||
			S.each({ focus: 'focusin', blur: 'focusout' }, function (n, r) {
				var i = function (e) {
					S.event.simulate(r, e.target, S.event.fix(e));
				};
				S.event.special[r] = {
					setup: function () {
						var e = this.ownerDocument || this.document || this,
							t = Y.access(e, r);
						t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
					},
					teardown: function () {
						var e = this.ownerDocument || this.document || this,
							t = Y.access(e, r) - 1;
						t
							? Y.access(e, r, t)
							: (e.removeEventListener(n, i, !0), Y.remove(e, r));
					},
				};
			});
	var bt = C.location,
		wt = { guid: Date.now() },
		Tt = /\?/;
	S.parseXML = function (e) {
		var t, n;
		if (!e || 'string' != typeof e) return null;
		try {
			t = new C.DOMParser().parseFromString(e, 'text/xml');
		} catch (e) {}
		return (
			(n = t && t.getElementsByTagName('parsererror')[0]),
			(t && !n) ||
				S.error(
					'Invalid XML: ' +
						(n
							? S.map(n.childNodes, function (e) {
									return e.textContent;
							  }).join('\n')
							: e)
				),
			t
		);
	};
	var Ct = /\[\]$/,
		Et = /\r?\n/g,
		St = /^(?:submit|button|image|reset|file)$/i,
		kt = /^(?:input|select|textarea|keygen)/i;
	function At(n, e, r, i) {
		var t;
		if (Array.isArray(e))
			S.each(e, function (e, t) {
				r || Ct.test(n)
					? i(n, t)
					: At(
							n + '[' + ('object' == typeof t && null != t ? e : '') + ']',
							t,
							r,
							i
					  );
			});
		else if (r || 'object' !== w(e)) i(n, e);
		else for (t in e) At(n + '[' + t + ']', e[t], r, i);
	}
	(S.param = function (e, t) {
		var n,
			r = [],
			i = function (e, t) {
				var n = m(t) ? t() : t;
				r[r.length] =
					encodeURIComponent(e) + '=' + encodeURIComponent(null == n ? '' : n);
			};
		if (null == e) return '';
		if (Array.isArray(e) || (e.jquery && !S.isPlainObject(e)))
			S.each(e, function () {
				i(this.name, this.value);
			});
		else for (n in e) At(n, e[n], t, i);
		return r.join('&');
	}),
		S.fn.extend({
			serialize: function () {
				return S.param(this.serializeArray());
			},
			serializeArray: function () {
				return this.map(function () {
					var e = S.prop(this, 'elements');
					return e ? S.makeArray(e) : this;
				})
					.filter(function () {
						var e = this.type;
						return (
							this.name &&
							!S(this).is(':disabled') &&
							kt.test(this.nodeName) &&
							!St.test(e) &&
							(this.checked || !pe.test(e))
						);
					})
					.map(function (e, t) {
						var n = S(this).val();
						return null == n
							? null
							: Array.isArray(n)
							? S.map(n, function (e) {
									return { name: t.name, value: e.replace(Et, '\r\n') };
							  })
							: { name: t.name, value: n.replace(Et, '\r\n') };
					})
					.get();
			},
		});
	var Nt = /%20/g,
		jt = /#.*$/,
		Dt = /([?&])_=[^&]*/,
		qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		Lt = /^(?:GET|HEAD)$/,
		Ht = /^\/\//,
		Ot = {},
		Pt = {},
		Rt = '*/'.concat('*'),
		Mt = E.createElement('a');
	function It(o) {
		return function (e, t) {
			'string' != typeof e && ((t = e), (e = '*'));
			var n,
				r = 0,
				i = e.toLowerCase().match(P) || [];
			if (m(t))
				while ((n = i[r++]))
					'+' === n[0]
						? ((n = n.slice(1) || '*'), (o[n] = o[n] || []).unshift(t))
						: (o[n] = o[n] || []).push(t);
		};
	}
	function Wt(t, i, o, a) {
		var s = {},
			u = t === Pt;
		function l(e) {
			var r;
			return (
				(s[e] = !0),
				S.each(t[e] || [], function (e, t) {
					var n = t(i, o, a);
					return 'string' != typeof n || u || s[n]
						? u
							? !(r = n)
							: void 0
						: (i.dataTypes.unshift(n), l(n), !1);
				}),
				r
			);
		}
		return l(i.dataTypes[0]) || (!s['*'] && l('*'));
	}
	function Ft(e, t) {
		var n,
			r,
			i = S.ajaxSettings.flatOptions || {};
		for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
		return r && S.extend(!0, e, r), e;
	}
	(Mt.href = bt.href),
		S.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: bt.href,
				type: 'GET',
				isLocal:
					/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
						bt.protocol
					),
				global: !0,
				processData: !0,
				async: !0,
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				accepts: {
					'*': Rt,
					text: 'text/plain',
					html: 'text/html',
					xml: 'application/xml, text/xml',
					json: 'application/json, text/javascript',
				},
				contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
				responseFields: {
					xml: 'responseXML',
					text: 'responseText',
					json: 'responseJSON',
				},
				converters: {
					'* text': String,
					'text html': !0,
					'text json': JSON.parse,
					'text xml': S.parseXML,
				},
				flatOptions: { url: !0, context: !0 },
			},
			ajaxSetup: function (e, t) {
				return t ? Ft(Ft(e, S.ajaxSettings), t) : Ft(S.ajaxSettings, e);
			},
			ajaxPrefilter: It(Ot),
			ajaxTransport: It(Pt),
			ajax: function (e, t) {
				'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
				var c,
					f,
					p,
					n,
					d,
					r,
					h,
					g,
					i,
					o,
					v = S.ajaxSetup({}, t),
					y = v.context || v,
					m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
					x = S.Deferred(),
					b = S.Callbacks('once memory'),
					w = v.statusCode || {},
					a = {},
					s = {},
					u = 'canceled',
					T = {
						readyState: 0,
						getResponseHeader: function (e) {
							var t;
							if (h) {
								if (!n) {
									n = {};
									while ((t = qt.exec(p)))
										n[t[1].toLowerCase() + ' '] = (
											n[t[1].toLowerCase() + ' '] || []
										).concat(t[2]);
								}
								t = n[e.toLowerCase() + ' '];
							}
							return null == t ? null : t.join(', ');
						},
						getAllResponseHeaders: function () {
							return h ? p : null;
						},
						setRequestHeader: function (e, t) {
							return (
								null == h &&
									((e = s[e.toLowerCase()] = s[e.toLowerCase()] || e),
									(a[e] = t)),
								this
							);
						},
						overrideMimeType: function (e) {
							return null == h && (v.mimeType = e), this;
						},
						statusCode: function (e) {
							var t;
							if (e)
								if (h) T.always(e[T.status]);
								else for (t in e) w[t] = [w[t], e[t]];
							return this;
						},
						abort: function (e) {
							var t = e || u;
							return c && c.abort(t), l(0, t), this;
						},
					};
				if (
					(x.promise(T),
					(v.url = ((e || v.url || bt.href) + '').replace(
						Ht,
						bt.protocol + '//'
					)),
					(v.type = t.method || t.type || v.method || v.type),
					(v.dataTypes = (v.dataType || '*').toLowerCase().match(P) || ['']),
					null == v.crossDomain)
				) {
					r = E.createElement('a');
					try {
						(r.href = v.url),
							(r.href = r.href),
							(v.crossDomain =
								Mt.protocol + '//' + Mt.host != r.protocol + '//' + r.host);
					} catch (e) {
						v.crossDomain = !0;
					}
				}
				if (
					(v.data &&
						v.processData &&
						'string' != typeof v.data &&
						(v.data = S.param(v.data, v.traditional)),
					Wt(Ot, v, t, T),
					h)
				)
					return T;
				for (i in ((g = S.event && v.global) &&
					0 == S.active++ &&
					S.event.trigger('ajaxStart'),
				(v.type = v.type.toUpperCase()),
				(v.hasContent = !Lt.test(v.type)),
				(f = v.url.replace(jt, '')),
				v.hasContent
					? v.data &&
					  v.processData &&
					  0 ===
							(v.contentType || '').indexOf(
								'application/x-www-form-urlencoded'
							) &&
					  (v.data = v.data.replace(Nt, '+'))
					: ((o = v.url.slice(f.length)),
					  v.data &&
							(v.processData || 'string' == typeof v.data) &&
							((f += (Tt.test(f) ? '&' : '?') + v.data), delete v.data),
					  !1 === v.cache &&
							((f = f.replace(Dt, '$1')),
							(o = (Tt.test(f) ? '&' : '?') + '_=' + wt.guid++ + o)),
					  (v.url = f + o)),
				v.ifModified &&
					(S.lastModified[f] &&
						T.setRequestHeader('If-Modified-Since', S.lastModified[f]),
					S.etag[f] && T.setRequestHeader('If-None-Match', S.etag[f])),
				((v.data && v.hasContent && !1 !== v.contentType) || t.contentType) &&
					T.setRequestHeader('Content-Type', v.contentType),
				T.setRequestHeader(
					'Accept',
					v.dataTypes[0] && v.accepts[v.dataTypes[0]]
						? v.accepts[v.dataTypes[0]] +
								('*' !== v.dataTypes[0] ? ', ' + Rt + '; q=0.01' : '')
						: v.accepts['*']
				),
				v.headers))
					T.setRequestHeader(i, v.headers[i]);
				if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
					return T.abort();
				if (
					((u = 'abort'),
					b.add(v.complete),
					T.done(v.success),
					T.fail(v.error),
					(c = Wt(Pt, v, t, T)))
				) {
					if (((T.readyState = 1), g && m.trigger('ajaxSend', [T, v]), h))
						return T;
					v.async &&
						0 < v.timeout &&
						(d = C.setTimeout(function () {
							T.abort('timeout');
						}, v.timeout));
					try {
						(h = !1), c.send(a, l);
					} catch (e) {
						if (h) throw e;
						l(-1, e);
					}
				} else l(-1, 'No Transport');
				function l(e, t, n, r) {
					var i,
						o,
						a,
						s,
						u,
						l = t;
					h ||
						((h = !0),
						d && C.clearTimeout(d),
						(c = void 0),
						(p = r || ''),
						(T.readyState = 0 < e ? 4 : 0),
						(i = (200 <= e && e < 300) || 304 === e),
						n &&
							(s = (function (e, t, n) {
								var r,
									i,
									o,
									a,
									s = e.contents,
									u = e.dataTypes;
								while ('*' === u[0])
									u.shift(),
										void 0 === r &&
											(r = e.mimeType || t.getResponseHeader('Content-Type'));
								if (r)
									for (i in s)
										if (s[i] && s[i].test(r)) {
											u.unshift(i);
											break;
										}
								if (u[0] in n) o = u[0];
								else {
									for (i in n) {
										if (!u[0] || e.converters[i + ' ' + u[0]]) {
											o = i;
											break;
										}
										a || (a = i);
									}
									o = o || a;
								}
								if (o) return o !== u[0] && u.unshift(o), n[o];
							})(v, T, n)),
						!i &&
							-1 < S.inArray('script', v.dataTypes) &&
							S.inArray('json', v.dataTypes) < 0 &&
							(v.converters['text script'] = function () {}),
						(s = (function (e, t, n, r) {
							var i,
								o,
								a,
								s,
								u,
								l = {},
								c = e.dataTypes.slice();
							if (c[1])
								for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
							o = c.shift();
							while (o)
								if (
									(e.responseFields[o] && (n[e.responseFields[o]] = t),
									!u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
									(u = o),
									(o = c.shift()))
								)
									if ('*' === o) o = u;
									else if ('*' !== u && u !== o) {
										if (!(a = l[u + ' ' + o] || l['* ' + o]))
											for (i in l)
												if (
													(s = i.split(' '))[1] === o &&
													(a = l[u + ' ' + s[0]] || l['* ' + s[0]])
												) {
													!0 === a
														? (a = l[i])
														: !0 !== l[i] && ((o = s[0]), c.unshift(s[1]));
													break;
												}
										if (!0 !== a)
											if (a && e['throws']) t = a(t);
											else
												try {
													t = a(t);
												} catch (e) {
													return {
														state: 'parsererror',
														error: a
															? e
															: 'No conversion from ' + u + ' to ' + o,
													};
												}
									}
							return { state: 'success', data: t };
						})(v, s, T, i)),
						i
							? (v.ifModified &&
									((u = T.getResponseHeader('Last-Modified')) &&
										(S.lastModified[f] = u),
									(u = T.getResponseHeader('etag')) && (S.etag[f] = u)),
							  204 === e || 'HEAD' === v.type
									? (l = 'nocontent')
									: 304 === e
									? (l = 'notmodified')
									: ((l = s.state), (o = s.data), (i = !(a = s.error))))
							: ((a = l), (!e && l) || ((l = 'error'), e < 0 && (e = 0))),
						(T.status = e),
						(T.statusText = (t || l) + ''),
						i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
						T.statusCode(w),
						(w = void 0),
						g && m.trigger(i ? 'ajaxSuccess' : 'ajaxError', [T, v, i ? o : a]),
						b.fireWith(y, [T, l]),
						g &&
							(m.trigger('ajaxComplete', [T, v]),
							--S.active || S.event.trigger('ajaxStop')));
				}
				return T;
			},
			getJSON: function (e, t, n) {
				return S.get(e, t, n, 'json');
			},
			getScript: function (e, t) {
				return S.get(e, void 0, t, 'script');
			},
		}),
		S.each(['get', 'post'], function (e, i) {
			S[i] = function (e, t, n, r) {
				return (
					m(t) && ((r = r || n), (n = t), (t = void 0)),
					S.ajax(
						S.extend(
							{ url: e, type: i, dataType: r, data: t, success: n },
							S.isPlainObject(e) && e
						)
					)
				);
			};
		}),
		S.ajaxPrefilter(function (e) {
			var t;
			for (t in e.headers)
				'content-type' === t.toLowerCase() &&
					(e.contentType = e.headers[t] || '');
		}),
		(S._evalUrl = function (e, t, n) {
			return S.ajax({
				url: e,
				type: 'GET',
				dataType: 'script',
				cache: !0,
				async: !1,
				global: !1,
				converters: { 'text script': function () {} },
				dataFilter: function (e) {
					S.globalEval(e, t, n);
				},
			});
		}),
		S.fn.extend({
			wrapAll: function (e) {
				var t;
				return (
					this[0] &&
						(m(e) && (e = e.call(this[0])),
						(t = S(e, this[0].ownerDocument).eq(0).clone(!0)),
						this[0].parentNode && t.insertBefore(this[0]),
						t
							.map(function () {
								var e = this;
								while (e.firstElementChild) e = e.firstElementChild;
								return e;
							})
							.append(this)),
					this
				);
			},
			wrapInner: function (n) {
				return m(n)
					? this.each(function (e) {
							S(this).wrapInner(n.call(this, e));
					  })
					: this.each(function () {
							var e = S(this),
								t = e.contents();
							t.length ? t.wrapAll(n) : e.append(n);
					  });
			},
			wrap: function (t) {
				var n = m(t);
				return this.each(function (e) {
					S(this).wrapAll(n ? t.call(this, e) : t);
				});
			},
			unwrap: function (e) {
				return (
					this.parent(e)
						.not('body')
						.each(function () {
							S(this).replaceWith(this.childNodes);
						}),
					this
				);
			},
		}),
		(S.expr.pseudos.hidden = function (e) {
			return !S.expr.pseudos.visible(e);
		}),
		(S.expr.pseudos.visible = function (e) {
			return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
		}),
		(S.ajaxSettings.xhr = function () {
			try {
				return new C.XMLHttpRequest();
			} catch (e) {}
		});
	var Bt = { 0: 200, 1223: 204 },
		$t = S.ajaxSettings.xhr();
	(y.cors = !!$t && 'withCredentials' in $t),
		(y.ajax = $t = !!$t),
		S.ajaxTransport(function (i) {
			var o, a;
			if (y.cors || ($t && !i.crossDomain))
				return {
					send: function (e, t) {
						var n,
							r = i.xhr();
						if (
							(r.open(i.type, i.url, i.async, i.username, i.password),
							i.xhrFields)
						)
							for (n in i.xhrFields) r[n] = i.xhrFields[n];
						for (n in (i.mimeType &&
							r.overrideMimeType &&
							r.overrideMimeType(i.mimeType),
						i.crossDomain ||
							e['X-Requested-With'] ||
							(e['X-Requested-With'] = 'XMLHttpRequest'),
						e))
							r.setRequestHeader(n, e[n]);
						(o = function (e) {
							return function () {
								o &&
									((o =
										a =
										r.onload =
										r.onerror =
										r.onabort =
										r.ontimeout =
										r.onreadystatechange =
											null),
									'abort' === e
										? r.abort()
										: 'error' === e
										? 'number' != typeof r.status
											? t(0, 'error')
											: t(r.status, r.statusText)
										: t(
												Bt[r.status] || r.status,
												r.statusText,
												'text' !== (r.responseType || 'text') ||
													'string' != typeof r.responseText
													? { binary: r.response }
													: { text: r.responseText },
												r.getAllResponseHeaders()
										  ));
							};
						}),
							(r.onload = o()),
							(a = r.onerror = r.ontimeout = o('error')),
							void 0 !== r.onabort
								? (r.onabort = a)
								: (r.onreadystatechange = function () {
										4 === r.readyState &&
											C.setTimeout(function () {
												o && a();
											});
								  }),
							(o = o('abort'));
						try {
							r.send((i.hasContent && i.data) || null);
						} catch (e) {
							if (o) throw e;
						}
					},
					abort: function () {
						o && o();
					},
				};
		}),
		S.ajaxPrefilter(function (e) {
			e.crossDomain && (e.contents.script = !1);
		}),
		S.ajaxSetup({
			accepts: {
				script:
					'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
			},
			contents: { script: /\b(?:java|ecma)script\b/ },
			converters: {
				'text script': function (e) {
					return S.globalEval(e), e;
				},
			},
		}),
		S.ajaxPrefilter('script', function (e) {
			void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
		}),
		S.ajaxTransport('script', function (n) {
			var r, i;
			if (n.crossDomain || n.scriptAttrs)
				return {
					send: function (e, t) {
						(r = S('<script>')
							.attr(n.scriptAttrs || {})
							.prop({ charset: n.scriptCharset, src: n.url })
							.on(
								'load error',
								(i = function (e) {
									r.remove(),
										(i = null),
										e && t('error' === e.type ? 404 : 200, e.type);
								})
							)),
							E.head.appendChild(r[0]);
					},
					abort: function () {
						i && i();
					},
				};
		});
	var _t,
		zt = [],
		Ut = /(=)\?(?=&|$)|\?\?/;
	S.ajaxSetup({
		jsonp: 'callback',
		jsonpCallback: function () {
			var e = zt.pop() || S.expando + '_' + wt.guid++;
			return (this[e] = !0), e;
		},
	}),
		S.ajaxPrefilter('json jsonp', function (e, t, n) {
			var r,
				i,
				o,
				a =
					!1 !== e.jsonp &&
					(Ut.test(e.url)
						? 'url'
						: 'string' == typeof e.data &&
						  0 ===
								(e.contentType || '').indexOf(
									'application/x-www-form-urlencoded'
								) &&
						  Ut.test(e.data) &&
						  'data');
			if (a || 'jsonp' === e.dataTypes[0])
				return (
					(r = e.jsonpCallback =
						m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
					a
						? (e[a] = e[a].replace(Ut, '$1' + r))
						: !1 !== e.jsonp &&
						  (e.url += (Tt.test(e.url) ? '&' : '?') + e.jsonp + '=' + r),
					(e.converters['script json'] = function () {
						return o || S.error(r + ' was not called'), o[0];
					}),
					(e.dataTypes[0] = 'json'),
					(i = C[r]),
					(C[r] = function () {
						o = arguments;
					}),
					n.always(function () {
						void 0 === i ? S(C).removeProp(r) : (C[r] = i),
							e[r] && ((e.jsonpCallback = t.jsonpCallback), zt.push(r)),
							o && m(i) && i(o[0]),
							(o = i = void 0);
					}),
					'script'
				);
		}),
		(y.createHTMLDocument =
			(((_t = E.implementation.createHTMLDocument('').body).innerHTML =
				'<form></form><form></form>'),
			2 === _t.childNodes.length)),
		(S.parseHTML = function (e, t, n) {
			return 'string' != typeof e
				? []
				: ('boolean' == typeof t && ((n = t), (t = !1)),
				  t ||
						(y.createHTMLDocument
							? (((r = (t =
									E.implementation.createHTMLDocument('')).createElement(
									'base'
							  )).href = E.location.href),
							  t.head.appendChild(r))
							: (t = E)),
				  (o = !n && []),
				  (i = N.exec(e))
						? [t.createElement(i[1])]
						: ((i = xe([e], t, o)),
						  o && o.length && S(o).remove(),
						  S.merge([], i.childNodes)));
			var r, i, o;
		}),
		(S.fn.load = function (e, t, n) {
			var r,
				i,
				o,
				a = this,
				s = e.indexOf(' ');
			return (
				-1 < s && ((r = ht(e.slice(s))), (e = e.slice(0, s))),
				m(t)
					? ((n = t), (t = void 0))
					: t && 'object' == typeof t && (i = 'POST'),
				0 < a.length &&
					S.ajax({ url: e, type: i || 'GET', dataType: 'html', data: t })
						.done(function (e) {
							(o = arguments),
								a.html(r ? S('<div>').append(S.parseHTML(e)).find(r) : e);
						})
						.always(
							n &&
								function (e, t) {
									a.each(function () {
										n.apply(this, o || [e.responseText, t, e]);
									});
								}
						),
				this
			);
		}),
		(S.expr.pseudos.animated = function (t) {
			return S.grep(S.timers, function (e) {
				return t === e.elem;
			}).length;
		}),
		(S.offset = {
			setOffset: function (e, t, n) {
				var r,
					i,
					o,
					a,
					s,
					u,
					l = S.css(e, 'position'),
					c = S(e),
					f = {};
				'static' === l && (e.style.position = 'relative'),
					(s = c.offset()),
					(o = S.css(e, 'top')),
					(u = S.css(e, 'left')),
					('absolute' === l || 'fixed' === l) && -1 < (o + u).indexOf('auto')
						? ((a = (r = c.position()).top), (i = r.left))
						: ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
					m(t) && (t = t.call(e, n, S.extend({}, s))),
					null != t.top && (f.top = t.top - s.top + a),
					null != t.left && (f.left = t.left - s.left + i),
					'using' in t ? t.using.call(e, f) : c.css(f);
			},
		}),
		S.fn.extend({
			offset: function (t) {
				if (arguments.length)
					return void 0 === t
						? this
						: this.each(function (e) {
								S.offset.setOffset(this, t, e);
						  });
				var e,
					n,
					r = this[0];
				return r
					? r.getClientRects().length
						? ((e = r.getBoundingClientRect()),
						  (n = r.ownerDocument.defaultView),
						  { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
						: { top: 0, left: 0 }
					: void 0;
			},
			position: function () {
				if (this[0]) {
					var e,
						t,
						n,
						r = this[0],
						i = { top: 0, left: 0 };
					if ('fixed' === S.css(r, 'position')) t = r.getBoundingClientRect();
					else {
						(t = this.offset()),
							(n = r.ownerDocument),
							(e = r.offsetParent || n.documentElement);
						while (
							e &&
							(e === n.body || e === n.documentElement) &&
							'static' === S.css(e, 'position')
						)
							e = e.parentNode;
						e &&
							e !== r &&
							1 === e.nodeType &&
							(((i = S(e).offset()).top += S.css(e, 'borderTopWidth', !0)),
							(i.left += S.css(e, 'borderLeftWidth', !0)));
					}
					return {
						top: t.top - i.top - S.css(r, 'marginTop', !0),
						left: t.left - i.left - S.css(r, 'marginLeft', !0),
					};
				}
			},
			offsetParent: function () {
				return this.map(function () {
					var e = this.offsetParent;
					while (e && 'static' === S.css(e, 'position')) e = e.offsetParent;
					return e || re;
				});
			},
		}),
		S.each(
			{ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
			function (t, i) {
				var o = 'pageYOffset' === i;
				S.fn[t] = function (e) {
					return $(
						this,
						function (e, t, n) {
							var r;
							if (
								(x(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
								void 0 === n)
							)
								return r ? r[i] : e[t];
							r
								? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
								: (e[t] = n);
						},
						t,
						e,
						arguments.length
					);
				};
			}
		),
		S.each(['top', 'left'], function (e, n) {
			S.cssHooks[n] = Fe(y.pixelPosition, function (e, t) {
				if (t)
					return (t = We(e, n)), Pe.test(t) ? S(e).position()[n] + 'px' : t;
			});
		}),
		S.each({ Height: 'height', Width: 'width' }, function (a, s) {
			S.each(
				{ padding: 'inner' + a, content: s, '': 'outer' + a },
				function (r, o) {
					S.fn[o] = function (e, t) {
						var n = arguments.length && (r || 'boolean' != typeof e),
							i = r || (!0 === e || !0 === t ? 'margin' : 'border');
						return $(
							this,
							function (e, t, n) {
								var r;
								return x(e)
									? 0 === o.indexOf('outer')
										? e['inner' + a]
										: e.document.documentElement['client' + a]
									: 9 === e.nodeType
									? ((r = e.documentElement),
									  Math.max(
											e.body['scroll' + a],
											r['scroll' + a],
											e.body['offset' + a],
											r['offset' + a],
											r['client' + a]
									  ))
									: void 0 === n
									? S.css(e, t, i)
									: S.style(e, t, n, i);
							},
							s,
							n ? e : void 0,
							n
						);
					};
				}
			);
		}),
		S.each(
			[
				'ajaxStart',
				'ajaxStop',
				'ajaxComplete',
				'ajaxError',
				'ajaxSuccess',
				'ajaxSend',
			],
			function (e, t) {
				S.fn[t] = function (e) {
					return this.on(t, e);
				};
			}
		),
		S.fn.extend({
			bind: function (e, t, n) {
				return this.on(e, null, t, n);
			},
			unbind: function (e, t) {
				return this.off(e, null, t);
			},
			delegate: function (e, t, n, r) {
				return this.on(t, e, n, r);
			},
			undelegate: function (e, t, n) {
				return 1 === arguments.length
					? this.off(e, '**')
					: this.off(t, e || '**', n);
			},
			hover: function (e, t) {
				return this.mouseenter(e).mouseleave(t || e);
			},
		}),
		S.each(
			'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
				' '
			),
			function (e, n) {
				S.fn[n] = function (e, t) {
					return 0 < arguments.length
						? this.on(n, null, e, t)
						: this.trigger(n);
				};
			}
		);
	var Xt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	(S.proxy = function (e, t) {
		var n, r, i;
		if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), m(e)))
			return (
				(r = s.call(arguments, 2)),
				((i = function () {
					return e.apply(t || this, r.concat(s.call(arguments)));
				}).guid = e.guid =
					e.guid || S.guid++),
				i
			);
	}),
		(S.holdReady = function (e) {
			e ? S.readyWait++ : S.ready(!0);
		}),
		(S.isArray = Array.isArray),
		(S.parseJSON = JSON.parse),
		(S.nodeName = A),
		(S.isFunction = m),
		(S.isWindow = x),
		(S.camelCase = X),
		(S.type = w),
		(S.now = Date.now),
		(S.isNumeric = function (e) {
			var t = S.type(e);
			return ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e));
		}),
		(S.trim = function (e) {
			return null == e ? '' : (e + '').replace(Xt, '');
		}),
		'function' == typeof define &&
			define.amd &&
			define('jquery', [], function () {
				return S;
			});
	var Vt = C.jQuery,
		Gt = C.$;
	return (
		(S.noConflict = function (e) {
			return C.$ === S && (C.$ = Gt), e && C.jQuery === S && (C.jQuery = Vt), S;
		}),
		'undefined' == typeof e && (C.jQuery = C.$ = S),
		S
	);
});

var chartwidth = $('.tab__target').width();
var chartheight = $('.tab__target').height();
google.load('visualization', '1', { packages: ['corechart'] });
google.setOnLoadCallback(drawChart);
var options = {
	height: chartheight,
	width: chartwidth,
	series: {
		0: { color: '#73322c' },
		1: { color: '#73322c' },
		2: { color: '#73322c' },
		3: { color: '#73322c' },
		4: { color: '#73322c' },
		5: { color: '#73322c' },
	},
	vAxis: {
		viewWindowMode: 'explicit',
		viewWindow: { min: 0, interpolateNulls: true },
		gridlines: { count: 10 },
	},
	curveType: 'function',
	legend: (position = 'top'),
	chartArea: { width: chartwidth, height: chartheight },
};

function drawChart() {
	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC Common'],
		['', 167.0],
		['', 168.2],
		['', 170.6],
		['', 168.5],
		['', 169.9],
		['', 170.0],
		['', 165.2],
		['', 163.8],
		['', 164.0],
		['', 163.4],
		['', 162.5],
		['', 158.0],
		['', 159.9],
		['', 160.0],
		['', 160.0],
		['', 156.9],
		['', 156.9],
		['', 159.0],
		['', 160.0],
		['', 160.0],
		['', 159.2],
		['', 159.2],
		['', 161.1],
		['', 160.0],
		['', 160.0],
		['', 159.0],
		['', 160.0],
		['', 158.1],
		['', 155.1],
		['', 152.0],
		['', 153.0],
		['', 155.0],
		['', 155.0],
		['', 160.0],
		['', 152.0],
		['', 158.0],
		['', 160.0],
		['', 165.5],
		['', 164.0],
		['', 164.0],
		['', 164.0],
		['', 165.0],
		['', 164.0],
		['', 161.0],
		['', 159.0],
		['', 158.5],
		['', 157.3],
		['', 151.6],
		['', 152.8],
		['', 152.5],
		['', 148.1],
		['', 148.1],
		['', 148.2],
		['', 148.5],
		['', 150.0],
		['', 147.4],
		['', 147.0],
		['', 143.3],
		['', 142.7],
		['', 139.8],
		['', 136.6],
		['', 131.5],
		['', 132.1],
		['', 132.3],
		['', 134.5],
		['', 134.0],
		['', 135.1],
		['', 133.0],
		['', 136.0],
		['', 132.7],
		['', 133.0],
		['', 135.0],
		['', 132.4],
		['', 133.0],
		['', 133.0],
		['', 132.4],
		['', 130.0],
		['', 131.9],
		['', 126.2],
		['', 128.0],
		['', 128.6],
		['', 126.5],
		['', 126.0],
		['', 125.5],
		['', 125.0],
		['', 119.5],
		['', 119.5],
		['', 110.0],
		['', 109.5],
		['', 92.0],
		['', 92.0],
		['', 72.5],
		['', 83.0],
		['', 83.15],
		['', 86.4],
		['', 87.0],
		['', 88.8],
		['', 90.0],
		['', 91.4],
		['', 91.5],
		['', 92.0],
		['', 92.0],
		['', 93.0],
		['', 93.0],
		['', 93.05],
		['', 94.5],
		['', 94.95],
		['', 95.0],
		['', 102.2],
		['', 100.5],
		['', 100.0],
		['', 100.0],
		['', 98.0],
		['', 97.9],
		['', 97.75],
		['', 97.0],
		['', 97.5],
		['', 97.5],
		['', 97.05],
		['', 97.0],
		['', 96.75],
		['', 96.75],
		['', 96.5],
		['', 96.2],
		['', 96.5],
		['', 97.0],
		['', 97.0],
		['', 96.9],
		['', 96.0],
		['', 96.35],
		['', 96.0],
		['', 96.4],
		['', 96.4],
		['', 95.5],
		['', 95.95],
		['', 96.0],
		['', 96.0],
		['', 95.9],
		['', 96.0],
		['', 97.0],
		['', 96.6],
		['', 100.0],
		['', 100.0],
		['', 101.4],
		['', 101.2],
		['', 108.0],
		['', 104.0],
		['', 104.6],
		['', 104.0],
		['', 105.0],
		['', 105.0],
		['', 104.9],
		['', 101.3],
		['', 101.9],
		['', 100.2],
		['', 100.3],
		['', 99.5],
		['', 100.0],
		['', 99.5],
		['', 100.0],
		['', 102.4],
		['', 105.0],
		['', 103.0],
		['', 103.0],
		['', 101.5],
		['', 102.0],
		['', 100.0],
		['', 104.0],
		['', 103.0],
		['', 102.0],
		['', 98.3],
		['', 98.1],
		['', 98.5],
		['', 98.7],
		['', 99.9],
		['', 99.8],
		['', 98.2],
		['', 97.8],
		['', 97.8],
		['', 98.5],
		['', 98.4],
		['', 99.0],
		['', 99.0],
		['', 98.5],
		['', 97.0],
		['', 97.3],
		['', 99.0],
		['', 98.9],
		['', 99.0],
		['', 101.5],
		['', 102.0],
		['', 103.5],
		['', 103.5],
		['', 103.6],
		['', 102.5],
		['', 103.0],
		['', 100.0],
		['', 101.5],
		['', 101.4],
		['', 101.4],
		['', 101.5],
		['', 100.3],
		['', 101.6],
		['', 99.0],
		['', 101.8],
		['', 100.0],
		['', 100.0],
		['', 99.5],
		['', 99.5],
		['', 100.5],
		['', 100.4],
		['', 100.5],
		['', 100.0],
		['', 100.0],
		['', 99.85],
		['', 99.0],
		['', 99.0],
		['', 98.55],
		['', 98.75],
		['', 98.5],
		['', 99.0],
		['', 98.6],
		['', 98.9],
		['', 100.1],
		['', 100.0],
		['', 99.95],
		['', 100.0],
		['', 98.5],
		['', 99.9],
		['', 100.0],
		['', 99.9],
		['', 99.9],
		['', 99.9],
		['', 100.0],
		['', 99.9],
		['', 100.4],
		['', 101.9],
		['', 102.0],
		['', 105.7],
		['', 106.0],
		['', 103.0],
		['', 101.1],
		['', 102.0],
		['', 101.0],
		['', 102.0],
		['', 100.7],
		['', 102.7],
		['', 104.0],
		['', 104.0],
		['', 104.6],
		['', 106.0],
		['', 107.0],
		['', 108.0],
		['', 108.1],
		['', 113.5],
		['', 114.5],
		['', 116.0],
		['', 126.0],
		['', 135.0],
		['', 130.3],
		['', 127.0],
		['', 127.0],
		['', 128.0],
		['', 135.0],
		['', 132.8],
		['', 134.9],
		['', 132.9],
		['', 134.3],
		['', 134.9],
		['', 135.0],
		['', 138.0],
		['', 139.2],
		['', 137.7],
		['', 137.0],
		['', 137.7],
		['', 138.8],
		['', 133.5],
		['', 130.1],
		['', 130.1],
		['', 129.0],
		['', 128.1],
		['', 134.0],
		['', 129.1],
		['', 129.5],
		['', 129.2],
		['', 129.4],
		['', 130.8],
		['', 128.8],
		['', 127.6],
		['', 127.0],
		['', 126.5],
		['', 125.7],
		['', 124.8],
		['', 124.2],
		['', 127.5],
		['', 129.0],
		['', 128.9],
		['', 127.9],
		['', 125.0],
		['', 124.5],
		['', 122.1],
		['', 122.8],
		['', 128.0],
		['', 128.0],
		['', 128.9],
		['', 128.9],
		['', 128.8],
		['', 127.0],
		['', 126.0],
		['', 126.7],
		['', 126.5],
		['', 126.9],
		['', 126.0],
		['', 125.6],
		['', 126.0],
		['', 126.2],
		['', 125.8],
		['', 125.7],
		['', 125.7],
		['', 128.0],
		['', 127.5],
		['', 127.9],
		['', 126.0],
		['', 125.0],
		['', 125.0],
		['', 124.0],
		['', 124.0],
		['', 121.0],
		['', 123.0],
		['', 119.9],
		['', 117.5],
		['', 117.8],
		['', 120.7],
		['', 115.0],
		['', 119.5],
		['', 122.0],
		['', 121.0],
		['', 121.9],
		['', 123.0],
		['', 121.5],
		['', 119.9],
		['', 119.0],
		['', 117.0],
		['', 117.5],
		['', 119.0],
		['', 118.0],
		['', 118.0],
		['', 116.9],
		['', 117.1],
		['', 116.5],
		['', 116.8],
		['', 117.0],
		['', 116.8],
		['', 116.6],
		['', 116.9],
		['', 115.0],
		['', 115.0],
		['', 114.9],
		['', 114.8],
		['', 114.8],
		['', 115.0],
		['', 115.6],
		['', 115.9],
		['', 114.5],
		['', 114.8],
		['', null],
	]);
	if ($('#tdateschart1').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart1')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2C'],
		['', 77.9],
		['', 77.9],
		['', 78.3],
		['', 78.0],
		['', 78.2],
		['', 78.15],
		['', 78.25],
		['', 78.15],
		['', 78.2],
		['', 78.2],
		['', 78.2],
		['', 78.15],
		['', 78.1],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.35],
		['', 78.35],
		['', 77.6],
		['', 78.45],
		['', 77.75],
		['', 78.2],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.15],
		['', 78.0],
		['', 78.05],
		['', 78.1],
		['', 78.05],
		['', 78.45],
		['', 78.4],
		['', 78.45],
		['', 78.25],
		['', 78.0],
		['', 78.0],
		['', 77.9],
		['', 77.8],
		['', 77.8],
		['', 77.8],
		['', 77.5],
		['', 76.7],
		['', 77.9],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.45],
		['', 76.8],
		['', 77.0],
		['', 77.6],
		['', 77.6],
		['', 76.6],
		['', 77.1],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 76.95],
		['', 76.8],
		['', 77.0],
		['', 77.0],
		['', 78.35],
		['', 77.0],
		['', 77.0],
		['', 77.5],
		['', 77.1],
		['', 77.5],
		['', 77.0],
		['', 77.0],
		['', 77.5],
		['', 77.6],
		['', 77.5],
		['', 77.6],
		['', 77.5],
		['', 77.6],
		['', 77.6],
		['', 77.6],
		['', 77.7],
		['', 77.7],
		['', 77.5],
		['', 77.6],
		['', 77.95],
		['', 77.7],
		['', 77.65],
		['', 77.85],
		['', 77.8],
		['', 77.8],
		['', 77.8],
		['', 77.95],
		['', 77.9],
		['', 76.2],
		['', 76.2],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.8],
		['', 76.1],
		['', 76.3],
		['', 76.4],
		['', 76.4],
		['', 75.6],
		['', 75.85],
		['', 76.1],
		['', 76.0],
		['', 76.2],
		['', 76.2],
		['', 76.4],
		['', 76.4],
		['', 76.35],
		['', 76.45],
		['', 77.0],
		['', 76.9],
		['', 77.45],
		['', 76.5],
		['', 76.5],
		['', 77.3],
		['', 77.45],
		['', 77.4],
		['', 77.4],
		['', 77.45],
		['', 77.45],
		['', 77.45],
		['', 77.05],
		['', 76.9],
		['', 77.5],
		['', 77.5],
		['', 77.65],
		['', 77.5],
		['', 77.8],
		['', 77.1],
		['', 77.0],
		['', 77.0],
		['', 77.5],
		['', 78.0],
		['', 78.0],
		['', 78.45],
		['', 78.8],
		['', 78.75],
		['', 78.0],
		['', 78.0],
		['', 78.5],
		['', 77.0],
		['', 77.0],
		['', 76.55],
		['', 76.95],
		['', 76.95],
		['', 78.25],
		['', 77.0],
		['', 77.0],
		['', 78.0],
		['', 78.0],
		['', 77.75],
		['', 78.0],
		['', 78.45],
		['', 78.45],
		['', 78.5],
		['', 78.2],
		['', 78.0],
		['', 78.45],
		['', 78.5],
		['', 78.5],
		['', 78.0],
		['', 78.8],
		['', 78.55],
		['', 78.55],
		['', 78.5],
		['', 78.5],
		['', 78.4],
		['', 78.5],
		['', 78.4],
		['', 78.5],
		['', 79.0],
		['', 78.2],
		['', 78.0],
		['', 78.3],
		['', 78.5],
		['', 78.1],
		['', 78.5],
		['', 78.4],
		['', 78.0],
		['', 78.35],
		['', 78.0],
		['', 78.15],
		['', 78.15],
		['', 78.1],
		['', 78.0],
		['', 78.15],
		['', 78.15],
		['', 78.2],
		['', 78.2],
		['', 78.2],
		['', 78.45],
		['', 78.45],
		['', 78.5],
		['', 78.45],
		['', 78.5],
		['', 78.5],
		['', 78.5],
		['', 78.45],
		['', 78.5],
		['', 78.4],
		['', 78.25],
		['', 78.25],
		['', 78.5],
		['', 78.1],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 77.5],
		['', 76.8],
		['', 77.5],
		['', 77.9],
		['', 78.0],
		['', 78.0],
		['', 77.3],
		['', 78.0],
		['', 77.5],
		['', 78.0],
		['', 77.25],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.2],
		['', 78.0],
		['', 78.15],
		['', 78.0],
		['', 78.2],
		['', 78.15],
		['', 78.2],
		['', 78.2],
		['', 78.2],
		['', 78.0],
		['', 78.2],
		['', 78.25],
		['', 78.2],
		['', 78.2],
		['', 78.1],
		['', 78.05],
		['', 78.25],
		['', 78.4],
		['', 78.4],
		['', 78.4],
		['', 78.1],
		['', 78.15],
		['', 78.0],
		['', 78.15],
		['', 78.4],
		['', 78.2],
		['', 78.35],
		['', 78.0],
		['', 78.4],
		['', 78.4],
		['', 78.5],
		['', 78.4],
		['', 78.65],
		['', 79.0],
		['', 78.5],
		['', 78.75],
		['', 78.8],
		['', 79.0],
		['', 78.7],
		['', 77.05],
		['', 77.8],
		['', 78.6],
		['', 78.0],
		['', 78.0],
		['', 78.75],
		['', 78.0],
		['', 78.0],
		['', 78.5],
		['', 77.85],
		['', 78.75],
		['', 78.05],
		['', 78.85],
		['', 78.5],
		['', 78.85],
		['', 78.2],
		['', 78.0],
		['', 78.5],
		['', 78.0],
		['', 78.0],
		['', 78.9],
		['', 78.8],
		['', 79.5],
		['', 79.3],
		['', 79.3],
		['', 79.5],
		['', 79.3],
		['', 79.4],
		['', 79.0],
		['', 79.0],
		['', 79.4],
		['', 79.45],
		['', 79.35],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 80.4],
		['', 79.9],
		['', 80.0],
		['', 80.05],
		['', 79.1],
		['', 79.0],
		['', 79.5],
		['', 80.0],
		['', 80.0],
		['', 80.0],
		['', 77.85],
		['', 79.0],
		['', 79.0],
		['', 78.75],
		['', 78.7],
		['', 78.7],
		['', 78.75],
		['', 78.7],
		['', 78.5],
		['', 80.0],
		['', 79.95],
		['', 79.95],
		['', 79.45],
		['', 79.0],
		['', 79.0],
		['', 78.45],
		['', 77.8],
		['', 78.0],
		['', 78.0],
		['', 77.75],
		['', 77.75],
		['', 77.8],
		['', 77.8],
		['', 77.85],
		['', 77.85],
		['', 78.0],
		['', 79.5],
		['', 79.5],
		['', 78.6],
		['', 79.55],
		['', 79.55],
		['', 78.0],
		['', 79.7],
		['', 79.6],
		['', 78.1],
		['', 78.1],
		['', 79.8],
		['', 79.5],
		['', 79.65],
		['', 78.0],
		['', 79.85],
		['', 79.85],
		['', 79.9],
		['', 79.5],
		['', 79.8],
		['', 79.6],
		['', null],
	]);
	if ($('#tdateschart2').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart2')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2D'],
		['', 75.3],
		['', 75.1],
		['', 75.3],
		['', 75.1],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 76.0],
		['', 75.0],
		['', 75.05],
		['', 75.0],
		['', 75.0],
		['', 75.05],
		['', 75.85],
		['', 75.5],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.05],
		['', 75.0],
		['', 75.0],
		['', 75.85],
		['', 75.2],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.4],
		['', 75.0],
		['', 75.0],
		['', 74.9],
		['', 74.85],
		['', 74.8],
		['', 74.8],
		['', 74.8],
		['', 74.65],
		['', 74.7],
		['', 74.4],
		['', 74.45],
		['', 74.45],
		['', 74.4],
		['', 74.4],
		['', 74.4],
		['', 74.35],
		['', 74.35],
		['', 74.35],
		['', 74.4],
		['', 73.8],
		['', 72.8],
		['', 73.0],
		['', 73.0],
		['', 72.8],
		['', 73.0],
		['', 71.4],
		['', 71.4],
		['', 71.4],
		['', 73.0],
		['', 73.9],
		['', 73.95],
		['', 73.95],
		['', 73.95],
		['', 74.0],
		['', 74.0],
		['', 74.95],
		['', 74.95],
		['', 71.5],
		['', 74.45],
		['', 72.0],
		['', 73.9],
		['', 74.3],
		['', 73.5],
		['', 73.5],
		['', 73.5],
		['', 72.55],
		['', 73.0],
		['', 73.5],
		['', 73.9],
		['', 73.3],
		['', 72.5],
		['', 72.5],
		['', 72.5],
		['', 73.8],
		['', 73.85],
		['', 73.0],
		['', 73.5],
		['', 73.5],
		['', 73.8],
		['', 73.85],
		['', 73.8],
		['', 71.4],
		['', 73.4],
		['', 72.6],
		['', 73.0],
		['', 72.6],
		['', 72.6],
		['', 72.6],
		['', 71.4],
		['', 72.5],
		['', 72.5],
		['', 72.5],
		['', 71.8],
		['', 71.75],
		['', 71.9],
		['', 71.8],
		['', 71.6],
		['', 71.65],
		['', 71.7],
		['', 73.8],
		['', 72.85],
		['', 72.85],
		['', 73.0],
		['', 72.5],
		['', 71.7],
		['', 72.0],
		['', 73.0],
		['', 71.9],
		['', 71.85],
		['', 72.5],
		['', 72.9],
		['', 71.5],
		['', 72.4],
		['', 71.2],
		['', 71.2],
		['', 71.2],
		['', 71.2],
		['', 71.2],
		['', 71.5],
		['', 71.85],
		['', 71.85],
		['', 72.0],
		['', 71.5],
		['', 71.5],
		['', 72.5],
		['', 71.5],
		['', 71.75],
		['', 72.45],
		['', 72.95],
		['', 73.0],
		['', 72.1],
		['', 72.0],
		['', 72.1],
		['', 73.85],
		['', 73.85],
		['', 73.5],
		['', 73.5],
		['', 73.85],
		['', 73.85],
		['', 73.5],
		['', 72.0],
		['', 72.0],
		['', 72.0],
		['', 72.5],
		['', 72.6],
		['', 73.0],
		['', 72.5],
		['', 72.5],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.85],
		['', 73.1],
		['', 73.1],
		['', 74.9],
		['', 73.6],
		['', 73.7],
		['', 73.75],
		['', 74.8],
		['', 74.0],
		['', 74.8],
		['', 74.9],
		['', 75.1],
		['', 75.4],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.6],
		['', 75.6],
		['', 75.55],
		['', 75.55],
		['', 75.45],
		['', 75.6],
		['', 75.5],
		['', 75.05],
		['', 75.45],
		['', 75.25],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.8],
		['', 75.8],
		['', 75.9],
		['', 75.9],
		['', 75.6],
		['', 75.05],
		['', 75.05],
		['', 75.15],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.05],
		['', 75.0],
		['', 75.0],
		['', 74.95],
		['', 75.0],
		['', 75.3],
		['', 74.95],
		['', 74.8],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 75.5],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.15],
		['', 75.1],
		['', 75.5],
		['', 75.35],
		['', 75.1],
		['', 75.15],
		['', 75.1],
		['', 75.1],
		['', 75.05],
		['', 75.05],
		['', 75.15],
		['', 75.15],
		['', 75.1],
		['', 75.05],
		['', 75.5],
		['', 75.25],
		['', 75.5],
		['', 75.25],
		['', 75.45],
		['', 75.2],
		['', 75.1],
		['', 75.1],
		['', 75.2],
		['', 75.2],
		['', 75.2],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.2],
		['', 74.0],
		['', 75.2],
		['', 75.2],
		['', 75.2],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.6],
		['', 74.8],
		['', 75.65],
		['', 75.65],
		['', 75.65],
		['', 75.65],
		['', 75.65],
		['', 75.05],
		['', 75.6],
		['', 75.75],
		['', 75.05],
		['', 75.1],
		['', 75.8],
		['', 75.15],
		['', 75.9],
		['', 75.4],
		['', 75.4],
		['', 76.05],
		['', 74.1],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.0],
		['', 74.0],
		['', 73.75],
		['', 73.5],
		['', 73.4],
		['', 73.75],
		['', 74.0],
		['', 74.9],
		['', 74.9],
		['', 74.5],
		['', 74.0],
		['', 74.45],
		['', 74.2],
		['', 74.2],
		['', 74.2],
		['', 74.2],
		['', 74.9],
		['', 74.9],
		['', 74.9],
		['', 74.9],
		['', 75.2],
		['', 74.6],
		['', 75.1],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.95],
		['', 75.1],
		['', 75.1],
		['', 74.5],
		['', 75.0],
		['', 74.75],
		['', 75.2],
		['', 75.0],
		['', 75.0],
		['', 75.1],
		['', 75.5],
		['', 75.5],
		['', 76.15],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.95],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.5],
		['', 75.55],
		['', 75.55],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.3],
		['', 75.3],
		['', 75.5],
		['', 75.3],
		['', 75.3],
		['', 75.3],
		['', 75.3],
		['', 75.55],
		['', 75.25],
		['', 75.55],
		['', 75.3],
		['', 75.6],
		['', 75.55],
		['', 75.2],
		['', 75.6],
		['', 75.4],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.05],
		['', 75.85],
		['', 75.85],
		['', 75.3],
		['', 75.15],
		['', 75.9],
		['', 75.3],
		['', null],
	]);
	if ($('#tdateschart3').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart3')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2E'],
		['', 72.0],
		['', 74.0],
		['', 73.95],
		['', 73.95],
		['', 73.95],
		['', 73.5],
		['', 73.5],
		['', 73.0],
		['', 73.0],
		['', 73.45],
		['', 73.1],
		['', 73.0],
		['', 73.35],
		['', 73.0],
		['', 73.35],
		['', 72.85],
		['', 73.0],
		['', 72.5],
		['', 72.5],
		['', 72.5],
		['', 73.35],
		['', 73.35],
		['', 73.45],
		['', 74.0],
		['', 73.35],
		['', 75.0],
		['', 71.3],
		['', 72.5],
		['', 72.05],
		['', 74.25],
		['', 74.15],
		['', 72.5],
		['', 72.65],
		['', 72.65],
		['', 72.55],
		['', 72.55],
		['', 72.5],
		['', 72.5],
		['', 72.55],
		['', 72.0],
		['', 73.0],
		['', 72.55],
		['', 72.5],
		['', 71.7],
		['', 72.5],
		['', 72.5],
		['', 72.5],
		['', 71.65],
		['', 72.5],
		['', 73.0],
		['', 73.5],
		['', 71.65],
		['', 72.5],
		['', 72.1],
		['', 72.1],
		['', 72.6],
		['', 73.95],
		['', 72.15],
		['', 73.95],
		['', 72.0],
		['', 73.9],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 74.95],
		['', 74.95],
		['', 74.95],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 73.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.2],
		['', 76.0],
		['', 76.0],
		['', 75.9],
		['', 75.95],
		['', 75.95],
		['', 76.5],
		['', 76.0],
		['', 76.2],
		['', 75.4],
		['', 75.45],
		['', 75.55],
		['', 76.2],
		['', 76.0],
		['', 75.65],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 75.6],
		['', 75.6],
		['', 75.6],
		['', 75.1],
		['', 75.0],
		['', 75.0],
		['', 75.6],
		['', 75.55],
		['', 76.0],
		['', 75.65],
		['', 76.0],
		['', 76.0],
		['', 75.6],
		['', 75.0],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.3],
		['', 75.3],
		['', 75.1],
		['', 77.0],
		['', 75.0],
		['', 74.95],
		['', 75.0],
		['', 75.0],
		['', 75.95],
		['', 75.95],
		['', 75.95],
		['', 75.95],
		['', 75.95],
		['', 76.1],
		['', 75.95],
		['', 75.95],
		['', 75.95],
		['', 75.95],
		['', 74.0],
		['', 77.0],
		['', 77.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.9],
		['', 76.0],
		['', 75.0],
		['', 75.0],
		['', 74.9],
		['', 75.0],
		['', 75.5],
		['', 75.1],
		['', 74.8],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.05],
		['', 75.05],
		['', 75.1],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 76.5],
		['', 76.4],
		['', 75.3],
		['', 75.5],
		['', 75.3],
		['', 76.4],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 74.0],
		['', 75.0],
		['', 74.0],
		['', 75.0],
		['', 74.05],
		['', 74.05],
		['', 74.0],
		['', 74.5],
		['', 74.4],
		['', 74.35],
		['', 74.35],
		['', 74.4],
		['', 74.4],
		['', 75.0],
		['', 74.9],
		['', 74.0],
		['', 75.0],
		['', 74.2],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.1],
		['', 75.2],
		['', 75.3],
		['', 75.8],
		['', 75.4],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.3],
		['', 76.0],
		['', 76.35],
		['', 76.35],
		['', 75.75],
		['', 76.3],
		['', 75.7],
		['', 76.0],
		['', 75.3],
		['', 75.5],
		['', 76.0],
		['', 77.15],
		['', 77.15],
		['', 75.8],
		['', 75.5],
		['', 77.0],
		['', 75.15],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.4],
		['', 75.55],
		['', 75.65],
		['', 75.55],
		['', 76.95],
		['', 75.0],
		['', 75.3],
		['', 75.3],
		['', 75.3],
		['', 75.25],
		['', 75.3],
		['', 76.0],
		['', 75.4],
		['', 75.5],
		['', 76.0],
		['', 76.5],
		['', 76.0],
		['', 76.5],
		['', 76.2],
		['', 76.5],
		['', 76.5],
		['', 77.0],
		['', 76.95],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 76.0],
		['', 75.7],
		['', 76.0],
		['', 75.7],
		['', 76.0],
		['', 76.5],
		['', 76.0],
		['', 76.0],
		['', 75.55],
		['', 75.8],
		['', 75.8],
		['', 76.0],
		['', 75.55],
		['', 75.55],
		['', 75.55],
		['', 75.6],
		['', 76.75],
		['', 76.7],
		['', 76.75],
		['', 75.65],
		['', 77.0],
		['', 77.0],
		['', 76.7],
		['', 76.7],
		['', 76.7],
		['', 76.0],
		['', 76.5],
		['', 76.1],
		['', 76.0],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.3],
		['', 76.1],
		['', 76.1],
		['', 75.9],
		['', 75.75],
		['', 76.8],
		['', 76.8],
		['', 76.8],
		['', 76.85],
		['', 76.85],
		['', 77.0],
		['', 77.0],
		['', 75.7],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 75.2],
		['', 75.3],
		['', 75.4],
		['', 77.0],
		['', 75.5],
		['', 75.75],
		['', 77.0],
		['', 77.0],
		['', 76.5],
		['', 77.0],
		['', 77.15],
		['', 75.8],
		['', 75.8],
		['', 77.0],
		['', 77.0],
		['', 76.0],
		['', 77.0],
		['', 77.0],
		['', 77.2],
		['', 76.15],
		['', 76.2],
		['', 76.0],
		['', 77.5],
		['', 76.1],
		['', 76.1],
		['', 76.5],
		['', 78.0],
		['', 76.3],
		['', 78.0],
		['', 78.0],
		['', 76.3],
		['', 75.9],
		['', 75.9],
		['', 76.05],
		['', 75.8],
		['', 75.9],
		['', 75.9],
		['', 75.9],
		['', 75.85],
		['', 75.85],
		['', 75.7],
		['', 77.0],
		['', 75.95],
		['', 77.8],
		['', 77.8],
		['', 76.25],
		['', 77.8],
		['', 76.3],
		['', 77.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 77.45],
		['', 77.35],
		['', 77.0],
		['', 76.2],
		['', null],
	]);
	if ($('#tdateschart4').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart4')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2F'],
		['', 75.3],
		['', 75.5],
		['', 75.7],
		['', 75.5],
		['', 75.6],
		['', 75.3],
		['', 75.75],
		['', 76.5],
		['', 75.8],
		['', 76.2],
		['', 76.5],
		['', 77.0],
		['', 77.0],
		['', 76.95],
		['', 75.75],
		['', 76.95],
		['', 77.0],
		['', 77.0],
		['', 76.0],
		['', 76.3],
		['', 77.5],
		['', 75.75],
		['', 77.95],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 77.0],
		['', 77.0],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 75.8],
		['', 76.0],
		['', 77.0],
		['', 76.6],
		['', 76.0],
		['', 76.6],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 77.0],
		['', 77.0],
		['', 76.6],
		['', 76.6],
		['', 76.6],
		['', 76.5],
		['', 76.6],
		['', 76.05],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.05],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.15],
		['', 76.15],
		['', 76.5],
		['', 76.55],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 76.55],
		['', 76.55],
		['', 76.55],
		['', 76.6],
		['', 76.5],
		['', 77.4],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.75],
		['', 77.0],
		['', 75.35],
		['', 76.9],
		['', 76.9],
		['', 75.55],
		['', 75.55],
		['', 76.95],
		['', 75.8],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 75.8],
		['', 76.5],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.5],
		['', 76.5],
		['', 77.0],
		['', 76.7],
		['', 76.8],
		['', 76.95],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 77.0],
		['', 77.0],
		['', 76.85],
		['', 76.5],
		['', 77.25],
		['', 77.2],
		['', 77.2],
		['', 77.3],
		['', 77.4],
		['', 76.6],
		['', 76.4],
		['', 76.0],
		['', 76.9],
		['', 75.0],
		['', 75.2],
		['', 75.0],
		['', 74.9],
		['', 75.0],
		['', 74.9],
		['', 74.3],
		['', 74.15],
		['', 74.5],
		['', 74.7],
		['', 74.5],
		['', 74.5],
		['', 74.8],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.5],
		['', 75.0],
		['', 75.05],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.7],
		['', 75.75],
		['', 75.85],
		['', 75.9],
		['', 75.9],
		['', 76.0],
		['', 76.0],
		['', 77.0],
		['', 75.5],
		['', 77.0],
		['', 76.0],
		['', 77.05],
		['', 77.0],
		['', 76.5],
		['', 77.0],
		['', 76.95],
		['', 79.95],
		['', 78.0],
		['', 78.0],
		['', 78.5],
		['', 78.5],
		['', 76.5],
		['', 77.0],
		['', 77.0],
		['', 78.0],
		['', 78.0],
		['', 77.0],
		['', 78.0],
		['', 78.4],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.1],
		['', 78.1],
		['', 78.1],
		['', 79.0],
		['', 79.4],
		['', 79.5],
		['', 77.5],
		['', 77.6],
		['', 76.55],
		['', 78.0],
		['', 78.0],
		['', 76.4],
		['', 77.5],
		['', 77.5],
		['', 78.0],
		['', 76.8],
		['', 77.0],
		['', 77.1],
		['', 78.9],
		['', 78.8],
		['', 78.9],
		['', 78.9],
		['', 78.9],
		['', 78.3],
		['', 78.0],
		['', 79.0],
		['', 79.0],
		['', 79.0],
		['', 79.0],
		['', 79.0],
		['', 77.2],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 76.85],
		['', 76.5],
		['', 77.0],
		['', 77.1],
		['', 77.0],
		['', 76.8],
		['', 78.0],
		['', 77.5],
		['', 77.5],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 77.5],
		['', 77.5],
		['', 77.6],
		['', 77.05],
		['', 77.5],
		['', 77.3],
		['', 77.9],
		['', 77.9],
		['', 77.9],
		['', 77.5],
		['', 77.5],
		['', 77.5],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.5],
		['', 78.5],
		['', 78.5],
		['', 78.6],
		['', 78.8],
		['', 79.0],
		['', 78.0],
		['', 78.0],
		['', 78.2],
		['', 78.0],
		['', 78.2],
		['', 77.5],
		['', 78.2],
		['', 77.4],
		['', 78.15],
		['', 78.2],
		['', 78.2],
		['', 77.55],
		['', 77.5],
		['', 77.55],
		['', 77.6],
		['', 77.6],
		['', 77.6],
		['', 77.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.8],
		['', 78.5],
		['', 77.1],
		['', 77.1],
		['', 77.1],
		['', 77.1],
		['', 77.6],
		['', 77.5],
		['', 77.5],
		['', 77.3],
		['', 77.25],
		['', 77.4],
		['', 77.4],
		['', 77.25],
		['', 78.0],
		['', 77.4],
		['', 77.3],
		['', 78.1],
		['', 78.0],
		['', 78.0],
		['', 78.1],
		['', 78.1],
		['', 77.4],
		['', 77.45],
		['', 77.5],
		['', 77.4],
		['', 79.0],
		['', 78.95],
		['', 79.0],
		['', 79.0],
		['', 77.5],
		['', 79.0],
		['', 79.45],
		['', 77.65],
		['', 79.3],
		['', 79.3],
		['', 79.3],
		['', 79.3],
		['', 79.25],
		['', 79.3],
		['', 79.3],
		['', 79.3],
		['', 79.3],
		['', 79.4],
		['', 78.0],
		['', 79.0],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 77.85],
		['', 79.75],
		['', 79.0],
		['', 77.9],
		['', 79.0],
		['', 79.0],
		['', 77.5],
		['', 78.0],
		['', 78.95],
		['', 79.3],
		['', 79.0],
		['', 79.0],
		['', 79.0],
		['', 78.0],
		['', 78.95],
		['', 78.95],
		['', 78.95],
		['', 79.0],
		['', 79.2],
		['', 79.2],
		['', 79.1],
		['', 78.5],
		['', 79.9],
		['', 78.5],
		['', 78.7],
		['', 78.7],
		['', 79.3],
		['', 78.75],
		['', 78.75],
		['', 78.7],
		['', 78.75],
		['', 79.2],
		['', 79.15],
		['', 79.15],
		['', 78.7],
		['', null],
	]);
	if ($('#tdateschart5').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart5')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2G'],
		['', 73.0],
		['', 75.0],
		['', 74.5],
		['', 74.5],
		['', 75.0],
		['', 75.0],
		['', 73.0],
		['', 73.3],
		['', 72.5],
		['', 73.5],
		['', 73.45],
		['', 74.9],
		['', 71.2],
		['', 74.45],
		['', 72.3],
		['', 73.0],
		['', 74.0],
		['', 73.0],
		['', 74.75],
		['', 73.0],
		['', 73.05],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.5],
		['', 73.0],
		['', 73.0],
		['', 73.05],
		['', 73.2],
		['', 74.0],
		['', 74.0],
		['', 74.0],
		['', 74.0],
		['', 74.5],
		['', 74.5],
		['', 74.4],
		['', 73.6],
		['', 73.6],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 74.5],
		['', 73.0],
		['', 74.25],
		['', 74.35],
		['', 72.75],
		['', 73.0],
		['', 73.5],
		['', 73.75],
		['', 73.55],
		['', 73.6],
		['', 72.5],
		['', 74.4],
		['', 73.0],
		['', 74.4],
		['', 74.45],
		['', 73.7],
		['', 73.7],
		['', 73.8],
		['', 74.4],
		['', 74.5],
		['', 72.8],
		['', 74.35],
		['', 73.1],
		['', 74.0],
		['', 74.5],
		['', 73.5],
		['', 72.8],
		['', 73.25],
		['', 73.5],
		['', 73.5],
		['', 74.5],
		['', 73.5],
		['', 74.5],
		['', 74.5],
		['', 74.4],
		['', 75.0],
		['', 74.85],
		['', 75.0],
		['', 75.25],
		['', 75.0],
		['', 75.0],
		['', 74.5],
		['', 75.0],
		['', 75.0],
		['', 74.55],
		['', 75.0],
		['', 75.7],
		['', 75.9],
		['', 76.95],
		['', 76.5],
		['', 76.5],
		['', 75.65],
		['', 75.65],
		['', 77.0],
		['', 76.9],
		['', 76.5],
		['', 77.0],
		['', 76.5],
		['', 76.5],
		['', 75.4],
		['', 76.5],
		['', 77.0],
		['', 76.5],
		['', 76.0],
		['', 76.0],
		['', 75.25],
		['', 75.8],
		['', 76.0],
		['', 75.4],
		['', 75.2],
		['', 75.95],
		['', 75.5],
		['', 75.3],
		['', 75.3],
		['', 75.35],
		['', 75.35],
		['', 76.0],
		['', 76.0],
		['', 76.8],
		['', 75.9],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 75.6],
		['', 75.5],
		['', 75.6],
		['', 75.5],
		['', 75.2],
		['', 75.95],
		['', 75.5],
		['', 75.25],
		['', 75.25],
		['', 75.25],
		['', 75.2],
		['', 75.15],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.05],
		['', 75.15],
		['', 75.6],
		['', 75.2],
		['', 75.7],
		['', 75.3],
		['', 75.3],
		['', 75.35],
		['', 75.5],
		['', 75.5],
		['', 75.2],
		['', 75.95],
		['', 76.0],
		['', 75.15],
		['', 75.15],
		['', 75.95],
		['', 75.15],
		['', 75.1],
		['', 75.1],
		['', 75.4],
		['', 75.1],
		['', 75.15],
		['', 75.1],
		['', 75.0],
		['', 75.3],
		['', 75.3],
		['', 75.3],
		['', 75.8],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 75.3],
		['', 75.0],
		['', 75.1],
		['', 75.1],
		['', 75.95],
		['', 75.95],
		['', 75.2],
		['', 76.0],
		['', 75.0],
		['', 75.7],
		['', 75.1],
		['', 75.5],
		['', 76.0],
		['', 75.75],
		['', 75.45],
		['', 76.0],
		['', 75.0],
		['', 75.0],
		['', 74.0],
		['', 74.1],
		['', 74.2],
		['', 74.0],
		['', 73.75],
		['', 74.0],
		['', 75.05],
		['', 75.05],
		['', 75.0],
		['', 75.0],
		['', 74.35],
		['', 75.0],
		['', 75.05],
		['', 75.3],
		['', 75.3],
		['', 75.25],
		['', 75.35],
		['', 75.0],
		['', 75.0],
		['', 75.35],
		['', 75.4],
		['', 75.6],
		['', 75.7],
		['', 76.0],
		['', 75.9],
		['', 75.95],
		['', 75.5],
		['', 75.3],
		['', 76.3],
		['', 75.3],
		['', 76.25],
		['', 76.3],
		['', 76.8],
		['', 76.8],
		['', 75.5],
		['', 75.5],
		['', 76.0],
		['', 76.0],
		['', 76.45],
		['', 77.0],
		['', 75.5],
		['', 75.5],
		['', 77.85],
		['', 77.45],
		['', 75.3],
		['', 76.0],
		['', 76.0],
		['', 75.55],
		['', 76.9],
		['', 76.95],
		['', 75.8],
		['', 76.9],
		['', 76.95],
		['', 76.95],
		['', 75.6],
		['', 75.55],
		['', 76.5],
		['', 75.65],
		['', 75.65],
		['', 75.65],
		['', 76.9],
		['', 76.6],
		['', 75.7],
		['', 75.7],
		['', 76.5],
		['', 75.8],
		['', 76.6],
		['', 76.6],
		['', 76.8],
		['', 75.9],
		['', 76.75],
		['', 75.9],
		['', 76.85],
		['', 76.85],
		['', 76.0],
		['', 76.1],
		['', 76.9],
		['', 76.9],
		['', 76.8],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.5],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.95],
		['', 76.1],
		['', 76.5],
		['', 76.0],
		['', 76.1],
		['', 76.5],
		['', 76.0],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.4],
		['', 76.5],
		['', 76.5],
		['', 76.0],
		['', 76.3],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.6],
		['', 77.75],
		['', 77.45],
		['', 76.15],
		['', 76.15],
		['', 76.1],
		['', 76.05],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 77.0],
		['', 76.5],
		['', 76.5],
		['', 76.7],
		['', 75.15],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 76.0],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.7],
		['', 76.5],
		['', 76.7],
		['', 76.7],
		['', 76.7],
		['', 76.95],
		['', 76.95],
		['', 76.95],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 76.9],
		['', 76.9],
		['', 76.8],
		['', 75.7],
		['', 76.9],
		['', 76.9],
		['', 76.9],
		['', 76.9],
		['', 76.8],
		['', 76.5],
		['', 76.5],
		['', 76.8],
		['', 76.7],
		['', null],
	]);
	if ($('#tdateschart6').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart6')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2H'],
		['', 72.75],
		['', 73.65],
		['', 72.0],
		['', 72.0],
		['', 73.7],
		['', 72.65],
		['', 74.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 73.0],
		['', 72.3],
		['', 73.0],
		['', 73.0],
		['', 73.5],
		['', 73.5],
		['', 73.0],
		['', 73.0],
		['', 72.6],
		['', 73.0],
		['', 72.0],
		['', 73.0],
		['', 73.0],
		['', 72.0],
		['', 73.7],
		['', 73.75],
		['', 73.7],
		['', 71.05],
		['', 73.8],
		['', 73.9],
		['', 73.8],
		['', 73.85],
		['', 73.85],
		['', 73.8],
		['', 74.0],
		['', 73.5],
		['', 74.5],
		['', 72.05],
		['', 74.9],
		['', 74.9],
		['', 74.95],
		['', 74.95],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.95],
		['', 75.0],
		['', 75.0],
		['', 75.8],
		['', 76.0],
		['', 76.2],
		['', 75.0],
		['', 76.3],
		['', 73.1],
		['', 76.5],
		['', 75.05],
		['', 79.0],
		['', 75.6],
		['', 75.5],
		['', 75.55],
		['', 75.55],
		['', 75.5],
		['', 75.6],
		['', 75.6],
		['', 75.6],
		['', 76.95],
		['', 75.05],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.2],
		['', 76.0],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.2],
		['', 75.2],
		['', 75.1],
		['', 75.7],
		['', 75.7],
		['', 76.0],
		['', 75.5],
		['', 75.7],
		['', 75.1],
		['', 75.5],
		['', 75.5],
		['', 75.5],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.1],
		['', 75.15],
		['', 75.15],
		['', 75.15],
		['', 75.15],
		['', 75.15],
		['', 75.15],
		['', 75.05],
		['', 75.05],
		['', 75.1],
		['', 75.2],
		['', 75.2],
		['', 75.3],
		['', 75.3],
		['', 75.45],
		['', 75.45],
		['', 75.3],
		['', 75.5],
		['', 75.65],
		['', 75.8],
		['', 75.8],
		['', 75.7],
		['', 75.95],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.05],
		['', 75.1],
		['', 76.5],
		['', 75.15],
		['', 75.5],
		['', 75.5],
		['', 75.65],
		['', 75.65],
		['', 75.9],
		['', 75.9],
		['', 75.65],
		['', 75.7],
		['', 75.95],
		['', 75.15],
		['', 75.65],
		['', 75.05],
		['', 75.0],
		['', 75.05],
		['', 75.05],
		['', 75.6],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.2],
		['', 76.0],
		['', 76.0],
		['', 76.05],
		['', 76.1],
		['', 76.1],
		['', 76.0],
		['', 76.0],
		['', 76.1],
		['', 76.3],
		['', 76.3],
		['', 76.3],
		['', 76.0],
		['', 75.75],
		['', 76.45],
		['', 75.75],
		['', 75.75],
		['', 74.0],
		['', 74.0],
		['', 75.0],
		['', 74.0],
		['', 74.5],
		['', 74.0],
		['', 74.3],
		['', 74.9],
		['', 74.0],
		['', 74.8],
		['', 74.8],
		['', 75.0],
		['', 74.25],
		['', 75.0],
		['', 74.8],
		['', 76.0],
		['', 74.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.0],
		['', 74.1],
		['', 74.8],
		['', 75.15],
		['', 74.8],
		['', 74.8],
		['', 75.2],
		['', 75.2],
		['', 75.25],
		['', 75.0],
		['', 75.15],
		['', 75.75],
		['', 75.25],
		['', 75.25],
		['', 75.25],
		['', 75.25],
		['', 75.1],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 76.25],
		['', 77.0],
		['', 75.5],
		['', 75.5],
		['', 76.0],
		['', 76.0],
		['', 77.0],
		['', 76.0],
		['', 76.0],
		['', 75.9],
		['', 76.1],
		['', 76.2],
		['', 76.8],
		['', 77.0],
		['', 77.1],
		['', 76.8],
		['', 76.95],
		['', 76.95],
		['', 76.1],
		['', 75.65],
		['', 77.0],
		['', 77.0],
		['', 76.0],
		['', 75.65],
		['', 75.85],
		['', 76.5],
		['', 76.65],
		['', 76.0],
		['', 76.6],
		['', 75.3],
		['', 76.5],
		['', 76.0],
		['', 76.5],
		['', 76.1],
		['', 76.6],
		['', 76.3],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', 76.1],
		['', 77.0],
		['', 77.1],
		['', 77.0],
		['', 76.5],
		['', 76.5],
		['', 76.7],
		['', 76.8],
		['', 76.0],
		['', 76.2],
		['', 76.9],
		['', 77.0],
		['', 77.0],
		['', 77.5],
		['', 76.35],
		['', 76.2],
		['', 76.25],
		['', 76.25],
		['', 76.5],
		['', 76.55],
		['', 76.65],
		['', 76.95],
		['', 76.35],
		['', 76.25],
		['', 76.3],
		['', 76.2],
		['', 76.2],
		['', 0.0],
		['', 76.0],
		['', 76.95],
		['', 76.55],
		['', 76.2],
		['', 76.25],
		['', 76.2],
		['', 76.25],
		['', 76.95],
		['', 76.0],
		['', 76.0],
		['', 75.65],
		['', 75.45],
		['', 75.7],
		['', 75.5],
		['', 75.6],
		['', 75.6],
		['', 75.65],
		['', 78.0],
		['', 78.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 77.0],
		['', 76.1],
		['', 77.3],
		['', 77.0],
		['', 77.0],
		['', 76.8],
		['', 76.8],
		['', 76.8],
		['', 76.8],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 77.2],
		['', 76.5],
		['', 77.0],
		['', 76.5],
		['', 77.0],
		['', 77.5],
		['', 78.0],
		['', 78.0],
		['', 77.0],
		['', 79.0],
		['', 79.0],
		['', 78.95],
		['', 77.0],
		['', 77.0],
		['', 78.9],
		['', 76.85],
		['', 76.6],
		['', 76.85],
		['', 78.9],
		['', 78.9],
		['', 78.9],
		['', 78.5],
		['', 77.5],
		['', 77.0],
		['', 76.8],
		['', 78.5],
		['', 78.9],
		['', 76.8],
		['', 76.8],
		['', 76.8],
		['', 76.5],
		['', 76.5],
		['', 76.45],
		['', 76.5],
		['', 77.05],
		['', 77.2],
		['', 77.0],
		['', 77.95],
		['', 76.95],
		['', 76.95],
		['', 76.95],
		['', 78.0],
		['', 78.85],
		['', 78.85],
		['', 78.0],
		['', 77.0],
		['', 77.1],
		['', 77.0],
		['', 77.1],
		['', 77.15],
		['', 77.5],
		['', 77.15],
		['', null],
	]);
	if ($('#tdateschart7').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart7')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2I'],
		['', 73.7],
		['', 73.75],
		['', 73.75],
		['', 74.0],
		['', 73.0],
		['', 73.0],
		['', 72.0],
		['', 73.0],
		['', 73.0],
		['', 73.7],
		['', 73.7],
		['', 73.7],
		['', 73.7],
		['', 73.7],
		['', 74.0],
		['', 74.0],
		['', 74.5],
		['', 74.5],
		['', 74.5],
		['', 74.6],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.0],
		['', 74.5],
		['', 74.5],
		['', 74.6],
		['', 74.85],
		['', 75.95],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 75.5],
		['', 75.6],
		['', 75.7],
		['', 76.4],
		['', 76.5],
		['', 77.0],
		['', 76.0],
		['', 76.5],
		['', 76.5],
		['', 76.95],
		['', 76.95],
		['', 76.9],
		['', 76.55],
		['', 76.55],
		['', 76.95],
		['', 76.0],
		['', 76.5],
		['', 76.75],
		['', 76.6],
		['', 76.6],
		['', 76.4],
		['', 75.5],
		['', 75.6],
		['', 76.6],
		['', 76.0],
		['', 75.6],
		['', 76.5],
		['', 76.5],
		['', 75.65],
		['', 76.0],
		['', 75.65],
		['', 75.7],
		['', 75.65],
		['', 76.0],
		['', 75.5],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.6],
		['', 75.7],
		['', 75.7],
		['', 76.6],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.7],
		['', 75.8],
		['', 75.7],
		['', 75.7],
		['', 75.0],
		['', 75.05],
		['', 75.05],
		['', 75.2],
		['', 75.3],
		['', 75.2],
		['', 75.2],
		['', 75.15],
		['', 75.15],
		['', 75.5],
		['', 75.2],
		['', 75.15],
		['', 75.5],
		['', 75.5],
		['', 75.3],
		['', 75.95],
		['', 76.0],
		['', 76.8],
		['', 76.8],
		['', 76.1],
		['', 76.0],
		['', 76.75],
		['', 76.75],
		['', 75.2],
		['', 75.2],
		['', 77.0],
		['', 75.2],
		['', 75.2],
		['', 75.2],
		['', 75.4],
		['', 75.0],
		['', 75.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.2],
		['', 76.0],
		['', 75.3],
		['', 76.5],
		['', 75.3],
		['', 76.0],
		['', 76.0],
		['', 75.7],
		['', 75.7],
		['', 75.2],
		['', 76.0],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', 75.25],
		['', 75.9],
		['', 75.3],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 77.0],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.2],
		['', 76.2],
		['', 75.2],
		['', 76.2],
		['', 76.0],
		['', 76.9],
		['', 76.85],
		['', 76.85],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 74.9],
		['', 74.8],
		['', 74.0],
		['', 74.0],
		['', 74.5],
		['', 74.0],
		['', 74.8],
		['', 74.85],
		['', 74.7],
		['', 74.75],
		['', 75.0],
		['', 74.75],
		['', 74.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 75.0],
		['', 75.5],
		['', 75.5],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.0],
		['', 75.5],
		['', 76.5],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.5],
		['', 76.9],
		['', 76.95],
		['', 76.95],
		['', 76.0],
		['', 76.0],
		['', 77.5],
		['', 77.5],
		['', 77.5],
		['', 78.9],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.45],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.3],
		['', 78.3],
		['', 79.0],
		['', 78.35],
		['', 78.35],
		['', 78.3],
		['', 76.5],
		['', 77.0],
		['', 77.8],
		['', 77.25],
		['', 78.9],
		['', 78.3],
		['', 78.3],
		['', 78.5],
		['', 79.0],
		['', 79.0],
		['', 79.0],
		['', 78.3],
		['', 78.3],
		['', 78.3],
		['', 78.3],
		['', 78.3],
		['', 78.3],
		['', 78.5],
		['', 79.0],
		['', 78.3],
		['', 79.0],
		['', 79.0],
		['', 78.95],
		['', 78.3],
		['', 78.5],
		['', 78.5],
		['', 78.5],
		['', 78.5],
		['', 77.9],
		['', 78.0],
		['', 78.5],
		['', 79.0],
		['', 75.75],
		['', 76.0],
		['', 76.2],
		['', 76.5],
		['', 76.0],
		['', 75.95],
		['', 75.8],
		['', 76.1],
		['', 76.2],
		['', 76.3],
		['', 76.3],
		['', 78.0],
		['', 78.95],
		['', 78.9],
		['', 78.6],
		['', 78.85],
		['', 76.35],
		['', 78.95],
		['', 78.0],
		['', 78.9],
		['', 78.6],
		['', 78.6],
		['', 78.5],
		['', 78.0],
		['', 76.7],
		['', 78.0],
		['', 78.0],
		['', 77.0],
		['', 77.0],
		['', 76.5],
		['', 76.05],
		['', 76.2],
		['', 76.9],
		['', 76.9],
		['', 76.8],
		['', 77.1],
		['', 77.25],
		['', 77.0],
		['', 77.5],
		['', 77.0],
		['', 77.8],
		['', 77.8],
		['', 78.2],
		['', 78.95],
		['', 77.5],
		['', 76.6],
		['', 78.85],
		['', 76.8],
		['', 76.8],
		['', 77.0],
		['', 77.0],
		['', 76.75],
		['', 77.0],
		['', 77.0],
		['', 76.7],
		['', 78.8],
		['', 76.9],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 78.6],
		['', 77.0],
		['', 77.75],
		['', 78.7],
		['', 78.0],
		['', 76.9],
		['', 76.95],
		['', 77.0],
		['', 77.0],
		['', 78.9],
		['', 78.9],
		['', 78.9],
		['', 78.9],
		['', 77.1],
		['', 78.5],
		['', 78.5],
		['', 77.35],
		['', 77.4],
		['', 77.6],
		['', 78.5],
		['', 78.95],
		['', 77.8],
		['', 77.8],
		['', 79.0],
		['', 78.0],
		['', 79.0],
		['', 77.85],
		['', 78.5],
		['', 78.95],
		['', 78.95],
		['', 79.0],
		['', 78.95],
		['', 78.95],
		['', 78.95],
		['', 78.0],
		['', 78.0],
		['', 78.9],
		['', 78.9],
		['', 78.9],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 79.5],
		['', 78.7],
		['', 77.1],
		['', 77.25],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.0],
		['', 78.95],
		['', 78.5],
		['', null],
	]);
	if ($('#tdateschart8').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart8')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2J'],
		['', 77.0],
		['', 77.05],
		['', 76.95],
		['', 76.9],
		['', 76.85],
		['', 76.5],
		['', 76.5],
		['', 76.4],
		['', 76.2],
		['', 76.0],
		['', 76.2],
		['', 76.1],
		['', 76.5],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.0],
		['', 76.1],
		['', 76.1],
		['', 76.1],
		['', 76.5],
		['', 76.15],
		['', 76.5],
		['', 76.0],
		['', 76.8],
		['', 75.2],
		['', 75.2],
		['', 75.6],
		['', 75.5],
		['', 75.3],
		['', 75.5],
		['', 75.7],
		['', 76.0],
		['', 76.0],
		['', 76.1],
		['', 75.4],
		['', 76.0],
		['', 75.1],
		['', 75.5],
		['', 75.5],
		['', 76.0],
		['', 75.5],
		['', 76.0],
		['', 76.0],
		['', 76.0],
		['', 76.2],
		['', 76.2],
		['', 76.3],
		['', 76.45],
		['', 76.45],
		['', 76.45],
		['', 76.05],
		['', 76.3],
		['', 76.3],
		['', 76.05],
		['', 76.2],
		['', 76.05],
		['', 76.05],
		['', 76.3],
		['', 76.2],
		['', 76.05],
		['', 76.25],
		['', 76.2],
		['', 76.4],
		['', 76.8],
		['', 76.75],
		['', 77.0],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 77.0],
		['', 77.0],
		['', 76.2],
		['', 77.0],
		['', 76.25],
		['', 76.25],
		['', 76.5],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.25],
		['', 76.95],
		['', 76.25],
		['', 76.25],
		['', 76.6],
		['', 76.25],
		['', 76.25],
		['', 76.95],
		['', 76.6],
		['', 76.0],
		['', 76.2],
		['', 76.8],
		['', 76.15],
		['', 77.0],
		['', 77.1],
		['', 77.0],
		['', 76.65],
		['', 77.0],
		['', 77.0],
		['', 76.95],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 76.9],
		['', 77.0],
		['', 77.0],
		['', 76.9],
		['', 77.0],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
	]);
	if ($('#tdateschart9').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart9')
		);
		chart.draw(data, options);
	}

	var data = new google.visualization.arrayToDataTable([
		['Date', 'SMC2K'],
		['', 75.0],
		['', 75.0],
		['', 75.1],
		['', 76.0],
		['', 75.0],
		['', 75.05],
		['', 75.05],
		['', 75.6],
		['', 75.05],
		['', 76.0],
		['', 75.3],
		['', 75.5],
		['', 75.5],
		['', 76.2],
		['', 76.5],
		['', 76.0],
		['', 76.25],
		['', 76.1],
		['', 76.0],
		['', 76.25],
		['', 76.0],
		['', 76.25],
		['', 76.25],
		['', 76.0],
		['', 76.0],
		['', 76.1],
		['', 76.1],
		['', 76.05],
		['', 76.2],
		['', 76.25],
		['', 76.1],
		['', 76.1],
		['', 76.2],
		['', 76.25],
		['', 76.1],
		['', 76.3],
		['', 76.25],
		['', 76.25],
		['', 76.4],
		['', 76.45],
		['', 76.25],
		['', 76.8],
		['', 76.5],
		['', 76.3],
		['', 76.2],
		['', 76.5],
		['', 76.75],
		['', 76.85],
		['', 76.5],
		['', 76.8],
		['', 76.25],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.2],
		['', 76.5],
		['', 76.2],
		['', 76.2],
		['', 77.1],
		['', 75.05],
		['', 76.95],
		['', 76.25],
		['', 76.2],
		['', 76.7],
		['', 75.5],
		['', 75.5],
		['', 76.7],
		['', 75.6],
		['', 76.0],
		['', 76.0],
		['', 75.9],
		['', 76.5],
		['', 76.1],
		['', 76.95],
		['', 76.2],
		['', 76.55],
		['', 77.0],
		['', 77.0],
		['', 77.0],
		['', 76.55],
		['', 76.55],
		['', 77.0],
		['', 77.1],
		['', 77.1],
		['', 77.1],
		['', 77.0],
		['', 75.8],
		['', 76.0],
		['', 76.0],
		['', 77.0],
		['', 76.0],
		['', 76.0],
		['', 75.8],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
		['', null],
	]);
	if ($('#tdateschart10').length > 0) {
		var chart = new google.visualization.LineChart(
			document.getElementById('tdateschart10')
		);
		chart.draw(data, options);
	}
}

$(document).ready(function ($) {
	$('.tdate').eq(0).addClass('active');
	$('.tab__source span').eq(0).addClass('active');
	$('body').on('click', '.tab__source span', function () {
		$('.tab__source span').removeClass('active');
		var ii = $(this).index();
		$('.tdate').removeClass('active');

		$('.tab__source span').eq(ii).addClass('active');
		$('.tdate').eq(ii).addClass('active');
	});
});
