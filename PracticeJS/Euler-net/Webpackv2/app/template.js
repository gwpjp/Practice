const questionTemplate = '<div id = "ex_<%= num %>"<p class = "example"><strong>Example #<%= num %></strong>: <%= title %> </p>' +
    '<p>Answer: <span id="answer_<%= num %>"></span></p>' +
    '<input id="b-<%= num %>" type="button" value="Answer the question." /></div><br>';

export default questionTemplate;
