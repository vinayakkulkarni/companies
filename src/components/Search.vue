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
  </div>
</template>

<script>
import Config from '../config';

export default {
  name: 'search',
  data() {
    return {
      query: this.defaultQueryParams(),
      results: null,
      errors: {},
      config: Config,
    };
  },
  methods: {
    hitAPI() {
      const t = this;
      t.$http.post(t.config.site, t.query, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then((response) => {
        // console.log('response.data', response.data);
        t.results = response.data.recommendations;
      })
      .catch((error) => {
        t.errors = error;
      });
    },
    defaultQueryParams() {
      return {
        company: null,
        t: Date.now(),
        type: 'COMPANY',
        limit: null,
      };
    },
  },
};
</script>
