import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {id: 'abc123', name: 'Raluca'},
    categories: ['nature', 'sport', 'dance'],
    events: [],
    count: 0,
    eventsTotal: 0
  },

  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },

    ADD_EVENT(state, event) {
      state.events.push(event)
    },

    SET_EVENTS(state,events) {
      state.events = events
    },

    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    }
  },

  actions: {
    createEvent({commit}, event) {
      EventService.postEvent(event)
      commit('ADD_EVENT', event)
    },

    fetchEvents({commit}, {perPage, page}) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
          commit('SET_EVENTS', response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log("There was an error " + error);
        });
    }
  },

  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find( event => event.id === id)
    }
  }
});
