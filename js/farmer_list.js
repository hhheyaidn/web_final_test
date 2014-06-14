(function(){

	Parse.initialize('505MspqfusluJVzcL65fm67XbaskinUiXvYcPGjr','x5ni1KrIY9CBJtsHKYvyC3twoB0e4wsYFmjwjauN');
	
	catalog function(page){
      window.scrollTo(0,0);
      // To support pagination.
      var limit = 16;
      var skip = (page-1) * limit;
      var Dress = Parse.Object.extend("Dress");
      var query = new Parse.Query(Dress);
      query.limit(limit);
      query.skip(skip);
      query.descending("createdAt");
      query.find({
        success: function(results) {
          var objList = results.map(function(e){ return e.toJSON() });
          document.getElementById('content').innerHTML = templates.catalogTemplate(objList);
          query.limit(0);
          query.skip(0);
          var option = {};
          // To support pagination.
          query.count({
              success: function(count){
              var totalPage = Math.ceil(count / limit);
              var currentPage = parseInt(page);
              option = {
                // Watch out the limit.
                'previous': (currentPage === 1) ? 1 : currentPage-1,
                'next': (currentPage === totalPage) ? currentPage : currentPage+1,
                'current': currentPage,
                'last': totalPage,
              };
              document.getElementById('pagination').innerHTML = 
                templates.catalogPaginationTemplate(option);
            }, error: function(err){
      
            }  
          });
        }
      });
    },

})