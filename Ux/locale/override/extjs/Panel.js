Ext.define('Ux.locale.override.extjs.Panel', {
    override : 'Ext.panel.Panel',

    requires : [
        'Ux.locale.override.extjs.Component'
    ],

    initComponent : function() {
        this.callOverridden(arguments);

        if (this.enableLocale) {
            this.title = '&nbsp;';
        }
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales,
            title       = locales.title,
            manager     = me.locale,
            defaultText = '',
            text;

        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            text = manager.get(title, defaultText);

            if (Ext.isString(text)) {
                me.setTitle(text);
            }
        }

        me.callOverridden(arguments);
    }
});