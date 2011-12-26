Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        Ux : '../Ux'
    }
});

Ext.require([
    'Ext.container.Viewport',
    'Ux.locale.Manager',
    'Ux.locale.override.extjs.Button',
    'Ux.locale.override.extjs.Panel',
    'Ux.locale.override.extjs.Text'
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

Ext.onReady(function() {
    new Ext.container.Viewport({
        layout : 'border',
        items  : [
            {
                region : 'north',
                height : 100,
                frame  : true,
                items  : [
                    {
                        xtype        : 'combobox',
                        fieldLabel   : '&nbsp;',
                        queryMode    : 'local',
                        displayField : 'text',
                        valueField   : 'abbr',
                        value        : 'en',
                        store        : Ux.locale.Manager.getAvailable(false),
                        locales      : {
                            fieldLabel : 'fields.labels.chooseLocale'
                        },
                        listeners    : {
                            change : function(cb, value) {
                                Ux.locale.Manager.updateLocale(value);
                            }
                        }
                    }
                ]
            },
            {
                xtype   : 'form',
                region  : 'east',
                width   : 400,
                locales : {
                    title : 'region.east.title'
                },
                items   : [
                    {
                        xtype      : 'textfield',
                        fieldLabel : 'Test',
                        locales    : {
                            fieldLabel : 'fields.labels.firstName'
                        }
                    },
                    {
                        xtype      : 'textfield',
                        fieldLabel : 'Test',
                        locales    : {
                            fieldLabel : 'fields.labels.lastName'
                        }
                    }
                ]
            },
            {
                region  : 'center',
                locales : {
                    title : 'region.center.title',
                    body  : {
                        key         : 'region.center.body',
                        defaultText : 'This is the center region.<br><br>This is showing the default text option and will not update when choosing the locale'
                    }
                },

                dockedItems : [
                    {
                        xtype : 'toolbar',
                        dock  : 'top',
                        items : [
                            {
                                locales : {
                                    text : 'buttons.save'
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        listeners : {
            scope       : Ux.locale.Manager,
            afterrender : Ux.locale.Manager.init
        }
    });
});
