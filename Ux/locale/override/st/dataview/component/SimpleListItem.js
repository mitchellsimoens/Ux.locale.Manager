Ext.define('Ux.locale.override.st.dataview.component.SimpleListItem', {
    override : 'Ext.dataview.component.SimpleListItem',

    requires : [
        'Ux.locale.override.st.Component'
    ],

    enableLocale: false,
    locale: null,
    locales: null,

    setLocale : function(locale) {
        var me          = this,
            record      = me.getRecord(),
            locales     = record.raw.locales,
            title       = locales.title,
            manager     = me.locale,
            defaultText = '';

        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            title = manager.get(title, defaultText);

            if (Ext.isString(title)) {
                record.title = title;
                me.updateData(record || null);
            }
        }
    },

    updateRecord: function(record) {
        var me = this;

        if (record.raw.locales) {
            me.enableLocale = true;
            me.locales = record.raw.locales;
            Ux.locale.Manager.isLocalable(me, false);
        }

        me.callParent(arguments);
    }
});