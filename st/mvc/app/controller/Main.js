Ext.define('Locale.controller.Main', {
    extend: 'Ext.app.Controller',

    config : {
        control : {
            'selectfield' : {
                change : 'onLocalePick'
            }
        }
    },

    onLocalePick : function(field, value) {
        if (value.length > 2) {
            var store = field.getStore(),
                rec   = store.findRecord('text', value);

            value  = rec.get(field.getValueField());
        }

        Ux.locale.Manager.updateLocale(value);
    }
});
