Ext.define('Ux.locale.override.st.field.Field', {
    override : 'Ext.field.Field',

    requires : [
        'Ux.locale.override.st.Component'
    ],

    setLocale : function(locale) {
        var me                 = this,
            locales            = me.locales || me.getInitialConfig().locales,
            label              = locales.label,
            placeholder        = locales.placeHolder,
            manager            = me.locale,
            defaultPlaceholder = '',
            defaultLabel       = '';

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

        if (placeholder) {
            if (Ext.isObject(placeholder)) {
                defaultPlaceholder = label.defaultPlaceholder;
                placeholder        = placeholder.key;
            }

            placeholder = manager.get(placeholder, defaultPlaceholder);

            if (Ext.isString(placeholder)) {
                me.setPlaceHolder(placeholder);
            }
        }

        me.callParent(arguments);
    }
});