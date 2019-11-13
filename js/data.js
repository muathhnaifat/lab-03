function Horns(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    Horns.all.push(this);
 }
 Horns.all = [];
 Horns.prototype.render = function () {
    let templateMrkup = $('#horns-template').html();
    let template = Handlebars.compile(templateMrkup);
    let hornOutput = template(this);
    $('#photo-template').append(hornOutput);
 };
 function populateSelectBox() {
    let seen = {};
    let select = $('select');
    Horns.all.forEach(horn => {
        if (! seen[horn.keyword]) {
            let option = <option value = "${horn.keyword}">${horn.keyword}</option>;
            select.append(option);
            seen[horn.keyword] = true;
        }
    })
 }
 $('select').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`.${selected}`).fadeIn(800);
 });
    $.get('../data/page-2.json')
    .then(data => {
        data.forEach(thing => {
            let horn = new Horns(thing)
            horn.render();
        });
    })
    .then(() => populateSelectBox() );