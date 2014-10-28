'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= resName %>', function ($resource, apiBaseUrl) {

        var <%= resName %> = $resource(apiBaseUrl+'<%= dasherizedName %>/:id', { id: '@id' }, {
            save: {
                params: {
                    action: 'save'
                },
                isArray: false
            }
        });
        // factory to creates new instances of <%= resName %> with default values
        <%= resName %>.create = function() {
            return angular.extend(new <%= resName %>(), {

            });
        };
        // extend resource  with custom methods
        angular.extend(<%= resName %>.prototype, {

        });

        return <%= resName %>;

    });
