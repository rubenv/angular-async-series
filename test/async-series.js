describe('eachSeries', function () {
    var $q = null;
    var $rootScope = null;
    var eachSeries = null;

    beforeEach(module('rt.asyncseries'));

    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        eachSeries = $injector.get('eachSeries');
    }));

    it('Handles eachSeries', function () {
        var calls = 0;
        function handler() {
            calls++;
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        }

        eachSeries([0, 1, 2], handler).then(function () {
            return calls++;
        });

        $rootScope.$digest();
        assert.equal(calls, 4);
    });

    it('Will stop after an error', function () {
        var calls = 0;
        var errCalls = 0;

        function incCalls() {
            return calls++;
        }
        function handleErr() {
            return errCalls++;
        }

        function handler() {
            incCalls();
            var deferred = $q.defer();
            if (calls === 2) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        eachSeries([0, 1, 2], handler).then(incCalls, handleErr);
        $rootScope.$digest();
        assert.equal(calls, 2);
        assert.equal(errCalls, 1);
    });
});
