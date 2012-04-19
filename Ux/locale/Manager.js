Ext.define('Ux.locale.Manager', {
    singleton : true,

    requires : [
        'Ext.ComponentQuery'
    ],

    uses : [
        'Ext.Ajax',
        'Ext.data.Store'
    ],

    _ajaxConfig : {},
    _beforeLoad : Ext.emptyFn,
    _language   : 'en',
    _loaded     : true,
    _locale     : {},
    _locales    : [
        { abbr : 'en', text : 'English' },
        { abbr : 'fr', text : 'French'  }
    ],
    _tpl        : '',
    _type       : 'script',

    _decoder : function(options, success, response) {
        var text = response.responseText;

        return Ext.decode(text);
    },

    _callback : function() {
        this.applyLocales();
    },

    init : function(callback) {
        var me         = this,
            type       = me._type,
            lmCallback = me._callback,
            method     = type === 'script' ? 'loadScriptTag' : 'loadAjaxRequest';

        if (typeof callback !== 'function') {
            callback = Ext.emptyFn;
        }

        callback = Ext.Function.createInterceptor(callback, lmCallback, me);

        me[method](callback);
    },

    loadAjaxRequest: function(callback) {
        var me = this;

        me._loaded = false;

        me._beforeLoad();

        var ajaxConfig = Ext.apply({}, me._ajaxConfig),
            language   = me._language,
            path       = me._tpl.replace('{locale}', language),
            decoder    = me._decoder,
            params     = ajaxConfig.params || {},
            json;

        params.language = language;

        Ext.apply(ajaxConfig, {
            params   : params,
            url      : path,
            callback : function(options, success, response) {
                json       = decoder(options, success, response);
                me._locale = json;
                me._loaded = true;

                if (typeof callback == 'function') {
                    Ext.Function.bind(callback, me, [me, options, success, response])();
                }
            }
        });

        Ext.Ajax.request(ajaxConfig);
    },

    loadScriptTag : function() {
        console.log('<script> support coming');
    },

    setConfig : function(config) {
        Ext.Object.each(config, function(key, value) {
            this['_' + key] = value;
        }, this);

        return this;
    },

    applyLocales : function() {
        var cmps     = Ext.ComponentQuery.query('component[enableLocale]'),
            c        = 0,
            cNum     = cmps.length,
            language = this._language,
            cmp;

        for (; c < cNum; c++) {
            cmp = cmps[c];

            if (typeof cmp.setLocale == 'function') {
                cmp.setLocale(language);
            }
        }
    },

    isLoaded : function() {
        return this._loaded;
    },

    get : function(key, defaultText) {
        var me     = this,
            locale = me._locale,
            plural = key.indexOf('p:') == 0,
            keys   = (plural ? key.substr(2) : key).split('.'),
            k      = 0,
            kNum   = keys.length,
            res;

        if (!me.isLoaded()) {
            return defaultText;
        }

        for (; k < kNum; k++) {
            key = keys[k];

            if (locale) {
                locale = locale[key];
            }
        }

        res = locale || defaultText;

        if (plural) {
            return Ext.util.Inflector.pluralize(res);
        } else {
            return res;
        }
    },

    getAvailable : function(simple) {
        var locales = this._locales;

        if (simple) {
            return locales;
        } else {
            return new Ext.data.Store({
                fields : ['abbr', 'text'],
                data   : locales
            });
        }
    },

    updateLocale : function(locale) {
        this._language = locale;

        this.init();
    }, 
    
    getLanguage : function(){
        return this._language;
    }
});
