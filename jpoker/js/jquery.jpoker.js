//
//     Copyright (C) 2008 Johan Euphrosine <proppy@aminche.com>
//     Copyright (C) 2008 Loic Dachary <loic@dachary.org>
//     Copyright (C) 2008 Saq Imtiaz <lewcid@gmail.com>
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

(function($) {

    if(!String.prototype.supplant) {
        //
        // Douglas Crockford douglas@crockford.com snippet
        //
        String.prototype.supplant = function (o) {
            return this.replace(/{([^{}]*)}/g,
                                function (a, b) {
                                    var r = o[b];
                                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                                }
                                );
        };
    }

    $.fn.jpoker = function() {
        var args = Array.prototype.slice.call(arguments);
        var name = args.shift();
        $.jpoker.plugins[name].apply(this, args);
    };

    $.jpoker = {

        packetName2Type: { NONE: 0, STRING: 1, INT: 2, ERROR: 3, ACK: 4, PING: 5, SERIAL: 6, QUIT: 7, AUTH_OK: 8, AUTH_REFUSED: 9, LOGIN: 10, AUTH_REQUEST: 11, LIST: 12, LOGOUT: 13, BOOTSTRAP: 14, PROTOCOL_ERROR: 15, MESSAGE: 16, POKER_SEATS: 50, POKER_ID: 51, POKER_MESSAGE: 52, ERROR: 53, POKER_POSITION: 54, POKER_INT: 55, POKER_BET: 56, POKER_FOLD: 57, POKER_STATE: 58, POKER_WIN: 59, POKER_CARDS: 60, POKER_PLAYER_CARDS: 61, POKER_BOARD_CARDS: 62, POKER_CHIPS: 63, POKER_PLAYER_CHIPS: 64, POKER_CHECK: 65, POKER_START: 66, POKER_IN_GAME: 67, POKER_CALL: 68, POKER_RAISE: 69, POKER_DEALER: 70, POKER_TABLE_JOIN: 71, POKER_TABLE_SELECT: 72, POKER_TABLE: 73, POKER_TABLE_LIST: 74, POKER_SIT: 75, POKER_TABLE_DESTROY: 76, POKER_TIMEOUT_WARNING: 77, POKER_TIMEOUT_NOTICE: 78, POKER_SEAT: 79, POKER_TABLE_MOVE: 80, POKER_PLAYER_LEAVE: 81, POKER_SIT_OUT: 82, POKER_TABLE_QUIT: 83, POKER_BUY_IN: 84, POKER_REBUY: 85, POKER_CHAT: 86, POKER_PLAYER_INFO: 87, POKER_PLAYER_ARRIVE: 88, POKER_HAND_SELECT: 89, POKER_HAND_LIST: 90, POKER_HAND_SELECT_ALL: 91, POKER_USER_INFO: 92, POKER_GET_USER_INFO: 93, POKER_ANTE: 94, POKER_BLIND: 95, POKER_WAIT_BIG_BLIND: 96, POKER_AUTO_BLIND_ANTE: 97, POKER_NOAUTO_BLIND_ANTE: 98, POKER_CANCELED: 99, POKER_BLIND_REQUEST: 100, POKER_ANTE_REQUEST: 101, POKER_AUTO_FOLD: 102, POKER_WAIT_FOR: 103, POKER_STREAM_MODE: 104, POKER_BATCH_MODE: 105, POKER_LOOK_CARDS: 106, POKER_TABLE_REQUEST_PLAYERS_LIST: 107, POKER_PLAYERS_LIST: 108, POKER_PERSONAL_INFO: 109, POKER_GET_PERSONAL_INFO: 110, POKER_TOURNEY_SELECT: 111, POKER_TOURNEY: 112, POKER_TOURNEY_INFO: 113, POKER_TOURNEY_LIST: 114, POKER_TOURNEY_REQUEST_PLAYERS_LIST: 115, POKER_TOURNEY_REGISTER: 116, POKER_TOURNEY_UNREGISTER: 117, POKER_TOURNEY_PLAYERS_LIST: 118, POKER_HAND_HISTORY: 119, POKER_SET_ACCOUNT: 120, POKER_CREATE_ACCOUNT: 121, POKER_PLAYER_SELF: 122, POKER_GET_PLAYER_INFO: 123, POKER_ROLES: 124, POKER_SET_ROLE: 125, POKER_READY_TO_PLAY: 126, POKER_PROCESSING_HAND: 127, POKER_MUCK_REQUEST: 128, POKER_AUTO_MUCK: 129, POKER_MUCK_ACCEPT: 130, POKER_MUCK_DENY: 131, POKER_CASH_IN: 132, POKER_CASH_OUT: 133, POKER_CASH_OUT_COMMIT: 134, POKER_CASH_QUERY: 135, POKER_RAKE: 136, POKER_TOURNEY_RANK: 137, POKER_PLAYER_IMAGE: 138, POKER_GET_PLAYER_IMAGE: 139, POKER_HAND_REPLAY: 140, POKER_GAME_MESSAGE: 141, POKER_EXPLAIN: 142, POKER_STATS_QUERY: 143, POKER_STATS: 144, PACKET_POKER_BEST_CARDS: 170, PACKET_POKER_POT_CHIPS: 171, PACKET_POKER_CLIENT_ACTION: 172, PACKET_POKER_BET_LIMIT: 173, POKER_SIT_REQUEST: 174, POKER_PLAYER_NO_CARDS: 175, PACKET_POKER_CHIPS_PLAYER2BET: 176, PACKET_POKER_CHIPS_BET2POT: 177, PACKET_POKER_CHIPS_POT2PLAYER: 178, PACKET_POKER_CHIPS_POT_MERGE: 179, POKER_CHIPS_POT_RESET: 180, POKER_CHIPS_BET2PLAYER: 181, POKER_END_ROUND: 182, PACKET_POKER_DISPLAY_NODE: 183, PACKET_POKER_DEAL_CARDS: 184, POKER_CHAT_HISTORY: 185, POKER_DISPLAY_CARD: 186, POKER_SELF_IN_POSITION: 187, POKER_SELF_LOST_POSITION: 188, POKER_HIGHEST_BET_INCREASE: 189, POKER_PLAYER_WIN: 190, POKER_ANIMATION_PLAYER_NOISE: 191, POKER_ANIMATION_PLAYER_FOLD: 192, POKER_ANIMATION_PLAYER_BET: 193, POKER_ANIMATION_PLAYER_CHIPS: 194, POKER_ANIMATION_DEALER_CHANGE: 195, POKER_ANIMATION_DEALER_BUTTON: 196, POKER_BEGIN_ROUND: 197, POKER_CURRENT_GAMES: 198, POKER_END_ROUND_LAST: 199, POKER_PYTHON_ANIMATION: 200, POKER_SIT_OUT_NEXT_TURN: 201, POKER_RENDERER_STATE: 202, POKER_CHAT_WORD: 203, POKER_SHOWDOWN: 204, POKER_CLIENT_PLAYER_CHIPS: 205, POKER_INTERFACE_COMMAND: 206, POKER_PLAYER_ME_LOOK_CARDS: 207, POKER_PLAYER_ME_IN_FIRST_PERSON: 208, POKER_ALLIN_SHOWDOWN: 209 },

        verbose: 0,

        serial: (new Date()).getTime(),

        servers: {},

        url2hashCache: {},

        uninit: function() {
            $.each(this.servers,
                   function(key, value) {
                       value.uninit();
                   });
            this.servers = {};
        },

        now: function() { return (new Date()).getTime(); },

        uid: function() { return 'jpoker' + $.jpoker.serial++ ; },

        message: function(str) {
            if(window.console) { window.console.log(str); }
        },

        dialog: function(element) {
            humanMsg.displayMsg(element);
        },

        error: function(reason) {
            this.errorHandler(reason);
            this.uninit();
            throw reason;
        },

        errorHandler: function(reason) {
            this.message(reason);
        },

        serverCreate: function(options) {
            this.servers[options.url] = new jpoker.server(options);
            return this.servers[options.url];
        },

        serverDestroy: function(url) {
            this.servers[url].uninit();
            delete this.servers[url];
        },

        url2server: function(options) {
	    if(!(options.url in this.servers)) {
		this.serverCreate(options);
	    }
	    return this.servers[options.url];
	},

        url2hash: function(url) {
            if(!(url in this.url2hashCache)) {
                this.url2hashCache[url] = jpoker.Crypto.hexSha1Str(url);
            }
            return this.url2hashCache[url];
        }
        
    };

    var jpoker = $.jpoker;

    //--
    //-- Crypto functions and associated conversion routines
    //--

    //
    // Copyright (c) UnaMesa Association 2004-2007
    // 
    // Licensed under Modified BSD
    //

    // Crypto namespace
    jpoker.Crypto = function() {};

    // Convert a string to an array of big-endian 32-bit words
    jpoker.Crypto.strToBe32s = function(str)
        {
            var be = Array();
            var len = Math.floor(str.length/4);
            var i, j;
            for(i=0, j=0; i<len; i++, j+=4) {
		be[i] = ((str.charCodeAt(j)&0xff) << 24)|((str.charCodeAt(j+1)&0xff) << 16)|((str.charCodeAt(j+2)&0xff) << 8)|(str.charCodeAt(j+3)&0xff);
            }
            while (j<str.length) {
		be[j>>2] |= (str.charCodeAt(j)&0xff)<<(24-(j*8)%32);
		j++;
            }
            return be;
        };

    // Convert an array of big-endian 32-bit words to a string
    jpoker.Crypto.be32sToStr = function(be)
        {
            var str = '';
            for(var i=0;i<be.length*32;i+=8) {
		str += String.fromCharCode((be[i>>5]>>>(24-i%32)) & 0xff);
            }
            return str;
        };

    // Convert an array of big-endian 32-bit words to a hex string
    jpoker.Crypto.be32sToHex = function(be)
        {
            var hex = '0123456789ABCDEF';
            var str = '';
            for(var i=0;i<be.length*4;i++) {
		str += hex.charAt((be[i>>2]>>((3-i%4)*8+4))&0xF) + hex.charAt((be[i>>2]>>((3-i%4)*8))&0xF);
            }
            return str;
        };

    // Return, in hex, the SHA-1 hash of a string
    jpoker.Crypto.hexSha1Str = function(str)
        {
            return jpoker.Crypto.be32sToHex(jpoker.Crypto.sha1Str(str));
        };

    // Return the SHA-1 hash of a string
    jpoker.Crypto.sha1Str = function(str)
        {
            return jpoker.Crypto.sha1(jpoker.Crypto.strToBe32s(str),str.length);
        };

    // Calculate the SHA-1 hash of an array of blen bytes of big-endian 32-bit words
    jpoker.Crypto.sha1 = function(x,blen)
        {
            // Add 32-bit integers, wrapping at 32 bits
            add32 = function(a,b)
            {
		var lsw = (a&0xFFFF)+(b&0xFFFF);
		var msw = (a>>16)+(b>>16)+(lsw>>16);
		return (msw<<16)|(lsw&0xFFFF);
            };
            // Add five 32-bit integers, wrapping at 32 bits
            add32x5 = function(a,b,c,d,e)
            {
		var lsw = (a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF);
		var msw = (a>>16)+(b>>16)+(c>>16)+(d>>16)+(e>>16)+(lsw>>16);
		return (msw<<16)|(lsw&0xFFFF);
            };
            // Bitwise rotate left a 32-bit integer by 1 bit
            rol32 = function(n)
            {
		return (n>>>31)|(n<<1);
            };

            var len = blen*8;
            // Append padding so length in bits is 448 mod 512
            x[len>>5] |= 0x80 << (24-len%32);
            // Append length
            x[((len+64>>9)<<4)+15] = len;
            var w = Array(80);

            var k1 = 0x5A827999;
            var k2 = 0x6ED9EBA1;
            var k3 = 0x8F1BBCDC;
            var k4 = 0xCA62C1D6;

            var h0 = 0x67452301;
            var h1 = 0xEFCDAB89;
            var h2 = 0x98BADCFE;
            var h3 = 0x10325476;
            var h4 = 0xC3D2E1F0;

            for(var i=0;i<x.length;i+=16) {
		var j,t;
		var a = h0;
		var b = h1;
		var c = h2;
		var d = h3;
		var e = h4;
		for(j = 0;j<16;j++) {
                    w[j] = x[i+j];
                    t = add32x5(e,(a>>>27)|(a<<5),d^(b&(c^d)),w[j],k1);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=16;j<20;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),d^(b&(c^d)),w[j],k1);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=20;j<40;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),b^c^d,w[j],k2);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=40;j<60;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),(b&c)|(d&(b|c)),w[j],k3);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}
		for(j=60;j<80;j++) {
                    w[j] = rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16]);
                    t = add32x5(e,(a>>>27)|(a<<5),b^c^d,w[j],k4);
                    e=d; d=c; c=(b>>>2)|(b<<30); b=a; a = t;
		}

		h0 = add32(h0,a);
		h1 = add32(h1,b);
		h2 = add32(h2,c);
		h3 = add32(h3,d);
		h4 = add32(h4,e);
            }
            return Array(h0,h1,h2,h3,h4);
        };


    //
    // Abstract prototype for all objects that
    // call destroy and update callbacks
    //
    jpoker.watchable = function(options) {
        $.extend(this, jpoker.watchable.defaults, options);
        this.init();
    };

    jpoker.watchable.defaults = {
    };

    jpoker.watchable.prototype = {

        init: function() {
            this.setCallbacks();
        },

        uninit: function() {
            this.notifyDestroy();
            this.setCallbacks();
        },

        setCallbacks: function() {
            this.callbacks = {
                destroy: [],
                update: []
            };
        },

        notify: function(what, data) {
            var result = [];
            var l = this.callbacks[what];
            for(var i = 0; i < l.length; i++) {
                if(l[i](this, data)) {
                    result.push(l[i]);
                }
            }
            this.callbacks[what] = result;
        },

        notifyUpdate: function(data) { this.notify('update', data); },
        notifyDestroy: function(data) { this.notify('destroy', data); },

        register: function(what, callback, callback_data, signature) {
            if($.inArray(callback, this.callbacks[what]) < 0) {
                var wrapper = function($this, data) {
                    return callback($this, data, callback_data);
                };
                wrapper.signature = signature || callback;
                this.callbacks[what].push(wrapper);
            }
        },

        registerUpdate: function(callback, callback_data, signature) { this.register('update', callback, callback_data, signature); },
        registerDestroy: function(callback, callback_data, signature) { this.register('destroy', callback, callback_data, signature); },

        unregister: function(what, signature) {
            this.callbacks[what] = $.grep(this.callbacks[what],
                                          function(e, i) { return e.signature != signature; });
        },

        unregisterUpdate: function(callback) { this.unregister('update', callback); },
        unregisterDestroy: function(callback) { this.unregister('destroy', callback); }

    };

    //
    // Abstract prototype to manage the communication with a single poker server
    //
    jpoker.connection = function(options) {
        $.extend(this, jpoker.connection.defaults, options);
        this.init();
    };

    jpoker.connection.defaults = $.extend({
            mode: 'queue',
            url: '',
            async: true,
            lagmax: 60,
            pollFrequency:  100,
            pingFrequency: 5000,
            timeout: 30000,
            clearTimeout: function(id) { return window.clearTimeout(id); },
            setTimeout: function(cb, delay) { return window.setTimeout(cb, delay); },
            ajax: function(o) { return jQuery.ajax(o); }
        }, jpoker.watchable.defaults);

    jpoker.connection.prototype = $.extend({}, jpoker.watchable.prototype, {

            blocked: false,

            session: 'clear',

            state: 'disconnected',

            lag: 0,

            high: ['PacketPokerChat', 'PacketPokerMessage', 'PacketPokerGameMessage'],

            incomingTimer: -1,

            pingTimer: -1,

            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.handlers = {};
                this.queues = {};
                this.delays = {};
                this.reset();
            },

            uninit: function() {
                this.blocked = true;
                jpoker.watchable.prototype.uninit.call(this);
                this.reset();
            },

            clearSession: function() {
                this.session = 'session=clear&name=' + jpoker.url2hash(this.url);
            },

            ensureSession: function() {
                this.session = 'session=yes&name=' + jpoker.url2hash(this.url);
            },

            reset: function() {
                this.clearTimeout(this.pingTimer);
                this.pingTimer = -1;
                this.clearTimeout(this.incomingTimer);
                this.incomingTimer = -1;
                // empty the outgoing queue
                jQuery([$.ajax_queue]).queue('ajax', []);
                // empty the incoming queue
                this.queues = {};
                this.delays = {};
                this.clearSession();
            },

            error: function(reason) {
                this.reset();
                this.handlers = {};
                this.setState('disconnected');
                jpoker.error(reason);
            },

            setState: function(state) {
                if(this.state != state) {
                    this.state = state;
                    this.notifyUpdate({type: 'PacketState', state: state});
                }
            },

            connected: function() {
                return this.state == 'connected';
            },

            //
            // Call 'handler' for each packet sent to the poker game 'id'
            // If id == 0, 'handler' is called for each packet not associated with
            // a poker game.
            //
            // Prototype: handler(server, id, packet) returns a boolean
            //
            // server: the $.jpoker.server instance connected to the server from
            //        which the packet was received
            // id: is 0 if the packet is not associated to a poker game or the serial
            //     number of the poker game
            // packet: is the packet received from the server
            // 
            // If the return value is false, the handler is discarded and will not
            // be called again. If the return value is true, the handler is retained
            // and will be called when the next packet matching the 'id' paramater
            // arrives.
            //
            // If the handler throws an exception, the server will be killed and
            // all communications interrupted. The handler must *not* call server.error.
            //
            registerHandler: function(id, handler) {
                if(!(id in this.handlers)) {
                    this.handlers[id] = [];
                }
                this.handlers[id].push(handler);
            },

            unregisterHandler: function(id, handler) {
                if(id in this.handlers) {
                    this.handlers[id] = $.grep(this.handlers[id],
                                               function(e, i) { return e != handler; });
                    if(this.handlers[id].length <= 0) {
                        delete this.handlers[id];
                    }
                }
            },

            handle: function(id, packet) {
                if(id in this.handlers) {
                    var $this = this;
                    this.handlers[id] = $.grep(this.handlers[id], function(element, index) {
                            try {
                                return element($this, id, packet);
                            } catch(e) {
                                $this.error(e);
                                return false; // error will throw anyways
                            }
                        });
                }
            },

            delayQueue: function(id, time) {
                this.delays[id] = time;
            },

            noDelayQueue: function(id) {
                if(id in this.delays) {
                    delete this.delays[id];
                }
            },

            // null => no delay
            handleDelay: function(id) {
                if(id in this.delays) {
                    return this.delays[id];
                } else {
                    return null;
                }
            },

            sendPacket: function(packet) {
                var $this = this;
                var json_data = JSON.stringify(packet);
                if(jpoker.verbose > 0) {
                    jpoker.message('sendPacket ' + json_data);
                }
                var args = {
                    async: this.async,
                    data: json_data,
                    mode: this.mode,
                    timeout: this.timeout,
                    url: this.url + '?' + this.session,
                    type: 'POST',
                    dataType: 'json',
                    global: false, // do not fire global events
                    success: function(data, status) {
                        if($this.state != 'connected') {
                            $this.setState('connected');
                        }
                        $this.queueIncoming(data);
                    },
                    error: function(xhr, status, error) {
                        if(status == 'timeout') {
                            $this.setState('disconnected');
                            $this.reset();
                        } else {
                            $this.error({ xhr: xhr,
                                          status: status,
                                          error: error
                                });
                        }
                    }
                };
                this.ajax(args);
            },

            ping: function() {
                if(jQuery([$.ajax_queue]).queue('ajax').length <= 0) {
                    this.sendPacket({ type: 'PacketPing' });
                }
                this.clearTimeout(this.pingTimer);
                var $this = this;
                this.pingTimer = this.setTimeout(function() {
                        $this.ping();
                    }, this.pingFrequency);
            },

            pinging: function() { return this.pingTimer >= 0; },

            queueIncoming: function(packets) {
                if(!this.blocked) {
                    for(var i = 0; i < packets.length; i++) {
                        packet = packets[i];
                        if('session' in packet) {
                            delete packet.session;
                        }
                        packet.time__ = jpoker.now();
                        var id;
                        if('game_id' in packet) {
                            id = packet.game_id;
                        } else {
                            id = 0;
                        }
                        if(!(id in this.queues)) {
                            this.queues[id] = { 'high': {'packets': [],
                                                         'delay': 0 },
                                                'low': {'packets': [],
                                                        'delay': 0 } };
                        }
                        if(jQuery.inArray(packet.type, this.high) >= 0) {
                            queue = this.queues[id].high;
                        } else {
                            queue = this.queues[id].low;
                        }
                        queue.packets.push(packet);
                        if(jpoker.verbose > 1) {
                            jpoker.message('queueIncoming ' + JSON.stringify(packet));
                        }
                    }
                    this.clearTimeout(this.incomingTimer);
                    var $this = this;
                    this.incomingTimer = this.setTimeout(function() {
                            $this.dequeueIncoming(); },
                        this.pollFrequency);
                }
            },

            dequeueIncoming: function() {
                if(!this.blocked) {
                    now = jpoker.now();
                    this.lag = 0;
                    for(var id in this.queues) {
                        for(var priority in this.queues[id]) {
                            queue = this.queues[id][priority];
                            if(queue.packets.length <= 0) {
                                continue;
                            }
                            lag = now - queue.packets[0].time__;
                            this.lag = this.lag > lag ? this.lag : lag;
                            if(queue.delay > now && lag > this.lagmax) {
                                queue.delay = 0;
                            }
                            if(queue.delay <= now) {
                                delay = this.handleDelay(id);
                                if(lag > this.lagmax || delay === null || delay <= now) {
                                    packet = queue.packets.shift();
                                    delete packet.time__;
                                    this.handle(id, packet);
                                } else {
                                    queue.delay = delay;
                                }
                            } else if(jpoker.verbose > 0) {
                                jpoker.message(_("wait for {delay}s for queue {id}").supplant({ 'delay': queue.delay / 1000.0, 'id': id}));
                            }
                        }
                        //
                        // get rid of queues with no associated delay AND no pending packets.
                        // this.queues may be undefined if a handler destroyed the object
                        //
                        if(id in this.queues) {
                            queue = this.queues[id];
                            if(queue.high.packets.length <= 0 && queue.low.packets.length <= 0) {
                                if(queue.high.delay <= now && queue.low.delay <= now) {
                                    delete this.queues[id];
                                }
                            }
                        }
                    }
                }
                var empty = true;
                for(var j in this.queues) {
                    empty = false;
                    break;
                }
                this.clearTimeout(this.incomingTimer);
                if(!empty) {
                    var $this = this;
                    this.incomingTimer = this.setTimeout(function() {
                            $this.dequeueIncoming(); },
                        this.pollFrequency);
                }
            }

        });

    //
    // server
    //
    jpoker.server = function(options) {
        $.extend(this, jpoker.server.defaults, options);
        this.init();
    };

    jpoker.server.defaults = $.extend({
	    playersCount: null,
	    tablesCount: null,
            tableRowClick: function(server, packet) {},
            setInterval: function(cb, delay) { return window.setInterval(cb, delay); },
            clearInterval: function(id) { return window.clearInterval(id); }
        }, jpoker.connection.defaults);

    jpoker.server.prototype = $.extend({}, jpoker.connection.prototype, {
            init: function() {
                jpoker.connection.prototype.init.call(this);
                this.tables = {};
                this.tableLists = {};
                this.timers = {};
                this.serial = 0;
                this.logname = null;
                this.registerHandler(0, this.handler);
            },

            uninit: function() {
                this.clearTimers();
                this.unregisterHandler(0, this.handler);
                jpoker.connection.prototype.uninit.call(this);
            },

            clearTimers: function() {
                var $this = this;
                $.each(this.timers, function(key, value) {
                        $this.clearInterval(value.timer);
                    });
                this.timers = {};
            },

            handler: function(server, id, packet) {
                if(jpoker.verbose) {
                    jpoker.message('server.handler ' + JSON.stringify(packet));
                }

                switch(packet.type) {

                case 'PacketPokerTable':
                if(packet.id in server.tables) {
                    throw 'table id ' + packet.id + ' matches an existing table';
                }
                server.tables[packet.id] = new jpoker.table(server, packet);
                server.notifyUpdate(packet);
                break;

                }

                return true;
            },

            refresh: function(tag, request, handler, options) {
                if(tag in this.timers) {
                    this.clearInterval(this.timers[tag].timer);
                } else {
                    this.timers[tag] = {};
                }
                var timer = jpoker.refresh(this, request, handler, options);
                this.timers[tag].timer = timer;
                return timer;
            },

            //
            // tables lists
            //
            refreshTables: function(string, options) {

                if(!(string in this.tables)) {
                    this.tableLists[string] = {};
                }

                var request = function(server) {
                    server.sendPacket({
                            type: 'PacketPokerTableSelect',
                            string: string
                        });
                };

                var handler = function(server, packet) {
                    var info = server.tableLists && server.tableLists[string];
                    if(packet.type == 'PacketPokerTableList') {
                        info.packet = packet;
                        // although the tables/players count is sent with each
                        // table list, it is global to the server
			server.playersCount = packet.players;
			server.tablesCount = packet.tables;
                        server.notifyUpdate(packet);
                    }
                    return true;
                };

                return this.refresh('tableList', request, handler, options);
            },

            //
            // login / logout
            //
            loggedIn: function() {
                return this.serial !== 0;
            },

            login: function(name, password) {
                if(this.serial !== 0) {
                    throw _("{url} attempt to login {name} although serial is {serial} instead of 0").supplant({ 'url': this.url, 'name': name, 'serial': this.serial});
                }
                this.logname = name;
                this.sendPacket({
                        type: 'PacketLogin',
                        name: name,
                        password: password
                    });
                this.ensureSession();
                this.ping();
                var answer = function(server, id, packet) {
                    switch(packet.type) {
                    case 'PacketAuthOk':
                    return true;

                    case 'PacketAuthRefused':
                    jpoker.dialog(_(packet.message) + _(" (login name is {name} )").supplant({ 'name': name }));
                    server.notifyUpdate(packet);
                    return false;

                    case 'PacketError':
                    if(packet.other_type == jpoker.packetName2Type.LOGIN) {
                        jpoker.dialog(_("user {name} is already logged in".supplant({ 'name': name })));
                    }
                    server.notifyUpdate(packet);
                    return false;

                    case 'PacketSerial':
                    server.serial = packet.serial;
                    server.notifyUpdate(packet);
                    return false;

                    }
                };
                this.registerHandler(0, answer);
            },

            logout: function() {
                if(this.serial !== 0) {
                    this.serial = 0;
                    this.logname = null;
                    this.clearSession();
                    var packet = { type: 'PacketLogout' };
                    this.sendPacket(packet);
                    this.notifyUpdate(packet);
                }
            },

            tableJoin: function(game_id) {
                this.ensureSession();
                this.sendPacket({ 'type': 'PacketPokerTableJoin',
                                  'game_id': game_id });
                this.ping();
            }
        });

    //
    // table
    //
    jpoker.table = function(server, packet) {
        $.extend(this, jpoker.table.defaults, packet);
        this.url = server.url;
        this.init();
        server.registerHandler(packet.id, this.handler);
    };

    jpoker.table.defaults = {
    };

    jpoker.table.prototype = $.extend({}, jpoker.watchable.prototype, {
            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.serial2player = {};
                this.seats = [ null, null, null, null, null, 
                               null, null, null, null, null ];
                this.board = [ null, null, null, null, null ];
                this.pots = [ null, null, null, null, null,
                              null, null, null, null ];
            },

            uninit: function() {
                jpoker.watchable.prototype.uninit.call(this);
                $this = this;
                $.each([ 'seats', 'board', 'pots' ], function(index, value) {
                        $.each($this[value], function(index, value) {
                                if(value) {
                                    value.uninit();
                                }
                            });
                    });
            },

            handler: function(server, id, packet) {
                if(jpoker.verbose) {
                    jpoker.message('table.handler ' + JSON.stringify(packet));
                }
                
                table = server.tables[packet.game_id];

                switch(packet.type) {

                case 'PacketPokerTableDestroy':
                    delete server.tables[packet.game_id];
                    table.uninit();
                    break;

                case 'PacketPokerPlayerArrive':
                    table.serial2player[packet.serial] = new jpoker.player(server, packet);
                    table.seats[packet.seat] = packet.serial;
                    table.notifyUpdate(packet);
                    break;

                case 'PacketPokerPlayerLeave':
                    table.notifyUpdate(packet);
                    table.serial2player[packet.serial].uninit();
                    delete table.serial2player[packet.serial]
                    table.seats[packet.seat] = null;
                    break;

                case 'PacketPokerBoardCards':
                    for(var i = 0; i < packet.cards.length; i++) {
                        table.board[i] = packet.cards[i];
                    }
                    for(var j = packet.cards.length; j < table.board.length; j++) {
                        table.board[j] = null;
                    }
                    table.notifyUpdate(packet);
                    break;

                }

                if(packet.serial in table.serial2player) {
                    table.serial2player[packet.serial].handler(server, id, packet);
                }

                return true;
            }
        });

    //
    // player
    //

    jpoker.player = function(server, packet) {
        $.extend(this, jpoker.player.defaults, packet);
        this.url = server.url;
        this.init();
    };

    jpoker.player.defaults = {

    };

    jpoker.player.prototype = $.extend({}, jpoker.watchable.prototype, {
            init: function() {
                jpoker.watchable.prototype.init.call(this);
                this.cards = [ null, null, null, null, null, null, null ];
                this.money = 0;
                this.pots = 0;
            },

            uninit: function() {
                jpoker.watchable.prototype.uninit.call(this);
                this.cards = [];
            },
            
            handler: function(server, id, packet) {
                if(jpoker.verbose) {
                    jpoker.message('player.handler ' + JSON.stringify(packet));
                }

                switch(packet.type) {

                case 'PacketPokerPlayerCards':
                for(var i = 0; i < packet.cards.length; i++) {
                    this.cards[i] = packet.cards[i];
                }
                for(var j = packet.cards.length; j < this.cards.length; j++) {
                    this.cards[j] = null;
                }
                this.notifyUpdate(packet);
                break;
                }
            }    

        });

    //
    // Refresh data with the 'handler' function after sending
    // a packet to the 'url' poker server with the 'request' function.
    //
    jpoker.refresh = function(server, request, handler, options) {

        var opts = $.extend({}, this.refresh.defaults, options);

        var waiting = false;

        var timer = 0;

        var url = server.url;

        var callback = function() {
            var server = jpoker.url2server({ url: url }); // check if server still exists when the callback runs
            if(opts.requireSession === false || server.connected()) {
                if(!waiting) {
                    waiting = true;
                    request(server);
                } else if(jpoker.verbose > 0) {
                    jpoker.message('refresh waiting');
                } 
                return true;
            } else {
                opts.clearInterval(timer);
                timer = 0;
                return false;
            }
        };

        if(callback()) {

            timer = opts.setInterval(callback, opts.delay);

            var cb = function(server, game_id, packet) {
                waiting = false;
                return handler(server, packet);
            };

            server.registerHandler(opts.game_id, cb, opts);
        }

        return timer;
    };

    jpoker.refresh.defaults = {
        delay: 120000,
        game_id: 0,
        requireSession: false,

        setInterval: function(cb, delay) { return window.setInterval(cb, delay); },
        clearInterval: function(id) { return window.clearInterval(id); }
    };

    //
    // jQuery plugin container (must only contain jQuery plugins)
    //
    jpoker.plugins = {};

    //
    // tableList
    //
    jpoker.plugins.tableList = function(url, options) {

        var tableList = jpoker.plugins.tableList;
        var opts = $.extend({}, tableList.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<table class=\'jpokerTableList\' id=\'' + id + '\'></table>');

                var updated = function(server, packet) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(packet && packet.type == 'PacketPokerTableList') {
                            $(element).html(tableList.getHTML(id, packet));
                            for(var i = 0; i < packet.packets.length; i++) {
                                (function(){
                                    var subpacket = packet.packets[i];
                                    $('#' + subpacket.id).click(function() {
                                            var server = jpoker.url2server({ url: url });
                                            server.tableRowClick(server, subpacket);
                                        }).hover(function(){
  						$(this).addClass("hover");
						},function(){
  						$(this).removeClass("hover");
					});
                                })();
                            }
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated);

                server.refreshTables(opts.string, options);

                return this;
            });
    };

    jpoker.plugins.tableList.defaults = $.extend({
        string: ''
        }, jpoker.refresh.defaults, jpoker.defaults);

    jpoker.plugins.tableList.getHTML = function(id, packet) {
        var t = this.templates;
        var html = [];
        html.push(t.header.supplant({
                        'seats': _("Seats"),
                        'average_pot': _("Average Pot"),
                        'hands_per_hour': _("Hands/Hour"),
                        'percent_flop': _("%Flop"),
                        'players': _("Players"),
                        'observers': _("Observers"),
                        'waiting': _("Waiting"),
                        'player_timeout': _("Timeout"),
                        'currency_serial': _("Currency"),
                        'name': _("Name"),
                        'variant': _("Variant"),
                        'betting_structure': _("Betting Structure"),
                        'skin': _("Skin")
                        }));
        for(var i = 0; i < packet.packets.length; i++) {
            var subpacket = packet.packets[i];
            if(!('game_id' in subpacket)) {
                subpacket.game_id = subpacket.id;
                subpacket.id = subpacket.game_id + id;
            }
            subpacket['class'] = i%2 ? 'evenRow' : 'oddRow';
            html.push(t.rows.supplant(subpacket));
        }
        html.push(t.footer);
        return html.join('\n');
    };

    jpoker.plugins.tableList.templates = {
        header : '<thead><tr><td>{name}</td><td>{players}</td><td>{seats}</td><td>{betting_structure}</td><td>{average_pot}</td><td>{hands_per_hour}</td><td>{percent_flop}</td></tr></thead><tbody>',
        rows : '<tr class=\'{class}\' id=\'{id}\' title=\'' + _("Click to join the table") + '\'><td>{name}</td><td>{players}</td><td>{seats}</td><td>{betting_structure}</td><td>{average_pot}</td><td>{hands_per_hour}</td><td>{percent_flop}</td></tr>',
        footer : '</tbody>'
    };

    //
    // serverStatus
    //
    jpoker.plugins.serverStatus = function(url, options) {

        var serverStatus = jpoker.plugins.serverStatus;
        var opts = $.extend({}, serverStatus.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<span class=\'jpokerServerStatus\' id=\'' + id + '\'></span>');

                var updated = function(server) {
                    var element = document.getElementById(id);
                    if(element) {
			$(element).html(serverStatus.getHTML(server));
                        return true;
                    } else {
                        return false;
                    }
                };

                if(updated(server)) {
                    server.registerUpdate(updated);
                }

                return this;
            });
    };

    jpoker.plugins.serverStatus.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.serverStatus.getHTML = function(server) {
        var t = this.templates;
	var html = [];
	
	if(server.connected()) {
	    html.push(t.connected);
	} else {
	    html.push(t.disconnected.supplant({ 'label': _("disconnected") }));
	}
	if(server.playersCount) {
	    html.push(t.players.supplant({ 'count': server.playersCount, 'players': _("players") }));
	}
	if(server.tablesCount) {
	    html.push(t.tables.supplant({ 'count': server.tablesCount, 'tables': _("tables") }));
	}
        return html.join(' ');
    };

    jpoker.plugins.serverStatus.templates = {
	disconnected: ' {label} ',
	connected: '',
        players: ' {count} {players} ',
        tables: ' {count} {tables} '
    };

    //
    // login
    //
    jpoker.plugins.login = function(url, options) {
 
        var login = jpoker.plugins.login;
        var opts = $.extend({}, jpoker.plugins.login.defaults, options);
        var server = jpoker.url2server({ url: url });

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<div class=\'jpokerLogin\' id=\'' + id + '\'></div>');

                var updated = function(server) {
                    var element = document.getElementById(id);
                    if(element) {
			var e = $(element);
                        e.html(login.getHTML(server));
                        if(server.loggedIn()) {
                            $('#logout', element).click(function() {
                                    var server = jpoker.url2server({ url: url });
                                    if(server.loggedIn()) {
                                        server.logout();
                                    }
                                });
                        } else {
                            var login_element = $('#login', element);
                            var action = function() {
                                var name = $('#name', login_element).attr('value');
                                var password = $('#password', login_element).attr('value');
                                jpoker.url2server({ url: url }).login(name, password);
                                $('#' + id + ' > #login').html(_("login in progress"));
                            };
                            login_element.keypress(function(e) {
                                    if(e.which == 13) {
                                        action.call(this);
                                    }
                                });
                        }
                        return true;
                    } else {
                        return false;
                    }
                };

                if(updated(server)) {
                    server.registerUpdate(updated);
                }

                return this;
            });
    };

    jpoker.plugins.login.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.login.getHTML = function(server) {
        var t = this.templates;
	var html = [];
	if(server.loggedIn()) {
	    html.push(t.logout.supplant({ 'logout': _("{logname} logout").supplant({ 'logname': server.logname }) }));
	} else {
	    html.push(t.login.supplant({ 'login': _("login: "),
                                         'password': _("password: ")
                    }));
	}
        return html.join('\n');
    };

    jpoker.plugins.login.templates = {
	login: '<table id=\'login\' cellspacing=\'0\' cellpadding=\'10\' class=\'login\'>\n<tbody><tr>\n<td class=\'login_text\'><b>{login}</b></td>\n<td class=\'login_input\'><input type=\'text\' id=\'name\' size=\'10\'/></td>\n</tr>\n<tr>\n<td class=\'login_text\'><b>{password}</b></td>\n<td class=\'login_input\'><input type=\'password\' id=\'password\' size=\'10\'/></td>\n</tr>\n</tbody></table>',
	logout: '<div id=\'logout\'>{logout}<div>'
    };

    //
    // table
    //
    jpoker.plugins.table = function(url, game_id, name, options) {

        var opts = $.extend({}, jpoker.plugins.table.defaults, options);
        var server = jpoker.url2server({ url: url });

        game_id = parseInt(game_id, 10);

        return this.each(function() {
                var $this = $(this);

                var id = jpoker.uid();

                $this.append('<span class=\'jpokerTable\' id=\'' + id + '\'>' + _("connecting to table {name}").supplant({ 'name': name }) + '</span>');
                
                server.tableJoin(game_id);

                var updated = function(server) {
                    var element = document.getElementById(id);
                    if(element) {
                        if(game_id in server.tables) {
                            jpoker.plugins.table.create($(element), id, server, game_id);
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                };

                server.registerUpdate(updated);

                return this;
            });
    };

    jpoker.plugins.table.defaults = $.extend({
        }, jpoker.defaults);

    jpoker.plugins.table.create = function(element, id, server, game_id) {
        if(game_id in server.tables) {
            var table = server.tables[game_id];
            element.html(this.templates.room.supplant({ id: id }));
            for(var seat = 0; seat < table.seats.length; seat++) {
                $('#seat' + seat + id, element).hide();
            }
            for(var board = 0; board < table.board.length; board++) {
                $('#board' + board + id, element).hide();
            }
            table.registerUpdate(this.update, id, "update" + id);
            table.registerDestroy(this.destroy, id, "destory" + id);
        }
    };

    jpoker.plugins.table.update = function(table, packet, id) {
        var element = document.getElementById(id);
        if(element) {
            switch(packet.type) {

            case 'PacketPokerPlayerArrive':
                jpoker.plugins.player.create(table, packet, id);
                break;

            case 'PacketPokerBoardCards':
                jpoker.plugins.cards.update(table.board, '#board', id);
                break;

            }
            return true;
        } else {
            return false;
        }
    };

    jpoker.plugins.table.destroy = function(table, dummy, id) {
        var element = document.getElementById(id);
        if(element) {
            $(element).remove();
        }
        return false;
    };

    jpoker.plugins.table.templates = {
        room: 'expected to be overriden by mockup.js but was not'
    };

    //
    // player (table plugin helper)
    //
    jpoker.plugins.player = {
        create: function(table, packet, id) {
            player = table.serial2player[packet.serial];
            $('#seat' + player.seat + id).show();
            for(var card = 0; card < player.cards.length; card++) {
                $('#card_seat' + player.seat + card + id).hide();
            }
            player.registerUpdate(this.update, id, "update" + id);
            player.registerDestroy(this.destroy, id, "destroy" + id);
        },

        update: function(player, packet, id) {
            switch(packet.type) {

            case 'PacketPokerPlayerCards':
            jpoker.plugins.cards.update(player.cards, '#card_seat' + player.seat, id);
            break;

            }
            return true;
        },
        
        destroy: function(player, dummy, id) {
            $('#seat' + player.seat + id).hide();
        }
    };

    //
    // cards (table plugin helper)
    //
    jpoker.plugins.cards = {
        // Ad replaced with Ax to escape adblock 
        card2string: [ '2h', '2d', '2c', '2s', '3h', '3d', '3c', '3s', '4h', '4d', '4c', '4s', '5h', '5d', '5c', '5s', '6h', '6d', '6c', '6s', '7h', '7d', '7c', '7s', '8h', '8d', '8c', '8s', '9h', '9d', '9c', '9s', 'Th', 'Td', 'Tc', 'Ts', 'Jh', 'Jd', 'Jc', 'Js', 'Qh', 'Qd', 'Qc', 'Qs', 'Kh', 'Kd', 'Kc', 'Ks', 'Ah', 'Ax', 'Ac', 'As' ],

        update: function(cards, prefix, id) {
            for(var i = 0; i < cards.length; i++) {
                var card = cards[i];
                if(card) {
                    var card_image = 'small-back';
                    if((card & 0x80) === 0) {
                        card_image = 'small-' + this.card2string[card];
                    }
                    $(prefix + i + id).css({ 
                            'background-image': 'url("images/cards/' + card_image + '.png")',
                                'display': 'block'
                                });
                } else {
                    $(prefix + i + id).hide();
                }
            }
        }
    };

})(jQuery);
