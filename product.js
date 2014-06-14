$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
  alert(1111);
})

function call (page, category){
  alert(0);
  window.scrollTo(0,0);
      // To support pagination.
    var limit = 15;
    var skip = (page-1) * limit;
    var Product = Parse.Object.extend("Product");
    var query = new Parse.Query(Product);
    query.limit(limit);
    query.skip(skip);
    query.equalTo('Category', category);
    query.descending("createdAt");
    query.find({
      //alert(1);
        success: function(results) {
          var objList = results.map(function (e){ return e.toJSON() });
          objList.forEach(function(e){
            console.log(e);
            var html = "TEST";
            /*var html = '<a href="farmer.html">  
              <div class="about">
                <img src="img/orange_2.png"></img>
                <p class="name">劉小琪</p>
                <p>蘋果、香蕉</p>
              </div>
            </a>';
            var html = '<h2>'+e.title+'</h2>'+e.size;*/
            //$('#content').html("");
            $('#content').append(html);
          });
          //document.getElementById('content').innerHTML = templates.catalogTemplate(objList);
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
              //document.getElementById('pagination').innerHTML = 
                //templates.catalogPaginationTemplate(option);
            }, 
            error: function(err){
      
            }  
          });
        }
      });
}

