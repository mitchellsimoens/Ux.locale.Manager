Ext.define('Locale.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar',
        'Ext.tab.Panel',
        'Ext.Button',
        'Ext.field.Select',
        'Ext.field.DatePicker',
        'Ext.form.FieldSet'
    ],

    config : {
        layout : 'fit',
        items  : [
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
                        locales : {
                            html  : 'tabs.one.html',
                            title : 'tabs.one.title'
                        }
                    },
                    {
                        title   : '&nbsp;',
                        locales : {
                            title : 'tabs.two.title'
                        },
                        items   : [
                            {
                                xtype    : 'fieldset',
                                locales  : {
                                    title        : 'fieldsets.title',
                                    instructions : 'fieldsets.instructions'
                                },
                                defaults : {
                                    labelWidth : '45%'
                                },
                                items    : [
                                    {
                                        xtype   : 'textfield',
                                        locales : {
                                            label : 'fields.name'
                                        }
                                    },
                                    {
                                        xtype   : 'datepickerfield',
                                        locales : {
                                            label       : 'fields.dateLabel',
                                            placeHolder : 'fields.datePlaceholder'
                                        },
                                        picker  : {
                                            enableLocale : true,
                                            locales      : {
                                                months : 'months'
                                            }
                                        }
                                    }
                                ]
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
