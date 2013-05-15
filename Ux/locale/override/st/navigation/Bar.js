Ext.define('Ux.locale.override.st.navigation.Bar', {
    override: 'Ext.navigation.Bar',

    requires: [
        'Ux.locale.Manager'
    ],

    enableLocale: false,
    locale: null,
    locales: null,

    constructor : function(config) {

        var me = this;

        Ux.locale.Manager.isLocalable(me, config.view.config);

        me.callParent([config]);

        if (me.enableLocale) {
            me.setLocale(Ux.locale.Manager.getLanguage());
        }
    },

    onViewAdd : function(view, item) {

        var me              = this,
            backButtonStack = me.backButtonStack,
            hasPrevious, title;

        me.endAnimation();

        if (item.enableLocale) {
            title = (item.getTitle) ? item.getTitle() : item.title || item.config.title;
        }
        else {
            title = (item.getTitle) ? item.getTitle() : item.config.title;
        }

        backButtonStack.push(title || '&nbsp;');
        hasPrevious = backButtonStack.length > 1;

        me.doChangeView(view, hasPrevious, false);
    },

    setLocale : function(locale) {
        var me = this,
            navView = me.config.view,
            items = navView.getInnerItems();

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.enableLocale) {
                item.setLocale(locale);
                var title = (item.getTitle) ? item.getTitle() : item.title;

                me.backButtonStack[i] = title;
            }
        }

        me.setTitle(me.getTitleText());

        var backButton = me.getBackButton();
        var backButtonText = me.getBackButtonText();
        if (backButton && backButtonText) {
            backButton.setText(backButtonText);
        }
    }
});