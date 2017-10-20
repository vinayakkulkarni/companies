import Vue from 'vue';
import Search from '@/components/Search';

describe('Search.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Search);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.search h1').textContent)
      .to.equal('Welcome to Your Vue.js PWA');
  });
});
