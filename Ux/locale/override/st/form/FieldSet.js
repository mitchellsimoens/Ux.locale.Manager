Ext.define('Ux.locale.override.st.form.FieldSet', {
    override : 'Ext.form.FieldSet',

    requires : [
        'Ux.locale.override.st.Component'
    ],

    setLocale : function(locale) {
        var me                  = this,
            locales             = me.locales || me.getInitialConfig().locales,
            title               = locales.title,
            instructions        = locales.instructions,
            manager             = me.locale,
            defaultText         = '',
            defaultInstructions = '';

        if (title) {
            if (Ext.isObject(title)) {
                defaultText = title.defaultText;
                title       = title.key;
            }

            title = manager.get(title, defaultText);

            if (Ext.isString(title)) {
                me.setTitle(title);
            }
        }

        if (instructions) {
            if (Ext.isObject(instructions)) {
                defaultInstructions = instructions.defaultText;
                instructions        = instructions.key;
            }
            instructions = manager.get(instructions, defaultInstructions);

            if (Ext.isString(instructions)) {
                me.setInstructions(instructions);
            }
        }

        me.callParent(arguments);
    }
});