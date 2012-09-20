Ext.define('Ux.locale.override.st.Container', {
    override : 'Ext.Container',

    requires : [
        'Ux.locale.override.st.Component'
    ],

    setLocale : function(locale) {
        var me          = this,
            tab         = me.getTab(),
            locales     = me.locales || me.getInitialConfig().locales,
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
                /**
                 * Would like a setTitle on a container to do this
                 */
                me.title = title;
				
				if(tab){
               	 	tab.setTitle(title);
			 	}
            }
        }

        this.callParent(arguments);
    },

    /**
     * As of PR3, there is no method or property to get the associated Ext.tab.Tab instance
     */
    getTab : function() {
        var me       = this,
            tabpanel = me.up('tabpanel');

        if (!tabpanel) {
            return;
        }

        var tabBar   = tabpanel.getTabBar(),
            items    = tabpanel.getInnerItems(),
            index    = Ext.Array.indexOf(items, me);

        return tabBar.getComponent(index);
    }
});