// One unauthenticated GitHub API call populates star counts on the landing page.
// Cards work without it (they ship with a "★ —" placeholder).
(function () {
  var REPO_API = 'https://api.github.com/users/lkpanganiban/repos?per_page=100&type=owner';
  fetch(REPO_API, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (response) {
      if (!response.ok) throw new Error('GitHub API ' + response.status);
      return response.json();
    })
    .then(function (repos) {
      repos.forEach(function (repo) {
        if (repo.fork) return; // forks are deliberately not featured on the site
        var el = document.querySelector('.stars[data-repo="' + repo.full_name + '"]');
        if (el) el.textContent = '★ ' + repo.stargazers_count;
      });
    })
    .catch(function () { /* keep placeholders */ });
})();
