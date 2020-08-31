$(document).ready(function(){

  var today = moment('2018-01-01');
  
  insertDays(today);



});

//FUNCTIONS

function addZero(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
}

function insertDays(data) {
  var month = data.format('MMMM');
  var year = data.format('YYYY');

  $('h1.month').html(month + ' ' + year);

  var dayMonth = data.daysInMonth();

  for (var i = 1; i <= dayMonth; i++) {

    var source = $('#day-template').html();
    var template = Handlebars.compile(source);

    var context = {
      day: addZero(i),
      month: month,
      completeDate: year + '-' + data.format('MM') + '-' + addZero(i),

    }

    var html = template(context);
    $('.month-list').append(html);
  }
}
