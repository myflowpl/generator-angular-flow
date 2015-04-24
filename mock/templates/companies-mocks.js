angular.module('inhubDev')
    .run(function ($httpBackend) {

        /**
         * lista firm
         */
        $httpBackend.whenGET("/api/companies").respond({
            data: nf_mocks.companies,
            meta: {
                total_count: nf_mocks.companies.length
            }
        });

        /**
         * doadwanie nowej firmy
         */
        $httpBackend.whenPOST('/api/companies').respond(function(method, url, data) {
            var row = angular.fromJson(data);
            nf_mocks.companies_pk = nf_mocks.companies_pk+1;
            row.id = nf_mocks.companies_pk;
            nf_mocks.companies.push(row);
            return [200, {data: row}, {}];
        });

        /**
         * pobieranie jednej firmy
         */
        $httpBackend.whenGET(/\/api\/companies\/[0-9]*/).respond(function(method, url, data) {

            var id = parseInt(_.last(url.split('/')));
            var company = _.find(nf_mocks.companies, 'id', id);

            if(company) {

                return [200, {data: company}, {}];
            } else {
                return [404, {}, {}];

            }
        });

        /**
         * update rekordu firmy
         */
        $httpBackend.whenPUT(/\/api\/companies\/[0-9]*/).respond(function(method, url, data) {

            var id = parseInt(_.last(url.split('/')));
            var company = _.find(nf_mocks.companies, 'id', id);
            var row = angular.fromJson(data);

            if(company) {
                angular.copy(row, company);
                return [200, {data: company}, {}];
            } else {
                return [404, {}, {}];

            }
        });

        /**
         * usuwanie rekordu firmy
         */
        $httpBackend.whenDELETE(/\/api\/companies\/[0-9]*/).respond(function(method, url, data) {

            var id = parseInt(_.last(url.split('/')));
            var company = _.indexOf(nf_mocks.companies, 'id', id);

            if(company) {
                angular.copy(row, company);
                return [200, {data: company}, {}];
            } else {
                return [404, {}, {}];

            }
        });

        // przepuszczamy cała resztę
        $httpBackend.whenGET(/$/).passThrough();
        $httpBackend.whenPOST(/$/).passThrough();
        $httpBackend.whenPUT(/$/).passThrough();
        $httpBackend.whenDELETE(/$/).passThrough();

    });