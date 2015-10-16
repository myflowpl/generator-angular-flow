/**
 * <%=file.nameLowCamel%> service
 */
angular.module('<%= module.name %>')
    .factory('<%= file.nameLowCamel %>', function (restmod) {

        var <%= file.nameLowCamel %> = restmod.model('<%= file.nameLowCamel %>').mix({
            $extend: {
                Collection: {},
                Model: {},
                Record: {}
            }
            //default_val_example: 'brak',
            //int_example: { init: 0 },
            //bool_example: { init: false },
            //date_example: { decode: 'date_decode', encode: 'date_encode' },
            //children: {
            //    map: '__children',
            //    hasMany: 'LocationRes'
            //},
            //parent: {
            //    belongsTo: 'LocationRes'
            //},
            //$customTestAction: function() {
            //    return this.$send({
            //        method: 'PUT',
            //        url: RMUtil.joinUrl(this.$url(), 'place'),
            //        data: {}
            //    }, function(_data) {
            //        this.$unwrap(_data.data);
            //    });
            //}
        });

        return <%= file.nameLowCamel %>;

    });
