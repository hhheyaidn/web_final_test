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
		getData(1,'北部');
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
});

function getData(page,category){
 /* if(tab==="tab1"){
    $('#tab1').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked");
    alert($('#tab2').attr("checked"));
  }
  else if(tab==="tab2"){
    $('#tab2').attr("checked","checked");
    $('#tab1').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab3"){
    $('#tab3').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab1').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab4"){
    $('#tab4').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab1').removeAttr("checked");  
    $('#tab5').removeAttr("checked"); 
  }
  else if(tab==="tab5"){
    $('#tab5').attr("checked","checked");
    $('#tab2').removeAttr("checked");
    $('#tab3').removeAttr("checked"); 
    $('#tab4').removeAttr("checked");  
    $('#tab1').removeAttr("checked"); 
  }*/
  var limit = 15;
  var skip = (page-1) * limit;
  var Farmer = Parse.Object.extend("Farmer");
  var Product = Parse.Object.extend("Product");
  var query = new Parse.Query(Farmer);
  var queryP = new Parse.Query(Product);
  //================LIST!!!
  var list = "hihi";
  //================
  query.limit(limit);
  query.skip(skip);
  query.equalTo("district", category);
  query.descending("createdAt");
  query.find({
    success: function(results) {
      //alert(1);
      $('.content').html("");
      var objList = results.map(function (e){ return e.toJSON() });
      objList.forEach(function (e){
        queryP.descending("createdAt");
        queryP.equalTo("Farmer",e.objectId);
        queryP.find({
          success: function(output){
            var productList = output.map(function (e){ return e.toJSON() });
            console.log(productList);
            productList.forEach(function (e){
              //alert(2);
              list = list+e.Prod_name+" ";
            });
          }
        });
        //var photo = e.Farmer_Pic;
        //$("profileImg")[0].src = profilePhoto.url();
        //var html = '<a href="farmer.html"><img src="img/about_2.png"></img></a><a href="farmer.html" id="name">'+e.Name+'</a><br><a href="farmer.html" id="product">'+list+'</a>';
        var html = '<a href="farmer.html" onClick=" "><div class="about"><img src="'+e.Farmer_Pic.url+'"></img><p class="name">'+e.Name+'</p><p>'+list+'</p></div></a>';
        $('.tab_content').append(html);
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
  event.preventDefault();
}
