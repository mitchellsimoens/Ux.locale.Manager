Ext.define('Ux.locale.override.extjs.Component', {
    override : 'Ext.Component',

    requires : [
        'Ux.locale.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    initComponent : function() {
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
            body        = locales.body,
            manager     = me.locale,
            defaultText = '',
            text;

        if (body) {
            if (Ext.isObject(body)) {
                defaultText = body.defaultText;
                body        = body.key;
            }

            text = manager.get(body, defaultText);

            if (Ext.isString(text)) {
                me.update(text);
            }
        }
    }
});