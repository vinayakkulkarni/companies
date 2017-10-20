<template>
  <div>
    <form method="POST" @submit.prevent="hitAPI">
      <div class="field">
        <label class="label" for="search_companies">Search for Companies</label>
        <div class="control">
          <input class="input" name="search_companies" type="text" placeholder="Search Company" v-model="query.company">
        </div>
        <p class="help" v-if="!query.company">Use the search above to search for organisations based out of India</p>
      </div>
      <div class="field">
        <button type="submit" class="button is-primary">Search</button>
      </div>
    </form>
    <br />
    <div v-if="results">
      <div class="card" v-for="(result, index) in results" :key="result.id">
        <div class="card-content">
          <p class="title">
            {{ result.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ') }}
          </p>
        </div>
        <!-- <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              Share on <a href="#">Facebook</a>
            </span>
          </p>
        </footer> -->
      </div>
    </div>
    <div v-if="noresults">
      No results found.
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      query: this.defaultQueryParams(),
      results: null,
      noresults: false,
      errors: {},
    };
  },
  methods: {
    hitAPI() {
      const t = this;
      t.$http.get(`https://emis.snapmint.com/get_company.json?q=${t.query.company}`)
      .then((response) => {
        t.results = response.data;
        t.noresults = true ? response.data.length === 0 : false;
      })
      .catch((error) => {
        t.errors = error;
      });
    },
    defaultQueryParams() {
      return {
        company: null,
        time: Date.now(),
        type: 'COMPANY',
      };
    },
  },
};
</script>
