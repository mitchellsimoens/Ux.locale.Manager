Ext.define('Ux.locale.override.st.field.Field', {
    override : 'Ext.field.Field',

    requires : [
        'Ux.locale.override.st.Component'
    ],

    setLocale : function(locale) {
        var me            = this,
            locales      = me.locales,
            label        = locales.label,
            manager      = me.locale,
            defaultLabel = '';

        if (label) {
            if (Ext.isObject(label)) {
                defaultLabel = label.defaultLabel;
                label        = label.key;
            }

            label = manager.get(label, defaultLabel);

            if (Ext.isString(label)) {
                me.setLabel(label);
            }
        }

        me.callOverridden(arguments);
    }
});