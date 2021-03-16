<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
    <!-- <h6>Event created by user with ID: {{ user.id }}</h6>

  <ul>
    <li v-for="cat in categories" :key="cat">{{ cat }}</li>
  </ul>

  <p>There are {{ catLength }} categories</p>
  <p> {{ getEventById(2) }}</p>

  <div>
    <input v-model.number="incrementBy">
    <button @click="incrementCount">Increment</button>
  </div> -->
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";

import Datepicker from "vuejs-datepicker";

export default {
  data() {
    const times = [];
    for (let i = 0; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
      // incrementBy: null,
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('There was a problem creating your event.')
        })
    },

    createFreshEventObject() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: "",
      };
    },
  },
  components: {
    Datepicker,
  },

  // methods: {
  //   incrementCount() {
  //     this.$store.commit("INCREMENT_COUNT", this.incrementBy);
  //   },
  // },
  // computed: {
  //   //add local computed to general state
  //   catLength() {
  //     return this.$store.getters.catLength;
  //   },

  // getEvent() {
  //   return this.$store.getters.getEventById
  // },

  //   ...mapGetters(["getEventById"]),

  //   ...mapState(["user", "categories"]),
  // },

  //final version
  // mapState(['user', 'categories']

  // {
  //first version
  // userName: state => state.user.name,
  // userID: state =>state.user.id,
  // categories: state => state.categories,

  //second version
  // user: 'user',
  // categories: 'categories'
  // }

  // Regular version
  // {
  //   userName() {
  //     return this.$store.state.user.name
  //   },
  //   userID() {
  //     return this.$store.state.user.id
  //   }
  // }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
