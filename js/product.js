$(document).ready(function() {
  Parse.initialize('cBg30mmL0gugVy89T8VSVyRLE0swECDDg5ccJ46N','xJoUF67t6m6DneUpQna1HKOnCnGm29dUWuifPCrg');
})

$(function(){
	// 預設顯示第一個 Tab
	var _showTab = 0;
	var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
	$($defaultLi.find('a').attr('href')).siblings().hide();
 
	// 當 li 頁籤被點擊時...
	// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
	$('ul.tabs li').click(function() {
		// 找出 li 中的超連結 href(#id)
	
		var $this = $(this),
			_clickTab = $this.find('a').attr('href');
			
			console.log($this.li);
		// 把目前點擊到的 li 頁籤加上 .active
		// 並把兄弟元素中有 .active 的都移除 class
		$this.addClass('active').siblings('.active').removeClass('active');
		// 淡入相對應的內容並隱藏兄弟元素
		$(_clickTab).stop(false, true).fadeIn().siblings().hide();
 
		return false;
	}).find('a').focus(function(){
		this.blur();
	});
	$("#myHref1").click( function() {
   window.location = "farmily_farmer_list.html";
    getData(1,'北部');
});
$("#myHref").click( function() {
   window.location = "farmily_product.html";
    getData(1,'五穀雜糧');
});
});

function getData(page,category,tab){
  var limit = 15;
  var skip = (page-1) * limit;
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  var list="";

  query.limit(limit);
  query.skip(skip);
  query.equalTo("district", category);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      $('.tab_content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      //console.log(objList);
      objList.forEach(function (e){
        queryP.descending("createdAt");
        queryP.equalTo("Farmer",e.objectId);
        queryP.find({
          success: function(output){
            var productList = output.map(function (e){ return e.toJSON() });
            //console.log(productList);
            list="";
            productList.forEach(function (e){
             list += e.Prod_name+" ";
            });
          },
          error: function(error) {
          alert("Error: " + error.code + " " + error.message);
          }
        }).then(function(){
          var id = "'"+e.objectId+"'";
          var html = '<a href="farmer.html?name='+e.objectId+'"><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
          $('.tab_content').append(html);
        });
      });
      //底下的小分頁=================
      query.limit(0);
      query.skip(0);
      var option = {};
      query.count({
        success: function(count){
        var totalPage = Math.ceil(count / limit);
        var currentPage = parseInt(page);
        option = {
          'previous': (currentPage === 1) ? 1 : currentPage-1,
          'next': (currentPage === totalPage) ? currentPage : currentPage+1,
          'current': currentPage,
          'last': totalPage,
        };
        }, 
        error: function(err){

        }  
      });
      //===========================
    }
  });
  event.preventDefault();
}


function call (id){
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  query.equalTo("objectId", id);
  query.find({
    success: function(results) {
      var objList = results.map(function (e){ return e.toJSON() });
      queryP.descending("createdAt");
      queryP.equalTo("Farmer",id);
      queryP.find({
        success: function(output){
          var productList = output.map(function (e){ return e.toJSON() });
          productList.forEach(function (e){
            var pro = '<div class="product"><img src="'+e.Prod_Pic.url+'"></img><h3>'+e.Prod_name+'</h3><br><a class="name">'+e.Prod_stat+'</a><p>$'+e.Prod_price+'</p></div>';
            $('#product-list').append(pro);
            console.log(pro);
          })
        }
      }).then(function(){
          var banner = '<img src="'+objList[0].Farmer_Pic.url+'" class="farmer_head"><h2 class="slogan"><div id="farm-name">'+objList[0].Name+'</div><div id="farmer-name">'+objList[0].Name+'</div></h2>';
          $('.banner').append(banner);
          var description = '<p>'+objList[0].farm_story+'</p>';
          $('.description').append(description);
          var info = '<p><i class="fa fa-home fa-2x"></i><a href="'+objList[0].website+'">'+objList[0].Name+'</a></p><p><i class="fa fa-facebook-square fa-2x"></i><a href="'+objList[0].facebook+'">粉絲專頁</a></p><p><i class="fa fa-phone fa-2x"></i>'+objList[0].telephone+'</p>';
          $('.info').append(info);
        });
    }
  });
  event.preventDefault();
}
