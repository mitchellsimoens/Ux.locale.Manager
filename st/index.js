Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        Ux : '../Ux'
    }
});

Ext.require([
    'Ext.Container',
    'Ext.TitleBar',
    'Ext.field.Select',
    'Ext.tab.Panel',
    'Ux.locale.Manager',
    'Ux.locale.override.st.Component',
    'Ux.locale.override.st.Button',
    'Ux.locale.override.st.Container',
    'Ux.locale.override.st.TitleBar'
], function() {
    Ux.locale.Manager.setConfig({
        ajaxConfig : {
            method : 'GET'
        },
        language   : 'en',
        tpl        : 'locales/{locale}.json',
        type       : 'ajax'
    });
});

Ext.setup({
    onReady: function () {

        new Ext.Container({
            fullscreen : true,
            layout     : 'fit',
            items      : [
                {
                    xtype   : 'titlebar',
                    docked  : 'bottom',
                    locales : {
                        title : 'misc.bottomTitle'
                    },
                    items   : [
                        {
                            ui      : 'decline',
                            locales : {
                                text : 'buttons.cancel'
                            }
                        },
                        {
                            ui      : 'confirm',
                            locales : {
                                text : 'buttons.save'
                            }
                        },
                        {
                            xtype        : 'selectfield',
                            align        : 'right',
                            displayField : 'text',
                            valueField   : 'abbr',
                            value        : 'en',
                            store        : Ux.locale.Manager.getAvailable(false),
                            listeners    : {
                                change : function(select, value) {
                                    /**
                                     * In PR3, the value returned is the Model associated with that selection.
                                     * This will get fixed to return the value of the valueField.
                                     */
                                    if (value instanceof Ext.data.Model) {
                                        value = value.get(select.getValueField());
                                    }

                                    Ux.locale.Manager.updateLocale(value);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'tabpanel',
                    items : [
                        {
                            title   : '&nbsp;',
                            locales  : {
                                html  : 'tabs.one.html',
                                title : 'tabs.one.title'
                            }
                        },
                        {
                            title   : '&nbsp;',
                            locales : {
                                html  : 'tabs.two.html',
                                title : 'tabs.two.title'
                            }
                        },
                        {
                            title   : '&nbsp;',
                            locales : {
                                html  : 'tabs.three.html',
                                title : 'tabs.three.title'
                            }
                        }
                    ]
                }
            ],
            listeners : {
                scope   : Ux.locale.Manager,
                single  : true,
                painted : Ux.locale.Manager.init
            }
        });

    }
});