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

    getTab : function () {
        var me = this,
            tabpanel, tabBar, items, index;

        if (me.tab) {
            return me.tab;
        }

        /**
         * As of 2.0.0 PR3, there is no method or property to get the associated Ext.tab.Tab instance
         */

        tabpanel = me.up('tabpanel');

        if (!tabpanel) {
            return;
        }

        tabBar = tabpanel.getTabBar();
        items = tabpanel.getInnerItems();
        index = Ext.Array.indexOf(items, me);

        return tabBar.getComponent(index);
    }
});