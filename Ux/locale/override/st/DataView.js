Ext.define('Ux.locale.override.st.DataView', {
    override: 'Ext.dataview.DataView',

    requires: [
    'Ux.locale.override.st.Component'
    ],

    setLocale: function(locale) {
        var me = this,
            locales = me.locales || me.getInitialConfig().locales,
            emptyText = locales.emptyText,
            manager = me.locale,
            defaultEmptyText = '';

        if(emptyText) {
            if(Ext.isObject(emptyText)) {
                defaultEmptyText = emptyText.defaultEmptyText;
                emptyText = emptyText.key;
            }

            emptyText = manager.get(emptyText, defaultEmptyText);

            if(Ext.isString(emptyText)) {
                me.setEmptyText(emptyText);
            }
        }

        this.callParent(arguments);
    },
    // override to fix issue #19; me.getViewItems() returns an empty array
    onStoreUpdate: function(store, record, newIndex, oldIndex) {
        var me = this,
            container = me.container;
        
        oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;

        if (oldIndex !== newIndex) {
            container.updateAtNewIndex(oldIndex, newIndex, record);
            if (me.isSelected(record)) {
                me.doItemSelect(me, record);
            }
        }
        else if (me.getViewItems().length > 0) {
            // Bypassing setter because sometimes we pass the same record (different data)
            container.updateListItem(record, me.getViewItems()[newIndex]);
        }
    }
});
