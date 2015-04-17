'use strict';
/**
 * @ngdoc directive
 * @name modal
 * @restrict A
 * @description
 * pokazuje modala o podanej nazwie
 *
 * ```html
 <button
 modal="confirm"
 data="app.conifrmModalConfig"
 on-close="closeIt($data)"
 on-dismiss="dismissIt($data)"

 data-string="'Testowy String'"
 data-funkcja="getUserName()"
 data-obiekt="user"

 >config data + extra resolve variables</button>

 <button modal="confirm" data="app.conifrmModalConfig2">with config from one object</button>

 <button modal="confirm"> just show modal </button>
 ```

 * @param {string} modal nazwa modala ktory ma być użyty, ten modal trzeba zarejestrowac w serwisie $modals.register('nazwa', function(){});
 * @param {expresion=} onClose funkcja która będzie wywołana przy zamknieciu modala na sukcesie, zmienna $data zawiera dane zwrócone z modala
 * @param {expresion=} onDismiss funkcja która będzie wywołana przy zamknieciu modala na cancel lub error, zmienna $data zawiera dane zwrócone z modala
 * @param {expresion=} data obiekt który będzie uzyty jako konfiguracja modala
 * @param {expresion=} data* wszystkie atrybuty data-* będą przekazane do modala jako resolve
 */
angular.module('config')
    .directive('modal', function ($modals, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var onClose = $parse(attr.onClose);
                var onDismiss = $parse(attr.onDismiss);
                var getData = $parse(attr.data);
                var resolves = angular.copy(element.data()||{});
                var n;

                for(n in resolves) {
                    resolves[n] = $parse(resolves[n]);
                }
                element.on('click', function(){
                    var config = getData(scope)||{};
                    if(!config.resolve) {
                        config.resolve = {};
                    }

                    for(n in resolves) {
                        (function() {
                            var val = resolves[n](scope)
                            config.resolve[n] = function () {
                                return val;
                            }
                        }())
                    }
                    $modals.open(attr.modal, config).result.then(function(data) {
                        onClose(scope, {$data: data});
                    }, function(reason) {
                        onDismiss(scope, {$data: reason});
                    });
                });

            }
        }
    });

