'use strict';
const AllProduct = [];
function Product(data) {
 this.url = data.image_url;
 this.title = data.title;
 this.description = data.description;
 this.keyword = data.keyword;
 this.horns = data.horns;
 AllProduct.push(this);
}
const Arrayofkeyword = [];
function renderAnyHandlebars(sourceId, data, target) {
 let template = Handlebars.compile($(sourceId).html());
 let newHtml = template(data);
 $(target).append(newHtml);
}
function render() {
 AllProduct.forEach(obj => {
 renderAnyHandlebars('#horns-handlebars', obj, 'main');
 });
 AllProduct.forEach(obj => {
   if (!Arrayofkeyword.includes(obj.keyword)) {
     Arrayofkeyword.push(obj.keyword);
   }
 });
 $('select').html('<option value="default">Filter by Keyword</option>');
 Arrayofkeyword.forEach(keyword => {
   let keywordObj = {
     'keyword': keyword,
   }
   renderAnyHandlebars('#handlebars-call', keywordObj, 'select');
 });
}


function readData(pageNumber='page-1') {
  $('main').html('');
  AllProduct.length = 0;
  $.get(`./data/${pageNumber}.json`, data => {
     data.forEach(obj => {
       new Product(obj);
     });
   })
   .then(() => {sortByTitle(AllProduct)})
   .then(render);
 }


 function sortByTitle(array) {
  array.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    else if (a.title < b.title) {
      return -1;
    }
    else {return 0;}
  });
}



readData(); 

$('select').on('change', function(){
  let $select = $(this).val();
  $('div').hide();
  $(`div[data-keyword="${$select}"]`).show();
});

$('button[value="page1"]').on('click', () => {
  readData('page-1');
});
$('button[value="page2"]').on('click', () => {
  readData('page-2');
});

$('button[value="sortKeyword"]').on('click', () => {
  $('main').html('');
  sortByTitle(AllProduct);
  render();
});