Ext.define('Locale.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.tab.Panel',
        'Ext.Button',
        'Ext.field.Select',
        'Ext.field.DatePicker'
    ],

    config: {
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
                        xtype  : 'datepickerfield',
                        align  : 'right',
                        picker : {
                            enableLocale : true,
                            locales      : {
                                months : 'months'
                            }
                        }
                    },
                    {
                        xtype        : 'selectfield',
                        align        : 'right',
                        displayField : 'text',
                        valueField   : 'abbr',
                        value        : 'en',
                        store        : {
                            fields : ['abbr', 'text'],
                            data   : Ux.locale.Manager.getAvailable(true)
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
                            title : 'tabs.two.title'
                        },
                        items : [
                            {
                                xtype   : 'textfield',
                                locales : {
                                    label : 'fields.name'
                                }
                            }
                        ]
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
        ]
    }
});
