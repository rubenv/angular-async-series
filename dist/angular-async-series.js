angular.module('rt.asyncseries', []).factory('eachSeries', [
  '$q',
  function ($q) {
    return function eachSeries(items, action) {
      var deferred = $q.defer();
      function handleFailed(err) {
        return deferred.reject(err);
      }
      function runItem() {
        if (items.length === 0) {
          deferred.resolve();
          return;
        }
        var item = items.shift();
        action(item).then(runItem, handleFailed);
      }
      runItem();
      return deferred.promise;
    };
  }
]);