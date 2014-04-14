Ext.define('Ux.locale.override.st.Component', {
    override : 'Ext.Component',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    constructor : function(config) {
        var me = this;

        config = Ux.locale.Manager.isLocalable(me, config);

        me.callParent([config]);

        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }
    },

    applyData: function (data) {
        // translate the data section of a component
        data = this.callParent(arguments);
        return this.i18nData(data);
    },

    i18nData: function (data) {
        if (data && data['i18nTranslationData']) {
            // translations already exist in object, don't do it again
            return data;
        }

        // always return an object
        if (!data){
            data = {};
        }

        var me = this,
            locales = me.locales || me.getInitialConfig().locales,
            manager = me.locale,
            dataI18n = locales ? locales.data : null,
            defaultTranslation = '',
            toMerge = {};

        if (dataI18n && manager) {
            var keys = Ext.Object.getKeys(dataI18n);

            for (var i in keys) {
                var dataI18nTranslationKey = dataI18n[keys[i]];
                if (Ext.isObject(dataI18nTranslationKey)) {
                    defaultTranslation = dataI18nTranslationKey.defaultTranslation;
                    dataI18nTranslationKey = dataI18nTranslationKey.key;
                }
                toMerge[keys[i]] = manager.get(dataI18nTranslationKey, defaultTranslation);
            }

            // indicate translation has occurred, used by DataView as a discriminator 'hack'
            toMerge['i18nTranslationData'] = true;

            // push the translated data into the data object
            Ext.apply(data, toMerge);
        }
        return data;
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            html        = locales.html,
            manager     = me.locale,
            defaultText = '',
            i18nData = me.i18nData();

        if (html) {
            if (Ext.isObject(html)) {
                defaultText = html.defaultText;
                html        = html.key;
            }

            html = manager.get(html, defaultText);

            if (Ext.isString(html)) {
                me.setHtml(html);
            }
        }

        // if i18nData exists...
        if (Object.getOwnPropertyNames(i18nData).length !== 0) {
            // set translated data onto object
            me.setData(i18nData);
        }
    }
});
