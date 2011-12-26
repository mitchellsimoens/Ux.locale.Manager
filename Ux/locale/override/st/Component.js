Ext.define('Ux.locale.override.st.Component', {
    override : 'Ext.Component',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    initialize : function() {
        var me = this;

        if (Ext.isObject(me.locales) || me.enableLocale) {
            Ext.apply(me, {
                enableLocale : true,
                locale       : Ux.locale.Manager
            });
        }

        me.callOverridden(arguments);
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales,
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