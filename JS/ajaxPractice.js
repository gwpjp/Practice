l = new ListCollection([],{parentId: 6});
$.getJSON(l.url()).done(function( data ) {
  $.each( data, function( key, val ) {
    console.log(val.title);
    console.log(val.order);
  });
});
