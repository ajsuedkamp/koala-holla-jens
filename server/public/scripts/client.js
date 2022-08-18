console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  $('body').on('click', '.delete-koala', deleteKoala);

  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $('.delete-koala').on('click', deleteKoala);
  $('#addButton').on('click', function () {
    console.log('in addButton on click');

    if ($('#genderIn').val() === '') {
      alert('Choose Male or Female');
      return;
    } else if ($('#readyForTransferIn').val() === '') {
      alert('Choose True or False');
      return;
    } else {
      let koalaToSend = {
        name: $('#nameIn').val(),
        age: $('#ageIn').val(),
        gender: $('#genderIn').val(),
        ready: $('#readyForTransferIn').val(),
        notes: $('#notesIn').val(),
      };
      // call saveKoala with the new obejct
      saveKoala(koalaToSend);
      emptyInputs();


    }
  });
}

function deleteKoala() {
  console.log('inDelete koala');
  const koalaId = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    //deleting koala in /koals using koalaId
    url: `/koalas/${koalaId}`
  }).then(function (response) {
    console.log(response);
    getKoalas();
  }).catch(function (error) {
    console.log(error);
    alert('something went wrong');
  });

}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas - GET
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log(response);
    $('#viewKoalas').empty();
    for (let koala of response) {
      // ID from database for delete button
      console.log(`${koala.ready}`);
      if (`${koala.ready}` === 'false') {
        $('#viewKoalas').append(`
        <tr>
        <td>${koala.id}</td>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready}</td>
        <td>${koala.notes}</td>
        <td></td>
        <td>
          <button class="delete-koala" data-id="${koala.id}">Delete</button>
        <td>
      </tr>
        `);
      } else {
        $('#viewKoalas').append(`
        <tr>
        <td>${koala.id}</td>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.ready}</td>
        <td>${koala.notes}</td>
        <td><button class="ready-transfer" datat id="${koala.ready}">Ready for Transfer</button></td>
        <td>
          <button class="delete-koala" data-id="${koala.id}">Delete</button>
        <td>
      </tr>
        `);
      }
    }
  }).catch(function (error) {
    console.log(error);
    alert('Something went wrong!')
  })
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
  }).then(function (response) {
    console.log(response);
    getKoalas();
  });
}

function emptyInputs() {
  $('input').val('');
  $('select').val('');
}