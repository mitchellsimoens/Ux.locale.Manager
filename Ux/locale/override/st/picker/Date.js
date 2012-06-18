Ext.define('Ux.locale.override.st.picker.Date', {
    override : 'Ext.picker.Date',

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            months      = locales.months,
            manager     = me.locale,
            defaultText = '',
            slot, store, value;

        if (months) {
            if (Ext.isObject(months)) {
                defaultText = months.defaultText;
                months      = months.key;
            }

            months = manager.get(months, defaultText);

            if (Ext.isObject(months)) {
                slot = this.down('pickerslot[name=month]');
                store = slot && slot.getStore();
                if (store) {
                    store.each(function(rec) {
                        value = rec.get('value');
                        rec.set('text', months[value]);
                    });
                }
            }
        }

        me.callOverridden(arguments);
    }
});