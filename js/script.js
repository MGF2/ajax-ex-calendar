$(document).ready(function(){

  //data di partenza
  var today = moment('2018-01-01');

  //inserimento giorni del mese
  insertDays(today);
  //inserimento festività
  insertHolidays(today);



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


function insertHolidays(data) {

  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      method: "GET",
      data: {
        year: data.year(),        //dati richiesti all API
        month: data.month()
      },
      success: function (risposta) {

        console.log(risposta);
        console.log(data);

        var response = risposta.response;

        //ciclo per inserimento dati API
        for (i = 0; i < response.length; i++) {

          //Inserimento data API in list item
          var dataLi = $('li[data-complete-date="' + response[i].date + '"]');
          console.log(dataLi);

          //Memorizzazione nome festività
          var nameHoliday = response[i].name;

          //Aggiunta nome festività al documento
          dataLi.append( ' ' + nameHoliday);
          console.log(nameHoliday);
          //Aggiunta colore a festività
          dataLi.addClass('holidays');

        }

      },
      error: function (data, stato, errori) {
        alert("E' avvenuto un errore.");
      }

    }
  );



}



// RESPONSE API
// {
//     "success": true,
//     "response": [
//         {
//             "name": "Capodanno",
//             "date": "2018-01-01"
//         },
//         {
//             "name": "Epifania",
//             "date": "2018-01-06"
//         }
//     ]
// }

//AJAX EXMP

// $.ajax(
// {
// url: "http://www.boolean.careers/api/random/boolean",
// method: "GET",
// success: function (data, stato) {
// $("#risultati").html(data);
// },
// error: function (richiesta, stato, errori) {
// alert("E' avvenuto un errore. " + errore);
// }
// }
// );
