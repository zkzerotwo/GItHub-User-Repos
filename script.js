
//Format API query parameters
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

//Search repositories based on user
function getRepos(searchedUser, maxRepos) {
  console.log(searchedUser);
  console.log(maxRepos);
  const apiKey = "485b5814bc7842dd746decb484484a346efc3fb1"
  const searchUrl = "https://api.github.com/"
  const params = {
    username: searchedUser,
    type: "all",
    sort: "created",
    direction: "asc",
    per_page: maxRepos,
    page: 1
  };
//Create string of query parameters
  const queryString = formatQueryParams(params)
//display updated url
  const url = searchUrl + `users/${params.username}/repos` + '?' + queryString;
  console.log(url);

//Set header options
  const options = {
    headers: new Headers({
      Authorization: "token " + apiKey,
      Accept: 'application/vnd.github.v3+json'
    })
  }
  //
  fetch(url, options)
    .then(response =>  response.json())
    .then(responseJson => displayRepos(responseJson, maxRepos))
    .catch(error => {alert("Make sure you're using a valid username.")
  });
}

//display repositores in list format
function displayRepos(responseJson, maxRepos) {
  console.log(responseJson);
  console.log(maxRepos);
  console.log(responseJson[0].name);
  console.log(responseJson[0].full_name);
  $('#results-list').empty();
  if (responseJson.length === 0) {
    console.log("error")
  } else {
    for (i = 0; i < responseJson.length; i++) {
      $('#results-list').append(`<li><a href="http://github.com/${responseJson[i].full_name}/">${responseJson[i].name}</a></li>`)
    }
    $('.results').removeClass('hidden');
  }

}

//Get input from user
function formSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    const searchedUser = $('#user').val();
    const maxRepos = $('#repos').val();
    console.log(searchedUser);
    console.log(maxRepos);
    getRepos(searchedUser, maxRepos);
  })
}

//Callback function
$(formSubmit)
