Ext.define('Ux.locale.override.st.picker.Date', {
    override : 'Ext.picker.Date',

    setLocale : function(locale) {
        var me = this,
            locales = me.locales || me.getInitialConfig().locales,
            months = locales.months,
            day = locales.dayText,
            month = locales.monthText,
            year = locales.yearText,
            slotOrder = locales.slotOrder,
            manager = me.locale,
            defaultText = '',
            defaultDay = 'Day',
            defaultMonth = 'Month',
            defaultYear = 'Year',
            defaultSlotOrder = ['month', 'day', 'year'],
            slot, store, value;

        if(months) {
            if(Ext.isObject(months)) {
                defaultText = months.defaultText;
                months = months.key;
            }

            months = manager.get(months, defaultText);

            if(Ext.isObject(months)) {
                slot = this.down('pickerslot[name=month]');
                store = slot && slot.getStore();
                if(store) {
                    store.each(function(rec) {
                        value = rec.get('value');
                        rec.set('text', months[value]);
                    });
                }
            }
        }

        if(day) {
            if(Ext.isObject(day)) {
                defaultDay = day.defaultDay;
                day = day.key;
            }

            day = manager.get(day, defaultDay);

            if(Ext.isString(day)) {
                me.setDayText(day);
            }
        }

        if(month) {
            if(Ext.isObject(month)) {
                defaultMonth = month.defaultMonth;
                month = month.key;
            }

            month = manager.get(month, defaultMonth);

            if(Ext.isString(month)) {
                me.setMonthText(month);
            }
        }

        if(year) {
            if(Ext.isObject(year)) {
                defaultYear = year.defaultYear;
                year = year.key;
            }

            year = manager.get(year, defaultYear);

            if(Ext.isString(year)) {
                me.setYearText(year);
            }
        }

        if(slotOrder) {
            if(Ext.isObject(slotOrder)) {
                defaultSlotOrder = slotOrder.defaultSlotOrder;
                slotOrder = slotOrder.key;
            }

            slotOrder = Ext.JSON.decode(manager.get(slotOrder, defaultSlotOrder));

            if(Ext.isArray(slotOrder)) {
                me.setSlotOrder(slotOrder);
            }
        }

        me.callParent(arguments);
    }
});
