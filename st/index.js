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
    'Ext.field.DatePicker',
    'Ext.tab.Panel',
    'Ext.navigation.View',

    'Ux.locale.Manager',
    'Ux.locale.override.st.Component',
    'Ux.locale.override.st.Button',
    'Ux.locale.override.st.Container',
    'Ux.locale.override.st.TitleBar',
    'Ux.locale.override.st.field.Field',
    'Ux.locale.override.st.field.DatePicker',
    'Ux.locale.override.st.picker.Picker',
    'Ux.locale.override.st.picker.Date',
    'Ux.locale.override.st.navigation.View',
    'Ux.locale.override.st.navigation.Bar'
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

        var x = new Ext.Container({
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
                            xtype: 'button',
                            locales : {
                                text: 'buttons.addView'
                            },
                            listeners: {
                                tap: function()
                                {
                                    Ext.Viewport.down('navigationview').push(
                                        {
                                            xtype: 'panel',
                                            locales: {
                                                title: 'pages.extra.title',
                                            }
                                        }
                                    );
                                }
                            }
                        },
                        {
                            xtype  : 'datepickerfield',
                            align  : 'right',
                            picker : {
                                enableLocale : true,
                                locales : {
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
                                //html  : 'tabs.three.html',
                                title: 'tabs.three.title',
                            },
                            items: [
                                    {
                                        xtype: 'navigationview',
                                        locales: {
                                            defaultBackButtonText: 'misc.back'
                                        },
                                        items: [
                                            {
                                                locales: {
                                                    title: 'pages.one.title',
                                                }
                                            }
                                        ]
                                    }
                            ]
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