Ext.define('Ux.locale.override.st.Component', {
    override : 'Ext.Component',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    constructor : function(config) {
        config = config || {};

        var me           = this,
            locales      = config.locales      || me.locales      || (me.getLocales && me.getLocales()),
            enableLocale = config.enableLocale || me.enableLocale || (me.getEnableLocale && me.getEnableLocale());

        if (Ext.isObject(locales) || enableLocale) {
            Ext.apply(me, {
                enableLocale : true,
                locale       : Ux.locale.Manager
            });
        }

        me.callOverridden(arguments);

        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            html        = locales.html,
            manager     = me.locale,
            defaultText = '';

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
    }
});
